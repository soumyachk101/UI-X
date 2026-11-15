import DocsLayout from "@/docs/layout";

const props = [
  { name: "type", type: '"text" | "password" | "email" | "number"', default: '"text"', description: "The native input type." },
  { name: "placeholder", type: "string", default: "undefined", description: "Placeholder text shown when empty." },
  { name: "disabled", type: "boolean", default: "false", description: "Whether the input is disabled." },
  { name: "invalid", type: "boolean", default: "false", description: "Shows the input in an error state." },
  { name: "className", type: "string", default: "undefined", description: "Additional CSS classes applied to the input wrapper." },
  { name: "error", type: "string", default: "undefined", description: "Error message displayed below the input when invalid." },
];

export default function InputPage() {
  return (
    <DocsLayout>
      <h1 className="text-3xl font-bold tracking-tight text-foreground">Input</h1>
      <p className="mt-3 text-base text-muted-foreground">
        A styled text input field with support for validation states, labels, and helper text.
      </p>

      {/* Preview */}
      <div className="mt-8 flex items-center justify-center rounded-xl border border-dashed border-border bg-muted/40 px-6 py-16">
        <p className="text-sm text-muted-foreground">Component preview placeholder</p>
      </div>

      {/* Installation */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold text-foreground">Installation</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Install the input component in your project.
        </p>
        <pre className="mt-3 overflow-x-auto rounded-lg border border-border bg-muted px-4 py-3 text-sm text-foreground">
          <code>npx ui-x add input</code>
        </pre>
      </section>

      {/* Usage */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold text-foreground">Usage</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Import the component and render it in your app.
        </p>
        <pre className="mt-3 overflow-x-auto rounded-lg border border-border bg-muted px-4 py-3 text-sm text-foreground">
          <code>{`import { Input } from "@/components/ui/input";

export default function Page() {
  return (
    <Input placeholder="Enter your email" type="email" />
  );
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
              {props.map((prop) => (
                <tr key={prop.name} className="hover:bg-muted/50">
                  <td className="whitespace-nowrap px-4 py-3 font-mono font-medium text-foreground">{prop.name}</td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{prop.type}</td>
                  <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-muted-foreground">{prop.default}</td>
                  <td className="px-4 py-3 text-muted-foreground">{prop.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </DocsLayout>
  );
}
