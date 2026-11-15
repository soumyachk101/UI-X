"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const components = [
  { name: "button", label: "Button" },
  { name: "input", label: "Input" },
  { name: "textarea", label: "Textarea" },
  { name: "checkbox", label: "Checkbox" },
  { name: "badge", label: "Badge" },
  { name: "avatar", label: "Avatar" },
  { name: "skeleton", label: "Skeleton" },
];

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const activeComponent = pathname?.split("/").pop() || "";

  return (
    <div className="flex min-h-screen flex-col">
      {/* Top Nav */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <Link
            href="/"
            className="text-lg font-semibold tracking-tight text-foreground"
          >
            UI-X Playground
          </Link>

          <nav className="flex items-center gap-1">
            <Link
              href="/"
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                pathname === "/"
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              Home
            </Link>

            <div className="relative ml-2">
              <select
                value={activeComponent}
                onChange={(e) => {
                  const val = e.target.value;
                  window.location.href = val ? `/components/${val}` : "/";
                }}
                className="h-9 rounded-md border border-border bg-background px-3 py-1.5 pr-8 text-sm text-foreground appearance-none focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">Components</option>
                {components.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.label}
                  </option>
                ))}
              </select>
              <svg
                className="pointer-events-none absolute right-2 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-8">
        {children}
      </main>
    </div>
  );
}
