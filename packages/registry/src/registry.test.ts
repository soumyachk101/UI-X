import { describe, it, expect } from "vitest";

import {
  buildInstallPlan,
  collectDependencies,
  loadRegistryIndex,
  resolveDependencies,
  resolveItem,
  type RegistryItem,
  RegistryIndexSchema,
} from "@ui-x/registry";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Minimal index data that covers `button` (depends on `utils`) and `utils`. */
function sampleIndex() {
  const raw = {
    version: "0.1.0",
    items: {
      utils: {
        name: "utils",
        type: "registry:lib",
        description: "Shared utility functions.",
        version: "0.1.0",
        dependencies: ["clsx", "tailwind-merge"],
        registryDependencies: [],
        files: [{ path: "lib/utils.ts", type: "registry:lib" }],
        tags: ["utility"],
        license: "MIT",
        meta: { rsc: true, tsx: true, tailwind: true, cssVars: false },
      },
      button: {
        name: "button",
        type: "registry:ui",
        title: "Button",
        description: "Accessible button component.",
        version: "0.1.0",
        dependencies: ["class-variance-authority"],
        registryDependencies: ["utils"],
        files: [{ path: "components/ui/button.tsx", type: "registry:ui" }],
        tags: ["form", "interactive"],
        license: "MIT",
        meta: { rsc: true, tsx: true, tailwind: true, cssVars: true },
      },
      input: {
        name: "input",
        type: "registry:ui",
        title: "Input",
        description: "Text input.",
        version: "0.1.0",
        dependencies: [],
        registryDependencies: [],
        files: [{ path: "components/ui/input.tsx", type: "registry:ui" }],
        tags: ["form"],
        license: "MIT",
        meta: { rsc: true, tsx: true, tailwind: true, cssVars: true },
      },
      badge: {
        name: "badge",
        type: "registry:ui",
        title: "Badge",
        description: "Status badge.",
        version: "0.1.0",
        dependencies: ["class-variance-authority"],
        registryDependencies: [],
        files: [{ path: "components/ui/badge.tsx", type: "registry:ui" }],
        tags: ["display"],
        license: "MIT",
        meta: { rsc: true, tsx: true, tailwind: true, cssVars: true },
      },
    },
  };

  return loadRegistryIndex(raw);
}

// ---------------------------------------------------------------------------
// 1. Loading and validating the registry index
// ---------------------------------------------------------------------------

describe("loadRegistryIndex", () => {
  it("parses a valid index", () => {
    const index = sampleIndex();
    expect(index.version).toBe("0.1.0");
    expect(Object.keys(index.items)).toHaveLength(4);
  });

  it("rejects an index with a missing `version` field", () => {
    expect(() =>
      RegistryIndexSchema.parse({
        items: { button: { name: "button", type: "registry:ui", files: [] } },
      })
    ).toThrow();
  });

  it("rejects an index with an invalid item type", () => {
    expect(() =>
      RegistryIndexSchema.parse({
        version: "1.0.0",
        items: {
          x: { name: "x", type: "registry:unknown", files: [{ path: "x.ts", type: "registry:unknown" }] },
        },
      })
    ).toThrow();
  });
});

// ---------------------------------------------------------------------------
// 2. resolveItem
// ---------------------------------------------------------------------------

describe("resolveItem", () => {
  it("returns the matching item by name", () => {
    const index = sampleIndex();
    const item = resolveItem("button", index);
    expect(item.name).toBe("button");
    expect(item.title).toBe("Button");
  });

  it("throws when the item name does not exist", () => {
    const index = sampleIndex();
    expect(() => resolveItem("nonexistent", index)).toThrow(
      /nonexistent/
    );
  });
});

// ---------------------------------------------------------------------------
// 3. resolveDependencies — transitive resolution (button → utils)
// ---------------------------------------------------------------------------

