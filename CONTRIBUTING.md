# Contributing to UI-X

Thank you for your interest in contributing to UI-X! This guide will walk you through setting up the project and adding new components.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Adding a New Component](#adding-a-new-component)
- [Component File Structure](#component-file-structure)
- [Testing](#testing)
- [Registry Schema](#registry-schema)
- [Code Style](#code-style)

## Prerequisites

- Node.js >= 18.18.0
- pnpm >= 9.0.0
- Git

## Setup

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd ui-x
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Verify the setup:

   ```bash
   pnpm typecheck
   pnpm lint
   pnpm test
   ```

## Adding a New Component

Follow these steps to add a new component to the registry:

### Step 1: Create the component files

Create a new directory under `registry/default/components/<component-name>/` with the following structure:

```
registry/default/components/<component-name>/
  index.tsx        # Component implementation
  index.ts         # Re-exports
  <component-name>.test.tsx    # Tests
  index.json       # Registry metadata
```

### Step 2: Write the component

- Use Tailwind CSS classes for styling
- Reference design tokens via CSS custom properties (e.g., `bg-primary`, `text-foreground`)
- Do not hardcode colors or spacing values
- Accept a `className` prop and merge it via the `cn()` utility from `@ui-x/shared`

### Step 3: Add tests

Every component must have a test file using Vitest and `@ui-x/testing` utilities:

```tsx
import { describe, it, expect } from "vitest";
import { renderComponent } from "@ui-x/testing";
import { YourComponent } from "./index";

describe("YourComponent", () => {
  it("renders correctly", () => {
    const { container } = renderComponent(<YourComponent />);
    expect(container.querySelector("button")).toBeTruthy();
  });
});
```

### Step 4: Create the registry entry

Add an `index.json` file in the component directory (see [Registry Schema](#registry-schema) below).

### Step 5: Register in the registry index

Add the component to `registry/index.json` under the `items` object.

### Step 6: Run checks

```bash
pnpm typecheck
pnpm lint
pnpm test
```

## Component File Structure

Each component must follow this structure:

| File | Required | Purpose |
|------|----------|---------|
| `index.tsx` | Yes | Component implementation with TypeScript |
| `index.ts` | Yes | Barrel re-export |
| `<name>.test.tsx` | Yes | Vitest test file |
| `index.json` | Yes | Registry metadata |

### index.tsx requirements

- Must be a valid React component with TypeScript
- Must accept `className?: string`
- Must forward refs where appropriate
- Must use `React.forwardRef` for components that accept refs
- Must not include hardcoded colors or spacing
- Must use design tokens from `@ui-x/tokens`

### index.ts requirements

```ts
export { ComponentName, type ComponentNameProps } from "./index.tsx";
export default ComponentName;
```

## Testing

- Every component must have a corresponding `.test.tsx` file
- Tests must use `@ui-x/testing` utilities (`renderComponent`, `screen`, etc.)
- Tests must run with `pnpm test`
- Accessibility checks are encouraged using `vitest-axe`
- Tests should cover:
  - Rendering
  - User interactions (clicks, typing, etc.)
  - Accessibility basics (keyboard navigation, ARIA attributes)

Run tests with:

```bash
pnpm test              # Run all tests
pnpm test:watch        # Watch mode
pnpm test:accessibility # Accessibility tests only
```

## Registry Schema

Every component needs an `index.json` file in its directory. The schema is defined in `@ui-x/registry-schema`.

### Required fields

```json
{
  "$schema": "https://ui-x.dev/schema/registry-item.json",
  "name": "component-name",
  "type": "registry:ui",
  "title": "Human Readable Title",
  "description": "A brief description of the component",
  "version": "0.0.0",
  "dependencies": [],
  "registryDependencies": [],
  "files": [
    {
      "path": "index.tsx",
      "type": "registry:ui",
      "target": ""
    }
  ],
  "tags": ["ui", "form"],
  "category": "components",
  "license": "MIT"
}
```

### Field descriptions

| Field | Required | Description |
|-------|----------|-------------|
| `name` | Yes | Unique kebab-case identifier for the component |
| `type` | Yes | One of: `registry:ui`, `registry:block`, `registry:hook`, `registry:lib`, `registry:theme`, `registry:util` |
| `title` | Yes | Human-readable display name |
| `description` | Yes | Brief description of what the component does |
| `version` | No | Semantic version (defaults to `0.0.0`) |
| `dependencies` | No | Array of npm package dependencies |
| `registryDependencies` | No | Other registry items this component depends on |
| `files` | Yes | Array of source files that make up the component |
| `tags` | No | Searchable tags for the registry |
| `category` | No | Component category for grouping |
| `license` | No | License identifier (defaults to `MIT`) |
| `docs` | No | URL to documentation |
| `preview` | No | URL to a preview image |
| `source` | No | URL to the source repository |
| `meta` | No | Object with `rsc`, `tsx`, `tailwind`, `cssVars`, `requires` flags |
| `compatibility` | No | Object with `react` and `nextjs` version requirements |

### File entry fields

| Field | Required | Description |
|-------|----------|-------------|
| `path` | Yes | Relative path to the file within the component directory |
| `type` | Yes | File type (usually same as item type) |
| `target` | No | Target path when installing (relative to project root) |
| `content` | No | Inline file content (for single-file components) |

## Code Style

- Use TypeScript strict mode
- Run `pnpm lint` before committing
- Run `pnpm typecheck` to verify types
- Follow the existing code patterns in the repository
- Use Prettier for formatting
