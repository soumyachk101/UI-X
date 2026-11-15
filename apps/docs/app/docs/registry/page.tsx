import DocsLayout from "@/docs/layout";

const registryStructure = [
  { level: "components", description: "Interactive UI pieces (button, input, dialog, etc.)." },
  { level: "blocks", description: "Layout-ready sections (hero, features, pricing, sidebar, stats)." },
  { level: "hooks", description: "Reusable behavior primitives (use-debounce, use-local-storage, etc.)." },
];

const schemaFields = [
  { name: "name", type: "string", description: "Unique identifier for the registry entry." },
  { name: "type", type: '"component" | "block" | "hook"', description: "Category of the entry." },
  { name: "description", type: "string", description: "Short summary shown in search results." },
  { name: "dependencies", type: "string[]", description: "Other entries required by this one." },
  { name: "files", type: "RegistryFile[]", description: "List of files to write on install." },
  { name: "meta", type: "object", description: "Optional metadata (docs link, category, tags)." },
];

export type RegistryEntry = {
  name: string;
  type: "component" | "block" | "hook";
  description: string;
  dependencies: string[];
  files: {
    path: string;
    content: string;
    target: string;
    type: "code" | "style" | "config";
  }[];
  meta?: {
    docs?: string;
    category?: string;
    tags?: string[];
  };
};

export default function RegistryPage() {
  return (
    <DocsLayout>
      <h1 className="text-3xl font-bold tracking-tight text-foreground">Registry</h1>
      <p className="mt-3 text-base text-muted-foreground">
        Understand how UI-X components and blocks are structured, and learn how to create custom registry entries.
      </p>

      {/* How the registry works */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold text-foreground">How the Registry Works</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Each registry entry describes a single component, block, or hook as a JSON or TypeScript object. The entry declares
          its files, dependencies, and metadata. The UI-X CLI reads these entries to install, diff, and update items in your
          project.
        </p>

        <div className="mt-6 space-y-3">
          {registryStructure.map((level) => (
            <div
              key={level.level}
              className="rounded-xl border border-border bg-card p-4"
            >
              <h3 className="text-sm font-semibold text-foreground">{level.level}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{level.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Registry schema */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold text-foreground">Registry Schema</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Every entry must conform to the following TypeScript schema. Optional fields can be omitted.
        </p>

        <pre className="mt-3 overflow-x-auto rounded-lg border border-border bg-muted px-4 py-3 text-sm text-foreground">
          <code>{`export type RegistryEntry = {
  name: string;
  type: "component" | "block" | "hook";
  description: string;
  dependencies: string[];
  files: {
    path: string;
    content: string;
    target: string;
    type: "code" | "style" | "config";
  }[];
  meta?: {
    docs?: string;
    category?: string;
    tags?: string[];
  };
};`}</code>
        </pre>

        <div className="mt-4 overflow-hidden rounded-xl border border-border">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="px-4 py-3 font-semibold text-foreground">Field</th>
                <th className="px-4 py-3 font-semibold text-foreground">Type</th>
                <th className="px-4 py-3 font-semibold text-foreground">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {schemaFields.map((field) => (
                <tr key={field.name} className="hover:bg-muted/50">
                  <td className="whitespace-nowrap px-4 py-3 font-mono font-medium text-foreground">{field.name}</td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{field.type}</td>
                  <td className="px-4 py-3 text-muted-foreground">{field.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Creating a custom entry */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold text-foreground">Creating Custom Registry Entries</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Build a new entry by defining its name, type, dependencies, and files. Register it in your local registry index so
          the CLI can discover it.
        </p>

        <pre className="mt-3 overflow-x-auto rounded-lg border border-border bg-muted px-4 py-3 text-sm text-foreground">
          <code>{`// registry/index.ts
import { myCustomButton } from "./my-custom-button";

export const registry = {
  components: [myCustomButton],
};

// registry/my-custom-button.ts
import type { RegistryEntry } from "@ui-x/registry";

export const myCustomButton: RegistryEntry = {
  name: "my-custom-button",
  type: "component",
  description: "A branded variant of the default button.",
  dependencies: ["@ui-x/button"],
  files: [
    {
      path: "components/ui/my-custom-button.tsx",
      content: \`
import { Button } from "@ui-x/button";
import { cn } from "@/lib/utils";

export function MyCustomButton({ className, ...props }) {
  return <Button className={cn("rounded-full", className)} {...props} />;
}
\`,
      target: "src/components",
      type: "code",
    },
  ],
  meta: {
    category: "custom",
    tags: ["brand", "button"],
  },
};`}</code>
        </pre>

        <p className="mt-4 text-sm text-muted-foreground">
          After adding the entry, run <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">npx ui-x list</code> to
          verify it appears. Users can install it with <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">npx ui-x add my-custom-button</code>.
        </p>
      </section>
    </DocsLayout>
  );
}
