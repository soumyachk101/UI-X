import { CTA } from "./cta";

export function CTADemo() {
  return (
    <CTA
      headline="Ready to build something amazing?"
      description="Start building your next project with our platform. Free to get started, powerful enough for scale."
      primary={{ label: "Get Started Free", href: "#" }}
      secondary={{ label: "Contact Sales", href: "#" }}
    />
  );
}
