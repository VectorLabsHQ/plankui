<p align="center"><a href="https://plankui.com"><img src="https://plankui.com/logo.svg" width="56" height="56" alt="PlankUI" /></a></p>

<h1 align="center">PlankUI</h1>

<p align="center">Beautiful by default, yours to shape.<br />Accessible React components for Tailwind CSS v4 and Radix.</p>

<p align="center"><a href="https://plankui.com">Website</a> · <a href="https://plankui.com/docs">Docs</a> · <a href="https://plankui.com/docs/components">Components</a> · <a href="https://plankui.com/docs/mcp">MCP server</a></p>

---

PlankUI is a set of React components you add to your own project. The code lands in your repo, so you can read it, change any line and never wait on a package upgrade. Every colour, radius and shadow is a CSS variable, so six themes and five component styles come from one tokens file.

## Get started

In a React 19 project with Tailwind CSS v4:

```bash
npx plankui@latest init
npx plankui@latest add button select dialog
```

`init` writes `tokens.css`, `styles.css` and the `cn` helper and installs the shared packages. `add` copies each component and every PlankUI file it builds on, then installs their npm packages. Prefer to copy by hand? Every file is in this repo and on each component's page.

Full guides for Vite, Next.js and React Router: [plankui.com/docs/installation](https://plankui.com/docs/installation).

## Components

35 components today, with more every week.

**Actions:** [Button](https://plankui.com/docs/components/button), [Segmented control](https://plankui.com/docs/components/segmented), [Dropdown menu](https://plankui.com/docs/components/dropdown-menu), [Button group](https://plankui.com/docs/components/button-group), [Copy button](https://plankui.com/docs/components/copy-button)

**Forms:** [Input](https://plankui.com/docs/components/input), [Textarea](https://plankui.com/docs/components/textarea), [Select](https://plankui.com/docs/components/select), [Checkbox](https://plankui.com/docs/components/checkbox), [Radio group](https://plankui.com/docs/components/radio-group), [Switch](https://plankui.com/docs/components/switch), [Slider](https://plankui.com/docs/components/slider), [Combobox](https://plankui.com/docs/components/combobox), [Input OTP](https://plankui.com/docs/components/input-otp), [Password input](https://plankui.com/docs/components/password-input)

**Overlays:** [Dialog](https://plankui.com/docs/components/dialog), [Popover](https://plankui.com/docs/components/popover), [Tooltip](https://plankui.com/docs/components/tooltip), [Sheet](https://plankui.com/docs/components/sheet), [Alert dialog](https://plankui.com/docs/components/alert-dialog)

**Feedback:** [Toast](https://plankui.com/docs/components/toast), [Alert](https://plankui.com/docs/components/alert), [Progress](https://plankui.com/docs/components/progress), [Skeleton](https://plankui.com/docs/components/skeleton), [Spinner](https://plankui.com/docs/components/spinner)

**Display:** [Card](https://plankui.com/docs/components/card), [Avatar](https://plankui.com/docs/components/avatar), [Badge](https://plankui.com/docs/components/badge), [Kbd](https://plankui.com/docs/components/kbd), [Separator](https://plankui.com/docs/components/separator), [Table](https://plankui.com/docs/components/table)

**Navigation:** [Tabs](https://plankui.com/docs/components/tabs), [Accordion](https://plankui.com/docs/components/accordion), [Breadcrumb](https://plankui.com/docs/components/breadcrumb), [Pagination](https://plankui.com/docs/components/pagination)

**Templates:** [Sign in](https://plankui.com/docs/templates/sign-in)

## Use it with your AI agent

The PlankUI MCP server gives Cursor, Claude Code, VS Code, Codex and other agents the real source, props and usage of every component.

```bash
claude mcp add plankui -- npx -y @plankui/mcp
```

Setup for every client: [plankui.com/docs/mcp](https://plankui.com/docs/mcp).

## What's in this repo

| Folder | What it is |
| --- | --- |
| `components/ui` | Every component, exactly as `plankui add` writes it |
| `lib`, `styles` | The `cn` helper, `tokens.css` and `styles.css`, as `plankui init` writes them |
| `templates` | Complete screens built from the components |
| `cli` | The `plankui` command ([npm](https://www.npmjs.com/package/plankui)) |
| `mcp` | The `@plankui/mcp` server ([npm](https://www.npmjs.com/package/@plankui/mcp)) |

## Licence

MIT. Built by Vector Labs.
