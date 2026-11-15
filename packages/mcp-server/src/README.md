# @ui-x/mcp-server

Read-only MCP server for the UI-X component registry. AI coding agents (Claude Code, Copilot, etc.) use it to discover components, blocks, and theme tokens without touching the filesystem directly.

---

## How to run

### Prerequisites

- Node.js >= 22
- pnpm (the project uses workspaces)
- The `ui-x` registry must be built (`pnpm build`) so that `registry/index.json` exists at the project root.

### Start the server

```bash
pnpm --filter @ui-x/mcp-server start
```

Or invoke the binary directly via the package script:

```bash
pnpm --filter @ui-x/mcp-server exec ui-x-mcp
```

The server communicates over **stdio** (stdin/stdout) using the Model Context Protocol (MCP). No HTTP port is opened.

### Configure with Claude Code

Add the server to your Claude Code MCP config (`~/.claude.json` or project-level `.claude/settings.json`):

```json
{
  "mcpServers": {
    "ui-x": {
      "command": "node",
      "args": [
        "/absolute/path/to/ui-x/packages/mcp-server/src/index.ts"
      ],
      "env": {
        "NODE_OPTIONS": "--loader ts-node/esm"
      }
    }
  }
}
```

> Use the absolute path to `src/index.ts` (or compile to `dist/index.js` and point there).

### Configure with VS Code / GitHub Copilot

Add the following to `.vscode/mcp.json` in your workspace:

```json
{
  "servers": {
    "ui-x": {
      "command": "node",
      "args": ["packages/mcp-server/src/index.ts"],
      "env": { "NODE_OPTIONS": "--loader ts-node/esm" }
    }
  }
}
```

---

## Available tools

### `search_components`

Search the registry by component name, description keyword, or tag.

| Parameter | Type   | Required | Default | Description                             |
|-----------|--------|----------|---------|-----------------------------------------|
| `query`   | string | yes      | —       | Search term                             |
| `limit`   | number | no       | 10      | Maximum results to return               |

**Returns:** JSON array of matching `RegistryItem` objects.

---

### `get_component`

Fetch the full validated metadata for a single component by its registry name.

| Parameter | Type   | Required | Description                             |
|-----------|--------|----------|-----------------------------------------|
| `name`    | string | yes      | Component name, e.g. `"button"`         |

**Returns:** Parsed `RegistryItem` JSON. Throws an error if the item is not in the registry.

---

### `list_blocks`

List all blocks (composite page sections) in the registry, optionally filtered by category.

| Parameter | Type    | Required | Description                                    |
|-----------|---------|----------|------------------------------------------------|
| `category`| string  | no       | Filter by category or tag (e.g. `"navigation"`)|

**Returns:** JSON array of `RegistryItem` objects with `type: "registry:block"`.

---

### `get_theme_tokens`

Retrieve the generated CSS custom-property tokens for both light and dark themes.

| Parameter | Type    | Required |
|-----------|---------|----------|
| _(none)_  | —       | —        |

**Returns:** Raw CSS string containing `:root` and `.dark` token blocks.

---

### `get_install_command`

Return a structured install plan for a component or block, including all transitive `registryDependencies` and the `npm` packages required.

| Parameter | Type   | Required | Description                             |
|-----------|--------|----------|-----------------------------------------|
| `name`    | string | yes      | Component or block name                  |

**Returns:** JSON object with:
- `command` — the `npx ui-x add` invocation
- `registryDependencies` — ordered list of registry items to pull in
- `npmPackages` — unique npm packages required (merged from all resolved items)
- `filesToWrite` — file paths that the install plan will create

Throws an error if the item is not found.

---

## Example AI workflow

```text
User:  "Add a button with an icon variant to my dashboard."

Agent: [calls search_components "button"]
       → finds "button" and "input" (for the icon slot)

       [calls get_component "button"]
       → reads files, registryDependencies, npmPackages

       [calls list_blocks category="navigation"]
       → checks whether a sidebar block already exists

       [calls get_install_command "button"]
       → receives install plan:
         {
           "command": "npx ui-x add button",
           "registryDependencies": ["button"],
           "npmPackages": ["class-variance-authority", "clsx", "tailwind-merge"],
           "filesToWrite": ["components/ui/button.tsx"]
         }
       → presents the plan to the user and runs the CLI
```

---

## Security note

This MCP server is **read-only by default**. It:

- Reads `registry/index.json` from the project root at startup only.
- Never writes to the filesystem.
- Never executes component source code — all tool results are metadata (JSON/CSS).
- Does not expose raw source file contents; `get_component` returns the Zod-validated `RegistryItem` schema object only.

If you extend this server to serve file contents (e.g. `get_source_file`), restrict access to the `allowedPaths` declared in `ui-x.config.json` and document the new capability here.
