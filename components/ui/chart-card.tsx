import * as React from "react";
import { TrendingDown, TrendingUp } from "lucide-react";
import { cn } from "@/lib/cn";

export interface ChartCardProps {
  title: string;
  /** The headline number. */
  value?: React.ReactNode;
  /** Percent change, shown as a pill beside the value. */
  delta?: number;
  invert?: boolean;
  /** Text after the value, such as "this week". */
  caption?: React.ReactNode;
  /** Controls in the header, such as a period switcher. */
  action?: React.ReactNode;
  /** A white strip under the chart for a takeaway or a link. */
  footer?: React.ReactNode;
  children: React.ReactNode;
  /** Drop the card and the inner panel, for a chart that already sits on a surface of its own. */
  flat?: boolean;
  className?: string;
}

/** The shell every chart card shares: a grey card, the title and number, the chart on a white panel, and an optional footer. */
export function ChartCard({ title, value, delta, invert, caption, action, footer, children, flat, className }: ChartCardProps) {
  const good = delta === undefined ? undefined : invert ? delta < 0 : delta >= 0;
  const Trend = delta !== undefined && delta < 0 ? TrendingDown : TrendingUp;
  return (
    <section aria-label={title} className={cn("flex min-w-0 flex-col text-ink", flat ? "gap-4" : "vx-glass gap-2 rounded-panel border border-card-border bg-card p-2 shadow-card", className)}>
      <header className={cn("flex items-start justify-between gap-3", !flat && "px-2.5 pt-2")}>
        <div className="grid min-w-0 gap-1">
          <h3 className="text-sm font-medium text-muted">{title}</h3>
          {value !== undefined && (
            <p className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
              <span className="text-2xl font-semibold tracking-[-0.02em] tabular-nums">{value}</span>
              {delta !== undefined && (
                <span className={cn("flex items-center gap-0.5 self-center rounded-full py-0.5 pl-1 pr-1.5 text-xs font-semibold", good ? "bg-success-wash text-success-wash-ink" : "bg-danger-wash text-danger-wash-ink")}>
                  <Trend className="size-3" /> {Math.abs(delta)}%
                </span>
              )}
              {caption && <span className="text-sm text-muted">{caption}</span>}
            </p>
          )}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </header>
      <div className={cn(!flat && "rounded-input bg-paper p-3 shadow-[0_1px_1px_oklch(0%_0_0/0.05)]")}>{children}</div>
      {footer && <div className={cn("text-sm text-muted", flat ? "border-t border-rule pt-3" : "px-2.5 pb-1")}>{footer}</div>}
    </section>
  );
}
