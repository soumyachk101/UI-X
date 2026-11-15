"use client";

import * as React from "react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavigationMenuItem {
  label: string;
  href: string;
  children?: NavigationMenuItem[];
}

interface NavigationMenuProps {
  items: NavigationMenuItem[];
  className?: string;
}

function NavigationMenu({ items, className }: NavigationMenuProps) {
  return (
    <NavigationMenuPrimitive.Root className={cn("relative z-10", className)}>
      <NavigationMenuPrimitive.List className="flex flex-row items-center gap-1 rounded-md border bg-background p-1">
        {items.map((item) => (
          <NavigationMenuPrimitive.Item key={item.label} value={item.label}>
            <NavigationMenuPrimitive.Trigger asChild>
              <a
                href={item.href}
                className="inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-medium hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {item.label}
                {item.children && (
                  <ChevronDown
                    className="ml-1 size-3 transition-transform"
                    aria-hidden="true"
                  />
                )}
              </a>
            </NavigationMenuPrimitive.Trigger>

            {item.children && (
              <NavigationMenuPrimitive.Content className="absolute top-full left-0 mt-1 w-48 rounded-md border bg-popover p-1 shadow-md">
                {item.children.map((child) => (
                  <NavigationMenuPrimitive.Link key={child.label} asChild>
                    <a
                      href={child.href}
                      className="block rounded-sm px-3 py-2 text-sm hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      {child.label}
                    </a>
                  </NavigationMenuPrimitive.Link>
                ))}
              </NavigationMenuPrimitive.Content>
            )}
          </NavigationMenuPrimitive.Item>
        ))}
      </NavigationMenuPrimitive.List>
    </NavigationMenuPrimitive.Root>
  );
}

NavigationMenu.displayName = "NavigationMenu";

export { NavigationMenu };
