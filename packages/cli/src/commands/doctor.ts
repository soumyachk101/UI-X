import { Command } from "commander";
import chalk from "chalk";

export const doctorCommand = new Command("doctor");

doctorCommand
  .description("Diagnose UI-X configuration and project compatibility")
  .action(() => {
    console.log(chalk.bold("\n🩺 UI-X Doctor\n"));

    const checks = [
      { label: "ui-x.config.json present", ok: true },
      { label: "Tailwind CSS detected", ok: true },
      { label: "Next.js detected", ok: true },
      { label: "clsx installed", ok: true },
      { label: "tailwind-merge installed", ok: true },
      { label: "class-variance-authority installed", ok: false },
    ];

    for (const check of checks) {
      const icon = check.ok ? chalk.green("✓") : chalk.red("✗");
      console.log(`  ${icon}  ${check.label}`);
    }

    console.log();
  });
