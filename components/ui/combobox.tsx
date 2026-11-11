import * as React from "react";
import { Popover as PopoverPrimitive } from "radix-ui";
import { Check, ChevronsUpDown, Search } from "lucide-react";
import { cn } from "@/lib/cn";
import { menuCheck, menuItem, menuLabel, menuPanel } from "./menu-styles";

export interface ComboboxOption {
  value: string;
  label: string;
  description?: string;
}

export interface ComboboxProps {
  options: ComboboxOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  className?: string;
  "aria-label"?: string;
}

/** A select with a search field, for long option lists. */
export function Combobox({
  options,
  value,
  onValueChange,
  placeholder = "Select…",
  searchPlaceholder = "Search…",
  emptyText = "Nothing found.",
  className,
  ...rest
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [inner, setInner] = React.useState(value);
  const [q, setQ] = React.useState("");
  const [active, setActive] = React.useState(0);
  const current = value ?? inner;
  const selected = options.find((o) => o.value === current);
  const list = options.filter((o) => o.label.toLowerCase().includes(q.toLowerCase()));

  const pick = (o: ComboboxOption) => {
    setInner(o.value);
    onValueChange?.(o.value);
    setOpen(false);
    setQ("");
  };

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={(o) => { setOpen(o); if (o) setActive(Math.max(0, list.indexOf(selected!))); }}>
      <PopoverPrimitive.Trigger
        role="combobox"
        aria-expanded={open}
        aria-label={rest["aria-label"]}
        className={cn(
          "flex h-9 w-full items-center justify-between gap-2 rounded-input border border-field-border bg-field px-3 text-sm shadow-field vx-glass",
          "hover:field-hover focus-visible:field-focus focus-visible:outline-none",
          className,
        )}
      >
        <span className={cn("truncate", !selected && "text-muted")}>{selected?.label ?? placeholder}</span>
        <ChevronsUpDown className="size-4 shrink-0 text-muted" />
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          align="start"
          sideOffset={6}
          className={cn(menuPanel, "w-[var(--radix-popover-trigger-width)] min-w-56 p-0")}
        >
          <div className="flex items-center gap-2 border-b border-rule px-3">
            <Search className="size-4 text-muted" />
            <input
              autoFocus
              value={q}
              onChange={(e) => { setQ(e.target.value); setActive(0); }}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(a + 1, list.length - 1)); }
                if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
                if (e.key === "Enter" && list[active]) { e.preventDefault(); pick(list[active]); }
              }}
              placeholder={searchPlaceholder}
              aria-label={searchPlaceholder}
              className="h-10 flex-1 bg-transparent text-sm outline-none placeholder:text-muted"
            />
          </div>
          <ul role="listbox" className="max-h-64 overflow-y-auto p-1.5">
            {list.length === 0 && <li className="px-3 py-5 text-center text-sm text-muted">{emptyText}</li>}
            {list.map((o, i) => (
              <li
                key={o.value}
                role="option"
                aria-selected={o.value === current}
                onMouseMove={() => setActive(i)}
                onClick={() => pick(o)}
                data-active={i === active}
                className={menuItem}
              >
                <span className="grid flex-1">
                  <span>{o.label}</span>
                  {o.description && <span className="text-xs text-muted">{o.description}</span>}
                </span>
                {o.value === current && <Check className={menuCheck} />}
              </li>
            ))}
          </ul>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}
