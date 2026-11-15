import DocsLayout from "@/docs/layout";

const tokens = [
  {
    name: "Background",
    variable: "--background",
    light: "0 0% 100%",
    dark: "222 47% 7%",
  },
  {
    name: "Foreground",
    variable: "--foreground",
    light: "222 47% 11%",
    dark: "210 40% 98%",
  },
  {
    name: "Primary",
    variable: "--primary",
    light: "222 47% 20%",
    dark: "222 47% 20%",
  },
  {
    name: "Primary Foreground",
    variable: "--primary-foreground",
    light: "210 40% 98%",
    dark: "210 40% 98%",
  },
  {
    name: "Secondary",
    variable: "--secondary",
    light: "210 40% 96%",
    dark: "215 28% 17%",
  },
  {
    name: "Muted",
    variable: "--muted",
    light: "210 40% 96%",
    dark: "215 28% 17%",
  },
  {
    name: "Accent",
    variable: "--accent",
    light: "210 40% 96%",
    dark: "215 28% 17%",
  },
  {
    name: "Destructive",
    variable: "--destructive",
    light: "0 84% 60%",
    dark: "0 84% 60%",
  },
  {
    name: "Border",
    variable: "--border",
    light: "214 32% 91%",
    dark: "215 28% 17%",
  },
  {
    name: "Input",
    variable: "--input",
    light: "214 32% 91%",
    dark: "215 28% 17%",
  },
  {
    name: "Ring",
    variable: "--ring",
    light: "222 47% 25%",
    dark: "222 47% 70%",
  },
];

const customThemeExample = `:root {
  --background: 0 0% 100%;
  --foreground: 222 47% 11%;
  --primary: 262 83% 58%;
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96%;
  --secondary-foreground: 222 47% 15%;
  --muted: 210 40% 96%;
  --muted-foreground: 215 16% 47%;
  --accent: 210 40% 96%;
  --accent-foreground: 222 47% 11%;
  --destructive: 0 84% 60%;
  --destructive-foreground: 0 0% 100%;
  --border: 214 32% 91%;
  --input: 214 32% 91%;
  --ring: 262 83% 58%;
  --radius: 0.75rem;
}`;

export default function ThemingPage() {
  return (
    <DocsLayout>
      <h1 className="text-3xl font-bold tracking-tight text-foreground">Theming</h1>
      <p className="mt-3 text-base text-muted-foreground">
        Customize the look and feel of your UI-X project with CSS variables, light and dark modes, and custom themes.
      </p>

      {/* CSS Variables */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold text-foreground">CSS Variables</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          UI-X uses CSS custom properties (variables) for all design tokens. Override them in your{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">globals.css</code> or any
          stylesheet that loads before your components.
        </p>

        <div className="mt-4 overflow-hidden rounded-xl border border-border">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="px-4 py-3 font-semibold text-foreground">Token</th>
                <th className="px-4 py-3 font-semibold text-foreground">Variable</th>
                <th className="px-4 py-3 font-semibold text-foreground">Light</th>
                <th className="px-4 py-3 font-semibold text-foreground">Dark</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {tokens.map((token) => (
                <tr key={token.variable} className="hover:bg-muted/50">
                  <td className="px-4 py-3 text-foreground">{token.name}</td>
                  <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-muted-foreground">
                    {token.variable}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-muted-foreground">
                    {token.light}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-muted-foreground">
                    {token.dark}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Light / Dark Mode */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold text-foreground">Light / Dark Mode</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The dark mode variant is defined under the <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">.dark</code> class
          selector. Toggle the class on the <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">&lt;html&gt;</code> element to switch themes.
        </p>

        <pre className="mt-3 overflow-x-auto rounded-lg border border-border bg-muted px-4 py-3 text-sm text-foreground">
          <code>{`<html class="dark">...</html>`}</code>
        </pre>

        <p className="mt-3 text-sm text-muted-foreground">
          Use the <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">next-themes</code> package for a
          managed toggle with system preference detection and localStorage persistence.
        </p>

        <pre className="mt-3 overflow-x-auto rounded-lg border border-border bg-muted px-4 py-3 text-sm text-foreground">
          <code>{`"use client";

import { ThemeProvider } from "next-themes";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}`}</code>
        </pre>
      </section>

      {/* Custom Themes */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold text-foreground">Creating Custom Themes</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Define a new theme by creating a custom CSS class and setting the same set of variables. Use HSL values to match the
          existing token format.
        </p>

        <pre className="mt-3 overflow-x-auto rounded-lg border border-border bg-muted px-4 py-3 text-sm text-foreground">
          <code>{customThemeExample}</code>
        </pre>
      </section>
    </DocsLayout>
  );
}
