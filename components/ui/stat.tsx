import * as React from "react";
import { TrendingDown, TrendingUp } from "lucide-react";
import { cn } from "@/lib/cn";
import { Sparkline } from "./sparkline";

export interface StatProps {
  label: React.ReactNode;
  value: React.ReactNode;
  /** Change versus the previous period, e.g. 12.4 or -3. */
  delta?: number;
  /** Text after the delta, e.g. "vs last week". */
  deltaLabel?: React.ReactNode;
  /** Set when a fall is good, e.g. error rate. */
  invert?: boolean;
  /** Optional series drawn as a sparkline. */
  trend?: number[];
  className?: string;
}

/** One number, with its label, change and trend. */
export function Stat({ label, value, delta, deltaLabel, invert, trend, className }: StatProps) {
  const good = delta === undefined ? undefined : invert ? delta < 0 : delta >= 0;
  const Icon = delta !== undefined && delta < 0 ? TrendingDown : TrendingUp;
  return (
    <div className={cn("vx-glass grid gap-2 rounded-panel border border-card-border bg-card p-5 shadow-card", className)}>
      <p className="text-sm text-muted">{label}</p>
      <div className="flex items-end justify-between gap-3">
        <p className="shrink-0 font-display text-3xl font-semibold tabular-nums tracking-tight text-ink">{value}</p>
        {trend && (
          <div className="flex min-w-0 max-w-28 flex-1 justify-end pb-1">
            <Sparkline values={trend} width={112} height={32} className="h-auto w-full" />
          </div>
        )}
      </div>
      {delta !== undefined && (
        <p className="flex items-center gap-1.5 text-sm">
          <span className={cn("inline-flex items-center gap-1 font-medium tabular-nums", good ? "text-success-wash-ink" : "text-danger-wash-ink")}>
            <Icon className="size-3.5" />
            {delta > 0 ? "+" : ""}
            {delta}%
          </span>
          {deltaLabel && <span className="text-muted">{deltaLabel}</span>}
        </p>
      )}
    </div>
  );
}
