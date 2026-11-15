import { Command } from "commander";
import chalk from "chalk";

export const diffCommand = new Command("diff");

diffCommand
  .description("Preview update differences for a component")
  .argument("<name>", "Component name")
  .option("--from <version>", "Current version", "0.0.0")
  .option("--to <version>", "Target version")
  .action((name, opts) => {
    console.log(chalk.bold(`\n📊 Diff for ${name}: ${opts.from} → ${opts.to || "latest"}\n`));
    console.log(chalk.gray("  (Diff view will be available once registry versioning is active)"));
    console.log();
  });
