"use client";

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export interface MultiSelectOption {
  value: string;
  label: string;
}

interface MultiSelectProps {
  options: MultiSelectOption[];
  value?: string[];
  onValueChange?: (value: string[]) => void;
  placeholder?: string;
  className?: string;
}

function MultiSelect({
  options,
  value = [],
  onValueChange,
  placeholder = "Select items...",
  className,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");

  const selected = options.filter((o) => value.includes(o.value));
  const filtered = options.filter((o) =>
    o.label.toLowerCase().includes(search.toLowerCase()) &&
    !value.includes(o.value)
  );

  const toggle = (v: string) => {
    if (value.includes(v)) {
      onValueChange?.(value.filter((x) => x !== v));
    } else {
      onValueChange?.([...value, v]);
    }
  };

  const remove = (v: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onValueChange?.(value.filter((x) => x !== v));
  };

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
      <PopoverPrimitive.Trigger asChild>
        <button
          role="combobox"
          aria-expanded={open}
          className={cn(
            "flex h-9 min-h-9 w-full flex-wrap items-center gap-1.5 rounded-md border border-input bg-background px-3 py-1.5 text-sm shadow-sm transition-colors hover:bg-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
        >
          {selected.length === 0 && (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
          {selected.map((option) => (
            <span
              key={option.value}
              className="inline-flex items-center gap-1 rounded-sm bg-primary/10 px-1.5 py-0.5 text-xs font-medium text-primary"
            >
              {option.label}
              <button
                type="button"
                onClick={(e) => remove(option.value, e)}
                aria-label={`Remove ${option.label}`}
                className="rounded-sm hover:bg-primary/20"
              >
                <X className="size-3" />
              </button>
            </span>
          ))}
          <span className="ml-auto opacity-50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="size-3.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </span>
        </button>
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          className="z-50 w-[var(--radix-popover-trigger-width)] rounded-md border border-border bg-popover p-1 shadow-md"
          onCloseAutoFocus={() => setSearch("")}
        >
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={placeholder}
            className="mb-1 w-full rounded-sm bg-transparent px-2 py-1.5 text-sm outline-none placeholder:text-muted-foreground"
            onKeyDown={(e) => {
              if (e.key === "Escape") setOpen(false);
            }}
          />
          <div className="max-h-64 overflow-auto rounded-sm">
            {filtered.length === 0 && (
              <div className="px-2 py-1.5 text-sm text-muted-foreground">
                No options available.
              </div>
            )}
            {filtered.map((option) => (
              <div
                key={option.value}
                role="option"
                aria-selected={value.includes(option.value)}
                onClick={() => toggle(option.value)}
                className={cn(
                  "flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-accent",
                  value.includes(option.value) && "bg-accent"
                )}
              >
                <span
                  className={cn(
                    "flex size-4 items-center justify-center rounded-sm border border-primary",
                    value.includes(option.value) && "bg-primary text-primary-foreground"
                  )}
                >
                  {value.includes(option.value) && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={3}
                      stroke="currentColor"
                      className="size-3"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  )}
                </span>
                {option.label}
              </div>
            ))}
          </div>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}

MultiSelect.displayName = "MultiSelect";

export { MultiSelect };
