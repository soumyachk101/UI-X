import { Command } from "commander";
import chalk from "chalk";
import fs from "fs/promises";
import path from "path";

import {
  fetchRegistry,
  getCachedRegistry,
} from "../core/downloader.js";
import { logger } from "../utils/logger.js";
import type { RegistryIndex, RegistryItem } from "@ui-x/registry-schema";

const DEFAULT_REGISTRY_URL = "https://registry.ui-x.dev/r/index.json";

const TYPE_LABEL: Record<RegistryItem["type"], { emoji: string; color: (s: string) => string }> = {
  "registry:ui":    { emoji: "🧩", color: chalk.cyan },
  "registry:block": { emoji: "🧱", color: chalk.green },
  "registry:hook":  { emoji: "🪝", color: chalk.magenta },
  "registry:lib":   { emoji: "📚", color: chalk.blue },
  "registry:theme": { emoji: "🎨", color: chalk.yellow },
  "registry:util":  { emoji: "⚙️", color: chalk.gray },
};

const ALLOWED_TYPES: RegistryItem["type"][] = [
  "registry:ui",
  "registry:block",
  "registry:hook",
  "registry:lib",
  "registry:theme",
  "registry:util",
];

/**
 * Try to load a project-local `registry/index.json` (relative to cwd).
 * Falls back to the network and then to cache.
 */
async function loadIndex(useCache = false): Promise<RegistryIndex> {
  const localPath = path.resolve(process.cwd(), "registry", "index.json");

  // 1. Local file
  try {
    const raw = await fs.readFile(localPath, "utf-8");
    logger.success(`Loaded local registry: ${localPath}`);
    return JSON.parse(raw) as RegistryIndex;
  } catch {
    // proceed to network
  }

  // 2. Network
  if (!useCache) {
    try {
      const raw = await fetchRegistry(DEFAULT_REGISTRY_URL, process.cwd());
      return raw as RegistryIndex;
    } catch {
      logger.warn("Network unavailable; falling back to cache");
    }
  }

  // 3. Cache
  const cached = await getCachedRegistry(DEFAULT_REGISTRY_URL, process.cwd());
  if (!cached) {
    throw new Error(
      "Registry unavailable. Run `ui-x init`, add a `registry/index.json`, or check your network."
    );
  }
  return cached as RegistryIndex;
}

/**
 * Group items by type for display.
 */
function groupByType(
  items: RegistryItem[]
): Map<RegistryItem["type"], RegistryItem[]> {
  const map = new Map<RegistryItem["type"], RegistryItem[]>();
  for (const item of items) {
    const bucket = map.get(item.type) ?? [];
    bucket.push(item);
    map.set(item.type, bucket);
  }
  return map;
}

/**
 * Group items by category for display.
 */
function groupByCategory(
  items: RegistryItem[]
): Map<string, RegistryItem[]> {
  const map = new Map<string, RegistryItem[]>();
  for (const item of items) {
    const cat = item.category ?? "uncategorized";
    const bucket = map.get(cat) ?? [];
    bucket.push(item);
    map.set(cat, bucket);
  }
  return map;
}

function displayName(item: RegistryItem): string {
  return item.title ?? item.name;
}

export const listCommand = new Command("list");

listCommand
  .description("List all available components and blocks")
  .option("-t, --type <type>", `Filter by type (${ALLOWED_TYPES.join(" | ")})`)
  .option("-c, --category <name>", "Filter by category")
  .option("--json", "Output as JSON")
  .option("--local", "Use project-local registry (registry/index.json) only")
  .option("--count", "Show counts per category instead of listing items")
  .action(async (opts) => {
    let index: RegistryIndex;

    try {
      // For listing, prefer network so the user sees what is available even
      // without a local registry. Fall back to cache if offline.
      index = await loadIndex(opts.local);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      logger.error(message);
      process.exitCode = 1;
      return;
    }

    const allItems = Object.values(index.items);

    // ── Filter by type ───────────────────────────────────────────────────
    let filtered = allItems;
    if (opts.type) {
      const requested = opts.type as RegistryItem["type"];
      if (!ALLOWED_TYPES.includes(requested)) {
        logger.error(
          `Unknown type "${requested}". Valid types: ${ALLOWED_TYPES.join(", ")}`
        );
        process.exitCode = 1;
        return;
      }
      filtered = filtered.filter((item) => item.type === requested);
    }

    // ── Filter by category ───────────────────────────────────────────────
    if (opts.category) {
      filtered = filtered.filter(
        (item) => (item.category ?? "uncategorized") === opts.category
      );
    }

    // ── JSON output ──────────────────────────────────────────────────────
    if (opts.json) {
      const output = filtered.map((item) => ({
        name: item.name,
        title: item.title,
        type: item.type,
        category: item.category,
        description: item.description,
        tags: item.tags,
        version: item.version,
        dependencies: item.dependencies,
        registryDependencies: item.registryDependencies,
        files: item.files?.map((f) =>
          typeof f === "object" && f !== null && "path" in f
            ? (f as { path: string }).path
            : String(f)
        ),
      }));
      console.log(JSON.stringify({ version: index.version, items: output }, null, 2));
      return;
    }

    // ── Human-readable output ────────────────────────────────────────────
    if (filtered.length === 0) {
      console.log(chalk.yellow("\nNo items found matching your filters.\n"));
      console.log(chalk.gray("Try:"));
      console.log(chalk.gray(`  ${chalk.cyan("ui-x list")}                    # list everything`));
      console.log(chalk.gray(`  ${chalk.cyan("ui-x list --type registry:ui")}  # list only components`));
      console.log(chalk.gray(`  ${chalk.cyan("ui-x search <query>")}         # fuzzy search\n`));
      return;
    }

    // Counts mode
    if (opts.count) {
      const byCat = groupByCategory(filtered);
      console.log(chalk.bold("\n📊 Items by category:\n"));
      const cats = [...byCat.entries()].sort((a, b) => b[1].length - a[1].length);
      for (const [cat, items] of cats) {
        console.log(`  ${chalk.cyan(cat.padEnd(20))} ${chalk.gray(`${items.length} item(s)`)}`);
      }
      console.log(chalk.gray(`  ${"─".repeat(40)}`));
      console.log(`  ${chalk.bold("Total".padEnd(20))} ${chalk.bold(`${filtered.length} item(s)`)}`);
      console.log();
      return;
    }

    // Group by type
    const byType = groupByType(filtered);

    console.log(chalk.bold(`\n📦 Registry (${filtered.length} items, index v${index.version})\n`));

    for (const [type, items] of byType) {
      const meta = TYPE_LABEL[type] ?? { emoji: "📄", color: chalk.white };
      const label = meta.emoji + " " + type;

      console.log(chalk.bold(`${label} ${chalk.gray(`(${items.length})`)}:`));

      for (const item of items) {
        const name = displayName(item);
        const desc = item.description ? chalk.gray(` — ${item.description}`) : "";
        const tags = item.tags?.length
          ? chalk.gray(` [${item.tags.join(", ")}]`)
          : "";
        console.log(`  ${chalk.cyan(name)}${desc}${tags}`);
      }
      console.log();
    }
  });
