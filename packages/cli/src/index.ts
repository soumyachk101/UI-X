#!/usr/bin/env node
import { Command } from "commander";
import { initCommand } from "./commands/init.js";
import { addCommand } from "./commands/add.js";
import { listCommand } from "./commands/list.js";
import { searchCommand } from "./commands/search.js";
import { infoCommand } from "./commands/info.js";
import { diffCommand } from "./commands/diff.js";
import { updateCommand } from "./commands/update.js";
import { doctorCommand } from "./commands/doctor.js";

import { loadConfig } from "./core/config.js";
import { fetchRegistry, getCachedRegistry } from "./core/downloader.js";
import { resolveDependencies, type DependencyResult } from "./core/dependency.js";
import { writeFile, fileExists, backupFile } from "./core/file-manager.js";

import { logger } from "./utils/logger.js";

// ---------------------------------------------------------------------------
// Expose core utilities on the program so commands / plugins can reach them
// ---------------------------------------------------------------------------

export const cli = {
  config: { loadConfig, getDefaultConfig: () => import("./core/config.js").then((m) => m.getDefaultConfig()) },
  downloader: { fetchRegistry, getCachedRegistry },
  dependency: { resolveDependencies },
  fileManager: { writeFile, fileExists, backupFile },
  logger,
};

const program = new Command();

program
  .name("ui-x")
  .description("UI-X CLI — install and manage UI components")
  .version("0.1.0");

program.addCommand(initCommand);
program.addCommand(addCommand);
program.addCommand(listCommand);
program.addCommand(searchCommand);
program.addCommand(infoCommand);
program.addCommand(diffCommand);
program.addCommand(updateCommand);
program.addCommand(doctorCommand);

program.parseAsync(process.argv).catch((err) => {
  logger.error(err.message);
  process.exit(1);
});
