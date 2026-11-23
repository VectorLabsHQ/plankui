<a href="https://plankui.com">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://plankui.com/readme/components-dark.jpg" />
    <img src="https://plankui.com/readme/components-light.jpg" alt="PlankUI component previews with charts, forms, menus and navigation" width="100%" />
  </picture>
</a>

# PlankUI

[![CLI version](https://img.shields.io/npm/v/plankui?label=CLI)](https://www.npmjs.com/package/plankui)
[![MCP version](https://img.shields.io/npm/v/%40plankui%2Fmcp?label=MCP)](https://www.npmjs.com/package/@plankui/mcp)
[![MIT license](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

<a href="https://www.producthunt.com/products/plankui?utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-plankui"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1324147&theme=light" alt="PlankUI on Product Hunt" width="250" height="54"></a>

**101 free React components for Tailwind CSS v4.** Choose Radix UI or Base UI and copy the components into your project. Shared CSS variables power six themes, five styles, and light and dark mode.

[Website](https://plankui.com) · [Docs](https://plankui.com/docs) · [Component playground](https://plankui.com/docs/components) · [MCP setup](https://plankui.com/docs/mcp)

## Quick start

Run these commands in a React 19 project with Tailwind CSS v4.

```bash
npx plankui@latest init
npx plankui@latest add button select dialog
```

`init` saves your choice of Radix UI or Base UI and adds the shared styles and class helper. `add` copies the component source and installs its dependencies. See the [installation guide](https://plankui.com/docs/installation) for Vite, Next.js, React Router, and manual setup.

Already on shadcn? Every free component is also a shadcn registry item. Use `/r/shadcn/base/` for shadcn's base styles (the default) and `/r/shadcn/` for new-york and the radix styles:

```bash
npx shadcn@latest add https://plankui.com/r/shadcn/base/button.json
```

PlankUI's colours arrive as `plank-accent`, `plank-muted`, `plank-card` and `plank-ring`, so your shadcn components keep their look. See [With shadcn and v0](https://plankui.com/docs/installation#shadcn).

Run `npx plankui@latest list` to browse the catalog from your terminal. Works the same with `pnpm dlx`, `yarn dlx`, `bunx` or `deno run -A npm:`; the CLI installs dependencies with the package manager your project uses.

## Use PlankUI with an agent

The MCP server gives your agent component source, props, and usage examples. To connect it to Claude Code, run the following command.

```bash
claude mcp add plankui -- npx -y @plankui/mcp
```

For Cursor and other clients that use an `mcpServers` config, add the following entry.

```json
{
  "mcpServers": {
    "plankui": { "command": "npx", "args": ["-y", "@plankui/mcp"] }
  }
}
```

To teach any agent (Claude Code, Codex, Cursor, Copilot and others) how to use PlankUI, add the skill:

```bash
npx skills add VectorLabsHQ/plankui
```

In Claude Code, the plugin installs the skill and the MCP server together:

```
/plugin marketplace add VectorLabsHQ/plankui
/plugin install plankui@plankui
```

Try asking your agent to build a settings panel with PlankUI's Tabs, Switch, and Button. See the [MCP guide](https://plankui.com/docs/mcp) for setup in Codex, VS Code, and other clients.

## Repository layout

| Folder | Contents |
| --- | --- |
| [components/ui](components/ui) | Free components, including the Radix UI implementations |
| [components/base-ui](components/base-ui) | 27 dedicated Base UI implementations. The other components use shared source |
| [styles](styles) and [lib](lib) | Theme tokens, base styles, and the class helper |
| [templates](templates) | Complete screens built from PlankUI components |
| [cli](cli) | The `plankui` installer |
| [icons](icons) | PlankUI Icons, the `@plankui/icons` package: React components and SVGs |
| [mcp](mcp) | The `@plankui/mcp` server and component registry |
| [skills/plankui](skills/plankui/SKILL.md) | The agent skill, also served as [AGENTS.md](AGENTS.md) |

## Browse components

Select a component to see its live preview and usage examples. Run its CLI command from your project to add it.

### Actions

| Component | Description | CLI command |
| --- | --- | --- |
| [Toolbar](https://plankui.com/docs/components/toolbar) | Group related actions with a shared label and regular Tab navigation. | `npx plankui@latest add toolbar` |
| [Icon button](https://plankui.com/docs/components/icon-button) | A compact icon-only action with a required accessible label. | `npx plankui@latest add icon-button` |
| [Button](https://plankui.com/docs/components/button) | A keycap with a real bottom edge. It lifts on hover and sinks when pressed. | `npx plankui@latest add button` |
| [Segmented control](https://plankui.com/docs/components/segmented) | One choice from a short set. A raised pill slides to the chosen option. | `npx plankui@latest add segmented` |
| [Dropdown menu](https://plankui.com/docs/components/dropdown-menu) | A menu of actions with shortcuts, checkable items and nested submenus. | `npx plankui@latest add dropdown-menu` |
| [Toggle](https://plankui.com/docs/components/toggle) | A two-state button for formatting and view options. | `npx plankui@latest add toggle` |
| [Toggle group](https://plankui.com/docs/components/toggle-group) | A set of toggles on one tray: one on at a time, or several. Arrow keys move between them. | `npx plankui@latest add toggle-group` |
| [Command](https://plankui.com/docs/components/command) | A searchable, keyboard-driven list of actions. CommandDialog wraps it in a modal with a hotkey. | `npx plankui@latest add command` |
| [Button group](https://plankui.com/docs/components/button-group) | Buttons fused into one row, for ranges and paired actions. | `npx plankui@latest add button-group` |
| [Copy button](https://plankui.com/docs/components/copy-button) | Copies a value and confirms with a check for a moment. | `npx plankui@latest add copy-button` |
| [Theme toggle](https://plankui.com/docs/components/theme-toggle) | Switch light and dark: a sliding switch, a three-way segmented control with system, or one icon button. | `npx plankui@latest add theme-toggle` |

### Forms

| Component | Description | CLI command |
| --- | --- | --- |
| [Checkbox card](https://plankui.com/docs/components/checkbox-card) | A whole card that toggles like a checkbox, for pick-any-number choices. | `npx plankui@latest add checkbox-card` |
| [Fieldset](https://plankui.com/docs/components/fieldset) | Group related form controls under a native legend. | `npx plankui@latest add fieldset` |
| [Textarea counter](https://plankui.com/docs/components/textarea-counter) | A multiline field that shows the character count and enforces a length limit. | `npx plankui@latest add textarea-counter` |
| [Native select](https://plankui.com/docs/components/native-select) | A styled browser select that keeps the platform’s own picker and keyboard behavior. | `npx plankui@latest add native-select` |
| [Input](https://plankui.com/docs/components/input) | A text field with optional leading and trailing slots. Pair it with Field for label, hint and error. | `npx plankui@latest add input` |
| [Textarea](https://plankui.com/docs/components/textarea) | A multi-line field that shares the input's border, focus ring and error states. | `npx plankui@latest add textarea` |
| [Select](https://plankui.com/docs/components/select) | A listbox for picking one value, with groups, labels and disabled options. | `npx plankui@latest add select` |
| [Checkbox](https://plankui.com/docs/components/checkbox) | A binary or indeterminate choice, for lists where many items can be on. | `npx plankui@latest add checkbox` |
| [Radio group](https://plankui.com/docs/components/radio-group) | One choice from a visible set. RadioCard wraps each option in a selectable panel. | `npx plankui@latest add radio-group` |
| [Switch](https://plankui.com/docs/components/switch) | An on and off setting that applies immediately. | `npx plankui@latest add switch` |
| [Slider](https://plankui.com/docs/components/slider) | Pick a value or a range by dragging. Pass two values for a range. | `npx plankui@latest add slider` |
| [Label and Field](https://plankui.com/docs/components/label) | A form label, and Field: label, control and hint or error in one, wired together for screen readers. | `npx plankui@latest add label` |
| [Combobox](https://plankui.com/docs/components/combobox) | A select with a search field, for option lists too long to scan. | `npx plankui@latest add combobox` |
| [Number input](https://plankui.com/docs/components/number-input) | A number field with step keys. Arrow keys step by one, Shift by ten. | `npx plankui@latest add number-input` |
| [Input OTP](https://plankui.com/docs/components/input-otp) | One-time code entry with auto-advance, paste support and grouped cells. | `npx plankui@latest add input-otp` |
| [Calendar](https://plankui.com/docs/components/calendar) | A month grid with event dots, disabled days and full keyboard navigation. | `npx plankui@latest add calendar` |
| [Password input](https://plankui.com/docs/components/password-input) | A password field with a show and hide key and an optional strength meter. | `npx plankui@latest add password-input` |
| [Tag input](https://plankui.com/docs/components/tag-input) | Type and press Enter or comma to add tags, with suggestions and a limit. | `npx plankui@latest add tag-input` |
| [Rating](https://plankui.com/docs/components/rating) | Stars as a radio group with hover preview, arrow keys and a read-only mode. | `npx plankui@latest add rating` |
| [Search field](https://plankui.com/docs/components/search-field) | A search input with a clear button, a focus shortcut and a loading state. Escape clears it. | `npx plankui@latest add search-field` |
| [Time field](https://plankui.com/docs/components/time-field) | A time input in segments. Arrows step, digits type, left and right move between hours, minutes and AM/PM. | `npx plankui@latest add time-field` |

### Overlays

| Component | Description | CLI command |
| --- | --- | --- |
| [Info tip](https://plankui.com/docs/components/info-tip) | A small info icon beside a label that explains it on hover or focus. | `npx plankui@latest add info-tip` |
| [Lightbox](https://plankui.com/docs/components/lightbox) | A grid of thumbnails that opens each image large, with previous and next. | `npx plankui@latest add lightbox` |
| [Dialog](https://plankui.com/docs/components/dialog) | A modal window that traps focus and returns it to the trigger when closed. | `npx plankui@latest add dialog` |
| [Popover](https://plankui.com/docs/components/popover) | Rich, interactive content anchored to a trigger. | `npx plankui@latest add popover` |
| [Tooltip](https://plankui.com/docs/components/tooltip) | A short label on hover or focus, with an optional key hint. Wrap your app in TooltipProvider. | `npx plankui@latest add tooltip` |
| [Sheet](https://plankui.com/docs/components/sheet) | A panel that slides in from an edge, for forms and details that keep page context. | `npx plankui@latest add sheet` |
| [Alert dialog](https://plankui.com/docs/components/alert-dialog) | A modal that interrupts to confirm an important or irreversible action. | `npx plankui@latest add alert-dialog` |
| [Hover card](https://plankui.com/docs/components/hover-card) | A preview of a linked person or page, shown on hover or focus. | `npx plankui@latest add hover-card` |
| [Context menu](https://plankui.com/docs/components/context-menu) | The menu that opens on right-click or a long press. | `npx plankui@latest add context-menu` |

### Feedback

| Component | Description | CLI command |
| --- | --- | --- |
| [Native meter](https://plankui.com/docs/components/native-meter) | Show a measured value within a known range, such as storage usage. | `npx plankui@latest add native-meter` |
| [Status indicator](https://plankui.com/docs/components/status-indicator) | A colored dot and text label for service health, availability or job state. | `npx plankui@latest add status-indicator` |
| [Toast](https://plankui.com/docs/components/toast) | Brief, non-blocking messages. Mount Toaster once and call toast() from anywhere. | `npx plankui@latest add toast` |
| [Alert](https://plankui.com/docs/components/alert) | An inline message about the state of a page or section. | `npx plankui@latest add alert` |
| [Progress](https://plankui.com/docs/components/progress) | Linear progress for a task, and Meter, a cell meter for quotas. | `npx plankui@latest add progress` |
| [Skeleton](https://plankui.com/docs/components/skeleton) | A shimmering placeholder that holds the shape of content while it loads. | `npx plankui@latest add skeleton` |
| [Spinner](https://plankui.com/docs/components/spinner) | An indeterminate loading indicator that inherits the text colour. | `npx plankui@latest add spinner` |
| [Empty state](https://plankui.com/docs/components/empty-state) | What a list or page shows before it has content, with a way forward. | `npx plankui@latest add empty-state` |
| [Announcement](https://plankui.com/docs/components/announcement) | A dismissible card for product news, with one action. | `npx plankui@latest add announcement` |
| [Progress circle](https://plankui.com/docs/components/progress-circle) | A ring that fills to a value, with the percentage or your own content inside. | `npx plankui@latest add progress-circle` |

### Display

| Component | Description | CLI command |
| --- | --- | --- |
| [Figure](https://plankui.com/docs/components/figure) | Group an image, diagram, or code sample with a caption. | `npx plankui@latest add figure` |
| [Typewriter](https://plankui.com/docs/components/typewriter) | Types words letter by letter with a blinking caret, then deletes them and types the next. | `npx plankui@latest add typewriter` |
| [Text rotate](https://plankui.com/docs/components/text-rotate) | Swaps one word in a sentence on a timer, each new word rising into place. | `npx plankui@latest add text-rotate` |
| [Code block](https://plankui.com/docs/components/code-block) | A block of code with a file name, line numbers, marked lines and a copy button. | `npx plankui@latest add code-block` |
| [Timer](https://plankui.com/docs/components/timer) | A countdown or stopwatch with steady digits and start, pause and reset. | `npx plankui@latest add timer` |
| [Resizable panels](https://plankui.com/docs/components/resizable) | Two panels with a handle between them that you drag or move with the arrow keys. | `npx plankui@latest add resizable` |
| [Item](https://plankui.com/docs/components/item) | One row of a list: media, a title and description, and actions at the end. | `npx plankui@latest add item` |
| [Citation](https://plankui.com/docs/components/citation) | A numbered source mark for AI answers that previews the source on hover. | `npx plankui@latest add citation` |
| [Inline code](https://plankui.com/docs/components/inline-code) | Highlight short commands, identifiers, and code inside a sentence. | `npx plankui@latest add inline-code` |
| [Timestamp](https://plankui.com/docs/components/timestamp) | Display a date or time with a machine-readable value. | `npx plankui@latest add timestamp` |
| [Blockquote](https://plankui.com/docs/components/blockquote) | Set off a quotation with an accent rule and optional attribution. | `npx plankui@latest add blockquote` |
| [Scroll area](https://plankui.com/docs/components/scroll-area) | A keyboard-focusable region for scrolling lists or panels within a limited height. | `npx plankui@latest add scroll-area` |
| [Disclosure](https://plankui.com/docs/components/disclosure) | A single expandable section for shipping details, notes or other supporting information. | `npx plankui@latest add disclosure` |
| [Description list](https://plankui.com/docs/components/description-list) | A responsive list of labeled values for account details, specifications or summaries. | `npx plankui@latest add description-list` |
| [Card](https://plankui.com/docs/components/card) | A hairline-bordered surface with header, content and a footer strip. | `npx plankui@latest add card` |
| [Avatar](https://plankui.com/docs/components/avatar) | An image with initials as fallback, a presence dot, and an overlapping group. | `npx plankui@latest add avatar` |
| [Badge](https://plankui.com/docs/components/badge) | A compact label for status, version or category. | `npx plankui@latest add badge` |
| [Kbd](https://plankui.com/docs/components/kbd) | A keyboard key, for shortcuts in menus, tooltips and docs. | `npx plankui@latest add kbd` |
| [Separator](https://plankui.com/docs/components/separator) | A hairline between groups of content, horizontal or vertical. | `npx plankui@latest add separator` |
| [Collapsible](https://plankui.com/docs/components/collapsible) | Shows and hides one section, growing smoothly to its height. For a list of sections, use Accordion. | `npx plankui@latest add collapsible` |
| [Aspect ratio](https://plankui.com/docs/components/aspect-ratio) | Keeps media at a fixed shape as the width changes. Images and video inside crop to fill it. | `npx plankui@latest add aspect-ratio` |
| [Table](https://plankui.com/docs/components/table) | Ruled data table parts with selectable rows and a sortable header button. | `npx plankui@latest add table` |
| [Stat](https://plankui.com/docs/components/stat) | One number with its label, change against a previous period and a sparkline. | `npx plankui@latest add stat` |
| [Chip](https://plankui.com/docs/components/chip) | A compact, removable token for filters and selections. | `npx plankui@latest add chip` |
| [Count up](https://plankui.com/docs/components/count-up) | A number that climbs to its new value. Still under reduced motion. | `npx plankui@latest add count-up` |
| [Timeline](https://plankui.com/docs/components/timeline) | A vertical list of events joined by a line, with icons and tones. | `npx plankui@latest add timeline` |
| [Divider](https://plankui.com/docs/components/divider) | A rule with an optional label, such as “or” between sign-in options or a date between messages. | `npx plankui@latest add divider` |

### Navigation

| Component | Description | CLI command |
| --- | --- | --- |
| [Skip link](https://plankui.com/docs/components/skip-link) | Let keyboard users bypass repeated navigation and jump to content. | `npx plankui@latest add skip-link` |
| [Tabs](https://plankui.com/docs/components/tabs) | Switch between views in place. Two variants: a tray with a sliding pill, and a line. | `npx plankui@latest add tabs` |
| [Accordion](https://plankui.com/docs/components/accordion) | Stacked sections that expand one or many at a time. | `npx plankui@latest add accordion` |
| [Breadcrumb](https://plankui.com/docs/components/breadcrumb) | Where the current page sits in the hierarchy, with links back up. | `npx plankui@latest add breadcrumb` |
| [Pagination](https://plankui.com/docs/components/pagination) | Move through pages of results, with gaps for long ranges. | `npx plankui@latest add pagination` |
| [Stepper](https://plankui.com/docs/components/stepper) | Progress through a multi-step flow, horizontal or vertical. | `npx plankui@latest add stepper` |

### Charts

| Component | Description | CLI command |
| --- | --- | --- |
| [Bar chart](https://plankui.com/docs/components/bar-chart) | Rounded bars on a track. Bars grow in; hover or focus a bar for its value. | `npx plankui@latest add bar-chart` |
| [Sparkline](https://plankui.com/docs/components/sparkline) | A small trend line for tables, stats and cards. | `npx plankui@latest add sparkline` |
| [Line chart](https://plankui.com/docs/components/line-chart) | Lines with a y axis and legend. Dash a series for targets or last period. Hover or arrow through points. | `npx plankui@latest add line-chart` |
| [Bar list](https://plankui.com/docs/components/bar-list) | Ranked rows with a bar behind each name, for top pages, sources or countries. | `npx plankui@latest add bar-list` |
| [Stage bars](https://plankui.com/docs/components/stage-bars) | Horizontal bars split into stages, such as a pipeline per rep or sleep phases per night. | `npx plankui@latest add stage-bars` |
| [Chart card](https://plankui.com/docs/components/chart-card) | The shell every chart card shares: title, number and change, the chart on a white panel, a footer. | `npx plankui@latest add chart-card` |
| [Steps card](https://plankui.com/docs/components/steps-card) | Daily steps against a dashed goal line. Days over the goal are lit. | `npx plankui@latest add steps-card` |
| [Most active days](https://plankui.com/docs/components/active-days-card) | Seven columns for the week with the busiest day lit and named. | `npx plankui@latest add active-days-card` |

### Blocks

| Component | Description | CLI command |
| --- | --- | --- |
| [Chat message](https://plankui.com/docs/components/chat-message) | An incoming or outgoing message with author, time, and optional avatar. | `npx plankui@latest add chat-message` |
| [Task list](https://plankui.com/docs/components/task-list) | A checklist with progress, priorities, add and delete. Done tasks strike through. | `npx plankui@latest add task-list` |
| [Profile card](https://plankui.com/docs/components/profile-card) | A person at a glance: avatar and status, role, labelled details and contact actions. | `npx plankui@latest add profile-card` |
| [Invite members](https://plankui.com/docs/components/invite-members) | Invite by email, change each member's role, and copy a link that gives access. | `npx plankui@latest add invite-members` |
| [Account menu](https://plankui.com/docs/components/account-menu) | The signed-in user's menu: name and plan, a dark mode switch, links, another account and sign out. | `npx plankui@latest add account-menu` |
| [Applied filters](https://plankui.com/docs/components/applied-filters) | The filters in effect as removable chips, with clear all and a button to add more. | `npx plankui@latest add applied-filters` |
| [Auth card](https://plankui.com/docs/components/auth-card) | Sign in, sign up and a one-time code step in one card. Uncontrolled, it hands you FormData. | `npx plankui@latest add auth-card` |
| [Stat cards](https://plankui.com/docs/components/stat-cards) | KPI cards: a grey shell, a lit icon tile, the number and a white footer with the change. | `npx plankui@latest add stat-cards` |
| [Agent limits](https://plankui.com/docs/components/agent-limits) | Usage against plan limits. Bars turn amber at 80% and red at the limit, with a note. | `npx plankui@latest add agent-limits` |

**Templates** · [People](https://plankui.com/docs/templates/people) · [Calendar](https://plankui.com/docs/templates/calendar) · [Contact form](https://plankui.com/docs/templates/contact-form) · [Card grid](https://plankui.com/docs/templates/card-grid) · [Chat landing](https://plankui.com/docs/templates/chat-landing) · [Sign in](https://plankui.com/docs/templates/sign-in)

[MIT license](LICENSE) · Built by Vector Labs
