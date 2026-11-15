/**
 * UI-X Theme Presets
 *
 * Built-in themes with light and dark variants.
 * Each entry maps to CSS files under `registry/themes/<name>/`.
 */

import type { Theme } from "@ui-x/tokens";

// ---------------------------------------------------------------------------
// Default
// ---------------------------------------------------------------------------

const defaultLight: Theme = {
  background: "0 0% 100%",
  foreground: "222 47% 11%",
  card: "0 0% 100%",
  cardForeground: "222 47% 11%",
  primary: "222 47% 20%",
  primaryForeground: "210 40% 98%",
  secondary: "210 40% 96%",
  secondaryForeground: "222 47% 15%",
  muted: "210 40% 96%",
  mutedForeground: "215 16% 47%",
  accent: "210 40% 96%",
  accentForeground: "222 47% 11%",
  destructive: "0 84% 60%",
  destructiveForeground: "0 0% 100%",
  border: "214 32% 91%",
  input: "214 32% 91%",
  ring: "222 47% 25%",
  radius: "0.75rem",
};

const defaultDark: Theme = {
  background: "222 47% 7%",
  foreground: "210 40% 98%",
  card: "222 47% 7%",
  cardForeground: "210 40% 98%",
  primary: "222 47% 20%",
  primaryForeground: "210 40% 98%",
  secondary: "215 28% 17%",
  secondaryForeground: "210 40% 98%",
  muted: "215 28% 17%",
  mutedForeground: "215 20% 65%",
  accent: "215 28% 17%",
  accentForeground: "210 40% 98%",
  destructive: "0 84% 60%",
  destructiveForeground: "0 0% 100%",
  border: "215 28% 17%",
  input: "215 28% 17%",
  ring: "222 47% 70%",
  radius: "0.75rem",
};

// ---------------------------------------------------------------------------
// Ocean — blue tones
// ---------------------------------------------------------------------------

const oceanLight: Theme = {
  ...defaultLight,
  primary: "217 90% 35%",
  background: "217 30% 98%",
  primaryForeground: "217 30% 98%",
  foreground: "217 50% 10%",
  card: "0 0% 100%",
  cardForeground: "217 50% 10%",
  secondary: "217 30% 94%",
  secondaryForeground: "217 50% 15%",
  muted: "217 25% 92%",
  mutedForeground: "217 40% 40%",
  accent: "217 30% 92%",
  accentForeground: "217 50% 10%",
  border: "217 30% 88%",
  input: "217 30% 88%",
  ring: "217 90% 40%",
  radius: "0.75rem",
};

const oceanDark: Theme = {
  ...defaultDark,
  primary: "217 80% 45%",
  background: "217 40% 8%",
  primaryForeground: "217 30% 98%",
  foreground: "217 30% 95%",
  card: "217 40% 10%",
  cardForeground: "217 30% 95%",
  secondary: "217 35% 16%",
  secondaryForeground: "217 30% 95%",
  muted: "217 35% 14%",
  mutedForeground: "217 25% 60%",
  accent: "217 35% 16%",
  accentForeground: "217 30% 95%",
  border: "217 35% 16%",
  input: "217 35% 16%",
  ring: "217 80% 50%",
  radius: "0.75rem",
};

// ---------------------------------------------------------------------------
// Forest — green tones
// ---------------------------------------------------------------------------

const forestLight: Theme = {
  ...defaultLight,
  primary: "150 50% 25%",
  background: "150 20% 98%",
  primaryForeground: "150 20% 98%",
  foreground: "150 40% 10%",
  card: "0 0% 100%",
  cardForeground: "150 40% 10%",
  secondary: "150 20% 94%",
  secondaryForeground: "150 40% 15%",
  muted: "150 15% 92%",
  mutedForeground: "150 35% 38%",
  accent: "150 20% 92%",
  accentForeground: "150 40% 10%",
  border: "150 20% 88%",
  input: "150 20% 88%",
  ring: "150 50% 30%",
  radius: "0.75rem",
};

const forestDark: Theme = {
  ...defaultDark,
  primary: "150 50% 30%",
  background: "150 30% 8%",
  primaryForeground: "150 20% 98%",
  foreground: "150 20% 95%",
  card: "150 30% 10%",
  cardForeground: "150 20% 95%",
  secondary: "150 28% 16%",
  secondaryForeground: "150 20% 95%",
  muted: "150 28% 14%",
  mutedForeground: "150 25% 58%",
  accent: "150 28% 16%",
  accentForeground: "150 20% 95%",
  border: "150 28% 16%",
  input: "150 28% 16%",
  ring: "150 50% 38%",
  radius: "0.75rem",
};

// ---------------------------------------------------------------------------
// Theme registry
// ---------------------------------------------------------------------------

export interface ThemePreset {
  name: string;
  description: string;
  light: Theme;
  dark: Theme;
  cssLight: string;
  cssDark: string;
}

export const themes: Record<string, ThemePreset> = {
  default: {
    name: "default",
    description: "UI-X default design theme.",
    light: defaultLight,
    dark: defaultDark,
    cssLight: "themes/default/light.css",
    cssDark: "themes/default/dark.css",
  },
  ocean: {
    name: "ocean",
    description: "Calm ocean-inspired blue tones.",
    light: oceanLight,
    dark: oceanDark,
    cssLight: "themes/ocean/light.css",
    cssDark: "themes/ocean/dark.css",
  },
  forest: {
    name: "forest",
    description: "Natural forest-inspired green tones.",
    light: forestLight,
    dark: forestDark,
    cssLight: "themes/forest/light.css",
    cssDark: "themes/forest/dark.css",
  },
};

/**
 * Return a theme preset by name. Throws if not found.
 */
export function getTheme(name: string): ThemePreset {
  const theme = themes[name];
  if (!theme) {
    throw new Error(`Theme "${name}" not found. Available: ${listThemes().join(", ")}`);
  }
  return theme;
}

/**
 * List all registered theme names.
 */
export function listThemes(): string[] {
  return Object.keys(themes);
}
