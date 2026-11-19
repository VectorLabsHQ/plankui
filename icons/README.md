# PlankUI Icons

438 outline icons drawn for [PlankUI](https://plankui.com) on a 24 px grid: one stroke weight, round caps and
joins, and the same soft corners as the components. React components and plain SVG. MIT licence, by Vector Labs.

Browse, search and copy them at [plankui.com/docs/icons](https://plankui.com/docs/icons).

## Install

```bash
npm i @plankui/icons
```

## Use

```tsx
import { SearchIcon, SettingsIcon } from "@plankui/icons";

export function Toolbar() {
  return (
    <div className="flex items-center gap-2">
      <SearchIcon className="size-4" />
      <SettingsIcon size={20} strokeWidth={1.5} title="Settings" />
    </div>
  );
}
```

Every icon is named after its file with `Icon` on the end (`arrow-right` → `ArrowRightIcon`).

| Prop | Default | What it does |
| --- | --- | --- |
| `size` | `24` | Width and height. A class such as `size-4` wins over it. |
| `strokeWidth` | `1.5` | Line weight on the 24 px grid. |
| `color` | `currentColor` | Stroke colour. |
| `title` | | Names the icon for screen readers. Without it (or `aria-label`) the icon is `aria-hidden`. |
| `...props` | | Passed to the `<svg>`: `className`, `style`, `ref`, events. |

Each SVG also has the class `plank-icon plank-icon-<name>`.

Plain SVGs are in `svg/` (`@plankui/icons/svg/arrow-right.svg`), and `icons.json`
(`@plankui/icons/icons.json`) lists every icon with its category, search words and shapes.

## How it works

The drawings live in `src/icons.mjs` as plain path data on the 24 px grid, with a few helpers for circles,
rounded rectangles and dots. `node scripts/build-icons.mjs` (from the PlankUI root, also run by `npm run build`)
checks them and writes:

- `svg/<name>.svg`, one file per icon
- `lib/index.js`, `lib/index.d.ts` and `lib/icons.json`, the package (ESM, React 18 and 19, no JSX at runtime)
- `../src/icons/index.tsx`, the same set for the PlankUI site

Drawing rules, so new icons match: live area 3 to 21; square containers 16.5 wide with a 4.5 radius; circles
r 8.75 on the centre; cards and screens a 2.5 to 3.5 radius; arrowheads and chevrons open at 90 degrees with
5.5 long arms; dots are `dot()` (tiny stroked circles that grow with the stroke).

## Publish an update

1. Edit `src/icons.mjs`, then run `npm run icons` in the PlankUI root and check `/docs/icons`.
2. Bump `version` in `icons/package.json` and run `npm run icons` again (the version is stamped into `lib/`).
3. From `icons/`: `npm publish --access public`.
4. The first time, set `ICONS_PUBLISHED = true` in `src/site/config.ts`. PlankUI's components import `@plankui/icons`, so until then `npm run deploy` and `scripts/export-public.mjs` stop with a reminder (`scripts/check-icons-published.mjs`): a deploy before the package exists would break `plankui add`.
