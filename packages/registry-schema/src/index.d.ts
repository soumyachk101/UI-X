/**
 * UI-X Registry Schema — type declarations.
 *
 * These schemas define the shape of registry items, files, and the
 * overall registry index consumed by the CLI and MCP server.
 */

import { z } from "zod";

// ---------------------------------------------------------------------------
// Zod schemas (runtime — declared here for consumers)
// ---------------------------------------------------------------------------

export declare const RegistryItemType: z.ZodEnum<[
  "registry:ui",
  "registry:block",
  "registry:hook",
  "registry:lib",
  "registry:theme",
  "registry:util",
]>;

export declare const RegistryFileSchema: z.ZodObject<{
  path: z.ZodString;
  type: z.ZodEnum<[
    "registry:ui",
    "registry:block",
    "registry:hook",
    "registry:lib",
    "registry:theme",
    "registry:util",
  ]>;
  target: z.ZodOptional<z.ZodString>;
  content: z.ZodOptional<z.ZodString>;
}>;

export declare const RegistryItemSchema: z.ZodObject<{
  $schema: z.ZodOptional<z.ZodString>;
  name: z.ZodString;
  type: z.ZodEnum<[
    "registry:ui",
    "registry:block",
    "registry:hook",
    "registry:lib",
    "registry:theme",
    "registry:util",
  ]>;
  title: z.ZodOptional<z.ZodString>;
  description: z.ZodOptional<z.ZodString>;
  version: z.ZodDefault<z.ZodString>;
  dependencies: z.ZodDefault<z.ZodArray<z.ZodString>>;
  registryDependencies: z.ZodDefault<z.ZodArray<z.ZodString>>;
  files: z.ZodArray<z.ZodObject<{
    path: z.ZodString;
    type: z.ZodEnum<[
      "registry:ui",
      "registry:block",
      "registry:hook",
      "registry:lib",
      "registry:theme",
      "registry:util",
    ]>;
    target: z.ZodOptional<z.ZodString>;
    content: z.ZodOptional<z.ZodString>;
  }>>;
  tags: z.ZodDefault<z.ZodArray<z.ZodString>>;
  category: z.ZodOptional<z.ZodString>;
  license: z.ZodDefault<z.ZodString>;
  docs: z.ZodOptional<z.ZodString>;
  preview: z.ZodOptional<z.ZodString>;
  source: z.ZodOptional<z.ZodString>;
  meta: z.ZodDefault<z.ZodObject<{
    rsc: z.ZodDefault<z.ZodBoolean>;
    tsx: z.ZodDefault<z.ZodBoolean>;
    tailwind: z.ZodDefault<z.ZodBoolean>;
    cssVars: z.ZodDefault<z.ZodBoolean>;
    requires: z.ZodDefault<z.ZodArray<z.ZodString>>;
  }>>;
  compatibility: z.ZodOptional<z.ZodObject<{
    react: z.ZodOptional<z.ZodString>;
    nextjs: z.ZodOptional<z.ZodString>;
  }>>;
}>;

export declare const RegistryIndexSchema: z.ZodObject<{
  version: z.ZodString;
  lastUpdated: z.ZodOptional<z.ZodCoerceDate>;
  items: z.ZodRecord<z.ZodString, z.ZodObject<{
    $schema: z.ZodOptional<z.ZodString>;
    name: z.ZodString;
    type: z.ZodEnum<[
      "registry:ui",
      "registry:block",
      "registry:hook",
      "registry:lib",
      "registry:theme",
      "registry:util",
    ]>;
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    version: z.ZodDefault<z.ZodString>;
    dependencies: z.ZodDefault<z.ZodArray<z.ZodString>>;
    registryDependencies: z.ZodDefault<z.ZodArray<z.ZodString>>;
    files: z.ZodArray<z.ZodObject<{
      path: z.ZodString;
      type: z.ZodEnum<[
        "registry:ui",
        "registry:block",
        "registry:hook",
        "registry:lib",
        "registry:theme",
        "registry:util",
      ]>;
      target: z.ZodOptional<z.ZodString>;
      content: z.ZodOptional<z.ZodString>;
    }>>;
    tags: z.ZodDefault<z.ZodArray<z.ZodString>>;
    category: z.ZodOptional<z.ZodString>;
    license: z.ZodDefault<z.ZodString>;
    docs: z.ZodOptional<z.ZodString>;
    preview: z.ZodOptional<z.ZodString>;
    source: z.ZodOptional<z.ZodString>;
    meta: z.ZodDefault<z.ZodObject<{
      rsc: z.ZodDefault<z.ZodBoolean>;
      tsx: z.ZodDefault<z.ZodBoolean>;
      tailwind: z.ZodDefault<z.ZodBoolean>;
      cssVars: z.ZodDefault<z.ZodBoolean>;
      requires: z.ZodDefault<z.ZodArray<z.ZodString>>;
    }>>;
    compatibility: z.ZodOptional<z.ZodObject<{
      react: z.ZodOptional<z.ZodString>;
      nextjs: z.ZodOptional<z.ZodString>;
    }>>;
  }>>;
}>;

// ---------------------------------------------------------------------------
// Inferred types
// ---------------------------------------------------------------------------

export type RegistryItemType = z.infer<typeof RegistryItemType>;
export type RegistryFile = z.infer<typeof RegistryFileSchema>;
export type RegistryItem = z.infer<typeof RegistryItemSchema>;
export type RegistryIndex = z.infer<typeof RegistryIndexSchema>;
