# @plankui/mcp

An [MCP](https://modelcontextprotocol.io) server that gives AI coding agents the whole [PlankUI](https://plankui.com) library: every component's source, props and usage, the templates, and the setup files.

It runs on your machine over stdio. Nothing is hosted and there is nothing to sign up for.

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

Setup for every client, with one-click installs for Cursor and VS Code: [plankui.com/docs/mcp](https://plankui.com/docs/mcp).

Tools load when a session starts, so restart the client or open a new chat after adding the server.

## Tools

| Tool | Returns |
| --- | --- |
| `list_components` | Every component with its slug, category and one line on what it does |
| `search_components` | Components that match an intent, such as "confirm dialog" |
| `get_component` | Install command, full source of every file it needs, usage and props |
| `get_component_usage` | Usage and props only |
| `list_templates` | Every template |
| `get_template` | A template's full source |
| `get_setup` | The tokens, styles and `cn` helper every project needs |
| `get_theming` | Themes, styles, accents and how to change them |

Needs Node 18 or later. MIT licensed.
