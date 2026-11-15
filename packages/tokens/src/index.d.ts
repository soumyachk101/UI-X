/**
 * UI-X Design Tokens — type declarations.
 *
 * These CSS custom properties represent the source of truth for the design
 * system. Components reference these semantic tokens; they are never
 * overridden inside component files directly.
 *
 * Usage:
 *   import { Theme } from "@ui-x/tokens";
 */

// ---------------------------------------------------------------------------
// Theme constants (runtime — declared here for consumers)
// ---------------------------------------------------------------------------

export declare const lightTheme: {
  readonly background: string;
  readonly foreground: string;
  readonly card: string;
  readonly cardForeground: string;
  readonly primary: string;
  readonly primaryForeground: string;
  readonly secondary: string;
  readonly secondaryForeground: string;
  readonly muted: string;
  readonly mutedForeground: string;
  readonly accent: string;
  readonly accentForeground: string;
  readonly destructive: string;
  readonly destructiveForeground: string;
  readonly border: string;
  readonly input: string;
  readonly ring: string;
  readonly radius: string;
};

export declare const darkTheme: {
  readonly background: string;
  readonly foreground: string;
  readonly card: string;
  readonly cardForeground: string;
  readonly primary: string;
  readonly primaryForeground: string;
  readonly secondary: string;
  readonly secondaryForeground: string;
  readonly muted: string;
  readonly mutedForeground: string;
  readonly accent: string;
  readonly accentForeground: string;
  readonly destructive: string;
  readonly destructiveForeground: string;
  readonly border: string;
  readonly input: string;
  readonly ring: string;
  readonly radius: string;
};

// ---------------------------------------------------------------------------
// Font stacks
// ---------------------------------------------------------------------------

export declare const fontSans: readonly [
  string,
  string,
  string,
  string,
];

export declare const fontMono: readonly [
  string,
  string,
  string,
  string,
];

// ---------------------------------------------------------------------------
// Spacing
// ---------------------------------------------------------------------------

export declare const spacingScale: readonly [
  0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80,
];

// ---------------------------------------------------------------------------
// Theme type
// ---------------------------------------------------------------------------

export type Theme = typeof lightTheme;
