import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Feature {
  icon: string;
  title: string;
  description: string;
  badge?: string;
}

interface FeaturesProps {
  features?: Feature[];
  title?: string;
  description?: string;
  cta?: { label: string; href: string };
}

const defaultFeatures: Feature[] = [
  {
    icon: "⚡",
    title: "Lightning Fast",
    description: "Optimized for performance with minimal overhead and instant load times.",
    badge: "Popular",
  },
  {
    icon: "🎨",
    title: "Fully Customizable",
    description: "Adapt every component to your brand with theme variables and variants.",
  },
  {
    icon: "♿",
    title: "Accessible by Default",
    description: "Built on Radix primitives with ARIA support and keyboard navigation.",
  },
];

export function Features({
  features = defaultFeatures,
  title = "Everything you need",
  description = "A complete set of production-ready components to build modern web applications.",
  cta = { label: "View All Features", href: "#" },
}: FeaturesProps) {
  return (
    <section className="py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{description}</p>
        </div>
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative rounded-xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="text-3xl">{feature.icon}</div>
              <div className="mt-4 flex items-center gap-2">
                <h3 className="font-semibold">{feature.title}</h3>
                {feature.badge && (
                  <Badge variant="secondary">{feature.badge}</Badge>
                )}
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
        {cta && (
          <div className="mt-12 text-center">
            <Button asChild size="lg">
              <a href={cta.href}>{cta.label}</a>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
