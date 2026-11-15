export default function ButtonPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">Button</h1>
      <p className="mt-3 text-base text-muted-foreground">
        A versatile button component with multiple variants, sizes, and composition support.
      </p>

      {/* Preview placeholder */}
      <div className="mt-8 flex items-center justify-center rounded-xl border border-dashed border-border bg-muted/40 px-6 py-16">
        <p className="text-sm text-muted-foreground">Component preview placeholder</p>
      </div>

      {/* Installation */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold text-foreground">Installation</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Install the button component in your project.
        </p>
        <pre className="mt-3 overflow-x-auto rounded-lg border border-border bg-muted px-4 py-3 text-sm text-foreground">
          <code>npx ui-x add button</code>
        </pre>
      </section>

      {/* Usage */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold text-foreground">Usage</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Import the component and render it in your app.
        </p>
        <pre className="mt-3 overflow-x-auto rounded-lg border border-border bg-muted px-4 py-3 text-sm text-foreground">
          <code>{`import { Button } from "@/components/ui/button";

export default function Page() {
  return <Button>Click me</Button>;
}`}</code>
        </pre>
      </section>

      {/* Props */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold text-foreground">Props</h2>
        <div className="mt-4 overflow-hidden rounded-xl border border-border">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="px-4 py-3 font-semibold text-foreground">Prop</th>
                <th className="px-4 py-3 font-semibold text-foreground">Type</th>
                <th className="px-4 py-3 font-semibold text-foreground">Default</th>
                <th className="px-4 py-3 font-semibold text-foreground">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                {
                  name: "variant",
                  type: '"default" | "destructive" | "outline" | "secondary" | "ghost" | "link"',
                  default: '"default"',
                  description: "Visual style variant of the button.",
                },
                {
                  name: "size",
                  type: '"default" | "sm" | "lg" | "icon"',
                  default: '"default"',
                  description: "Size of the button.",
                },
                {
                  name: "asChild",
                  type: "boolean",
                  default: "false",
                  description: "Merge props onto the child element via Slot.",
                },
                {
                  name: "className",
                  type: "string",
                  default: "undefined",
                  description: "Additional CSS classes to apply.",
                },
              ].map((prop) => (
                <tr key={prop.name} className="hover:bg-muted/50">
                  <td className="whitespace-nowrap px-4 py-3 font-mono font-medium text-foreground">
                    {prop.name}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                    {prop.type}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-muted-foreground">
                    {prop.default}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{prop.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
