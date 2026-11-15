/**
 * UI-X Theme Engine — type declarations.
 *
 * Generates CSS from design tokens for light and dark themes,
 * and supports custom brand themes via overrides.
 */

import type { Theme } from "@ui-x/tokens";

// ---------------------------------------------------------------------------
// Theme configuration
// ---------------------------------------------------------------------------

export interface ThemeConfig {
  name: string;
  extend?: Partial<Theme>;
}

// ---------------------------------------------------------------------------
// Theme functions
// ---------------------------------------------------------------------------

export declare function themeToCSS(
  theme: Theme,
  prefix?: string
): string;

export declare function generateThemeCSS(
  themeName?: string
): string;

export declare function mergeThemes(
  base: Theme,
  override: Partial<Theme>
): Theme;
