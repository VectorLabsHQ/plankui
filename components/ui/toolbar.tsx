import * as React from "react";
import { cn } from "@/lib/cn";

export interface ToolbarProps extends React.ComponentProps<"div"> {
  /** Accessible name for the toolbar, such as "Text formatting". */
  label: string;
  orientation?: "horizontal" | "vertical";
}

const focusable = "button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex='-1'])";

/**
 * A row of controls that is one Tab stop: arrow keys move between them, Home and End jump to the ends,
 * as in the WAI-ARIA toolbar pattern.
 */
export function Toolbar({ label, orientation = "horizontal", className, children, onKeyDown, ref, ...props }: ToolbarProps) {
  const inner = React.useRef<HTMLDivElement>(null);
  React.useImperativeHandle(ref, () => inner.current!);

  const items = () => [...(inner.current?.querySelectorAll<HTMLElement>(focusable) ?? [])].filter((el) => el.closest("[role=toolbar]") === inner.current);

  // Roving tab index: only the active control is in the Tab order.
  const focusItem = (el: HTMLElement | undefined) => {
    if (!el) return;
    for (const item of items()) item.tabIndex = item === el ? 0 : -1;
    el.focus();
  };

  // Keep the current Tab stop across renders; fall back to the first control when it is gone.
  React.useLayoutEffect(() => {
    const list = items();
    const current = list.find((item) => item.tabIndex === 0) ?? list[0];
    for (const item of list) item.tabIndex = item === current ? 0 : -1;
  });

  return (
    <div
      {...props}
      ref={inner}
      role="toolbar"
      aria-label={label}
      aria-orientation={orientation}
      onFocus={(e) => {
        const list = items();
        if (list.includes(e.target as HTMLElement)) for (const item of list) item.tabIndex = item === e.target ? 0 : -1;
      }}
      onKeyDown={(e) => {
        onKeyDown?.(e);
        if (e.defaultPrevented) return;
        const list = items();
        const at = list.indexOf(document.activeElement as HTMLElement);
        if (at < 0) return;
        const next = orientation === "horizontal" ? "ArrowRight" : "ArrowDown";
        const prev = orientation === "horizontal" ? "ArrowLeft" : "ArrowUp";
        const to =
          e.key === next ? list[(at + 1) % list.length]
          : e.key === prev ? list[(at - 1 + list.length) % list.length]
          : e.key === "Home" ? list[0]
          : e.key === "End" ? list[list.length - 1]
          : undefined;
        if (!to) return;
        e.preventDefault();
        focusItem(to);
      }}
      className={cn(
        "vx-glass inline-flex flex-wrap items-center gap-1 rounded-input border border-tray-border bg-tray p-1",
        orientation === "vertical" && "flex-col",
        className,
      )}
    >
      {children}
    </div>
  );
}
