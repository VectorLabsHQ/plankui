<p align="center">
  <a href="https://plankui.com/docs/mcp"><img src="https://plankui.com/logo.svg" width="64" height="64" alt="PlankUI" /></a>
</p>

<h1 align="center">@plankui/mcp</h1>

<p align="center">
  The <a href="https://plankui.com">PlankUI</a> MCP server. Your AI coding agent gets the real source, props and usage<br />
  of every component, so it builds with PlankUI instead of guessing.
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

One-click installs for Cursor and VS Code, and setup for every client: [plankui.com/docs/mcp](https://plankui.com/docs/mcp).

Tools load when a session starts, so restart the client or open a new chat after adding the server.

## Then just ask

> Build a settings page with PlankUI: tabs for Profile and Billing, a form with a select and a switch, and a confirm dialog before deleting the account.

> Which PlankUI component should I use for picking one option from a short list?

> Set up PlankUI in this project with the Ember theme and the Keycap style.

> Add a PlankUI select and dialog using Base UI.

The agent looks components up, reads their real source and props, and writes code that matches the library, including the right install commands.

## Tools

| Tool | Returns |
| --- | --- |
| `list_components` | Every component with its slug, category and one line on what it does |
| `search_components` | Components that match an intent, such as "confirm dialog" |
| `get_component` | Install command, full source of every file it needs, usage and props. Pass `primitives: "base"` for the Base UI version |
| `get_component_usage` | Usage and props only (same `primitives` option) |
| `list_templates` | Every template |
| `get_template` | A template's full source |
| `get_setup` | The tokens, styles and `cn` helper every project needs |
| `get_theming` | Themes, styles, accents and how to change them |

## Private by design

The server runs on your machine over stdio and reads a registry bundled in the package. Nothing is hosted, nothing is sent anywhere and there is nothing to sign up for.

## Requirements

Node 18 or later and any client that speaks MCP.

## Licence

MIT. Made by [Vector Labs](https://github.com/VectorLabsHQ).
