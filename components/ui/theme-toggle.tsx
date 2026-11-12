import * as React from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/cn";

export type ColorMode = "light" | "dark" | "system";

export interface ThemeToggleProps {
  value?: ColorMode;
  defaultValue?: ColorMode;
  onValueChange?: (mode: ColorMode, event: React.MouseEvent) => void;
  /** "switch" slides a thumb between sun and moon; "segmented" adds a system option; "icon" is a single button. */
  variant?: "switch" | "segmented" | "icon";
  className?: string;
}

const icon = "size-4 transition-[transform,opacity] duration-[var(--dur-short)] ease-[var(--ease-out)] motion-reduce:transition-none";

/** Switch between light and dark, with an optional system choice. Pass the click event on to start a reveal from the pointer. */
export function ThemeToggle({ value, defaultValue = "light", onValueChange, variant = "switch", className }: ThemeToggleProps) {
  const [inner, setInner] = React.useState<ColorMode>(defaultValue);
  const mode = value ?? inner;
  const set = (m: ColorMode, e: React.MouseEvent) => {
    setInner(m);
    onValueChange?.(m, e);
  };
  const dark = mode === "dark";

  if (variant === "icon") {
    return (
      <button
        type="button"
        aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
        onClick={(e) => set(dark ? "light" : "dark", e)}
        className={cn(
          "relative grid size-9 place-items-center rounded-input border border-[color:var(--key-border)] bg-key-face text-ink shadow-key",
          "hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus",
          className,
        )}
      >
        <Sun aria-hidden className={cn(icon, "absolute", dark ? "rotate-90 scale-50 opacity-0" : "rotate-0 opacity-100")} />
        <Moon aria-hidden className={cn(icon, "absolute", dark ? "rotate-0 opacity-100" : "-rotate-90 scale-50 opacity-0")} />
      </button>
    );
  }

  if (variant === "segmented") {
    const opts: [ColorMode, typeof Sun, string][] = [["light", Sun, "Light"], ["dark", Moon, "Dark"], ["system", Monitor, "System"]];
    return (
      <div role="radiogroup" aria-label="Colour mode" className={cn("inline-flex gap-0.5 rounded-input border border-tray-border bg-tray p-0.5", className)}>
        {opts.map(([m, Icon, label]) => (
          <button
            key={m}
            type="button"
            role="radio"
            aria-checked={mode === m}
            aria-label={label}
            title={label}
            onClick={(e) => set(m, e)}
            className={cn(
              "grid size-7 place-items-center rounded-sm text-muted transition-[color,background-color] duration-[var(--dur-micro)]",
              "focus-visible:outline-2 focus-visible:outline-focus [&_svg]:size-4",
              mode === m ? "bg-key-face text-ink shadow-key" : "hover:text-ink",
            )}
          >
            <Icon aria-hidden />
          </button>
        ))}
      </div>
    );
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={dark}
      aria-label="Dark mode"
      onClick={(e) => set(dark ? "light" : "dark", e)}
      className={cn(
        "relative inline-flex h-8 w-[60px] shrink-0 items-center rounded-full border border-tray-border bg-tray p-0.5",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus",
        className,
      )}
    >
      <Sun aria-hidden className="absolute left-2 size-3.5 text-muted" />
      <Moon aria-hidden className="absolute right-2 size-3.5 text-muted" />
      <span
        className={cn(
          "relative z-10 grid size-[26px] place-items-center rounded-full bg-key-face text-ink shadow-key",
          "transition-transform duration-[var(--dur-short)] ease-[var(--ease-out)] motion-reduce:transition-none",
          dark && "translate-x-[28px]",
        )}
      >
        {dark ? <Moon aria-hidden className="size-3.5" /> : <Sun aria-hidden className="size-3.5" />}
      </span>
    </button>
  );
}
