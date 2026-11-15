/**
 * UI-X MCP Server
 *
 * Provides read-only discovery tools for AI coding agents.
 * No component source is executed; only metadata is served.
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  type Tool,
} from "@modelcontextprotocol/sdk/types.js";

import {
  loadRegistryIndex,
  resolveItem,
  resolveDependencies,
  collectDependencies,
  buildInstallPlan,
} from "@ui-x/registry";
import { generateThemeCSS } from "@ui-x/theme-engine";
import { RegistryItemSchema } from "@ui-x/registry-schema";

import { fs } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

// ---------------------------------------------------------------------------
// Resolve project root so registry/index.json is always found correctly
// regardless of the cwd the MCP client launches us from.
// ---------------------------------------------------------------------------

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// packages/mcp-server/src/ → packages/mcp-server/ → packages/ → project root
const PROJECT_ROOT = join(__dirname, "..", "..", "..");
const REGISTRY_INDEX_PATH = join(PROJECT_ROOT, "registry", "index.json");

// ---------------------------------------------------------------------------
// Tool definitions
// ---------------------------------------------------------------------------

const TOOLS: Tool[] = [
  {
    name: "search_components",
    description:
      "Search the UI-X component registry by name, tag, or description. Returns matching components.",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string", description: "Search query string" },
        limit: { type: "number", default: 10 },
      },
      required: ["query"],
    },
  },
  {
    name: "get_component",
    description: "Fetch full metadata for a single component by name.",
    inputSchema: {
      type: "object",
      properties: {
        name: { type: "string", description: "Component name (e.g. 'button')" },
      },
      required: ["name"],
    },
  },
  {
    name: "list_blocks",
    description: "List all available blocks in the registry.",
    inputSchema: {
      type: "object",
      properties: {
        category: { type: "string" },
      },
    },
  },
  {
    name: "get_theme_tokens",
    description: "Retrieve generated CSS tokens for light and dark themes.",
    inputSchema: { type: "object", properties: {} },
  },
  {
    name: "get_install_command",
    description:
      "Return a structured install plan for a component or block, including " +
      "all transitive registry dependencies and npm packages required.",
    inputSchema: {
      type: "object",
      properties: {
        name: { type: "string", description: "Component or block name" },
      },
      required: ["name"],
    },
  },
];

// ---------------------------------------------------------------------------
// In-memory registry (loaded once at startup)
// ---------------------------------------------------------------------------

// `loadRegistryIndex` returns a fully typed Zod output: `{ version, lastUpdated?, items }`
let registryIndex: ReturnType<typeof loadRegistryIndex> | null = null;

function getIndex(): ReturnType<typeof loadRegistryIndex> {
  if (!registryIndex) {
    throw new Error("Registry not loaded. Check server startup.");
  }
  return registryIndex;
}

// ---------------------------------------------------------------------------
// Server setup
// ---------------------------------------------------------------------------

const server = new Server(
  { name: "ui-x-mcp", version: "0.0.0" },
  { capabilities: { tools: {} } }
);

// List tools
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: TOOLS,
}));

// Route tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  switch (name) {
    case "search_components": {
      const { query, limit = 10 } = args as { query: string; limit?: number };
      const index = getIndex();
      const q = query.toLowerCase();
      const matches = Object.values(index.items).filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.description?.toLowerCase().includes(q) ||
          item.tags.some((t) => t.toLowerCase().includes(q))
      );
      return {
        content: [{ type: "text", text: JSON.stringify(matches.slice(0, limit), null, 2) }],
      };
    }

    case "get_component": {
      const { name } = args as { name: string };
      const index = getIndex();
      const item = resolveItem(name, index);
      // Re-validate to guard against any runtime shape drift.
      const parsed = RegistryItemSchema.parse(item);
      return {
        content: [{ type: "text", text: JSON.stringify(parsed, null, 2) }],
      };
    }

    case "list_blocks": {
      const { category } = args as { category?: string };
      const index = getIndex();
      let blocks = Object.values(index.items).filter((i) => i.type === "registry:block");
      if (category) {
        blocks = blocks.filter(
          (b) => b.category === category || b.tags.includes(category)
        );
      }
      return {
        content: [{ type: "text", text: JSON.stringify(blocks, null, 2) }],
      };
    }

    case "get_theme_tokens": {
      const css = generateThemeCSS();
      return {
        content: [{ type: "text", text: css }],
      };
    }

    case "get_install_command": {
      const { name } = args as { name: string };
      try {
        const index = getIndex();
        // Resolve all transitive registry dependencies for this item.
        const plan = buildInstallPlan([name], index, new Map());
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  command: `npx ui-x add ${name}`,
                  registryDependencies: plan.items.map((i) => i.item.name),
                  npmPackages: plan.allDependencies,
                  filesToWrite: plan.filesToWrite.map((f) => f.path),
                },
                null,
                2
              ),
            },
          ],
        };
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        return {
          content: [
            {
              type: "text",
              text: `Error building install plan for "${name}": ${message}\n\n` +
                `Fallback: run\n\n  npx ui-x add ${name}\n\n` +
                `Then review generated files and add any required npm dependencies.`,
            },
          ],
        };
      }
    }

    default:
      throw new Error(`Unknown tool: ${name}`);
  }
});

// ---------------------------------------------------------------------------
// Registry loader
// ---------------------------------------------------------------------------

/**
 * Read and parse `registry/index.json` from the project root.
 *
 * Falls back to an empty registry (with a warning) when the file is absent,
 * allowing the server to start in development environments where the
 * registry has not been generated yet.
 */
async function loadRegistryFromFS(): Promise<ReturnType<typeof loadRegistryIndex>> {
  try {
    const raw = await fs.readFile(REGISTRY_INDEX_PATH, "utf-8");
    // `loadRegistryIndex` applies RegistryIndexSchema.parse internally and
    // returns the typed Zod output.
    return loadRegistryIndex(JSON.parse(raw));
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.warn(
      `MCP: Could not load registry at ${REGISTRY_INDEX_PATH} — ${message}. ` +
        "Discovery tools will return empty results."
    );
    // Return the shape that loadRegistryIndex produces for an empty index so
    // `getIndex()` continues to work without a null check in every handler.
    return loadRegistryIndex({ version: "0.0.0", items: {} });
  }
}

// ---------------------------------------------------------------------------
// Start
// ---------------------------------------------------------------------------

async function main() {
  // Load the registry before accepting any tool calls.
  registryIndex = await loadRegistryFromFS();

  if (Object.keys(registryIndex.items).length > 0) {
    console.error(
      `MCP: Registry loaded — ${Object.keys(registryIndex.items).length} items from ${REGISTRY_INDEX_PATH}`
    );
  }

  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((err) => {
  console.error("MCP server error:", err);
  process.exit(1);
});
