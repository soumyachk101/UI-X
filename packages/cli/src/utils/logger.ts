import chalk from "chalk";

export type LogLevel = "info" | "success" | "warn" | "error";

interface LogEntry {
  level: LogLevel;
  message: string;
}

const prefixMap: Record<LogLevel, (msg: string) => string> = {
  info: (msg) => chalk.cyan(`[info] ${msg}`),
  success: (msg) => chalk.green(`[success] ${msg}`),
  warn: (msg) => chalk.yellow(`[warn] ${msg}`),
  error: (msg) => chalk.red(`[error] ${msg}`),
};

function print(entry: LogEntry): void {
  const prefix = prefixMap[entry.level](entry.message);
  console.log(prefix);
}

export const logger = {
  info(message: string): void {
    print({ level: "info", message });
  },
  success(message: string): void {
    print({ level: "success", message });
  },
  warn(message: string): void {
    print({ level: "warn", message });
  },
  error(message: string): void {
    print({ level: "error", message });
  },
};
