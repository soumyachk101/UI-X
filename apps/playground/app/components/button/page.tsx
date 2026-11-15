"use client";

import * as React from "react";
import { Button, buttonVariants } from "@/components/ui/button";

const variants = [
  { value: "default", label: "Default" },
  { value: "secondary", label: "Secondary" },
  { value: "outline", label: "Outline" },
  { value: "ghost", label: "Ghost" },
  { value: "destructive", label: "Destructive" },
  { value: "link", label: "Link" },
] as const;

const sizes = [
  { value: "default", label: "Default" },
  { value: "sm", label: "Small" },
  { value: "lg", label: "Large" },
  { value: "icon", label: "Icon" },
] as const;

type Variant = (typeof variants)[number]["value"];
type Size = (typeof sizes)[number]["value"];

export default function ButtonPlayground() {
  const [variant, setVariant] = React.useState<Variant>("default");
  const [size, setSize] = React.useState<Size>("default");

  const code = `<Button variant="${variant}" size="${size}">\n  Click me\n</Button>`;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Button
        </h1>
        <p className="mt-1 text-muted-foreground">
          Displays a button or a component that looks like a button.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        {/* Controls */}
        <div className="lg:col-span-2 space-y-6">
          {/* Variant Selector */}
          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="text-sm font-medium text-foreground mb-3">
              Variant
            </h3>
            <div className="flex flex-wrap gap-2">
              {variants.map((v) => (
                <button
                  key={v.value}
                  onClick={() => setVariant(v.value)}
                  className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                    variant === v.value
                      ? "bg-primary text-primary-foreground"
                      : "border border-border bg-background text-foreground hover:bg-accent"
                  }`}
                >
                  {v.label}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selector */}
          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="text-sm font-medium text-foreground mb-3">
              Size
            </h3>
            <div className="flex flex-wrap gap-2">
              {sizes.map((s) => (
                <button
                  key={s.value}
                  onClick={() => setSize(s.value)}
                  className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                    size === s.value
                      ? "bg-primary text-primary-foreground"
                      : "border border-border bg-background text-foreground hover:bg-accent"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Code Snippet */}
          <div className="rounded-xl border border-border bg-card">
            <div className="flex items-center justify-between border-b border-border px-5 py-2.5">
              <span className="text-xs font-medium text-muted-foreground">
                Usage
              </span>
              <button
                onClick={() => navigator.clipboard.writeText(code)}
                className="rounded px-2 py-1 text-xs text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                Copy
              </button>
            </div>
            <pre className="overflow-x-auto px-5 py-4">
              <code className="text-sm text-foreground">{code}</code>
            </pre>
          </div>
        </div>

        {/* Live Preview */}
        <div className="lg:col-span-3">
          <div className="playground-preview rounded-xl border border-border bg-card p-10">
            <div className="flex items-center justify-center min-h-[160px]">
              <Button variant={variant} size={size}>
                Click me
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
