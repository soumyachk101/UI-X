import { Command } from "commander";
import chalk from "chalk";
import ora from "ora";
import prompts from "prompts";
import path from "path";

import { loadConfig } from "../core/config.js";
import { fetchRegistry, getCachedRegistry } from "../core/downloader.js";
import {
  resolveItem,
  resolveDependencies,
  buildInstallPlan,
  collectDependencies,
  type RegistryIndex,
} from "@ui-x/registry";
import { writeFile, backupFile, fileExists } from "../core/file-manager.js";
import { logger } from "../utils/logger.js";

function resolveRegistryUrl(config: Awaited<ReturnType<loadConfig>>, fallback = "https://registry.ui-x.dev/r"): string {
  const urls = Object.values(config.registries ?? {});
  const url = urls.find((u) => typeof u === "string") ?? fallback;
  return url.replace(/\/+$/, "") + "/index.json";
}

function prettyDeps(deps: string[]): string {
  if (deps.length === 0) return chalk.gray("(none)");
  return deps.map((d) => chalk.cyan(d)).join(", ");
}

function formatRegistryDeps(deps: string[]): string {
  if (deps.length === 0) return chalk.gray("(none)");
  return deps.map((d) => chalk.magenta(`@ui-x/${d}`)).join(", ");
}

export const addCommand = new Command("add");

addCommand
  .description("Add a component or block to your project")
  .argument("<name>", "Component or block name")
  .option("-y, --yes", "Skip confirmation prompts")
  .option("-o, --overwrite", "Overwrite existing files without prompting")
  .option("--path <path>", "Custom output path (overrides aliases)")
  .option("--dry-run", "Preview the install plan without writing files")
  .option("--no-install", "Skip printing npm install instructions")
  .action(async (name, opts) => {
    const spinner = ora(`Resolving "${name}"…`).start();

    let config: Awaited<ReturnType<loadConfig>>;
    let registryUrl: string;
    let index: RegistryIndex;

    try {
      // ── 1. Load config ──────────────────────────────────────────────────
      spinner.info(chalk.cyan("[1/5]") + " Loading project config…");
      config = await loadConfig();
      registryUrl = resolveRegistryUrl(config);
      logger.success(`Config loaded (style: ${config.style}, rsc: ${config.rsc})`);

      // ── 2. Fetch registry ──────────────────────────────────────────────
      spinner.start(chalk.cyan("[2/5]") + " Fetching registry index…");
      let rawIndex: unknown;
      try {
        rawIndex = await fetchRegistry(registryUrl, process.cwd());
      } catch {
        logger.warn("Network fetch failed; trying local cache…");
        rawIndex = await getCachedRegistry(registryUrl, process.cwd());
        if (!rawIndex) {
          throw new Error(
            "Registry is unreachable and no valid cache exists. Check your network or registries URL."
          );
        }
        spinner.warn(chalk.yellow("Using stale cached registry"));
      }
      index = rawIndex as RegistryIndex;
      const itemCount = Object.keys(index.items).length;
      logger.success(`Registry loaded (${itemCount} items)`);

      // ── 3. Resolve component ────────────────────────────────────────────
      spinner.start(chalk.cyan("[3/5]") + ` Resolving "${name}"…`);
      const item = resolveItem(name, index);
      logger.success(`Found: ${chalk.bold(item.name)} ${chalk.gray(`(${item.type})`)}`);

      const resolved = resolveDependencies([name], index);
      const npmPackages = collectDependencies(resolved);

      // ── 4. Build install plan ───────────────────────────────────────────
      spinner.start(chalk.cyan("[4/5]") + " Building install plan…");
      const plan = buildInstallPlan([name], index, new Map());
      const allFiles = plan.filesToWrite;
      logger.success(`Plan: ${plan.items.length} item(s), ${npmPackages.length} npm pkg(s), ${allFiles.length} file(s)`);

      // ── 5. Display summary ──────────────────────────────────────────────
      console.log();
      console.log(chalk.bold.white("Component:"), chalk.cyan(item.name), chalk.gray(item.type));
      if (item.description) {
        console.log(chalk.bold.white("Description:"), item.description);
      }
      if (item.version) {
        console.log(chalk.bold.white("Version:"), item.version);
      }

      if (item.registryDependencies.length > 0) {
        console.log(chalk.bold.white("Registry deps:"), formatRegistryDeps(item.registryDependencies));
      }
      console.log(chalk.bold.white("NPM deps:"), prettyDeps(npmPackages));
      console.log(chalk.bold.white("Files:"));
      for (const f of allFiles) {
        const exists = await fileExists(f.path);
        const marker = exists ? chalk.yellow(" [exists]") : "";
        console.log(`    ${chalk.cyan(f.path)}${marker}`);
      }
      console.log();

      // ── 6. Confirm ──────────────────────────────────────────────────────
      const skipPrompt = opts.yes || opts.dryRun;
      if (!skipPrompt) {
        spinner.stop();
        const response = await prompts({
          type: "confirm",
          name: "proceed",
          message: `Add "${name}" to your project?`,
          initial: true,
        });

        if (!response.proceed) {
          console.log(chalk.gray("Aborted."));
          return;
        }
        spinner.start("Installing…");
      }

      // ── 7. Write files ──────────────────────────────────────────────────
      if (!opts.dryRun) {
        spinner.start(chalk.cyan("Writing files…"));

        for (const f of allFiles) {
          let targetPath = f.path;
          const overridePath = opts.path
            ? path.resolve(process.cwd(), opts.path)
            : null;

          if (overridePath) {
            targetPath = path.join(overridePath, path.basename(f.path));
          }

          // Handle overwrite
          const exists = await fileExists(targetPath);
          if (exists && !opts.overwrite && !opts.yes) {
            const { overwrite } = await prompts({
              type: "confirm",
              name: "overwrite",
              message: `${targetPath} already exists. Overwrite?`,
              initial: false,
            });
            if (!overwrite) {
              logger.warn(`Skipped: ${targetPath}`);
              continue;
            }
            await backupFile(targetPath);
          }

          await writeFile(targetPath, f.content);
        }

        spinner.succeed(chalk.green(`Added ${allFiles.length} file(s)`));
      } else {
        spinner.info(chalk.yellow("Dry run — no files written"));
      }

      // ── 8. Report npm packages ──────────────────────────────────────────
      if (npmPackages.length > 0 && !opts.noInstall) {
        console.log();
        console.log(chalk.bold("Install dependencies:"));
        console.log(chalk.cyan(`  pnpm add ${npmPackages.join(" ")}`));
        console.log(chalk.gray(`  # or: npm install ${npmPackages.join(" ")}`));
        console.log();
      }

      if (opts.dryRun) {
        console.log(chalk.gray("(dry run complete — no changes made)"));
      }
    } catch (err) {
      spinner.fail(chalk.red(`Failed to add "${name}"`));
      const message = err instanceof Error ? err.message : String(err);
      logger.error(message);
      console.log();
      console.log(chalk.gray("Possible fixes:"));
      console.log(chalk.gray(`  1. Run ${chalk.cyan("ui-x list")} to see available items`));
      console.log(chalk.gray(`  2. Check your ${chalk.cyan("ui-x.config.json")} registries setting`));
      console.log(chalk.gray(`  3. Run ${chalk.cyan("ui-x init")} to (re-)initialize the project`));
      process.exitCode = 1;
    }
  });
