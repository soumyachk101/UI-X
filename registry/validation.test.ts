import { describe, it, expect } from "vitest";

import { promises as fs } from "node:fs";
import { fileURLToPath } from "node:url";
import * as nodePath from "node:path";

import {
  ComponentCategory,
  RegistryConfigSchema,
  RegistryFileSchema,
  RegistryIndexSchema,
  RegistryItemSchema,
  RegistryItemType,
} from "@ui-x/registry-schema";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const __dirname = nodePath.dirname(fileURLToPath(import.meta.url));

/** Absolute path to the components directory inside registry/default/. */
const COMPONENTS_DIR = nodePath.join(__dirname, "default", "components");

const INDEX_JSON_PATH = nodePath.join(__dirname, "index.json");

/** Return an array of { name, absolutePath } for each component index.json. */
async function listComponentEntries(): Promise<
  { name: string; absolutePath: string }[]
> {
  const entries = await fs.readdir(COMPONENTS_DIR, { withFileTypes: true });
  const result: { name: string; absolutePath: string }[] = [];
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const indexPath = nodePath.join(COMPONENTS_DIR, entry.name, "index.json");
    try {
      await fs.access(indexPath);
      result.push({ name: entry.name, absolutePath: indexPath });
    } catch {
      // skip directories without an index.json
    }
  }
  return result.sort((a, b) => a.name.localeCompare(b.name));
}

// ---------------------------------------------------------------------------
// Test suite
// ---------------------------------------------------------------------------

describe("registry/default/components/*/index.json — per-component validation", () => {
  let entries: { name: string; absolutePath: string }[];

  it("loads all component index.json files", async () => {
    entries = await listComponentEntries();
    expect(entries.length).toBeGreaterThan(0);
  });

  it("validates each component index.json against the schema and constraints", async () => {
    const allEntries = await listComponentEntries();
    expect(allEntries.length).toBeGreaterThan(0);

    const configResult = RegistryConfigSchema.safeParse({});
    expect(configResult.success).toBe(true);
    const allowed = configResult.data!.allowedPaths;

    for (const { name, absolutePath } of allEntries) {
      const text = await fs.readFile(absolutePath, "utf-8");
      const raw = JSON.parse(text);

      describe(`component: "${name}"`, () => {
        it("passes RegistryItemSchema validation", () => {
          const result = RegistryItemSchema.safeParse(raw);
          expect(result.success).toBe(true);
        });

        it("has a non-empty `name` field", () => {
          expect((raw as { name?: string }).name).toBeDefined();
          expect((raw as { name?: string }).name!.length).toBeGreaterThan(0);
        });

        it("has a valid `type` from RegistryItemType", () => {
          const type = (raw as { type?: string }).type;
          expect(RegistryItemType.safeParse(type).success).toBe(true);
        });

        it("has at least one file entry", () => {
          const files = (raw as { files?: unknown[] }).files;
          expect(files).toBeDefined();
          expect(Array.isArray(files)).toBe(true);
          expect(files!.length).toBeGreaterThanOrEqual(1);
        });

        it("each file path is relative and free of `..` traversal", () => {
          const files = (raw as { files: { path: string }[] }).files;
          for (const file of files) {
            expect(file.path).not.toContain("..");
            expect(file.path.startsWith("/")).toBe(false);
          }
        });

        it("each file path targets an allowed directory", () => {
          const files = (raw as { files: { path: string }[] }).files;
          for (const file of files) {
            const firstSegment = file.path.split("/")[0];
            expect(allowed).toContain(firstSegment);
          }
        });

        it("has a `category` that matches ComponentCategory (when set)", () => {
          const rawCategory = (raw as { category?: string }).category;
          if (rawCategory !== undefined && rawCategory !== "") {
            expect(ComponentCategory.safeParse(rawCategory).success).toBe(true);
          }
        });

        it("has a valid semver version string", () => {
          const version = (raw as { version?: string }).version;
          expect(version).toBeDefined();
          expect(typeof version).toBe("string");
          expect(version).toMatch(/^\d+\.\d+\.\d+$/);
        });

        it("passes file path traversal prevention via the schema directly", () => {
          const files = (raw as { files: { path: string }[] }).files;
          for (const file of files) {
            const result = RegistryFileSchema.shape.path.safeParse(file.path);
            expect(result.success).toBe(true);
          }
        });
      });
    }
  });

  describe("root registry/index.json", () => {
    let indexRaw: unknown;

    it("loads and validates the top-level index.json", async () => {
      const text = await fs.readFile(INDEX_JSON_PATH, "utf-8");
      indexRaw = JSON.parse(text);
      const result = RegistryIndexSchema.safeParse(indexRaw);
      expect(result.success).toBe(true);
    });

    it("all registryDependencies point to existing items in the index", () => {
      const parsed = RegistryIndexSchema.parse(indexRaw);
      const knownNames = new Set(Object.keys(parsed.items));
      for (const [name, item] of Object.entries(parsed.items)) {
        for (const dep of item.registryDependencies) {
          expect(knownNames.has(dep)).toBe(
            true,
            `Item "${name}" depends on "${dep}" which is not in the index`
          );
        }
      }
    });

    it("all item names match their `name` field", () => {
      const parsed = RegistryIndexSchema.parse(indexRaw);
      for (const [key, item] of Object.entries(parsed.items)) {
        expect(item.name).toBe(key);
      }
    });
  });
});

describe("RegistryConfigSchema — ui-x.config.json validation", () => {
  it("applies defaults when fields are omitted", () => {
    const result = RegistryConfigSchema.safeParse({});
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.prefix).toBe("@ui-x");
      expect(result.data.registryDir).toBe("registry");
      expect(result.data.generateTests).toBe(true);
      expect(result.data.categories).toEqual([
        "foundation",
        "navigation",
        "data",
        "feedback",
        "advanced",
      ]);
    }
  });

  it("accepts a fully populated config", () => {
    const config = {
      prefix: "@my-app",
      registryDir: "my-registry",
      componentsDir: "src/components",
      generateTests: false,
      generateStories: true,
      overwrite: true,
      globalDependencies: ["react", "react-dom"],
      devDependencies: ["vitest", "@testing-library/react"],
      themes: [
        {
          name: "default",
          label: "Default",
          appearance: "both" as const,
          colors: {
            background: { light: "#ffffff", dark: "#0a0a0a" },
            foreground: { light: "#000000", dark: "#ffffff" },
          },
          cssVars: [],
        },
      ],
      allowedPaths: ["components", "lib"],
      categories: ["foundation", "navigation", "data", "feedback", "advanced"],
    };
    const result = RegistryConfigSchema.safeParse(config);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.prefix).toBe("@my-app");
      expect(result.data.themes[0].name).toBe("default");
      expect(result.data.allowedPaths).toEqual(["components", "lib"]);
    }
  });

  it("rejects a config with a relative path containing `..` in allowedPaths", () => {
    const result = RegistryConfigSchema.safeParse({
      allowedPaths: ["../etc"],
    });
    expect(result.success).toBe(false);
  });

  it("rejects a config with an invalid category value", () => {
    const result = RegistryConfigSchema.safeParse({
      categories: ["unknown-category"],
    });
    expect(result.success).toBe(false);
  });
});

describe("ComponentCategory enum", () => {
  it("accepts all five valid categories", () => {
    for (const cat of [
      "foundation",
      "navigation",
      "data",
      "feedback",
      "advanced",
    ]) {
      expect(ComponentCategory.safeParse(cat).success).toBe(true);
    }
  });

  it("rejects an invalid category value", () => {
    expect(ComponentCategory.safeParse("misc").success).toBe(false);
  });
});
