import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex flex-col">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center px-6 pt-20 pb-16 text-center">
        <h1 className="text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
          UI-X
        </h1>
        <p className="mt-4 max-w-xl text-lg text-muted-foreground">
          Source-first React component ecosystem
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/docs/installation"
            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Get Started
          </Link>
          <Link
            href="/components/button"
            className="rounded-lg border border-border bg-secondary px-5 py-2.5 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
          >
            Components
          </Link>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="px-6 pb-20">
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2">
          {[
            {
              title: "Source-first",
              description:
                "Every component ships with its full source code, making it trivial to inspect, debug, and customize.",
            },
            {
              title: "Accessible",
              description:
                "Built with WAI-ARIA patterns from day one. Keyboard navigation, screen readers, and focus management included.",
            },
            {
              title: "Customizable",
              description:
                "Tailwind CSS under the hood. Override any class, slot, or pattern without fighting the abstraction.",
            },
            {
              title: "CLI-first",
              description:
                "Add, search, diff, and update components directly from your terminal with the ui-x CLI.",
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl border border-border bg-card p-6"
            >
              <h3 className="text-base font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
