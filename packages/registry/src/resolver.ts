/**
 * UI-X Registry Resolver
 *
 * Reads registry definitions, resolves component dependencies,
 * and produces installation plans.
 */

import { RegistryIndexSchema, type RegistryItem } from "@ui-x/registry-schema";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ResolvedItem {
  item: RegistryItem;
  sourceFiles: Map<string, string>; // path → content
  dependencies: string[];
}

export interface InstallPlan {
  items: ResolvedItem[];
  allDependencies: string[];
  filesToWrite: Array<{ path: string; content: string }>;
}

// ---------------------------------------------------------------------------
// Registry Loader
// ---------------------------------------------------------------------------

/**
 * Load and validate a registry index from JSON.
 */
export function loadRegistryIndex(raw: unknown) {
  const parsed = RegistryIndexSchema.parse(raw);
  return parsed;
}

/**
 * Resolve a single component by name.
 */
export function resolveItem(name: string, index: ReturnType<typeof loadRegistryIndex>): RegistryItem {
  const item = index.items[name];
  if (!item) {
    throw new Error(`Registry item "${name}" not found. Run \`ui-x list\` to see available items.`);
  }
  return item;
}

/**
 * Recursively resolve registry dependencies (transitive).
 */
export function resolveDependencies(
  names: string[],
  index: ReturnType<typeof loadRegistryIndex>
): RegistryItem[] {
  const resolved: RegistryItem[] = [];
  const seen = new Set<string>();
  const queue = [...names];

  while (queue.length > 0) {
    const name = queue.shift()!;
    if (seen.has(name)) continue;
    seen.add(name);
    const item = resolveItem(name, index);
    resolved.push(item);
    for (const dep of item.registryDependencies) {
      if (!seen.has(dep)) queue.push(dep);
    }
  }

  return resolved;
}

/**
 * Collect all unique npm dependencies from a resolved set of items.
 */
export function collectDependencies(items: RegistryItem[]): string[] {
  const set = new Set<string>();
  for (const item of items) {
    for (const dep of item.dependencies) set.add(dep);
  }
  return [...set].sort();
}

/**
 * Merge resolved items into a flat install plan.
 */
export function buildInstallPlan(
  names: string[],
  index: ReturnType<typeof loadRegistryIndex>,
  sourceFiles: Map<string, string>
): InstallPlan {
  const items = resolveDependencies(names, index);
  const allDeps = collectDependencies(items);

  const filesToWrite: Array<{ path: string; content: string }> = [];
  for (const item of items) {
    for (const file of item.files) {
      const key = `${item.name}:${file.path}`;
      const content = file.content ?? sourceFiles.get(key) ?? "";
      filesToWrite.push({ path: file.path, content });
    }
  }

  return {
    items,
    allDependencies: allDeps,
    filesToWrite,
  };
}
