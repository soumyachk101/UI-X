"use client";

import { cn } from "@/components/ui/utils";
import { Button } from "@/components/ui/button";

interface NavItem {
  label: string;
  href: string;
  icon?: string;
}

interface SidebarProps {
  brand?: { name: string; href: string };
  navItems?: NavItem[];
  user?: { name: string; email: string };
  className?: string;
}

const defaultNavItems: NavItem[] = [
  { label: "Dashboard", href: "#dashboard", icon: "📊" },
  { label: "Projects", href: "#projects", icon: "📁" },
  { label: "Team", href: "#team", icon: "👥" },
  { label: "Settings", href: "#settings", icon: "⚙️" },
];

export function Sidebar({
  brand = { name: "UI-X", href: "#" },
  navItems = defaultNavItems,
  user = { name: "Jane Doe", email: "jane@example.com" },
  className,
}: SidebarProps) {
  return (
    <aside className={cn("flex h-screen w-64 flex-col border-r bg-card", className)}>
      {/* Brand */}
      <div className="flex h-16 items-center border-b px-6">
        <a href={brand.href} className="text-lg font-bold">
          {brand.name}
        </a>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                {item.icon && <span>{item.icon}</span>}
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* User section */}
      <div className="border-t p-4">
        <div className="flex items-center gap-3 rounded-md px-3 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
            {user.name.charAt(0)}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">{user.name}</p>
            <p className="truncate text-xs text-muted-foreground">{user.email}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
