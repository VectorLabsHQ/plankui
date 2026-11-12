import * as React from "react";
import { Info, TrendingDown, TrendingUp } from "lucide-react";
import { cn } from "@/lib/cn";
import { Tooltip } from "./tooltip";

export interface StatCardProps {
  label: string;
  value: React.ReactNode;
  /** Percent change against the comparison period. */
  delta?: number;
  /** Text in the footer, such as "From last month". */
  comparison?: string;
  icon?: React.ReactNode;
  /** Any CSS colour for the icon tile. */
  color?: string;
  /** Shown in a tooltip on the info button. */
  info?: string;
  /** Set when a fall is good, such as refunds. */
  invert?: boolean;
  className?: string;
}

/** A KPI card: a grey shell, a coloured icon, the number, and a white footer with the change. */
export function StatCard({ label, value, delta, comparison = "From last month", icon, color = "var(--accent)", info, invert, className }: StatCardProps) {
  const good = delta === undefined ? undefined : invert ? delta < 0 : delta >= 0;
  const Trend = delta !== undefined && delta < 0 ? TrendingDown : TrendingUp;
  return (
    <section aria-label={label} className={cn("vx-glass flex min-w-0 flex-col gap-4 rounded-panel border border-card-border bg-card p-2 text-ink shadow-card", className)}>
      <div className="grid gap-3 px-2 pt-2">
        <div className="flex items-start justify-between">
          {icon && (
            <span className="grid size-8 place-items-center rounded-input text-[oklch(100%_0_0)] shadow-[inset_0_1.5px_0_oklch(100%_0_0/0.25)] [&_svg]:size-4" style={{ background: `linear-gradient(${color}, color-mix(in oklab, ${color} 82%, oklch(0% 0 0)))` }}>
              {icon}
            </span>
          )}
          {info && (
            <Tooltip content={info}>
              <button type="button" aria-label={`About ${label}`} className="grid size-6 place-items-center rounded-full text-muted hover:text-ink focus-visible:outline-2 focus-visible:outline-focus">
                <Info className="size-4" />
              </button>
            </Tooltip>
          )}
        </div>
        <div className="grid gap-0.5">
          <span className="text-sm text-muted">{label}</span>
          <span className="text-[28px] font-semibold leading-tight tracking-[-0.02em] tabular-nums">{value}</span>
        </div>
      </div>
      {delta !== undefined && (
        <div className="mt-auto flex items-center justify-between gap-2 rounded-input bg-paper py-1.5 pl-2.5 pr-1.5 text-sm text-muted shadow-[0_1px_1px_oklch(0%_0_0/0.05)]">
          {comparison}
          <span className={cn("flex items-center gap-1 rounded-full py-0.5 pl-1 pr-2 text-xs font-semibold", good ? "bg-success-wash text-success-wash-ink" : "bg-danger-wash text-danger-wash-ink")}>
            <Trend className="size-3.5" /> {Math.abs(delta)}%
          </span>
        </div>
      )}
    </section>
  );
}

/** A responsive grid of stat cards. */
export function StatCards({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("grid w-full gap-3 sm:grid-cols-2 xl:grid-cols-4", className)}>{children}</div>;
}
