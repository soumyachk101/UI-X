import Link from "next/link";

const components = [
  {
    name: "button",
    label: "Button",
    description: "Interactive element for actions and triggers",
  },
  {
    name: "input",
    label: "Input",
    description: "Text field for user input",
  },
  {
    name: "textarea",
    label: "Textarea",
    description: "Multi-line text input area",
  },
  {
    name: "checkbox",
    label: "Checkbox",
    description: "Toggle for selecting options",
  },
  {
    name: "badge",
    label: "Badge",
    description: "Small status or category label",
  },
  {
    name: "avatar",
    label: "Avatar",
    description: "User profile image with fallback",
  },
  {
    name: "skeleton",
    label: "Skeleton",
    description: "Loading placeholder animation",
  },
];

export default function HomePage() {
  return (
    <div>
      <section className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Components
        </h1>
        <p className="mt-2 text-muted-foreground">
          Browse and explore the UI-X component library. Each component has an
          interactive playground with live previews and code snippets.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {components.map((component) => (
          <Link
            key={component.name}
            href={`/components/${component.name}`}
            className="group rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/50 hover:shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-semibold text-foreground capitalize">
                  {component.label}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {component.description}
                </p>
              </div>
              <span className="text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                View →
              </span>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}
