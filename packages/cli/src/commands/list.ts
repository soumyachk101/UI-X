import { Command } from "commander";
import chalk from "chalk";

export const listCommand = new Command("list");

listCommand
  .description("List all available components and blocks")
  .option("-t, --type <type>", "Filter by type (registry:ui | registry:block)")
  .option("--json", "Output as JSON")
  .action(() => {
    const items: Record<string, string[]> = {
      components: ["button", "input", "textarea", "label", "checkbox", "radio-group", "switch", "select", "slider", "badge", "avatar", "skeleton", "dialog", "alert-dialog", "sheet", "drawer", "popover", "tooltip", "dropdown-menu", "tabs", "accordion", "navigation-menu", "breadcrumb", "pagination", "table", "progress", "toast", "sonner", "command", "alert", "collapsible"],
      blocks: ["hero", "features", "testimonials", "pricing-cards", "login", "signup", "forgot-password", "sidebar", "analytics", "product-card", "checkout", "settings", "billing", "api-keys"],
    };

    if (listCommand.opts().json) {
      console.log(JSON.stringify(items, null, 2));
      return;
    }

    console.log(chalk.bold("\n📦 Components (P0 + P1):\n"));
    for (const c of items.components) {
      console.log(`  ${chalk.cyan(c)}`);
    }

    console.log(chalk.bold("\n🧱 Blocks:\n"));
    for (const b of items.blocks) {
      console.log(`  ${chalk.green(b)}`);
    }
    console.log();
  });
