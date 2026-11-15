"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CommandPaletteItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  group?: string;
  onSelect?: () => void;
}

interface CommandPaletteProps {
  items: CommandPaletteItem[];
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  placeholder?: string;
  className?: string;
}

function CommandPalette({
  items,
  open: controlledOpen,
  onOpenChange,
  placeholder = "Search...",
  className,
}: CommandPaletteProps) {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  const open = controlledOpen ?? internalOpen;
  const setOpen = onOpenChange ?? setInternalOpen;

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(!open);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, setOpen]);

  React.useEffect(() => {
    if (open) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open]);

  const filtered = query
    ? items.filter((item) =>
        item.label.toLowerCase().includes(query.toLowerCase())
      )
    : items;

  const groups = Array.from(new Set(filtered.map((i) => i.group ?? "").filter(Boolean)));
  const ungrouped = filtered.filter((i) => !i.group);

  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" />
        <DialogPrimitive.Content
          className={cn(
            "fixed left-1/2 top-[20%] z-50 w-full max-w-lg -translate-x-1/2 rounded-lg border border-border bg-background p-0 shadow-lg",
            className
          )}
        >
          <div className="flex items-center gap-2 border-b border-border px-3">
            <Search className="size-4 shrink-0 text-muted-foreground" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={placeholder}
              className="h-11 w-full bg-transparent py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground"
              onKeyDown={(e) => {
                if (e.key === "Escape") setOpen(false);
              }}
            />
          </div>
          <div className="max-h-80 overflow-auto p-1.5">
            {filtered.length === 0 && (
              <div className="px-3 py-6 text-center text-sm text-muted-foreground">
                No results found.
              </div>
            )}
            {ungrouped.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  item.onSelect?.();
                  setOpen(false);
                }}
                className="flex w-full items-center gap-2 rounded-sm px-3 py-2 text-sm text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {item.icon && (
                  <span className="flex size-4 items-center justify-center text-muted-foreground">
                    {item.icon}
                  </span>
                )}
                {item.label}
              </button>
            ))}
            {groups.map((group) => (
              <div key={group}>
                <div className="px-3 py-1.5 text-xs font-medium text-muted-foreground">
                  {group}
                </div>
                {filtered
                  .filter((i) => i.group === group)
                  .map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        item.onSelect?.();
                        setOpen(false);
                      }}
                      className="flex w-full items-center gap-2 rounded-sm px-3 py-2 text-sm text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {item.icon && (
                        <span className="flex size-4 items-center justify-center text-muted-foreground">
                          {item.icon}
                        </span>
                      )}
                      {item.label}
                    </button>
                  ))}
              </div>
            ))}
          </div>
          <div className="border-t border-border px-3 py-2 text-xs text-muted-foreground">
            <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px]">Ctrl K</kbd> to toggle
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

CommandPalette.displayName = "CommandPalette";

export { CommandPalette };
