---
name: plankui
description: Build React UI with PlankUI, open-source React 19 and Tailwind CSS v4 components on Radix UI or Base UI. Use when adding, editing or styling components in a project that uses PlankUI, or when the user asks for PlankUI, or for accessible copy-paste React and Tailwind components such as buttons, forms, dialogs, tables, charts or a dashboard.
license: MIT
---

# PlankUI

PlankUI is a set of React 19 and Tailwind CSS v4 components whose source lives in components/ui. The code is the project's own to read and edit.

## Setting up
- In a React 19 project with Tailwind CSS v4, run `npx plankui@latest init` once. It writes tokens.css, styles.css and the cn helper, and asks for Radix UI or Base UI.
- pnpm, yarn, bun and deno work too (`pnpm dlx plankui@latest init`); the CLI installs packages with the project's own package manager.
- In a project set up with shadcn (it has components.json), add with `npx shadcn@latest add https://plankui.com/r/shadcn/base/<name>.json` when its style starts with "base-", or `https://plankui.com/r/shadcn/<name>.json` otherwise. There, PlankUI's colours are named plank-accent, plank-muted, plank-card and plank-ring (`text-plank-muted`, `bg-plank-accent`), because shadcn uses the plain names for its own.

## Adding components
- Add with the CLI: `npx plankui@latest add <name>`. It also adds the PlankUI files the component builds on and installs its npm packages. See every name with `npx plankui@latest list`.
- If the PlankUI MCP server is connected, call get_component for the real source, props and usage before writing code with a component.
- If plankui.json says "primitives": "base", the components use Base UI: add with --base, and pass primitives "base" to the MCP tools. Otherwise they use Radix UI.

## Using components
- Import from "@/components/ui/<name>", for example `import { Button } from "@/components/ui/button"`.
- Prefer an existing component over raw HTML: Button, Input, Select, Checkbox, Switch, Dialog, Sheet, Popover, Tabs, Card, Badge, Table, Toast and the rest.
- Wrap form controls in Field (from "@/components/ui/label") so the label, hint and error are connected to the control.
- Give icon-only buttons an aria-label, or use IconButton.
- Keep the focus rings, keyboard handling and reduced-motion behaviour when editing a component.

## Styling
- Colours, radius and shadows come from tokens.css. Use the semantic classes (bg-paper, bg-card, text-ink, text-muted, border-rule, bg-accent, text-accent-ink) and never hard-code a colour value.
- Themes are set with data-theme on the html element (volt, ember, grove, nebula, terminal, candy), component styles with data-style (soft, flat, glass, keycap, brutal), and dark mode with the "dark" class.
- Merge classes with cn() from "@/lib/cn".

Docs: https://plankui.com/docs · Every component in one file: https://plankui.com/llms-full.txt
