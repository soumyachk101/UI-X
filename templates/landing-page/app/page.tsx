import { ArrowRight, Zap, Shield, Gauge } from "lucide-react";

const features = [
  { icon: Zap, title: "Fast", description: "Built for speed with optimized performance." },
  { icon: Shield, title: "Secure", description: "Enterprise-grade security out of the box." },
  { icon: Gauge, title: "Scalable", description: "Grows with your product from day one." },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-5xl font-bold tracking-tight">
            Build faster with UI-X
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A complete component system for building modern web applications. Start shipping today.
          </p>
          <div className="flex items-center justify-center gap-4">
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
            >
              Get Started <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-md border border-border px-6 py-3 text-sm font-medium hover:bg-accent transition-colors"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-secondary/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-lg border border-border bg-background p-6 shadow-sm"
              >
                <feature.icon className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold">Ready to get started?</h2>
          <p className="text-lg text-muted-foreground">
            Join thousands of developers building with UI-X.
          </p>
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
          >
            Start Building <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4">
        <div className="max-w-5xl mx-auto text-center text-sm text-muted-foreground">
          Built with UI-X. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
