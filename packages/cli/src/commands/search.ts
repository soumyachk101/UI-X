import { Command } from "commander";
import chalk from "chalk";

export const searchCommand = new Command("search");

searchCommand
  .description("Search the registry")
  .argument("<query>", "Search query")
  .option("-t, --type <type>", "Filter by type")
  .option("--json", "Output as JSON")
  .action((query, opts) => {
    const results = [
      { name: "button", description: "Accessible button component", type: "registry:ui" },
      { name: "dialog", description: "Modal dialog with focus trap", type: "registry:ui" },
      { name: "hero", description: "Marketing hero section block", type: "registry:block" },
    ].filter(
      (r) =>
        r.name.includes(query.toLowerCase()) ||
        r.description.toLowerCase().includes(query.toLowerCase())
    );

    if (searchCommand.opts().json) {
      console.log(JSON.stringify(results, null, 2));
      return;
    }

    console.log(chalk.bold(`\n🔍 Results for "${query}":\n`));
    for (const r of results) {
      console.log(`  ${chalk.cyan(r.name)}  ${chalk.gray(r.type)}`);
      console.log(`    ${r.description}\n`);
    }
  });
