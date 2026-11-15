import { Command } from "commander";
import chalk from "chalk";
import ora from "ora";
import fs from "fs/promises";
import path from "path";

import {
  fetchRegistry,
  getCachedRegistry,
} from "../core/downloader.js";
import { logger } from "../utils/logger.js";
import type { RegistryIndex, RegistryItem } from "@ui-x/registry-schema";

const DEFAULT_REGISTRY_URL = "https://registry.ui-x.dev/r/index.json";

const TYPE_EMOJI: Record<RegistryItem["type"], string> = {
  "registry:ui":    "🧩",
  "registry:block": "🧱",
  "registry:hook":  "🪝",
  "registry:lib":   "📚",
  "registry:theme": "🎨",
  "registry:util":  "⚙️",
};

/**
 * Try to load a project-local `registry/index.json` (relative to cwd).
 * Falls back to the network and then to cache.
 */
async function loadIndex(useLocalOnly = false): Promise<RegistryIndex> {
  const localPath = path.resolve(process.cwd(), "registry", "index.json");

  // 1. Local file
  try {
    const raw = await fs.readFile(localPath, "utf-8");
    logger.success(`Loaded local registry: ${localPath}`);
    return JSON.parse(raw) as RegistryIndex;
  } catch {
    // proceed
  }

  if (useLocalOnly) {
    throw new Error(
      "No local registry found. Add a `registry/index.json` or run without --local."
    );
  }

  // 2. Network
  try {
    const raw = await fetchRegistry(DEFAULT_REGISTRY_URL, process.cwd());
    return raw as RegistryIndex;
  } catch {
    logger.warn("Network unavailable; falling back to cache");
  }

  // 3. Cache
  const cached = await getCachedRegistry(DEFAULT_REGISTRY_URL, process.cwd());
  if (!cached) {
    throw new Error(
      "Registry unavailable. Check your network or add a local `registry/index.json`."
    );
  }
  return cached as RegistryIndex;
}

function boolLabel(value: boolean | undefined): string {
  if (value === undefined) return chalk.gray("—");
  return value ? chalk.green("true") : chalk.red("false");
}

function section(title: string, content: string): void {
  console.log(chalk.bold(`\n  ${title}`));
  console.log(content);
}

export const infoCommand = new Command("info");

