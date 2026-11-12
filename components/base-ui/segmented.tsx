import * as React from "react";
import { ToggleGroup } from "@base-ui/react/toggle-group";
import { Toggle } from "@base-ui/react/toggle";
import { cn } from "@/lib/cn";

/**
 * Places a pill under the active item of a list and slides it on change. The pill is positioned
 * instantly and animated with a transform from where it was, so width and left never animate.
 */
export function useSlidingPill(list: React.RefObject<HTMLElement | null>, selector: string, active: unknown) {
  const pill = React.useRef<HTMLSpanElement>(null);
  const last = React.useRef<{ x: number; w: number } | null>(null);
  React.useLayoutEffect(() => {
    const l = list.current;
    const p = pill.current;
    if (!l || !p) return;
    const place = (animate: boolean) => {
      const a = l.querySelector<HTMLElement>(selector);
      if (!a) {
        p.style.opacity = "0";
        return;
      }
      const { offsetLeft: x, offsetTop: y, offsetWidth: w, offsetHeight: h } = a;
      Object.assign(p.style, { opacity: "1", left: `${x}px`, top: `${y}px`, width: `${w}px`, height: `${h}px` });
      const prev = last.current;
      last.current = { x, w };
      if (!animate || !prev || (prev.x === x && prev.w === w) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      p.style.transition = "none";
      p.style.transform = `translateX(${prev.x - x}px) scaleX(${prev.w / w})`;
      void p.offsetWidth;
      p.style.transition = "";
      p.style.transform = "";
    };
    place(true);
    const ro = new ResizeObserver(() => place(false));
    ro.observe(l);
    return () => ro.disconnect();
  }, [list, selector, active]);
  return pill;
}

/** The pill itself: a raised key that slides between options. */
export const pillClass =
  "pointer-events-none absolute left-0 top-0 origin-left rounded-[var(--pill-radius)] bg-key-face opacity-0 shadow-key transition-transform duration-200 ease-[var(--ease-out)]";

export interface SegmentedProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  options: { value: string; label: React.ReactNode; disabled?: boolean }[];
  size?: "sm" | "md";
  className?: string;
  "aria-label"?: string;
}

/** A single-choice control: options sit on a tray and a raised pill slides to the chosen one. */
export function Segmented({ value, defaultValue, onValueChange, options, size = "md", className, ...rest }: SegmentedProps) {
  const [inner, setInner] = React.useState(defaultValue ?? options[0]?.value);
  const current = value ?? inner;
  const list = React.useRef<HTMLDivElement>(null);
  const pill = useSlidingPill(list, "[data-pressed]", current);
  return (
    <ToggleGroup
      ref={list}
      value={current ? [current] : []}
      onValueChange={(v) => {
        const next = v[0];
        if (!next) return;
        setInner(next);
        onValueChange?.(next);
      }}
      className={cn("vx-glass relative inline-flex w-fit items-center gap-0.5 rounded-input border border-tray-border bg-tray p-1", className)}
      {...rest}
    >
      <span ref={pill} aria-hidden className={pillClass} />
      {options.map((o) => (
        <Toggle
          key={o.value}
          value={o.value}
          disabled={o.disabled}
          className={cn(
            "relative z-10 inline-flex items-center justify-center gap-1.5 rounded-[var(--pill-radius)] font-medium text-muted",
            "transition-colors duration-[var(--dur-micro)] hover:text-ink",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus data-[disabled]:opacity-50 [&_svg]:size-4",
            "data-[pressed]:text-ink",
            size === "md" ? "h-7 px-3 text-sm" : "h-6 px-2 text-xs",
          )}
        >
          {o.label}
        </Toggle>
      ))}
    </ToggleGroup>
  );
}
