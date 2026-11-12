<p align="center">
  <a href="https://plankui.com"><img src="https://plankui.com/logo.svg" width="64" height="64" alt="PlankUI" /></a>
</p>

<h1 align="center">plankui</h1>

<p align="center">
  The command line for <a href="https://plankui.com">PlankUI</a>: accessible React components for Tailwind CSS v4,<br />
  copied into your project so you own every line.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/plankui"><img src="https://img.shields.io/npm/v/plankui?style=flat-square&color=2f6bff&label=npm" alt="npm version" /></a>
  <a href="https://www.npmjs.com/package/plankui"><img src="https://img.shields.io/npm/dm/plankui?style=flat-square&color=2f6bff" alt="Downloads a month" /></a>
  <a href="https://github.com/VectorLabsHQ/plankui"><img src="https://img.shields.io/github/stars/VectorLabsHQ/plankui?style=flat-square&color=2f6bff&logo=github" alt="GitHub stars" /></a>
  <a href="https://github.com/VectorLabsHQ/plankui/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/plankui?style=flat-square&color=2f6bff" alt="MIT licence" /></a>
</p>

<p align="center">
  <a href="https://plankui.com">Website</a> ·
  <a href="https://plankui.com/docs/installation">Installation</a> ·
  <a href="https://plankui.com/docs/components">Components</a> ·
  <a href="https://plankui.com/docs/theming">Theming</a> ·
  <a href="https://plankui.com/docs/mcp">MCP server</a>
</p>

<p align="center">
  <a href="https://plankui.com"><img src="https://plankui.com/readme/components-light.jpg" alt="PlankUI components: charts, forms, a command menu, navigation, toggles and an upload card" /></a>
</p>

## Quick start

In a React 19 project with Tailwind CSS v4:

```bash
npx plankui@latest init
npx plankui@latest add button select dialog
```

That's it. `init` sets up the design tokens once, and `add` drops each component into `components/ui`, together with every PlankUI file it builds on and the npm packages it needs.

```tsx
import { Button } from "@/components/ui/button";

export function Save() {
  return <Button>Save changes</Button>;
}
```

## Why PlankUI

- **You own the code.** Components land in your repo as plain TypeScript. Read them, change any line, never wait on a package upgrade.
- **Beautiful by default.** Six themes and five component styles (Soft, Flat, Liquid glass, Keycap, Brutal), in light and dark, from one tokens file.
- **Accessible.** Keyboard support, focus rings, ARIA roles and reduced motion handled for you.
- **Agent ready.** The [PlankUI MCP server](https://www.npmjs.com/package/@plankui/mcp) gives Cursor, Claude Code, VS Code and other agents the real source of every component.

## Commands

| Command | What it does |
| --- | --- |
| `plankui init` | Writes `tokens.css`, `styles.css` and the `cn` helper, and installs `clsx` and `tailwind-merge` |
| `plankui add <names…>` | Copies components and the PlankUI files they build on, then installs their npm packages |
| `plankui list` | Lists every component you can add |

## Options

| Option | |
| --- | --- |
| `--yes`, `-y` | Answer every prompt with its default and keep files that already exist. Use it in CI and for coding agents |
| `--overwrite` | Replace files that already exist |
| `--no-install` | Write the files but skip installing npm packages |
| `--cwd <dir>` | Run in another folder |
| `--registry <url>` | Read components from another registry |

The CLI picks your package manager (npm, pnpm, yarn or bun) from your lockfile, never writes outside your project and has no dependencies of its own.

## Components

35 components today, with more every week.

| | |
| --- | --- |
| **Actions** | [Button](https://plankui.com/docs/components/button), [Segmented control](https://plankui.com/docs/components/segmented), [Dropdown menu](https://plankui.com/docs/components/dropdown-menu), [Button group](https://plankui.com/docs/components/button-group), [Copy button](https://plankui.com/docs/components/copy-button) |
| **Forms** | [Input](https://plankui.com/docs/components/input), [Textarea](https://plankui.com/docs/components/textarea), [Select](https://plankui.com/docs/components/select), [Checkbox](https://plankui.com/docs/components/checkbox), [Radio group](https://plankui.com/docs/components/radio-group), [Switch](https://plankui.com/docs/components/switch), [Slider](https://plankui.com/docs/components/slider), [Combobox](https://plankui.com/docs/components/combobox), [Input OTP](https://plankui.com/docs/components/input-otp), [Password input](https://plankui.com/docs/components/password-input) |
| **Overlays** | [Dialog](https://plankui.com/docs/components/dialog), [Popover](https://plankui.com/docs/components/popover), [Tooltip](https://plankui.com/docs/components/tooltip), [Sheet](https://plankui.com/docs/components/sheet), [Alert dialog](https://plankui.com/docs/components/alert-dialog) |
| **Feedback** | [Toast](https://plankui.com/docs/components/toast), [Alert](https://plankui.com/docs/components/alert), [Progress](https://plankui.com/docs/components/progress), [Skeleton](https://plankui.com/docs/components/skeleton), [Spinner](https://plankui.com/docs/components/spinner) |
| **Display** | [Card](https://plankui.com/docs/components/card), [Avatar](https://plankui.com/docs/components/avatar), [Badge](https://plankui.com/docs/components/badge), [Kbd](https://plankui.com/docs/components/kbd), [Separator](https://plankui.com/docs/components/separator), [Table](https://plankui.com/docs/components/table) |
| **Navigation** | [Tabs](https://plankui.com/docs/components/tabs), [Accordion](https://plankui.com/docs/components/accordion), [Breadcrumb](https://plankui.com/docs/components/breadcrumb), [Pagination](https://plankui.com/docs/components/pagination) |

## Themes and styles

Set a theme and a style on `html`, or on any element to scope them:

```html
<html data-theme="ember" data-style="keycap" class="dark">
```

| Themes | Base, Ember, Grove, Nebula, Terminal, Candy |
| --- | --- |
| **Styles** | Soft, Flat, Liquid glass, Keycap, Brutal |
| **Accents** | Blue, Vermilion, Violet, Emerald, Rose, Amber, Mono, or any hue you like |

Try them live at [plankui.com](https://plankui.com/#themes).

## Requirements

React 19, Tailwind CSS v4 and Node 18 or later. Guides for Vite, Next.js and React Router: [plankui.com/docs/installation](https://plankui.com/docs/installation).

## Licence

MIT. Made by [Vector Labs](https://github.com/VectorLabsHQ).
