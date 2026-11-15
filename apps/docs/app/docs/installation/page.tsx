import Link from "next/link";

export default function InstallationPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">
        Installation
      </h1>
      <p className="mt-3 text-base text-muted-foreground">
        Get up and running with UI-X in a few minutes.
      </p>

      {/* Prerequisites */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold text-foreground">Prerequisites</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted-foreground marker:text-foreground/50">
          <li>Node.js 18 or later</li>
          <li>pnpm (recommended package manager)</li>
        </ul>
      </section>

      {/* Step 1 */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold text-foreground">Step 1: Install dependencies</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Install the UI-X CLI and peer dependencies in your project.
        </p>
        <pre className="mt-3 overflow-x-auto rounded-lg border border-border bg-muted px-4 py-3 text-sm text-foreground">
          <code>pnpm install</code>
        </pre>
      </section>

      {/* Step 2 */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold text-foreground">
          Step 2: Initialize your project
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Run the init command to scaffold the required configuration files.
        </p>
        <pre className="mt-3 overflow-x-auto rounded-lg border border-border bg-muted px-4 py-3 text-sm text-foreground">
          <code>npx ui-x init</code>
        </pre>
      </section>

      {/* Step 3 */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold text-foreground">Step 3: Add your first component</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Use the CLI to add the button component to your project.
        </p>
        <pre className="mt-3 overflow-x-auto rounded-lg border border-border bg-muted px-4 py-3 text-sm text-foreground">
          <code>npx ui-x add button</code>
        </pre>
      </section>

      {/* Next steps */}
      <section className="mt-12 border-t border-border pt-8">
        <h2 className="text-xl font-semibold text-foreground">Next steps</h2>
        <ul className="mt-3 space-y-2">
          <li>
            <Link
              href="/docs/cli"
              className="text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              Browse the CLI reference
            </Link>
          </li>
          <li>
            <Link
              href="/components/button"
              className="text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              View the Button component
            </Link>
          </li>
        </ul>
      </section>
    </main>
  );
}
