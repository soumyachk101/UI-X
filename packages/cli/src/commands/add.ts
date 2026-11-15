import { Command } from "commander";
import chalk from "chalk";
import ora from "ora";

export const addCommand = new Command("add");

addCommand
  .description("Add a component or block to your project")
  .argument("<name>", "Component or block name")
  .option("-y, --yes", "Skip confirmation prompt")
  .option("-o, --overwrite", "Overwrite existing files without prompting")
  .option("--path <path>", "Custom output path")
  .action(async (name, opts) => {
    const spinner = ora(`Resolving "${name}" from registry...`).start();

    // Placeholder: in a real implementation, this reads the registry,
    // resolves the component, downloads source files, and writes them.
    spinner.info(chalk.yellow(`Registry lookup for "${name}" is not yet implemented.`));

    console.log(chalk.gray("\nThis command will:"));
    console.log(`  1. Fetch component "${name}" from the registry`);
    console.log(`  2. Resolve transitive dependencies`);
    console.log(`  3. Install required npm packages`);
    console.log(`  4. Write source files to your project\n`);
  });
