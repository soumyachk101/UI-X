/**
 * registry verification script
 *
 * Usage: node scripts/verify.js
 *
 * Checks that every component and block listed in registry/index.json has a
 * corresponding directory under registry/default/components/<name>/ (or
 * registry/default/blocks/<name>/ for blocks) containing the expected files.
 *
 * Exit code:
 *   0  — all entries pass
 *   1  — one or more errors detected
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const REGISTRY_PATH = path.join(ROOT, "registry/index.json");

const COMPONENTS_DIR = path.join(ROOT, "registry/default/components");
const BLOCKS_DIR = path.join(ROOT, "registry/default/blocks");

let errorCount = 0;
let checked = 0;

function checkItem(name, type) {
  checked++;

  let dir;
  if (type === "registry:ui") {
    dir = path.join(COMPONENTS_DIR, name);
  } else if (type === "registry:block") {
    dir = path.join(BLOCKS_DIR, name);
  } else {
    // lib entries have no directory to verify
    return;
  }

  if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) {
    console.error(`[ERROR] Missing directory: ${dir}`);
    errorCount++;
    return;
  }

  // Component: require <name>.tsx, <name>.test.tsx, <name>-demo.tsx, index.json
  // Block: require <name>.tsx, <name>-demo.tsx, index.json
  const slug = name.replace(/[^a-zA-Z0-9-]/g, "-");
  const required = type === "registry:ui"
    ? [`${slug}.tsx`, `${slug}.test.tsx`, `${slug}-demo.tsx`, "index.json"]
    : [`${slug}.tsx`, `${slug}-demo.tsx`, "index.json"];

  for (const file of required) {
    const filePath = path.join(dir, file);
    if (!fs.existsSync(filePath)) {
      console.error(`[ERROR] ${name} (${type}): missing file ${file}`);
      errorCount++;
    }
  }
}

function main() {
  if (!fs.existsSync(REGISTRY_PATH)) {
    console.error(`[FATAL] registry/index.json not found at ${REGISTRY_PATH}`);
    process.exit(1);
  }

  const registry = JSON.parse(fs.readFileSync(REGISTRY_PATH, "utf8"));
  const items = registry.items || {};

  // Deduplicate — last write wins
  const seen = new Map();
  for (const [key, entry] of Object.entries(items)) {
    seen.set(entry.name, { type: entry.type, key });
  }

  for (const [name, info] of seen) {
    checkItem(name, info.type);
  }

  console.log(`Checked ${checked} entries.`);

  if (errorCount > 0) {
    console.error(`Verification FAILED: ${errorCount} error(s) found.`);
    process.exit(1);
  }

  console.log("Verification PASSED.");
}

main();
