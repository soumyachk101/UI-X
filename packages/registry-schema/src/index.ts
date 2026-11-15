import { z } from "zod";

// ---------------------------------------------------------------------------
// Existing schemas
// ---------------------------------------------------------------------------

/**
 * Allowed registry item types.
 * "registry:ui"    — individual component
 * "registry:block" — composite block / page section
 * "registry:hook"  — custom React hook
 * "registry:lib"   — shared library (utils, helpers)
 * "registry:theme" — theme preset
 * "registry:util"  — utility function
 */
export const RegistryItemType = z.enum([
  "registry:ui",
  "registry:block",
  "registry:hook",
  "registry:lib",
  "registry:theme",
  "registry:util",
]);

/**
 * Single registry file entry.
 */
export const RegistryFileSchema = z.object({
  path: z.string().refine(
    (p) => !p.includes("..") && !p.startsWith("/"),
    "Path must be relative and must not contain '..'"
  ),
  type: RegistryItemType,
  target: z.string().optional(),
  content: z.string().optional(),
});

/**
 * Full registry item — what lives at registry/default/components/<name>/index.json
 */
export const RegistryItemSchema = z.object({
  $schema: z.string().url().optional(),
  name: z.string().min(1),
  type: RegistryItemType,
  title: z.string().optional(),
  description: z.string().optional(),
  version: z.string().default("0.0.0"),
  dependencies: z.array(z.string()).default([]),
  registryDependencies: z.array(z.string()).default([]),
  files: z.array(RegistryFileSchema).min(1),
  tags: z.array(z.string()).default([]),
  category: z.string().optional(),
  license: z.string().default("MIT"),
  docs: z.string().url().optional(),
  preview: z.string().url().optional(),
  source: z.string().url().optional(),
  meta: z
    .object({
      rsc: z.boolean().default(true),
      tsx: z.boolean().default(true),
      tailwind: z.boolean().default(true),
      cssVars: z.boolean().default(true),
      requires: z.array(z.string()).default([]),
    })
    .default({}),
  compatibility: z
    .object({
      react: z.string().optional(),
      nextjs: z.string().optional(),
    })
    .optional(),
});

/**
 * Full registry index — maps component names to entries.
 */
export const RegistryIndexSchema = z.object({
  version: z.string(),
  lastUpdated: z.coerce.date().optional(),
  items: z.record(z.string(), RegistryItemSchema),
});

// ---------------------------------------------------------------------------
// New: Theme schema
// ---------------------------------------------------------------------------

/**
 * Theme variable entry — a single CSS custom-property mapping.
 */
export const ThemeVariableSchema = z.object({
  name: z.string().min(1),
  value: z.string().min(1),
});

/**
 * Theme color entry — a named color with a light/dark variant.
 */
export const ThemeColorSchema = z.object({
  light: z.string().min(1),
  dark: z.string().min(1),
});

/**
 * Theme radius entry — maps semantic radius tokens to CSS values.
 */
export const ThemeRadiusSchema = z.object({
  sm: z.string().min(1).optional(),
  md: z.string().min(1).optional(),
  lg: z.string().min(1).optional(),
});

/**
 * Complete theme preset definition.
 */
export const ThemeSchema = z.object({
  name: z.string().min(1),
  label: z.string().min(1),
  description: z.string().optional(),
  appearance: z.enum(["light", "dark", "both"]).default("both"),
  colors: z.record(z.string(), ThemeColorSchema),
  radius: ThemeRadiusSchema.optional(),
  cssVars: z.array(ThemeVariableSchema).default([]),
});

// ---------------------------------------------------------------------------
// New: Component category enum
// ---------------------------------------------------------------------------

/**
 * Semantic category for grouping components in the registry.
 */
export const ComponentCategory = z.enum([
  "foundation",
  "navigation",
  "data",
  "feedback",
  "advanced",
]);

// ---------------------------------------------------------------------------
// New: ui-x.config.json schema
// ---------------------------------------------------------------------------

/**
 * Root configuration file for ui-x projects.
 *
 * Stored at the project root as `ui-x.config.json`.
 */
export const RegistryConfigSchema = z.object({
  /** Registry namespace prefix, e.g. "@ui-x" */
  prefix: z.string().min(1).default("@ui-x"),

  /** Path to the registry directory relative to project root. */
  registryDir: z.string().min(1).default("registry"),

  /** Default component destination relative to the project's `src/` folder. */
  componentsDir: z.string().min(1).default("components/ui"),

  /** Whether to generate `.test.tsx` files alongside new components. */
  generateTests: z.boolean().default(true),

  /** Whether to generate Storybook stories alongside new components. */
  generateStories: z.boolean().default(false),

  /** Whether to overwrite existing files without prompting. */
  overwrite: z.boolean().default(false),

  /** Globally required npm packages applied to every new component. */
  globalDependencies: z.array(z.string()).default([]),

  /** Globally required npm packages applied only in dev mode. */
  devDependencies: z.array(z.string()).default([]),

  /** Ordered list of theme presets to offer during `ui-x init`. */
  themes: z.array(ThemeSchema).default([]),

  /** Allowed directories that registry file paths may target. */
  allowedPaths: z
    .array(
      z.string().refine(
        (p) => !p.includes("..") && !p.startsWith("/"),
        "Path must be relative and must not contain '..'"
      )
    )
    .default(["components", "lib", "hooks", "utils"]),

  /** Component categories used for filtering in `ui-x list`. */
  categories: z.array(ComponentCategory).default([
    "foundation",
    "navigation",
    "data",
    "feedback",
    "advanced",
  ]),
});

// ---------------------------------------------------------------------------
// Re-exports
// ---------------------------------------------------------------------------

export type RegistryItemType = z.infer<typeof RegistryItemType>;
export type RegistryFile = z.infer<typeof RegistryFileSchema>;
export type RegistryItem = z.infer<typeof RegistryItemSchema>;
export type RegistryIndex = z.infer<typeof RegistryIndexSchema>;

export type ThemeVariable = z.infer<typeof ThemeVariableSchema>;
export type ThemeColor = z.infer<typeof ThemeColorSchema>;
export type ThemeRadius = z.infer<typeof ThemeRadiusSchema>;
export type Theme = z.infer<typeof ThemeSchema>;

export type ComponentCategory = z.infer<typeof ComponentCategory>;
export type RegistryConfig = z.infer<typeof RegistryConfigSchema>;
