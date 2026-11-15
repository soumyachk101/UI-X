import { Command } from "commander";
import chalk from "chalk";
import ora from "ora";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const initCommand = new Command("init");

initCommand
  .description("Initialize UI-X in the current project")
  .option("-y, --yes", "Accept all defaults without prompting")
  .action(async (opts) => {
    const spinner = ora("Initializing UI-X...").start();
    const cwd = process.cwd();

    // Create ui-x.config.json
    const config = {
      $schema: "https://ui-x.dev/schema/config.json",
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
    };

    const configPath = path.join(cwd, "ui-x.config.json");
    await fs.writeFile(configPath, JSON.stringify(config, null, 2));

    spinner.succeed(chalk.green("Created ui-x.config.json"));

    console.log(chalk.gray("\nNext steps:"));
    console.log(`  1. ${chalk.cyan("pnpm add clsx tailwind-merge class-variance-authority")}`);
    console.log(`  2. ${chalk.cyan("ui-x add button")} to add your first component\n`);
  });
