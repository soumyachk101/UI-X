const commands = [
  {
    name: "init",
    description: "Initialize a new UI-X project in the current directory.",
    example: "npx ui-x init",
  },
  {
    name: "add",
    description: "Add a component, block, or hook to your project.",
    example: "npx ui-x add button",
  },
  {
    name: "list",
    description: "List all available components, blocks, and hooks.",
    example: "npx ui-x list",
  },
  {
    name: "search",
    description: "Search the registry by name or keyword.",
    example: 'npx ui-x search "input"',
  },
  {
    name: "info",
    description: "Show metadata and source details for a given item.",
    example: "npx ui-x info button",
  },
  {
    name: "diff",
    description: "Compare local source against the registry for updates.",
    example: "npx ui-x diff button",
  },
  {
    name: "update",
    description: "Update outdated components to their latest registry version.",
    example: "npx ui-x update",
  },
  {
    name: "doctor",
    description: "Diagnose and fix common project configuration issues.",
    example: "npx ui-x doctor",
  },
];

export default function CliPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">CLI Reference</h1>
      <p className="mt-3 text-base text-muted-foreground">
        A complete reference for every command available in the UI-X CLI.
      </p>

      <div className="mt-10 overflow-hidden rounded-xl border border-border">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="px-4 py-3 font-semibold text-foreground">Command</th>
              <th className="px-4 py-3 font-semibold text-foreground">Description</th>
              <th className="px-4 py-3 font-semibold text-foreground">Example</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {commands.map((cmd) => (
              <tr key={cmd.name} className="hover:bg-muted/50">
                <td className="whitespace-nowrap px-4 py-3 font-mono font-medium text-foreground">
                  {cmd.name}
                </td>
                <td className="px-4 py-3 text-muted-foreground">{cmd.description}</td>
                <td className="whitespace-nowrap px-4 py-3">
                  <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">
                    {cmd.example}
                  </code>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