infoCommand
  .description("Show detailed metadata for a registry item")
  .argument("<name>", "Component or block name")
  .option("--json", "Output full metadata as JSON")
  .option("--deps", "Show only npm dependencies")
  .option("--files", "Show only the file list")
  .option("--raw", "Show raw JSON for this item only")
  .option("--local", "Use only the local registry index (no network)")
  .action(async (name, opts) => {
    const spinner = ora(`Looking up "${name}"…`).start();
    let index: RegistryIndex;

    try {
      index = await loadIndex(opts.local);
    } catch (err) {
      spinner.fail(chalk.red("Failed to load registry"));
      const message = err instanceof Error ? err.message : String(err);
      logger.error(message);
      process.exitCode = 1;
      return;
    }

    // Resolve item (throws when not found — let it propagate to the catch block)
    let item: RegistryItem;
    try {
      item = index.items[name];
      if (!item) {
        // Try matching by title if direct name lookup fails
        const titleMatch = Object.values(index.items).find(
          (i) => (i.title ?? "").toLowerCase() === name.toLowerCase()
        );
        if (titleMatch) {
          item = titleMatch;
        } else {
          throw new Error(
            `"${name}" not found in the registry. Run ${chalk.cyan("ui-x list")} to browse.`
          );
        }
      }
    } catch (err) {
      spinner.fail(chalk.red("Lookup failed"));
      const message = err instanceof Error ? err.message : String(err);
      logger.error(message);
      process.exitCode = 1;
      return;
    }

    spinner.succeed(chalk.green(`Found: ${item.title ?? item.name}`));

    // ── Raw JSON ────────────────────────────────────────────────────────
    if (opts.raw) {
      console.log(JSON.stringify(item, null, 2));
      return;
    }

    // ── Decomposed flags ────────────────────────────────────────────────
    if (opts.deps) {
      section(
        "Dependencies",
        chalk.bold("npm:") +
          "\n  " +
          (item.dependencies?.length
            ? item.dependencies.map((d) => chalk.cyan(d)).join("\n  ")
            : chalk.gray("(none)")) +
          "\n" +
          chalk.bold("registry:") +
          "\n  " +
          (item.registryDependencies?.length
            ? item.registryDependencies.map((d) => chalk.magenta(`@ui-x/${d}`)).join("\n  ")
            : chalk.gray("(none)"))
      );
      return;
    }

    if (opts.files) {
      section(
        "Files",
        item.files?.length
          ? item.files
              .map(
                (f) =>
                  `  ${chalk.cyan(f.path)}  ${chalk.gray(f.type ?? "")}${f.target ? ` → ${chalk.yellow(f.target)}` : ""}`
              )
              .join("\n")
          : chalk.gray("  (none)")
      );
      return;
    }

    // ── Full metadata view ──────────────────────────────────────────────
    const emoji = TYPE_EMOJI[item.type] ?? "📄";
    const displayName = item.title ?? item.name;

    console.log();
    console.log(chalk.bold.cyan(`${emoji}  ${displayName}`));
    console.log(chalk.gray("─".repeat(50)));

    const rows: Array<[string, string]> = [
      ["Name",         chalk.cyan(item.name)],
      ["Type",         chalk.gray(item.type)],
      ["Category",     chalk.magenta(item.category ?? "—")],
      ["Description",  item.description ?? chalk.gray("—")],
      ["Version",      chalk.yellow(item.version ?? "0.0.0")],
      ["License",      chalk.gray(item.license ?? "MIT")],
    ];

    if (item.dependencies?.length) {
      rows.push(["NPM deps",     prettyDeps(item.dependencies)]);
    }
    if (item.registryDependencies?.length) {
      rows.push(["Registry deps", prettyRegistryDeps(item.registryDependencies)]);
    }

    const labelWidth = rows.reduce((max, [label]) => Math.max(max, label.length), 0);
    for (const [label, value] of rows) {
      console.log(`  ${label.padEnd(labelWidth)}  ${value}`);
    }

    // Meta
    if (item.meta) {
      const m = item.meta;
      console.log();
      console.log(chalk.bold("  Meta:"));
      console.log(`    rsc:      ${boolLabel(m.rsc)}`);
      console.log(`    tsx:      ${boolLabel(m.tsx)}`);
      console.log(`    tailwind: ${boolLabel(m.tailwind)}`);
      console.log(`    cssVars:  ${boolLabel(m.cssVars)}`);
      if (m.requires?.length) {
        console.log(`    requires: ${m.requires.map((r) => chalk.cyan(r)).join(", ")}`);
      }
    }

    // Compatibility
    if (item.compatibility) {
      const c = item.compatibility;
      const entries = Object.entries(c).filter(([, v]) => v);
      if (entries.length > 0) {
        console.log();
        console.log(chalk.bold("  Compatibility:"));
        for (const [key, value] of entries) {
          console.log(`    ${key}: ${chalk.cyan(value!)}`);
        }
      }
    }

    // Files
    if (item.files?.length) {
      console.log();
      console.log(chalk.bold("  Files:"));
      for (const f of item.files) {
        const target = f.target ? chalk.yellow(` → ${f.target}`) : "";
        console.log(`    ${chalk.cyan(f.path)}${target}`);
      }
      console.log(chalk.gray(`    ${item.files.length} file(s)`));
    }

    // Tags
    if (item.tags?.length) {
      console.log();
      console.log(chalk.bold("  Tags:"));
      console.log(
        `    ${item.tags.map((t) => chalk.cyan(`#${t}`)).join("  ")}`
      );
    }

    // Links
    const links: string[] = [];
    if (item.docs) links.push(`docs: ${chalk.blue(item.docs)}`);
    if (item.preview) links.push(`preview: ${chalk.blue(item.preview)}`);
    if (item.source) links.push(`source: ${chalk.blue(item.source)}`);
    if (links.length > 0) {
      console.log();
      console.log(chalk.bold("  Links:"));
      for (const link of links) {
        console.log(`    ${link}`);
      }
    }

    // NPM install command
    const npmDeps = item.dependencies ?? [];
    const registryDeps = item.registryDependencies ?? [];
    if (npmDeps.length > 0 || registryDeps.length > 0) {
      console.log();
      console.log(chalk.bold("  Install:"));
      if (npmDeps.length > 0) {
        const cmd = `pnpm add ${npmDeps.join(" ")}`;
        console.log(`    ${chalk.gray("$")} ${chalk.cyan(cmd)}`);
      }
      if (registryDeps.length > 0) {
        const extra = registryDeps
          .map((d) => chalk.cyan(`ui-x add ${d}`))
          .join(", ");
        console.log(
          `    ${chalk.gray("# also install registry deps:")} ${extra}`
        );
      }
    }

    console.log();
  });

function prettyDeps(deps: string[]): string {
  if (deps.length === 0) return chalk.gray("(none)");
  return deps.map((d) => chalk.cyan(d)).join(", ");
}

function prettyRegistryDeps(deps: string[]): string {
  if (deps.length === 0) return chalk.gray("(none)");
  return deps.map((d) => chalk.magenta(`@ui-x/${d}`)).join(", ");
}