describe("resolveDependencies", () => {
  it("resolves direct and transitive registry dependencies", () => {
    const index = sampleIndex();
    const items = resolveDependencies(["button"], index);
    const names = items.map((i: RegistryItem) => i.name);
    expect(names).toContain("button");
    expect(names).toContain("utils");
  });

  it("does not duplicate items when a dependency is already listed", () => {
    const index = sampleIndex();
    const items = resolveDependencies(["button", "utils"], index);
    const names = items.map((i: RegistryItem) => i.name);
    expect(names.filter((n: string) => n === "utils")).toHaveLength(1);
  });

  it("returns just the requested items when there are no registryDependencies", () => {
    const index = sampleIndex();
    const items = resolveDependencies(["input"], index);
    expect(items.map((i: RegistryItem) => i.name)).toEqual(["input"]);
  });

  it("resolves a deep dependency chain", () => {
    // card → badge → class-variance-authority (as npm dep, not registry)
    const deepIndex = loadRegistryIndex({
      version: "0.1.0",
      items: {
        a: {
          name: "a",
          type: "registry:ui",
          version: "0.0.0",
          registryDependencies: ["b"],
          files: [{ path: "a.ts", type: "registry:ui" }],
          tags: [],
          license: "MIT",
          meta: { rsc: true, tsx: true, tailwind: true, cssVars: true },
        },
        b: {
          name: "b",
          type: "registry:ui",
          version: "0.0.0",
          registryDependencies: ["c"],
          files: [{ path: "b.ts", type: "registry:ui" }],
          tags: [],
          license: "MIT",
          meta: { rsc: true, tsx: true, tailwind: true, cssVars: true },
        },
        c: {
          name: "c",
          type: "registry:lib",
          version: "0.0.0",
          registryDependencies: [],
          files: [{ path: "lib/c.ts", type: "registry:lib" }],
          tags: [],
          license: "MIT",
          meta: { rsc: true, tsx: true, tailwind: true, cssVars: true },
        },
      },
    });
    const resolved = resolveDependencies(["a"], deepIndex);
    expect(resolved.map((i: RegistryItem) => i.name)).toEqual(["a", "b", "c"]);
  });
});

// ---------------------------------------------------------------------------
// 4. collectDependencies — npm dependency deduplication
// ---------------------------------------------------------------------------

describe("collectDependencies", () => {
  it("collects npm dependencies across resolved items (deduplicated + sorted)", () => {
    const index = sampleIndex();
    const items = resolveDependencies(["button", "badge"], index);
    const deps = collectDependencies(items);
    // button → class-variance-authority, utils → clsx + tailwind-merge, badge → class-variance-authority
    expect(deps).toEqual([
      "class-variance-authority",
      "clsx",
      "tailwind-merge",
    ]);
  });

  it("returns an empty array when items have no npm dependencies", () => {
    const noDepIndex = loadRegistryIndex({
      version: "0.1.0",
      items: {
        plain: {
          name: "plain",
          type: "registry:ui",
          version: "0.0.0",
          dependencies: [],
          registryDependencies: [],
          files: [{ path: "plain.ts", type: "registry:ui" }],
          tags: [],
          license: "MIT",
          meta: { rsc: true, tsx: true, tailwind: true, cssVars: true },
        },
      },
    });
    const items = resolveDependencies(["plain"], noDepIndex);
    expect(collectDependencies(items)).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// 5. buildInstallPlan — merge resolved items + npm deps + files
// ---------------------------------------------------------------------------

describe("buildInstallPlan", () => {
  it("produces a plan with resolved items, npm deps, and file paths", () => {
    const index = sampleIndex();
    const sourceFiles = new Map<string, string>();
    sourceFiles.set("utils:lib/utils.ts", "export function cn() {}");
    sourceFiles.set("button:components/ui/button.tsx", "export const Button = () => null;");

    const plan = buildInstallPlan(["button"], index, sourceFiles);

    const planItemNames = plan.items.map((i) => i.name);
    expect(planItemNames).toContain("button");
    expect(planItemNames).toContain("utils");

    expect(plan.allDependencies).toContain("class-variance-authority");
    expect(plan.allDependencies).toContain("clsx");
    expect(plan.allDependencies).toContain("tailwind-merge");

    const writtenPaths = plan.filesToWrite.map((f) => f.path);
    expect(writtenPaths).toContain("lib/utils.ts");
    expect(writtenPaths).toContain("components/ui/button.tsx");

    // Verify content was pulled from sourceFiles map.
    const btnFile = plan.filesToWrite.find((f) => f.path === "components/ui/button.tsx");
    expect(btnFile?.content).toBe("export const Button = () => null;");
  });

  it("falls back to an empty string when a source file is not provided", () => {
    const index = sampleIndex();
    const plan = buildInstallPlan(["button"], index, new Map());
    const btnFile = plan.filesToWrite.find((f) => f.path === "components/ui/button.tsx");
    expect(btnFile?.content).toBe("");
  });
});
