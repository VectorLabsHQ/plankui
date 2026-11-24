<p align="center">
  <a href="https://plankui.com/docs/mcp"><img src="https://plankui.com/logo.svg" width="64" height="64" alt="PlankUI" /></a>
</p>

<h1 align="center">@plankui/mcp</h1>

<p align="center">
  Give your coding agent the source, props, and usage examples for every free PlankUI <a href="https://plankui.com/docs/components">component</a>, <a href="https://plankui.com/docs/blocks">block</a> and <a href="https://plankui.com/docs/templates">template</a>.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@plankui/mcp"><img src="https://img.shields.io/npm/v/@plankui/mcp?style=flat-square&color=2f6bff&label=npm" alt="npm version" /></a>
  <a href="https://www.npmjs.com/package/@plankui/mcp"><img src="https://img.shields.io/npm/dm/@plankui/mcp?style=flat-square&color=2f6bff" alt="Downloads a month" /></a>
  <a href="https://github.com/VectorLabsHQ/plankui"><img src="https://img.shields.io/github/stars/VectorLabsHQ/plankui?style=flat-square&color=2f6bff&logo=github" alt="GitHub stars" /></a>
  <a href="https://modelcontextprotocol.io"><img src="https://img.shields.io/badge/MCP-stdio-2f6bff?style=flat-square" alt="MCP over stdio" /></a>
  <a href="https://github.com/VectorLabsHQ/plankui/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/@plankui/mcp?style=flat-square&color=2f6bff" alt="MIT licence" /></a>
</p>

<p align="center">
  <a href="https://plankui.com">Website</a> ·
  <a href="https://plankui.com/docs/mcp">MCP docs</a> ·
  <a href="https://plankui.com/docs/components">Components</a> ·
  <a href="https://www.npmjs.com/package/plankui">CLI</a>
</p>

<p align="center">
  <a href="https://plankui.com/docs/mcp"><img src="https://plankui.com/readme/components-dark.jpg" alt="PlankUI components in dark mode: charts, forms, a command menu, navigation and toggles" /></a>
</p>

## Add it to your agent

**Claude Code**

```bash
claude mcp add plankui -- npx -y @plankui/mcp
```

**Cursor, Windsurf, Claude Desktop, Gemini CLI** and most other clients read this shape:

```json
{
  "mcpServers": {
    "plankui": { "command": "npx", "args": ["-y", "@plankui/mcp"] }
  }
}
```

<details>
<summary><b>VS Code</b></summary>

In `.vscode/mcp.json`:

```json
{
  "servers": {
    "plankui": { "type": "stdio", "command": "npx", "args": ["-y", "@plankui/mcp"] }
  }
}
```

</details>

<details>
<summary><b>Codex</b></summary>

In `~/.codex/config.toml`:

```toml
[mcp_servers.plankui]
command = "npx"
args = ["-y", "@plankui/mcp"]
```

</details>

<details>
<summary><b>Zed</b></summary>

In your Zed settings:

```json
{
  "context_servers": {
    "plankui": { "source": "custom", "command": "npx", "args": ["-y", "@plankui/mcp"] }
  }
}
```

</details>

Open the [MCP setup guide](https://plankui.com/docs/mcp) for one-click installs in Cursor and VS Code and configuration for other clients.

Tools load when a session starts, so restart the client or open a new chat after adding the server.

## Example prompts

> Build a storage overview with a Native meter for disk usage, a Figure for the usage chart, and a Skip link before navigation.

> Build a settings page with PlankUI: tabs for Profile and Billing, a form with a select and a switch, and a confirm dialog before deleting the account.

> Show a short conversation with incoming and outgoing PlankUI chat messages.

> Set up PlankUI in this project with the Ember theme and the Keycap style.

> Add a PlankUI icon button and fieldset to my settings form using Base UI.

The server returns source and setup instructions that your agent can use to add the components to your project. To install components directly from the terminal, use the [PlankUI CLI](https://www.npmjs.com/package/plankui).

## Tools

| Tool | Description |
| --- | --- |
| `list_components` | Component and block slugs, categories, and descriptions. Filter by category (Blocks for ready-made sections) |
| `search_components` | Components that match an intent, such as "confirm dialog" |
| `get_component` | Source, dependencies, usage, and props. Pass `primitives: "base"` to request Base UI implementations where available |
| `get_component_usage` | Usage and props only (same `primitives` option) |
| `list_templates` | Complete screens, such as contact form, card grid and chat landing |
| `get_template` | A template's full page source and the components it is built from |
| `get_setup` | The tokens, styles and `cn` helper every project needs |
| `get_theming` | Themes, styles, accents and how to change them |

## How it runs

The server runs locally over stdio and reads the component registry bundled with the package.

## Requirements

Node 18 or later and any client that speaks MCP.

## Licence

MIT. Made by [Vector Labs](https://github.com/VectorLabsHQ).
