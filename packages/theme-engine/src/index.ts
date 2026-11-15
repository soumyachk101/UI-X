/**
 * UI-X Theme Engine
 *
 * Generates CSS from design tokens for light and dark themes,
 * and supports custom brand themes via overrides.
 */

import type { Theme } from "@ui-x/tokens";
import { lightTheme, darkTheme } from "@ui-x/tokens";

export interface ThemeConfig {
  name: string;
  extend?: Partial<Theme>;
}

/**
 * Convert a HSL token value (e.g. "222 47% 20%") to a CSS variable line.
 */
function hslVar(name: string, value: string): string {
  return `  --${name}: ${value};\n`;
}

/**
 * Generate a full `:root` CSS block from a theme object.
 */
export function themeToCSS(theme: Theme, prefix = ""): string {
  const lines: string[] = prefix ? `:root.${prefix} {\n` : ":root {\n";

  const tokens: [string, string][] = [
    ["background", theme.background],
    ["foreground", theme.foreground],
    ["card", theme.card],
    ["card-foreground", theme.cardForeground],
    ["primary", theme.primary],
    ["primary-foreground", theme.primaryForeground],
    ["secondary", theme.secondary],
    ["secondary-foreground", theme.secondaryForeground],
    ["muted", theme.muted],
    ["muted-foreground", theme.mutedForeground],
    ["accent", theme.accent],
    ["accent-foreground", theme.accentForeground],
    ["destructive", theme.destructive],
    ["destructive-foreground", theme.destructiveForeground],
    ["border", theme.border],
    ["input", theme.input],
    ["ring", theme.ring],
  ];

  for (const [key, value] of tokens) {
    lines.push(hslVar(key, value));
  }
  lines.push(hslVar("radius", theme.radius));
  lines.push("}\n");
  return lines.join("");
}

/**
 * Generate complete light + dark theme CSS output.
 */
export function generateThemeCSS(themeName = "default"): string {
  const parts: string[] = [];

  parts.push(`/* ${themeName} — light */\n`);
  parts.push(themeToCSS(lightTheme));

  parts.push(`/* ${themeName} — dark */\n`);
  parts.push(themeToCSS(darkTheme, "dark"));

  return parts.join("\n");
}

/**
 * Merge an override into a base theme.
 */
export function mergeThemes(base: Theme, override: Partial<Theme>): Theme {
  return { ...base, ...override };
}

// ---------------------------------------------------------------------------
// Re-export theme presets
// ---------------------------------------------------------------------------

export { getTheme, listThemes, themes } from "./themes";
export type { ThemePreset } from "./themes";
