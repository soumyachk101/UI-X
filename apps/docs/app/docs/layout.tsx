export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-5xl">
      <div className="flex">
        <aside className="hidden w-52 shrink-0 border-r border-border bg-muted/30 md:block">
          <nav className="sticky top-14 flex flex-col gap-1 px-3 py-6">
            <p className="px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Docs
            </p>
            {[
              { label: "Installation", href: "/docs/installation" },
              { label: "CLI", href: "/docs/cli" },
              { label: "Theming", href: "/docs/theming" },
              { label: "Registry", href: "/docs/registry" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-md px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </aside>
        <main className="flex-1 px-6 py-8">{children}</main>
      </div>
    </div>
  );
}
