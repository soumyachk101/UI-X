import { Command } from "commander";
import chalk from "chalk";

export const updateCommand = new Command("update");

updateCommand
  .description("Update a component to the latest version")
  .argument("<name>", "Component name")
  .option("--dry-run", "Preview changes without writing")
  .option("--all", "Update all components")
  .action(async (name, opts) => {
    if (opts.dryRun) {
      console.log(chalk.yellow(`Dry run: would update ${name} to latest registry version.`));
      return;
    }
    console.log(chalk.gray(`Update for "${name}" will be available once registry versioning is active.`));
  });
