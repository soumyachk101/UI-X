"use client";

import { LayoutDashboard, Users, Settings, BarChart3 } from "lucide-react";

const navItems = [
  { label: "Overview", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Users", icon: Users, href: "/dashboard/users" },
  { label: "Analytics", icon: BarChart3, href: "/dashboard/analytics" },
  { label: "Settings", icon: Settings, href: "/dashboard/settings" },
];

export default function DashboardSidebar() {
  return (
    <aside className="w-64 border-r border-border bg-background">
      <div className="p-4">
        <h2 className="text-lg font-semibold">Admin</h2>
      </div>
      <nav className="px-2 py-2 space-y-1">
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </a>
        ))}
      </nav>
    </aside>
  );
}
