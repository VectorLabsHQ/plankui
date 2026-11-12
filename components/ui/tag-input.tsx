import * as React from "react";
import { cn } from "@/lib/cn";
import { menuCheck, menuItem, menuLabel, menuPanel } from "./menu-styles";
import { Chip } from "./chip";

export interface TagInputProps {
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (tags: string[]) => void;
  placeholder?: string;
  /** Most tags allowed. */
  max?: number;
  /** Offered below the field while typing. */
  suggestions?: string[];
  className?: string;
  "aria-label"?: string;
}

/** Type and press Enter or comma to add a tag; Backspace on an empty field removes the last one. */
export function TagInput({ value, defaultValue = [], onValueChange, placeholder = "Add a tag", max, suggestions = [], className, ...rest }: TagInputProps) {
  const [inner, setInner] = React.useState(defaultValue);
  const tags = value ?? inner;
  const [text, setText] = React.useState("");
  const input = React.useRef<HTMLInputElement>(null);
  const full = max !== undefined && tags.length >= max;
  const commit = (next: string[]) => {
    setInner(next);
    onValueChange?.(next);
  };
  const add = (raw: string) => {
    const t = raw.trim().replace(/,$/, "");
    if (!t || full || tags.some((x) => x.toLowerCase() === t.toLowerCase())) return;
    commit([...tags, t]);
    setText("");
  };
  const open = text.length > 0 ? suggestions.filter((s) => s.toLowerCase().includes(text.toLowerCase()) && !tags.includes(s)).slice(0, 5) : [];
  return (
    <div className={cn("relative grid gap-1.5", className)}>
      <div
        onClick={() => input.current?.focus()}
        className={cn(
          "vx-glass flex min-h-9 flex-wrap items-center gap-1.5 rounded-input border border-field-border bg-field px-1.5 py-1 shadow-field",
          "focus-within:field-focus",
        )}
      >
        {tags.map((t) => (
          <Chip key={t} className="h-6 text-xs" onRemove={() => commit(tags.filter((x) => x !== t))}>{t}</Chip>
        ))}
        <input
          ref={input}
          value={text}
          disabled={full}
          onChange={(e) => (e.target.value.endsWith(",") ? add(e.target.value) : setText(e.target.value))}
          onKeyDown={(e) => {
            if (e.key === "Enter") { e.preventDefault(); add(open[0] && !tags.includes(text) && open[0].toLowerCase().startsWith(text.toLowerCase()) ? open[0] : text); }
            if (e.key === "Backspace" && !text && tags.length) commit(tags.slice(0, -1));
          }}
          placeholder={full ? `${max} tags maximum` : tags.length ? "" : placeholder}
          aria-label={rest["aria-label"] ?? placeholder}
          className="h-6 min-w-24 flex-1 bg-transparent px-1.5 text-sm text-ink outline-none placeholder:text-muted disabled:cursor-not-allowed"
        />
      </div>
      {open.length > 0 && (
        <ul role="listbox" className={cn(menuPanel, "absolute inset-x-0 top-full mt-1 grid gap-0.5")}>
          {open.map((s) => (
            <li key={s}>
              <button
                type="button"
                role="option"
                aria-selected={false}
                onMouseDown={(e) => { e.preventDefault(); add(s); }}
                className={cn(menuItem, "w-full text-left hover:bg-paper-3")}
              >
                {s}
              </button>
            </li>
          ))}
        </ul>
      )}
      {max !== undefined && <p className="text-xs text-muted">{tags.length} of {max}</p>}
    </div>
  );
}
