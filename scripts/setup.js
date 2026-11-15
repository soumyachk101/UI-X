/**
 * setup.js
 *
 * Usage: node scripts/setup.js
 *
 * Interactive setup helper for UI-X projects.
 *
 * Steps:
 *   1. Prints a welcome banner.
 *   2. Runs `pnpm install` (skipped if node_modules already exists).
 *   3. Creates ui-x.config.json if it is missing.
 *   4. Prints next steps for the developer.
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const NODE_MODULES = path.join(ROOT, "node_modules");
const CONFIG_FILE = path.join(ROOT, "ui-x.config.json");

const BANNER = `
╭──────────────────────────────────╮
│                                 │
│   Welcome to UI-X               │
│   v0.1.0 Setup                  │
│                                 │
╰──────────────────────────────────╯
`;

function runPnpmInstall() {
  if (fs.existsSync(NODE_MODULES)) {
    console.log("node_modules already exists — skipping pnpm install.");
    return;
  }

  console.log("Running pnpm install ...");
  try {
    execSync("pnpm install", { cwd: ROOT, stdio: "inherit" });
    console.log("pnpm install complete.\n");
  } catch (err) {
    console.error("pnpm install failed. Please run it manually.");
    process.exit(1);
  }
}

function createConfigIfMissing() {
  if (fs.existsSync(CONFIG_FILE)) {
    console.log("ui-x.config.json already exists — skipping.");
    return;
  }

  const defaultConfig = {
    "$schema": "https://ui-x.dev/schema/ui-x.config.json",
    componentsDir: "registry/default/components",
    blocksDir: "registry/default/blocks",
    themesDir: "registry/default/themes",
    defaultTheme: "default",
    tailwind: {
      config: "tailwind.config.ts",
      css: "app/globals.css",
      baseColor: "slate"
    },
    aliases: {
      components: "@/components",
      utils: "@/lib/utils"
    },
    tsx: true,
    rsc: true,
    cssVars: true
  };

  fs.writeFileSync(CONFIG_FILE, JSON.stringify(defaultConfig, null, "\t") + "\n");
  console.log(`Created ${CONFIG_FILE} with default settings.\n`);
}

function printNextSteps() {
  console.log(`
Next steps:
  1. Run the dev server:
       pnpm dev

  2. Add a component to your project:
       pnpm add button

  3. Browse all available components:
       pnpm ui-x list

  4. Search for a specific component:
       pnpm ui-x search dialog

  5. Verify project health:
       pnpm ui-x doctor

For more information, see the documentation at apps/docs.
`);
}

function main() {
  console.log(BANNER);
  runPnpmInstall();
  createConfigIfMissing();
  printNextSteps();
}

main();
