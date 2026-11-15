import { Button } from "@/components/ui/button";

interface CTAProps {
  headline?: string;
  description?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}

const defaultCTA: CTAProps = {
  headline: "Ready to get started?",
  description:
    "Join thousands of developers building modern web applications with our platform. Get started in minutes, no credit card required.",
  primary: { label: "Get Started Free", href: "#" },
  secondary: { label: "Schedule a Demo", href: "#" },
};

export function CTA({
  headline = defaultCTA.headline,
  description = defaultCTA.description,
  primary = defaultCTA.primary,
  secondary = defaultCTA.secondary,
}: CTAProps) {
  return (
    <section className="py-24 px-6">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{headline}</h2>
        <p className="mt-4 text-lg text-muted-foreground">{description}</p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          {primary && (
            <Button asChild size="lg">
              <a href={primary.href}>{primary.label}</a>
            </Button>
          )}
          {secondary && (
            <Button asChild variant="outline" size="lg">
              <a href={secondary.href}>{secondary.label}</a>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
