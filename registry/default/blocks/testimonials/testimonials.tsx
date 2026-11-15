import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  avatarFallback: string;
}

interface TestimonialsProps {
  testimonials?: Testimonial[];
  title?: string;
  description?: string;
}

const defaultTestimonials: Testimonial[] = [
  {
    quote: "This product completely transformed how our team works. We shipped features twice as fast and the developer experience is outstanding.",
    name: "Sarah Chen",
    role: "CTO, TechStart Inc.",
    avatarFallback: "SC",
  },
  {
    quote: "The best developer tool we have adopted this year. The documentation is excellent and the community support is top-notch.",
    name: "Marcus Johnson",
    role: "Senior Engineer, DataFlow",
    avatarFallback: "MJ",
  },
  {
    quote: "Switching to this platform was the right decision. It has streamlined our entire workflow and reduced deployment errors by 80%.",
    name: "Emily Rodriguez",
    role: "Engineering Lead, BuildCo",
    avatarFallback: "ER",
  },
];

export function Testimonials({
  testimonials = defaultTestimonials,
  title = "Loved by developers worldwide",
  description = "See what the community has to say about their experience with our platform.",
}: TestimonialsProps) {
  return (
    <section className="py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{description}</p>
        </div>
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="rounded-xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <p className="text-sm leading-relaxed text-muted-foreground">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="mt-6 flex items-center gap-3">
                <Avatar>
                  <AvatarImage src="" alt={testimonial.name} />
                  <AvatarFallback>{testimonial.avatarFallback}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-semibold">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
