import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Tier {
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  cta: { label: string; href: string };
  badge?: string;
}

interface PricingProps {
  tiers?: Tier[];
  title?: string;
  description?: string;
}

const defaultTiers: Tier[] = [
  {
    name: "Starter",
    price: "$0",
    period: "forever",
    description: "Perfect for side projects and experiments.",
    features: [
      "1 project",
      "Community support",
      "Basic components",
      "1GB storage",
    ],
    cta: { label: "Start Free", href: "#" },
  },
  {
    name: "Pro",
    price: "$29",
    period: "/month",
    description: "For teams shipping production-grade apps.",
    features: [
      "Unlimited projects",
      "Priority support",
      "All components",
      "100GB storage",
      "Custom themes",
      "Analytics",
    ],
    cta: { label: "Start Trial", href: "#" },
    badge: "Most Popular",
  },
  {
    name: "Enterprise",
    price: "$99",
    period: "/month",
    description: "For organizations with advanced needs.",
    features: [
      "Unlimited everything",
      "Dedicated support",
      "SSO & SAML",
      "Unlimited storage",
      "Custom integrations",
      "SLA guarantee",
    ],
    cta: { label: "Contact Sales", href: "#" },
  },
];

export function Pricing({
  tiers = defaultTiers,
  title = "Simple, transparent pricing",
  description = "No hidden fees. Change or cancel your plan at any time.",
}: PricingProps) {
  return (
    <section className="py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{description}</p>
        </div>
        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className="relative flex flex-col rounded-2xl border bg-card p-8 shadow-sm"
            >
              {tier.badge && (
                <div className="mb-4">
                  <Badge variant="secondary">{tier.badge}</Badge>
                </div>
              )}
              <h3 className="text-lg font-semibold">{tier.name}</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-bold">{tier.price}</span>
                {tier.period && (
                  <span className="text-muted-foreground">{tier.period}</span>
                )}
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{tier.description}</p>
              <ul className="mt-6 space-y-3 text-sm">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <Button asChild className="mt-8" variant={tier.badge ? "default" : "secondary"}>
                <a href={tier.cta.href}>{tier.cta.label}</a>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
