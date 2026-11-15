"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <a href="/" className="font-semibold text-foreground">
          UI-X
        </a>
        <nav className="flex items-center gap-6">
          <a href="/docs/installation" className="text-sm text-muted-foreground hover:text-foreground">
            Docs
          </a>
          <a href="/components/button" className="text-sm text-muted-foreground hover:text-foreground">
            Components
          </a>
          <a href="/blocks" className="text-sm text-muted-foreground hover:text-foreground">
            Blocks
          </a>
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-md p-2 text-muted-foreground hover:text-foreground"
            aria-label="Toggle theme"
          >
            {mounted && theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </nav>
      </div>
    </header>
  );
}
