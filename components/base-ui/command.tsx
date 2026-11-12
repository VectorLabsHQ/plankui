import * as React from "react";
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { Search } from "lucide-react";
import { cn } from "@/lib/cn";
import { menuCheck, menuItem, menuLabel, menuPanel } from "./menu-styles";
import { Kbd } from "./kbd";

export interface CommandItem {
  value: string;
  label: string;
  icon?: React.ReactNode;
  shortcut?: string;
  /** Extra words the filter should match. */
  keywords?: string[];
  disabled?: boolean;
  onSelect?: () => void;
}
export interface CommandGroup {
  heading?: string;
  items: CommandItem[];
}

export interface CommandProps {
  groups: CommandGroup[];
  placeholder?: string;
  emptyText?: React.ReactNode;
  /** Called after an item's own onSelect. */
  onSelect?: (item: CommandItem) => void;
  className?: string;
  autoFocus?: boolean;
}

const match = (item: CommandItem, q: string) =>
  [item.label, item.value, ...(item.keywords ?? [])].some((s) => s.toLowerCase().includes(q.toLowerCase()));

/** A searchable, keyboard-driven list of actions. */
export function Command({ groups, placeholder = "Type a command or search", emptyText = "No results.", onSelect, className, autoFocus }: CommandProps) {
  const [q, setQ] = React.useState("");
  const [active, setActive] = React.useState(0);
  const listId = React.useId();
  const filtered = groups
    .map((g) => ({ ...g, items: g.items.filter((i) => match(i, q)) }))
    .filter((g) => g.items.length);
  const flat = filtered.flatMap((g) => g.items).filter((i) => !i.disabled);
  const activeItem = flat[Math.min(active, flat.length - 1)];

  React.useEffect(() => {
    setActive(0);
  }, [q]);

  const choose = (item?: CommandItem) => {
    if (!item || item.disabled) return;
    item.onSelect?.();
    onSelect?.(item);
  };

  return (
    <div className={cn("vx-glass flex flex-col overflow-hidden rounded-card border border-pop-border bg-pop text-ink", className)}>
      <div className="flex items-center gap-2 border-b border-rule px-3">
        <Search className="size-4 shrink-0 text-muted" />
        <input
          autoFocus={autoFocus}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(a + 1, flat.length - 1)); }
            if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
            if (e.key === "Enter") { e.preventDefault(); choose(activeItem); }
          }}
          placeholder={placeholder}
          role="combobox"
          aria-expanded
          aria-controls={listId}
          aria-activedescendant={activeItem ? `${listId}-${activeItem.value}` : undefined}
          className="h-11 flex-1 bg-transparent text-sm outline-none placeholder:text-muted"
        />
      </div>
      <div id={listId} role="listbox" className="max-h-72 overflow-y-auto p-1.5">
        {filtered.length === 0 && <p className="px-3 py-6 text-center text-sm text-muted">{emptyText}</p>}
        {filtered.map((g, gi) => (
          <div key={gi} role="group" aria-label={g.heading} className="pb-1">
            {g.heading && <p className={menuLabel}>{g.heading}</p>}
            {g.items.map((item) => {
              const isActive = item === activeItem;
              return (
                <div
                  key={item.value}
                  id={`${listId}-${item.value}`}
                  role="option"
                  aria-selected={isActive}
                  aria-disabled={item.disabled}
                  onMouseMove={() => !item.disabled && setActive(flat.indexOf(item))}
                  onClick={() => choose(item)}
                  data-active={isActive}
                  data-disabled={item.disabled || undefined}
                  className={menuItem}
                >
                  {item.icon}
                  <span className="flex-1">{item.label}</span>
                  {item.shortcut && <Kbd>{item.shortcut}</Kbd>}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

/** Command inside a modal, opened with ⌘K by default. */
export function CommandDialog({
  open,
  onOpenChange,
  hotkey = "k",
  ...props
}: CommandProps & { open: boolean; onOpenChange: (open: boolean) => void; hotkey?: string | false }) {
  React.useEffect(() => {
    if (!hotkey) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === hotkey && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [hotkey, open, onOpenChange]);
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Backdrop className="vx-fade fixed inset-0 z-[400] bg-overlay backdrop-blur-[2px]" />
        <DialogPrimitive.Popup className="vx-pop fixed left-1/2 top-[14vh] z-[400] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 outline-none">
          <DialogPrimitive.Title className="sr-only">Command menu</DialogPrimitive.Title>
          <Command
            autoFocus
            {...props}
            className={cn("shadow-pop", props.className)}
            onSelect={(i) => {
              props.onSelect?.(i);
              onOpenChange(false);
            }}
          />
        </DialogPrimitive.Popup>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
