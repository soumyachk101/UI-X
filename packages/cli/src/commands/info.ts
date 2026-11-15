import { Command } from "commander";
import chalk from "chalk";

export const infoCommand = new Command("info");

infoCommand
  .description("Show detailed metadata for a component")
  .argument("<name>", "Component name")
  .option("--json", "Output as JSON")
  .action((name, opts) => {
    const info: Record<string, unknown> = {
      name,
      type: "registry:ui",
      description: "Accessible button component",
      version: "0.1.0",
      dependencies: ["class-variance-authority", "@radix-ui/react-slot"],
      registryDependencies: ["utils"],
      files: [{ path: "components/ui/button.tsx", type: "registry:ui" }],
      tags: ["form", "interactive"],
      rsc: true,
      tsx: true,
      tailwind: true,
      cssVars: true,
    };

    if (infoCommand.opts().json) {
      console.log(JSON.stringify(info, null, 2));
      return;
    }

    console.log(chalk.bold(`\n📋 ${name}\n`));
    console.log(`  Type:         ${chalk.gray(info.type as string)}`);
    console.log(`  Description:  ${(info.description as string) ?? "—"}`);
    console.log(`  Version:      ${info.version}`);
    console.log(`  Dependencies: ${(info.dependencies as string[]).join(", ")}`);
    console.log(`  Registry deps: ${(info.registryDependencies as string[]).join(", ")}`);
    console.log(`  Files:`);
    for (const f of info.files as Array<{ path: string }>) {
      console.log(`    - ${f.path}`);
    }
    console.log();
  });
