"use client";

import { CommandList, CommandInput, CommandItem } from "@/components/ui/command";

export function CommandDemo() {
  const frameworks = [
    { value: "next.js", label: "Next.js" },
    { value: "sveltekit", label: "SvelteKit" },
    { value: "nuxt", label: "Nuxt.js" },
    { value: "remix", label: "Remix" },
    { value: "astro", label: "Astro" },
  ];

  return (
    <Command className="rounded-lg border border-border shadow-md">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <div className="py-2 text-sm text-muted-foreground px-2">
          Frameworks
        </div>
        {frameworks.map((framework) => (
          <CommandItem key={framework.value} value={framework.value}>
            {framework.label}
          </CommandItem>
        ))}
      </CommandList>
    </Command>
  );
}
