import { Hero } from "./hero";

export function HeroDemo() {
  return (
    <Hero
      headline="Build something amazing"
      subheadline="The component library that helps you ship faster with confidence. Beautiful, accessible, and fully customizable."
      primaryCta={{ label: "Get Started", href: "#" }}
      secondaryCta={{ label: "Learn More", href: "#" }}
    />
  );
}
