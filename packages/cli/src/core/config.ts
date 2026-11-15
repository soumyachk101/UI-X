import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { z } from "zod";
import { logger } from "../utils/logger.js";

// ---------------------------------------------------------------------------
// Config schema (validated with Zod)
// ---------------------------------------------------------------------------

const TailwindConfigSchema = z.object({
  config: z.string().optional(),
  css: z.string().optional(),
  baseColor: z.string().optional(),
});

const AliasesSchema = z.object({
  components: z.string().optional(),
  utils: z.string().optional(),
  ui: z.string().optional(),
});

const RegistriesSchema = z.record(z.string(), z.string());

export const UiXConfigSchema = z.object({
  $schema: z.string().optional(),
  style: z.string().default("default"),
  rsc: z.boolean().default(true),
  tsx: z.boolean().default(true),
  tailwind: TailwindConfigSchema.default({
    config: "",
    css: "app/globals.css",
    baseColor: "slate",
  }),
  aliases: AliasesSchema.default({
    components: "@/components",
    utils: "@/lib/utils",
    ui: "@/components/ui",
  }),
  registries: RegistriesSchema.default({
    "@default": "https://registry.ui-x.dev/r",
  }),
});

export type UiXConfig = z.infer<typeof UiXConfigSchema>;

// ---------------------------------------------------------------------------
// Defaults
// ---------------------------------------------------------------------------

export function getDefaultConfig(): UiXConfig {
  return UiXConfigSchema.parse({
    style: "default",
    rsc: true,
    tsx: true,
    tailwind: {
      config: "",
      css: "app/globals.css",
      baseColor: "slate",
    },
    aliases: {
      components: "@/components",
      utils: "@/lib/utils",
      ui: "@/components/ui",
    },
    registries: {
      "@default": "https://registry.ui-x.dev/r",
    },
  });
}

// ---------------------------------------------------------------------------
// Loader / validator
// ---------------------------------------------------------------------------

const CONFIG_FILENAME = "ui-x.config.json";

/**
 * Resolve the project root by walking up from `cwd` looking for
 * ui-x.config.json, a package.json with a `name` field, or stopping at /.
 */
async function findProjectRoot(start: string): Promise<string> {
  let current = path.resolve(start);
  while (true) {
    const configPath = path.join(current, CONFIG_FILENAME);
    try {
      await fs.access(configPath);
      return current;
    } catch {
      // not found, keep walking
    }
    const parent = path.dirname(current);
    if (parent === current) break;
    current = parent;
  }
  // fall back to cwd — callers decide whether to treat absence as fatal
  return path.resolve(start);
}

/**
 * Load and validate ui-x.config.json from the project root.
 *
 * @param projectRoot — explicit root directory (searched for config when omitted)
 * @throws when the file is missing or fails validation
 */
export async function loadConfig(projectRoot?: string): Promise<UiXConfig> {
  const root = projectRoot ? path.resolve(projectRoot) : await findProjectRoot(process.cwd());
  const configPath = path.join(root, CONFIG_FILENAME);

  let raw: unknown;
  try {
    raw = JSON.parse(await fs.readFile(configPath, "utf-8"));
  } catch (err) {
    logger.error(`Could not read ${CONFIG_FILENAME} at ${configPath}`);
    throw err;
  }

  return validateConfig(raw, configPath);
}

/**
 * Validate a raw config object against the schema.
 * Throws `z.ZodError` on failure.
 */
export function validateConfig(raw: unknown, source = "<unknown>"): UiXConfig {
  const result = UiXConfigSchema.safeParse(raw);
  if (!result.success) {
    const issues = result.error.issues
      .map((issue) => `  • ${issue.path.join(".")}: ${issue.message}`)
      .join("\n");
    logger.error(`Invalid config in ${source}:\n${issues}`);
    throw result.error;
  }
  logger.success("Config validated");
  return result.data;
}
