import { Testimonials } from "./testimonials";

export function TestimonialsDemo() {
  return (
    <Testimonials
      title="What our customers say"
      description="Trusted by thousands of developers and teams around the world."
      testimonials={[
        {
          quote:
            "This product completely transformed how our team works. We shipped features twice as fast and the developer experience is outstanding.",
          name: "Sarah Chen",
          role: "CTO, TechStart Inc.",
          avatarFallback: "SC",
        },
        {
          quote:
            "The best developer tool we have adopted this year. The documentation is excellent and the community support is top-notch.",
          name: "Marcus Johnson",
          role: "Senior Engineer, DataFlow",
          avatarFallback: "MJ",
        },
        {
          quote:
            "Switching to this platform was the right decision. It has streamlined our entire workflow and reduced deployment errors by 80%.",
          name: "Emily Rodriguez",
          role: "Engineering Lead, BuildCo",
          avatarFallback: "ER",
        },
      ]}
    />
  );
}
