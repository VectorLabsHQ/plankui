import * as React from "react";
import { cn } from "@/lib/cn";
import { Badge } from "./badge";
import { Progress } from "./progress";

export interface UsageLine {
  label: string;
  used: number;
  limit: number;
  /** Unit shown after the numbers, such as "GB". */
  unit?: string;
}

export interface PlanUsageProps {
  plan: string;
  /** The price line, such as "$29 a month". */
  price?: string;
  /** When the period renews, such as "Renews 1 December". */
  renews?: string;
  usage: UsageLine[];
  /** Buttons such as Upgrade and Manage billing. */
  actions?: React.ReactNode;
  className?: string;
}

const fmt = (n: number) => n.toLocaleString();

/** The current plan with a meter for each limit; meters near their limit turn to a warning, at it to danger. */
export function PlanUsage({ plan, price, renews, usage, actions, className }: PlanUsageProps) {
  return (
    <section aria-label={`${plan} plan`} className={cn("vx-glass grid gap-5 rounded-panel border border-card-border bg-card p-5 text-ink shadow-card", className)}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="grid gap-1">
          <p className="flex items-center gap-2 font-semibold">{plan} <Badge variant="accent">Current plan</Badge></p>
          {(price || renews) && <p className="text-sm text-muted">{[price, renews].filter(Boolean).join(". ")}</p>}
        </div>
        {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
      </div>
      <ul className="grid gap-4">
        {usage.map((u) => {
          const pct = u.limit ? Math.min(100, Math.round((u.used / u.limit) * 100)) : 0;
          const tone = pct >= 100 ? "danger" : pct >= 80 ? "warn" : "ok";
          return (
            <li key={u.label} className="grid gap-1.5">
              <div className="flex items-baseline justify-between gap-3 text-sm">
                <span className="font-medium">{u.label}</span>
                <span className={cn("tabular-nums", tone === "ok" ? "text-muted" : tone === "warn" ? "text-warning-wash-ink" : "text-danger-wash-ink")}>
                  {fmt(u.used)} of {fmt(u.limit)}{u.unit ? ` ${u.unit}` : ""}
                </span>
              </div>
              <Progress
                value={pct}
                tone={tone === "danger" ? "danger" : tone === "warn" ? "warning" : "accent"}
                aria-label={`${u.label}: ${pct}% used`}
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
}
