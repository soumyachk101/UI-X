/**
 * UI-X Design Tokens
 *
 * These CSS custom properties represent the source of truth for the design
 * system. Components reference these semantic tokens; they are never
 * overridden inside component files directly.
 *
 * Usage:
 *   @import "@ui-x/tokens/css";
 */

export const lightTheme = {
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
} as const;

export const darkTheme = {
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
} as const;

export type Theme = typeof lightTheme;

export const fontSans = [
  "Inter",
  "ui-sans-serif",
  "system-ui",
  "sans-serif",
] as const;

export const fontMono = [
  "JetBrains Mono",
  "ui-monospace",
  "SFMono-Regular",
  "monospace",
] as const;

export const spacingScale = [0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80] as const;
