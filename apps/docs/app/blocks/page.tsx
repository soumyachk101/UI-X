import Link from "next/link";

const blocks = [
  { name: "Hero", description: "Full-width hero section with heading, subtext, and CTAs.", href: "/blocks/hero" },
  { name: "Features", description: "Grid of feature cards with icons and descriptions.", href: "/blocks/features" },
  { name: "Pricing", description: "Three-tier pricing cards with toggle for monthly/annual.", href: "/blocks/pricing" },
  { name: "Sidebar", description: "Vertical navigation sidebar with grouped links.", href: "/blocks/sidebar" },
  { name: "Stats", description: "Animated counter row for key metrics.", href: "/blocks/stats" },
];

export default function BlocksPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">Blocks</h1>
      <p className="mt-3 text-base text-muted-foreground">
        Pre-built layout sections you can drop into any page. Each block ships with its source code and a set of configurable props.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {blocks.map((block) => (
          <Link
            key={block.name}
            href={block.href}
            className="group flex flex-col rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/40 hover:bg-muted/30"
          >
            <h3 className="text-base font-semibold text-foreground">{block.name}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{block.description}</p>
            <span className="mt-4 text-sm font-medium text-primary group-hover:underline">View</span>
          </Link>
        ))}
      </div>
    </main>
  );
}
