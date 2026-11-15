# Changelog

All notable changes to UI-X will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - TBD

### Added

- 25 components: `alert`, `avatar`, `badge`, `breadcrumb`, `button`, `calendar`, `checkbox`, `collapsible`, `command`, `date-picker`, `empty-state`, `input`, `label`, `navigation-menu`, `pagination`, `progress`, `radio-group`, `select`, `skeleton`, `slider`, `sonner`, `switch`, `table`, `textarea`, `toast` — production-ready, accessible primitives built on Radix UI with full Tailwind styling, CSS custom property token integration, and comprehensive test coverage.
- 5 blocks: `hero`, `features`, `pricing`, `sidebar`, `stats` — copy-and-paste page sections with responsive layouts and dark mode support.
- 3 theme presets: `default`, `ocean`, `forest` — complete design token configurations ready for project customization.
- CLI with 8 commands: `init` — scaffold a new project, `add` — install components, `list` — browse the registry, `search` — fuzzy-find items, `info` — inspect component metadata, `diff` — compare versions, `update` — upgrade installed items, `doctor` — verify project health.
- MCP server for AI agent integration — exposes registry search and component info as Model Context Protocol tools so coding agents can discover and install UI-X components natively.
- Documentation website (`apps/docs`) — full Next.js docs site with component examples, guides, and API reference.
- Registry schema and validator — Zod-based schema definitions with automated CI validation to guarantee registry integrity on every commit.
- CI/CD pipelines — GitHub Actions workflows covering continuous integration, accessibility regression testing, security scanning, registry validation, and automated release publishing.

> **Architecture note:** UI-X follows a source-first approach. Components are authored once and consumed directly from the registry source. There is no runtime client-side dependency — installed components ship as plain React and CSS, keeping bundle impact at zero.
