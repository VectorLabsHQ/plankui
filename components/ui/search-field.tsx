import * as React from "react";
import { LoaderCircle, Search, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { fieldBase } from "./input";
import { Kbd } from "./kbd";

export interface SearchFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "defaultValue" | "onChange" | "size"> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** A single key that focuses the field from anywhere, such as "/". Shown as a hint while empty. */
  shortcut?: string;
  /** Shows a spinner in place of the search icon. */
  loading?: boolean;
  size?: "sm" | "md" | "lg";
}

const sizes = { sm: "h-8 pl-8 text-sm", md: "h-9 pl-9", lg: "h-11 pl-10 text-base" };

/** A search input with a clear button, an optional focus shortcut and a loading state. Escape clears it. */
export const SearchField = React.forwardRef<HTMLInputElement, SearchFieldProps>(
  ({ value, defaultValue = "", onValueChange, shortcut, loading, size = "md", className, placeholder = "Search", ...props }, ref) => {
    const [inner, setInner] = React.useState(defaultValue);
    const current = value ?? inner;
    const local = React.useRef<HTMLInputElement>(null);
    React.useImperativeHandle(ref, () => local.current!);
    const set = (v: string) => {
      setInner(v);
      onValueChange?.(v);
    };
    React.useEffect(() => {
      if (!shortcut) return;
      const onKey = (e: KeyboardEvent) => {
        const t = e.target as HTMLElement;
        if (e.key !== shortcut || e.metaKey || e.ctrlKey || t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)) return;
        e.preventDefault();
        local.current?.focus();
      };
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }, [shortcut]);
    const Icon = loading ? LoaderCircle : Search;
    return (
      <div className={cn("relative flex items-center", className)}>
        <Icon aria-hidden className={cn("pointer-events-none absolute left-3 size-4 text-muted", loading && "animate-spin motion-reduce:animate-none", size === "sm" && "left-2.5 size-3.5")} />
        <input
          ref={local}
          type="search"
          value={current}
          placeholder={placeholder}
          onChange={(e) => set(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Escape" && current) {
              e.preventDefault();
              set("");
            }
          }}
          className={cn(fieldBase, sizes[size], "pr-10 [&::-webkit-search-cancel-button]:hidden")}
          {...props}
        />
        <span className="absolute right-2 flex items-center">
          {current ? (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => {
                set("");
                local.current?.focus();
              }}
              className="grid size-6 place-items-center rounded-sm text-muted hover:bg-paper-3 hover:text-ink focus-visible:outline-2 focus-visible:outline-focus"
            >
              <X className="size-3.5" />
            </button>
          ) : (
            shortcut && <Kbd className="mr-0.5">{shortcut}</Kbd>
          )}
        </span>
      </div>
    );
  },
);
SearchField.displayName = "SearchField";
