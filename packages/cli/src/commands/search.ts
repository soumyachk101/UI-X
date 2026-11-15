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

const ALLOWED_TYPES: RegistryItem["type"][] = [
  "registry:ui",
  "registry:block",
  "registry:hook",
  "registry:lib",
  "registry:theme",
  "registry:util",
];

/**
 * Compute a simple fuzzy match score (0 = no match, 1 = exact).
 *
 * Checks name, description, and tags with the following weights:
 *   - exact name match       → 1.0
 *   - word-boundary prefix   → 0.9
 *   - substring in name      → 0.7
 *   - token overlap in name/tags → 0.2 per token
 *   - substring in description → 0.5
 *   - substring in tags       → 0.4
 *
 * Returns the highest score across all fields.
 */
function fuzzyScore(query: string, item: RegistryItem): number {
  const q = query.toLowerCase().trim();
  if (!q) return 0;

  const name = (item.title ?? item.name).toLowerCase();
  const desc = (item.description ?? "").toLowerCase();
  const tags = (item.tags ?? []).map((t) => t.toLowerCase());

  // Exact name match
  if (name === q) return 1.0;

  // Word-boundary prefix match in name
  const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const wordRe = new RegExp(`\\b${escaped}`, "i");
  if (wordRe.test(name)) return 0.9;

  // Substring match in name
  if (name.includes(q)) return 0.7;

  // Token overlap
  const tokens = q.split(/\s+/).filter(Boolean);
  let tokenScore = 0;
  for (const token of tokens) {
    if (name.includes(token)) tokenScore += 0.2;
    if (tags.some((t) => t.includes(token))) tokenScore += 0.15;
  }
  if (tokenScore > 0) return Math.min(tokenScore, 0.65);

  // Description match
  if (desc.includes(q)) return 0.5;

  // Tag match
  if (tags.some((t) => t.includes(q))) return 0.4;

  return 0;
}

/**
 * Resolve the project-local registry path relative to this file.
 *
 * Directory layout assumed:
 *   packages/cli/src/commands/search.ts
 *            ↓ (up 3 levels)
 *   packages/registry/index.json
 */
function resolveLocalRegistryPath(): string {
  return path.join(
    path.dirname(path.dirname(path.dirname(path.dirname(new URL(import.meta.url).pathname)))),
    "packages",
    "registry",
    "index.json"
  );
}

async function loadIndex(useCache = false): Promise<RegistryIndex> {
  const localPath = resolveLocalRegistryPath();

  // 1. Project-local index
  try {
    const raw = await fs.readFile(localPath, "utf-8");
    logger.success(`Loaded local registry: ${localPath}`);
    return JSON.parse(raw) as RegistryIndex;
  } catch {
    // file not present — proceed to network
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
      "Registry unavailable. Check your network or add a local `registry/index.json`."
    );
  }
  return cached as RegistryIndex;
}

export const searchCommand = new Command("search");

searchCommand
  .description("Search the registry for components, blocks, hooks, etc.")
  .argument("<query>", "Search query string")
  .option("-t, --type <type>", `Filter results by type (${ALLOWED_TYPES.join(" | ")})`)
  .option("-c, --category <name>", "Filter results by category")
  .option("--json", "Output results as JSON")
  .option("--threshold <score>", "Minimum fuzzy score (0–1)", "0.3")
  .option("--limit <n>", "Maximum results to display", "20")
  .option("--local", "Use only the local registry index (no network)")
  .action(async (query, opts) => {
    const spinner = ora("Searching registry…").start();
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

    const allItems = Object.values(index.items);
    const threshold = parseFloat(opts.threshold ?? "0.3");
    const limit = parseInt(opts.limit ?? "20", 10);

    // ── Score every item ─────────────────────────────────────────────────
    const scored = allItems
      .map((item) => ({ item, score: fuzzyScore(query, item) }))
      .filter(({ score }) => score >= threshold);

    // Sort: descending score, then alphabetically
    scored.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.item.name.localeCompare(b.item.name);
    });

    // Apply post-score filters
    let results = scored.map((s) => s.item);

    if (opts.type) {
      const requested = opts.type as RegistryItem["type"];
      if (!ALLOWED_TYPES.includes(requested)) {
        logger.error(
          `Unknown type "${requested}". Valid: ${ALLOWED_TYPES.join(", ")}`
        );
        process.exitCode = 1;
        return;
      }
      results = results.filter((item) => item.type === requested);
    }
    if (opts.category) {
      results = results.filter(
        (item) => (item.category ?? "uncategorized") === opts.category
      );
    }

    const page = results.slice(0, limit);

    // ── JSON output ──────────────────────────────────────────────────────
    if (opts.json) {
      const payload = page.map((item) => ({
        name: item.name,
        title: item.title,
        type: item.type,
        category: item.category,
        description: item.description,
        tags: item.tags,
        version: item.version,
      }));
      console.log(
        JSON.stringify(
          { query, total: results.length, shown: page.length, items: payload },
          null,
          2
        )
      );
      return;
    }

    // ── Human-readable output ────────────────────────────────────────────
    spinner.succeed(chalk.green(`Found ${results.length} result(s) for "${query}"`));

    if (page.length === 0) {
      console.log(chalk.yellow("\nNo matches found. Try a broader query.\n"));
      return;
    }

    console.log(chalk.bold(`\n🔍 Results for "${query}":\n`));

    for (const item of page) {
      const emoji = TYPE_EMOJI[item.type] ?? "📄";
      const display = item.title ?? item.name;
      const desc = item.description
        ? chalk.gray(` — ${item.description}`)
        : chalk.gray(" — (no description)");
      const tags = item.tags?.length
        ? chalk.gray(` [${item.tags.join(", ")}]`)
        : "";
      const cat = item.category ? chalk.magenta(` ${item.category}`) : "";

      console.log(`  ${emoji} ${chalk.cyan(display)}${desc}${tags}${cat}`);
      console.log(`     ${chalk.gray(item.type)}`);
    }

    if (results.length > limit) {
      console.log(
        chalk.gray(
          `\n  …and ${results.length - limit} more. Use --limit to see more.\n`
        )
      );
    } else {
      console.log();
    }
  });
