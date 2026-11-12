import * as React from "react";
import { cn } from "@/lib/cn";

export interface TimelineItem {
  title: React.ReactNode;
  time?: React.ReactNode;
  body?: React.ReactNode;
  /** An icon in the marker; a dot when omitted. */
  icon?: React.ReactNode;
  tone?: "neutral" | "accent" | "success" | "warning" | "danger";
}

const tones = {
  neutral: "border-rule-2 bg-paper text-muted",
  accent: "border-transparent bg-accent text-accent-ink",
  success: "border-transparent bg-success text-white",
  warning: "border-transparent bg-warning text-ink",
  danger: "border-transparent bg-danger text-white",
};

/** A vertical list of events joined by a line. */
export function Timeline({ items, className }: { items: TimelineItem[]; className?: string }) {
  return (
    <ol className={cn("grid", className)}>
      {items.map((it, i) => (
        <li key={i} className="relative grid grid-cols-[28px_minmax(0,1fr)] gap-3 pb-6 last:pb-0">
          {i < items.length - 1 && <span aria-hidden className="absolute bottom-0 left-[13.5px] top-8 w-px bg-rule" />}
          <span className={cn("relative z-10 grid size-7 place-items-center rounded-full border [&_svg]:size-3.5", tones[it.tone ?? "neutral"])}>
            {it.icon ?? <span className="size-2 rounded-full bg-current" />}
          </span>
          <div className="grid gap-1 pt-0.5">
            <div className="flex flex-wrap items-baseline justify-between gap-x-3">
              <p className="text-sm font-medium text-ink">{it.title}</p>
              {it.time && <time className="text-xs text-muted">{it.time}</time>}
            </div>
            {it.body && <div className="text-sm text-muted">{it.body}</div>}
          </div>
        </li>
      ))}
    </ol>
  );
}
