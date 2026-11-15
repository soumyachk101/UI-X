/**
 * UI-X Registry Validator
 *
 * Loads a registry index and produces structured validation results:
 *  - schema-level parse errors (Zod issues)
 *  - cross-reference errors (missing registryDependencies)
 *  - path-safety warnings (paths outside allowed directories)
 *  - orphan warnings (no registryDependencies on any item)
 *
 * Exports:
 *   validateRegistry(raw: unknown, options?)        → ValidationReport
 *   formatValidationErrors(report)                  → string[]
 */

import { fs } from "node:fs/promises";
import { path } from "node:path";

import {
  type RegistryConfig,
  type RegistryIndex,
  type RegistryItem,
  RegistryConfigSchema,
  RegistryIndexSchema,
  RegistryItemSchema,
} from "@ui-x/registry-schema";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ValidationError {
  itemName: string | null;
  field: string | null;
  message: string;
}

export interface ValidationWarning {
  itemName: string;
  message: string;
}

export interface ValidationReport {
  /** Fatal errors that prevent the registry from being used. */
  errors: ValidationError[];

  /** Non-fatal warnings that suggest problems but don't block. */
  warnings: ValidationWarning[];

  /** The parsed (and validated) index — undefined when errors are present. */
  index: RegistryIndex | undefined;

  /** The config used to compute allowed paths, or undefined when absent. */
  config: RegistryConfig | undefined;
}

export interface ValidateOptions {
  /** Absolute path to the registry `index.json` file. Defaults to
   * `<cwd>/registry/index.json`. */
  indexPath?: string;

  /** Absolute path to the `ui-x.config.json` file (optional). */
  configPath?: string;

  /** When `true`, also load and apply the config's `allowedPaths`. */
  applyConfig?: boolean;

  /** When `true`, treat orphan items (no registryDependencies) as warnings. */
  warnOrphans?: boolean;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function buildErrorMessage(issue: z.ZodIssue): string {
  if (issue.path.length === 0) {
    return issue.message;
  }
  const field = issue.path.join(".");
  return `[${field}] ${issue.message}`;
}

function isPathAllowed(filePath: string, allowed: string[]): boolean {
  const firstSegment = filePath.split("/")[0];
  return allowed.includes(firstSegment);
}

// ---------------------------------------------------------------------------
// Core validator
// ---------------------------------------------------------------------------

/**
 * Validate a registry index loaded from `raw` JSON.
 *
 * If `options.applyConfig` is true (default) the validator will try to load
 * `ui-x.config.json` from the project root to apply `allowedPaths` and other
 * constraints.  Failures to load or parse the config are turned into warnings
 * rather than hard errors so that the registry remains usable without one.
 */
export async function validateRegistry(
  raw: unknown,
  options: ValidateOptions = {}
): Promise<ValidationReport> {
  const errors: ValidationError[] = [];
  const warnings: ValidationWarning[] = [];

  // -----------------------------------------------------------------------
  // 1. Parse the index
  // -----------------------------------------------------------------------
  const parseResult = RegistryIndexSchema.safeParse(raw);
  if (!parseResult.success) {
    for (const issue of parseResult.error.issues) {
      errors.push({
        itemName: null,
        field: issue.path.join(".") || "(root)",
        message: buildErrorMessage(issue),
      });
    }
    return { errors, warnings, index: undefined, config: undefined };
  }

  const index = parseResult.data;

  // -----------------------------------------------------------------------
  // 2. Load config (optional, non-fatal)
  // -----------------------------------------------------------------------
  let config: RegistryConfig | undefined;
  if (options.applyConfig !== false) {
    try {
      const configPath =
        options.configPath ??
        path.join(process.cwd(), "ui-x.config.json");

      const rawConfig = await fs.readFile(configPath, "utf-8").then((text) =>
        JSON.parse(text)
      );
      const configResult = RegistryConfigSchema.safeParse(rawConfig);
      if (configResult.success) {
        config = configResult.data;
      } else {
        for (const issue of configResult.error.issues) {
          warnings.push({
            itemName: "config",
            message: `ui-x.config.json [${issue.path.join(".")}]: ${issue.message}`,
          });
        }
      }
    } catch {
      // No config file — continue without it.
    }
  }

  // -----------------------------------------------------------------------
  // 3. Validate each item
  // -----------------------------------------------------------------------
  const knownNames = new Set(Object.keys(index.items));
  const allowedPaths = config?.allowedPaths ?? [
    "components",
    "lib",
    "hooks",
    "utils",
  ];

  let hasOrphan = false;

  for (const [name, item] of Object.entries(index.items)) {
    // Validate the item itself (already done by the index schema, but let us
    // produce per-item errors anyway).
    const itemResult = RegistryItemSchema.safeParse(item);
    if (!itemResult.success) {
      for (const issue of itemResult.error.issues) {
        errors.push({
          itemName: name,
          field: issue.path.join("."),
          message: buildErrorMessage(issue),
        });
      }
      continue;
    }

    const validItem = itemResult.data;

    // Check registryDependencies exist in the index.
    for (const dep of validItem.registryDependencies) {
      if (!knownNames.has(dep)) {
        errors.push({
          itemName: name,
          field: "registryDependencies",
          message: `"${dep}" is not a known registry item`,
        });
      }
    }

    // Check file paths are within allowed directories.
    for (const file of validItem.files) {
      if (!isPathAllowed(file.path, allowedPaths)) {
        warnings.push({
          itemName: name,
          message: `File path "${file.path}" targets directory outside allowed paths: ${allowedPaths.join(", ")}`,
        });
      }
    }

    // Track orphans.
    if (validItem.registryDependencies.length === 0 && options.warnOrphans !== false) {
      hasOrphan = true;
    }
  }

  // Single consolidated orphan warning.
  if (hasOrphan) {
    warnings.push({
      itemName: "(registry)",
      message: "One or more items have no registryDependencies — verify this is intentional.",
    });
  }

  return { errors, warnings, index, config };
}

// ---------------------------------------------------------------------------
// Formatter
// ---------------------------------------------------------------------------

/**
 * Turn a ValidationReport into human-readable lines.
 *
 * Each error is prefixed with `[ERROR]` and each warning with `[WARN]`.
 * The format is suitable for CLI output.
 */
export function formatValidationErrors(report: ValidationReport): string[] {
  const lines: string[] = [];

  if (report.errors.length === 0 && report.warnings.length === 0) {
    lines.push("✓ Registry is valid.");
    return lines;
  }

  for (const err of report.errors) {
    const scope = err.itemName ? `"${err.itemName}"` : "(root)";
    lines.push(`[ERROR] ${scope} → ${err.field || "value"}: ${err.message}`);
  }

  for (const w of report.warnings) {
    lines.push(`[WARN]  "${w.itemName}" → ${w.message}`);
  }

  return lines;
}

// ---------------------------------------------------------------------------
// Convenience: load + validate from a file path
// ---------------------------------------------------------------------------

/**
 * Read `index.json` from `options.indexPath` (or the default) and run
 * `validateRegistry` on its parsed JSON.
 */
export async function loadAndValidate(
  options: ValidateOptions = {}
): Promise<ValidationReport> {
  const indexPath =
    options.indexPath ??
    path.join(process.cwd(), "registry", "index.json");

  try {
    const raw = await fs.readFile(indexPath, "utf-8");
    return validateRegistry(JSON.parse(raw), options);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return {
      errors: [{ itemName: null, field: "indexPath", message }],
      warnings: [],
      index: undefined,
      config: undefined,
    };
  }
}
