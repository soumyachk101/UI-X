import { Command } from "commander";
import chalk from "chalk";
import ora from "ora";
import prompts from "prompts";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { UiXConfigSchema, getDefaultConfig, type UiXConfig } from "../core/config.js";
import { logger } from "../utils/logger.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONFIG_FILENAME = "ui-x.config.json";

export const initCommand = new Command("init");

initCommand
  .description("Initialize UI-X in the current project")
  .option("-y, --yes", "Accept all defaults without prompting")
  .action(async (opts) => {
    const spinner = ora("Initializing UI-X…").start();
    const cwd = process.cwd();
    const configPath = path.join(cwd, CONFIG_FILENAME);

    // ── 1. Guard: check for existing config ─────────────────────────────
    let exists = false;
    try {
      await fs.access(configPath);
      exists = true;
    } catch {
      // file does not exist — continue
    }

    if (exists) {
      spinner.stop();
      if (!opts.yes) {
        const { overwrite } = await prompts({
          type: "confirm",
          name: "overwrite",
          message: `${CONFIG_FILENAME} already exists. Overwrite?`,
          initial: false,
        });
        if (!overwrite) {
          console.log(chalk.gray("Initialization aborted."));
          return;
        }
      }
      if (opts.yes) {
        logger.warn(`${CONFIG_FILENAME} already exists; overwriting because of --yes`);
      }
      spinner.start("Re-initializing UI-X…");
    }

    let config: UiXConfig;

    // ── 2. Gather values ────────────────────────────────────────────────
    if (opts.yes) {
      config = getDefaultConfig();
      spinner.info(chalk.yellow(`Using defaults (--yes)`));
    } else {
      spinner.stop();

      const styleQuestion = {
        type: "select" as const,
        name: "style",
        message: "Component style preset:",
        choices: [
          { title: "Default", value: "default" },
          { title: "New York", value: "new-york" },
        ],
        initial: 0,
      };

      const rscQuestion = {
        type: "confirm" as const,
        name: "rsc",
        message: "Enable React Server Components?",
        initial: true,
      };

      const tsxQuestion = {
        type: "confirm" as const,
        name: "tsx",
        message: "Use TSX for components?",
        initial: true,
      };

      const tailwindConfigQuestion = {
        type: "text" as const,
        name: "tailwindConfig",
        message: "Path to your Tailwind config file (leave blank for none):",
        initial: "tailwind.config.ts",
      };

      const tailwindCssQuestion = {
        type: "text" as const,
        name: "tailwindCss",
        message: "Path to your global CSS file:",
        initial: "app/globals.css",
      };

      const baseColorQuestion = {
        type: "select" as const,
        name: "baseColor",
        message: "Base color for the CSS variable theme:",
        choices: [
          { title: "Slate", value: "slate" },
          { title: "Gray", value: "gray" },
          { title: "Zinc", value: "zinc" },
          { title: "Neutral", value: "neutral" },
          { title: "Stone", value: "stone" },
        ],
        initial: 0,
      };

      const answers = await prompts([
        styleQuestion,
        rscQuestion,
        tsxQuestion,
        tailwindConfigQuestion,
        tailwindCssQuestion,
        baseColorQuestion,
      ]);

      // Build config from answers (validated by Zod before writing)
      const partial: Record<string, unknown> = {
        style: answers.style ?? "default",
        rsc: answers.rsc ?? true,
        tsx: answers.tsx ?? true,
        tailwind: {
          config: answers.tailwindConfig?.trim() ? answers.tailwindConfig.trim() : "",
          css: answers.tailwindCss?.trim() ? answers.tailwindCss.trim() : "app/globals.css",
          baseColor: answers.baseColor ?? "slate",
        },
      };

      config = UiXConfigSchema.parse(partial);
      spinner.start("Writing configuration…");
    }

    // ── 3. Write config file ────────────────────────────────────────────
    try {
      const json = JSON.stringify(config, null, 2);
      await fs.writeFile(configPath, json, "utf-8");
      spinner.succeed(chalk.green(`Created ${CONFIG_FILENAME}`));
    } catch (err) {
      spinner.fail(chalk.red(`Failed to write ${CONFIG_FILENAME}`));
      logger.error(err instanceof Error ? err.message : String(err));
      process.exitCode = 1;
      return;
    }

    // ── 4. Summary ──────────────────────────────────────────────────────
    console.log();
    console.log(chalk.bold("Configuration:"));
    console.log(`  style:          ${chalk.cyan(config.style)}`);
    console.log(`  rsc:            ${config.rsc ? chalk.green("true") : chalk.red("false")}`);
    console.log(`  tsx:            ${config.tsx ? chalk.green("true") : chalk.red("false")}`);
    console.log(
      `  tailwind.config:${chalk.gray(config.tailwind.config || " (none)")}`
    );
    console.log(
      `  tailwind.css:    ${chalk.gray(config.tailwind.css || "(none)")}`
    );
    console.log(
      `  tailwind.base:   ${chalk.gray(config.tailwind.baseColor || "slate")}`
    );
    console.log();
    console.log(chalk.bold("Registries:"));
    for (const [key, url] of Object.entries(config.registries)) {
      console.log(`  ${chalk.cyan(key)}: ${url}`);
    }
    console.log();
    console.log(chalk.gray("Next steps:"));
    console.log(
      `  1. ${chalk.cyan("pnpm add clsx tailwind-merge class-variance-authority")}`
    );
    console.log(`  2. ${chalk.cyan("ui-x add button")} to add your first component`);
    console.log();
  });
