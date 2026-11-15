# UI-X

A source-first, copy-paste component ecosystem for React and Next.js. 25 accessible primitives, 5 layout blocks, 3 theme presets, and a CLI — designed for developers who want full control over their UI without fighting runtime abstractions.

## Why UI-X

Most component libraries lock you in: you install a package, accept its API, and patch over behavior you don't own. UI-X takes the opposite approach. Components are authored as source and installed as source. Once they land in your project, they are yours to modify. There is no runtime dependency, no bundle overhead, and no version lag between the docs and what's actually running in your app.

## Packages

| Package | Description |
|---------|-------------|
| `@ui-x/cli` | CLI for installing, updating, and managing components |
| `@ui-x/registry` | Component registry and resolver |
| `@ui-x/registry-schema` | Zod validation schemas for registry items |
| `@ui-x/tokens` | Design tokens and CSS custom properties |
| `@ui-x/mcp-server` | MCP server for AI agent integration |
| `@ui-x/theme-engine` | Theme generation and management |
| `@ui-x/shared` | Shared utilities |
| `@ui-x/testing` | Reusable test utilities |

## Quick Start

### Installation

```bash
# Install the CLI globally
pnpm add -g @ui-x/cli
```

### Scaffold a new project

```bash
# Create a new Next.js project with UI-X configured
ui-x init my-app
cd my-app
pnpm dev
```

### Add components to an existing project

```bash
# Initialize UI-X in an existing project
ui-x init

# Browse available components
ui-x list

# Install a component
ui-x add button

# Search for components
ui-x search dialog
```

## CLI Reference

| Command | Description |
|---------|-------------|
| `ui-x init` | Scaffold a new project or initialize an existing one |
| `ui-x add` | Install components, blocks, or hooks |
| `ui-x list` | List all available registry items |
| `ui-x search` | Fuzzy-search the registry |
| `ui-x info` | Show detailed metadata for a registry item |
| `ui-x diff` | Compare component versions |
| `ui-x update` | Upgrade installed components |
| `ui-x doctor` | Verify project health and configuration |

## Components

25 production-ready, accessible components built on Radix UI:

- **Forms:** `button`, `input`, `textarea`, `checkbox`, `radio-group`, `select`, `switch`, `label`
- **Data Display:** `table`, `badge`, `avatar`, `progress`, `skeleton`, `pagination`
- **Feedback:** `alert`, `toast`, `sonner`, `empty-state`
- **Navigation:** `breadcrumb`, `navigation-menu`, `collapsible`
- **Layout:** `command`
- **Overlays:** `date-picker`, `calendar`, `slider`

## Blocks

Ready-made page sections that combine multiple components:

| Block | Description |
|-------|-------------|
| `hero` | Full-width hero with headline, subtext, and CTA |
| `features` | Grid of feature cards with icons |
| `pricing` | Pricing table with plan comparison |
| `sidebar` | Collapsible sidebar navigation layout |
| `stats` | Key metrics display with labels and values |

## Theme Presets

Three complete theme configurations:

| Preset | Description |
|--------|-------------|
| `default` | Neutral palette, suitable for most applications |
| `ocean` | Cool blues and teals, ideal for SaaS and developer tools |
| `forest` | Earthy greens and warm neutrals, suited for content-driven sites |

## MCP Server

The `@ui-x/mcp-server` package exposes UI-X registry tools through the [Model Context Protocol](https://modelcontextprotocol.io/), letting AI coding agents search for, inspect, and install components directly within your workflow.

## Documentation

Full documentation is available at [ui-x.dev](https://ui-x.dev) (placeholder — coming soon).

## Development

```bash
# Install dependencies
pnpm install

# Run all packages in dev mode
pnpm dev

# Build all packages
pnpm build

# Lint all packages
pnpm lint

# Run all tests
pnpm test

# Typecheck all packages
pnpm typecheck
```

## Architecture

UI-X is source-first. Components in the registry are treated as the canonical source. When a project runs `ui-x add button`, the component's source files are copied into the project's source tree. From that point on, the project owns the code. There is no runtime dependency on `@ui-x/*` packages — the installed components ship as plain React components and CSS.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for setup instructions, component authoring guidelines, and the registry schema reference.

## License

MIT
