import * as React from "react";
import { cn } from "@/lib/cn";

export interface ResizableProps {
  /** Exactly two panels: the first is the one that resizes. */
  children: [React.ReactNode, React.ReactNode];
  direction?: "horizontal" | "vertical";
  /** Size of the first panel, in percent. */
  defaultSize?: number;
  min?: number;
  max?: number;
  onResize?: (size: number) => void;
  /** Name of the first panel, for the handle's screen reader label. */
  label?: string;
  className?: string;
}

/** Two panels with a handle between them. Drag it, or focus it and use the arrow keys, Home and End. */
export function Resizable({ children, direction = "horizontal", defaultSize = 50, min = 15, max = 85, onResize, label = "panel", className }: ResizableProps) {
  const [size, setSize] = React.useState(defaultSize);
  const root = React.useRef<HTMLDivElement>(null);
  const across = direction === "horizontal";
  const set = (n: number) => {
    const next = Math.min(max, Math.max(min, Math.round(n * 10) / 10));
    setSize(next);
    onResize?.(next);
  };
  const drag = (e: React.PointerEvent) => {
    const box = root.current?.getBoundingClientRect();
    if (!box) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    const move = (ev: PointerEvent) => set(across ? ((ev.clientX - box.left) / box.width) * 100 : ((ev.clientY - box.top) / box.height) * 100);
    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };
  const key = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 2;
    const less = across ? "ArrowLeft" : "ArrowUp";
    const more = across ? "ArrowRight" : "ArrowDown";
    const to = e.key === less ? size - step : e.key === more ? size + step : e.key === "Home" ? min : e.key === "End" ? max : null;
    if (to === null) return;
    e.preventDefault();
    set(to);
  };
  return (
    <div ref={root} className={cn("flex min-h-0 min-w-0 overflow-hidden", across ? "flex-row" : "flex-col", className)}>
      <div className="min-h-0 min-w-0 overflow-auto" style={{ flexBasis: `${size}%` }}>{children[0]}</div>
      <div
        role="separator"
        tabIndex={0}
        aria-orientation={across ? "vertical" : "horizontal"}
        aria-label={`Resize ${label}`}
        aria-valuenow={Math.round(size)}
        aria-valuemin={min}
        aria-valuemax={max}
        onPointerDown={drag}
        onKeyDown={key}
        className={cn(
          "group relative flex shrink-0 touch-none items-center justify-center bg-rule outline-none transition-colors duration-[var(--dur-micro)] hover:bg-accent focus-visible:bg-accent",
          across ? "w-px cursor-col-resize" : "h-px cursor-row-resize", // taste-skill-ignore: the line is the drag handle itself
        )}
      >
        {/* A wider invisible hit area, and a grip that shows where to drag. */}
        <span className={cn("absolute", across ? "inset-y-0 -inset-x-1.5" : "inset-x-0 -inset-y-1.5")} />
        <span className={cn("z-10 shrink-0 rounded-pill border border-rule-2 bg-paper group-focus-visible:border-accent", across ? "h-6 w-2" : "h-2 w-6")} />
      </div>
      <div className="min-h-0 min-w-0 flex-1 overflow-auto">{children[1]}</div>
    </div>
  );
}
