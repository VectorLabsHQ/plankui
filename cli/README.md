# plankui

Add [PlankUI](https://plankui.com) components to a React 19 + Tailwind CSS v4 project.

```bash
npx plankui@latest init
npx plankui@latest add button select dialog
npx plankui@latest list
```

`init` writes `tokens.css`, `styles.css` and the `cn` helper and installs the shared packages.
`add` copies each component plus every PlankUI file it builds on, and installs their npm packages.
Add `--yes` in CI or for coding agents; it accepts the defaults and keeps files that already exist.
