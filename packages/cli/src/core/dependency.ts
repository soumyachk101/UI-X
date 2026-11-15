import type { RegistryIndex } from "@ui-x/registry-schema";
import {
  resolveDependencies as resolveRegistryDeps,
  collectDependencies,
  type InstallPlan,
} from "@ui-x/registry";
import { logger } from "../utils/logger.js";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface DependencyResult {
  plan: InstallPlan;
  npmPackages: string[];
  registryItems: string[];
}

// ---------------------------------------------------------------------------
// Resolver
// ---------------------------------------------------------------------------

/**
 * Resolve the full transitive dependency graph for the requested items
 * against the given registry index.
 *
 * @param names — primary item names to resolve (e.g. ["button", "card"])
 * @param index — parsed registry index
 * @returns      — resolved install plan plus a deduplicated list of npm packages
 */
export function resolveDependencies(names: string[], index: RegistryIndex): DependencyResult {
  if (names.length === 0) {
    return {
      plan: { items: [], allDependencies: [], filesToWrite: [] },
      npmPackages: [],
      registryItems: [],
    };
  }

  logger.info(`Resolving dependencies for: ${names.join(", ")}`);

  // Resolve transitive registry items (BFS, deduped) via the registry package.
  const resolvedItems = resolveRegistryDeps(names, index);

  const registryItems = resolvedItems.map((item) => item.name);
  const npmPackages = collectDependencies(resolvedItems);

  // Flatten source files from resolved items into the install plan.
  const filesToWrite: Array<{ path: string; content: string }> = [];
  for (const item of resolvedItems) {
    for (const file of item.files) {
      filesToWrite.push({ path: file.path, content: file.content ?? "" });
    }
  }

  const plan: InstallPlan = {
    items: resolvedItems,
    allDependencies: npmPackages,
    filesToWrite,
  };

  logger.success(
    `Resolved ${registryItems.length} registry item(s), ${npmPackages.length} npm package(s)`
  );

  return {
    plan,
    npmPackages,
    registryItems,
  };
}

/**
 * Convenience wrapper that returns only the flat npm package list.
 */
export function getNpmPackages(names: string[], index: RegistryIndex): string[] {
  return resolveDependencies(names, index).npmPackages;
}
