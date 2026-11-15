import { Features } from "./features";

export function FeaturesDemo() {
  return (
    <Features
      title="Powerful features"
      description="Everything you need to build and scale your next project."
      features={[
        {
          icon: "⚡",
          title: "Lightning Fast",
          description:
            "Optimized for performance with minimal overhead and instant load times.",
          badge: "Popular",
        },
        {
          icon: "🎨",
          title: "Fully Customizable",
          description:
            "Adapt every component to your brand with theme variables and variants.",
        },
        {
          icon: "♿",
          title: "Accessible by Default",
          description:
            "Built on Radix primitives with ARIA support and keyboard navigation.",
        },
      ]}
      cta={{ label: "Get Started", href: "#" }}
    />
  );
}
