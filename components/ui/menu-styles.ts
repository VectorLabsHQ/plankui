/**
 * One look for every dropdown in the library: Select, Dropdown menu, Context menu, Combobox,
 * Command, Tag input suggestions, Date picker presets and the Model picker.
 * Change these strings to restyle all of them at once.
 */

/** The floating panel. */
export const menuPanel =
  "vx-pop vx-glass z-[100] min-w-[12rem] overflow-hidden rounded-[calc(16px*var(--radius-factor))] border border-pop-border bg-pop p-2 text-ink shadow-pop outline-none";

/** A row. Highlight comes from keyboard or pointer (data-highlighted) or an explicit data-active attribute. */
export const menuItem =
  "relative flex min-h-8 cursor-default select-none items-center gap-2 rounded-input px-2 py-1.5 text-[14px] font-medium text-ink outline-none transition-[background-color] duration-[var(--dur-micro)] data-[highlighted]:bg-paper-3 data-[active=true]:bg-paper-3 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-muted";

/** A section heading inside a menu. */
export const menuLabel = "px-2 pb-1 pt-1.5 text-[14px] font-medium text-muted";

/** A divider between groups. */
export const menuSeparator = "-mx-2 my-1.5 h-px bg-rule";

/** The selected indicator on the right of a row. */
export const menuCheck = "ml-auto size-4 shrink-0 !text-accent";
