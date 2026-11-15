/**
 * UI-X Registry — type declarations.
 *
 * Reads registry definitions, resolves component dependencies,
 * and produces installation plans.
 */

import type { RegistryItem } from "@ui-x/registry-schema";

// ---------------------------------------------------------------------------
// Resolved item — a registry entry with its source files loaded
// ---------------------------------------------------------------------------

export interface ResolvedItem {
  item: RegistryItem;
  sourceFiles: Map<string, string>; // path → content
  dependencies: string[];
}

// ---------------------------------------------------------------------------
// Install plan — the output of dependency resolution
// ---------------------------------------------------------------------------

export interface InstallPlan {
  items: ResolvedItem[];
  allDependencies: string[];
  filesToWrite: Array<{ path: string; content: string }>;
}

// ---------------------------------------------------------------------------
// Registry functions
// ---------------------------------------------------------------------------

export declare function loadRegistryIndex(raw: unknown): {
  version: string;
  lastUpdated?: Date;
  items: Record<string, RegistryItem>;
};

export declare function resolveItem(
  name: string,
  index: {
    version: string;
    lastUpdated?: Date;
    items: Record<string, RegistryItem>;
  }
): RegistryItem;

export declare function resolveDependencies(
  names: string[],
  index: {
    version: string;
    lastUpdated?: Date;
    items: Record<string, RegistryItem>;
  }
): RegistryItem[];

export declare function collectDependencies(items: RegistryItem[]): string[];

export declare function buildInstallPlan(
  names: string[],
  index: {
    version: string;
    lastUpdated?: Date;
    items: Record<string, RegistryItem>;
  },
  sourceFiles: Map<string, string>
): InstallPlan;
