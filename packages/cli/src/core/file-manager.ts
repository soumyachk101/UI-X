import fs from "fs/promises";
import path from "path";
import { logger } from "../utils/logger.js";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const BACKUP_SUFFIX = ".bak";

/**
 * Write `content` to `targetPath` atomically (write-to-temp + rename).
 *
 * Skips the write if the file already exists and its content matches.
 * Renames any pre-existing file to `<targetPath>.bak` before overwriting.
 */
export async function writeFile(targetPath: string, content: string): Promise<void> {
  const dir = path.dirname(targetPath);
  await fs.mkdir(dir, { recursive: true });

  // Short-circuit when file is unchanged
  let existing = "";
  try {
    existing = await fs.readFile(targetPath, "utf-8");
  } catch {
    // file does not exist — proceed to write
  }
  if (existing === content) {
    logger.info(`Unchanged: ${targetPath}`);
    return;
  }

  // Backup existing file if present
  if (existing !== "") {
    await backupFile(targetPath);
  }

  // Atomic write: write to a temp file in the same directory then rename.
  // Same-directory rename is atomic on POSIX; falls back gracefully on Windows.
  const tmpPath = `${targetPath}.tmp.${process.pid}`;
  await fs.writeFile(tmpPath, content, "utf-8");

  try {
    await fs.rename(tmpPath, targetPath);
    logger.success(`Wrote: ${targetPath}`);
  } catch (err) {
    // On Windows rename fails if destination exists; copy + unlink instead.
    try {
      await fs.copyFile(tmpPath, targetPath);
      await fs.unlink(tmpPath);
      logger.success(`Wrote (copy): ${targetPath}`);
    } catch (fallbackErr) {
      // Best-effort cleanup
      try { await fs.unlink(tmpPath); } catch {}
      throw fallbackErr;
    }
  }
}

/**
 * Return true if `filePath` exists and is a file.
 */
export async function fileExists(filePath: string): Promise<boolean> {
  try {
    const stat = await fs.stat(filePath);
    return stat.isFile();
  } catch {
    return false;
  }
}

/**
 * Rename `filePath` to `<filePath>.bak`.
 * Silently succeeds if the file does not exist.
 */
export async function backupFile(filePath: string): Promise<void> {
  const backupPath = `${filePath}${BACKUP_SUFFIX}`;
  try {
    await fs.rename(filePath, backupPath);
    logger.warn(`Backed up: ${filePath} → ${backupPath}`);
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") {
      return; // nothing to back up
    }
    throw err;
  }
}
