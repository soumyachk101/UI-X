import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { logger } from "../utils/logger.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const CACHE_DIR_NAME = ".ui-x/cache";
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

/**
 * Resolve the `.ui-x/cache` directory relative to the project root.
 */
async function resolveCacheDir(projectRoot: string): Promise<string> {
  const dir = path.join(projectRoot, CACHE_DIR_NAME);
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch {
    // directory may already exist — ignore EEXIST
  }
  return dir;
}

interface CacheEntry {
  url: string;
  fetchedAt: string; // ISO-8601
  body: unknown;
}

function cachePathFor(cacheDir: string, url: string): string {
  // safe-ish slug: strip protocol, replace special chars
  const slug = url.replace(/^https?:\/\//, "").replace(/[^a-zA-Z0-9._-]/g, "_");
  return path.join(cacheDir, `${slug}.json`);
}

function isCacheStale(fetchedAt: string): boolean {
  const age = Date.now() - new Date(fetchedAt).getTime();
  return age > CACHE_TTL_MS;
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Fetch a registry index from `registryUrl`.
 *
 * @param registryUrl — full URL to the registry index (e.g. https://registry.ui-x.dev/r/index.json)
 * @param projectRoot — project root used for the cache directory
 * @returns parsed JSON body
 */
export async function fetchRegistry(registryUrl: string, projectRoot: string): Promise<unknown> {
  const cacheDir = await resolveCacheDir(projectRoot);
  const cp = cachePathFor(cacheDir, registryUrl);

  // Attempt cache hit
  try {
    const raw = await fs.readFile(cp, "utf-8");
    const entry: CacheEntry = JSON.parse(raw);
    if (!isCacheStale(entry.fetchedAt)) {
      logger.info(`Registry cache hit: ${registryUrl}`);
      return entry.body;
    }
    logger.warn(`Cache expired for ${registryUrl}; re-fetching`);
  } catch {
    // cold — proceed to network
  }

  // Network fetch
  logger.info(`Fetching registry: ${registryUrl}`);
  const res = await fetch(registryUrl, {
    headers: { Accept: "application/json" },
  });

  if (!res.ok) {
    throw new Error(
      `Registry fetch failed: ${registryUrl} (HTTP ${res.status} ${res.statusText})`
    );
  }

  const body = await res.json();

  // Persist cache
  const entry: CacheEntry = {
    url: registryUrl,
    fetchedAt: new Date().toISOString(),
    body,
  };
  try {
    await fs.writeFile(cp, JSON.stringify(entry, null, 2), "utf-8");
    logger.success(`Registry cached at ${cp}`);
  } catch (err) {
    logger.warn(`Failed to write cache: ${(err as Error).message}`);
  }

  return body;
}

/**
 * Return the cached registry body without hitting the network.
 * Returns `null` when no valid cache exists.
 */
export async function getCachedRegistry(registryUrl: string, projectRoot: string): Promise<unknown | null> {
  const cacheDir = await resolveCacheDir(projectRoot);
  const cp = cachePathFor(cacheDir, registryUrl);

  try {
    const raw = await fs.readFile(cp, "utf-8");
    const entry: CacheEntry = JSON.parse(raw);
    if (!isCacheStale(entry.fetchedAt)) {
      logger.info(`Registry cache hit (no network): ${registryUrl}`);
      return entry.body;
    }
  } catch {
    // no cache
  }

  return null;
}
