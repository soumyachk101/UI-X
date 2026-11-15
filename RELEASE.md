# Release Process

This document covers the full release workflow for UI-X packages.

## Pre-Release Checklist

- [ ] All packages at `0.0.0` have been bumped to the target version (e.g. `0.1.0`)
- [ ] `private: false` has been set on every package.json that should be published
- [ ] `pnpm typecheck` passes for all packages
- [ ] `pnpm lint` passes for all packages
- [ ] `pnpm test` passes for all packages
- [ ] Registry validation (`pnpm test:registry`) passes
- [ ] All component `index.json` entries have correct `version` fields
- [ ] CHANGELOG.md has been updated with release notes
- [ ] README.md reflects the current release
- [ ] Documentation site builds and deploys successfully
- [ ] GitHub Actions workflows are passing on main

## Package Publish Order

Packages must be published in dependency order. Run each command from the repository root.

```bash
# 1. Shared utilities (no internal deps)
pnpm --filter @ui-x/shared publish --access public

# 2. Registry schema (depends on shared)
pnpm --filter @ui-x/registry-schema publish --access public

# 3. Tokens (depends on shared)
pnpm --filter @ui-x/tokens publish --access public

# 4. Registry (depends on registry-schema, shared)
pnpm --filter @ui-x/registry publish --access public

# 5. Theme engine (depends on tokens, shared)
pnpm --filter @ui-x/theme-engine publish --access public

# 6. CLI (depends on registry, registry-schema, shared)
pnpm --filter @ui-x/cli publish --access public

# 7. MCP server (depends on registry, registry-schema, shared)
pnpm --filter @ui-x/mcp-server publish --access public

# 8. Testing utilities (depends on shared)
pnpm --filter @ui-x/testing publish --access public
```

### Per-Package Commands (alternative)

```bash
cd packages/shared     && pnpm publish --access public
cd packages/tokens     && pnpm publish --access public
cd packages/registry-schema && pnpm publish --access public
cd packages/registry   && pnpm publish --access public
cd packages/theme-engine && pnpm publish --access public
cd packages/cli        && pnpm publish --access public
cd packages/mcp-server && pnpm publish --access public
cd packages/testing    && pnpm publish --access public
```

> **Tagging:** Tag each package with the matching version tag, e.g. `@ui-x/cli@0.1.0`, to avoid ambiguity during rollout.

## GitHub Release Steps

1. Ensure all pre-release checklist items are complete.
2. Merge all release PRs into `main` and confirm CI is green.
3. Create and push a version tag:

   ```bash
   git tag v0.1.0
   git push --tags
   ```

4. Draft a GitHub Release at `https://github.com/<org>/ui-x/releases/new`:
   - **Tag:** `v0.1.0`
   - **Title:** `v0.1.0 — Initial Release`
   - **Body:** Paste the relevant section from CHANGELOG.md
   - Attach the built CLI binary if applicable
5. Publish the release.
6. Announce in community channels (Discord, Twitter/X, etc.).

## Documentation Deployment

```bash
# Build and deploy the docs site
cd apps/docs
pnpm build

# Vercel (if configured)
vercel --prod

# Or Netlify
netlify deploy --prod

# Or static export
pnpm build && pnpm export
```

After deployment, update the following to point to the live URL:

- README.md documentation link: `[ui-x.dev](https://ui-x.dev)`
- Registry `docs` URLs in `registry/default/components/*/index.json`

## Post-Release

- [ ] Verify published packages are installable: `npm view @ui-x/cli@0.1.0`
- [ ] Verify docs site is live and rendering correctly
- [ ] Create the next milestone (e.g. `v0.2.0`)
- [ ] Close the release milestone and move unresolved issues to the next one
- [ ] Monitor GitHub Issues and Discord for bug reports
