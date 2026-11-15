import React from "react"
import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC_PATH = path.join(__dirname, "sonner.tsx");

describe("Sonner", () => {
  it("source file exports Toaster as default or named", () => {
    const src = readFileSync(SRC_PATH, "utf-8");
    expect(src).toContain("export");
    expect(src).toContain("Toaster");
  });

  it("source file is a client component", () => {
    const src = readFileSync(SRC_PATH, "utf-8");
    expect(src.trim().startsWith('"use client"')).toBe(true);
  });
});
