import Link from "next/link";

const navigation = [
  { label: "Installation", href: "/docs/installation" },
  { label: "CLI", href: "/docs/cli" },
  { label: "Components", href: "/components/button" },
  { label: "Blocks", href: "/blocks" },
  { label: "Themes", href: "/themes" },
];

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="hidden w-56 shrink-0 border-r border-border bg-muted/30 md:block">
        <nav className="sticky top-0 flex flex-col gap-1 px-3 py-6">
          <p className="px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Docs
          </p>
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1">{children}</main>
    </div>
  );
}
