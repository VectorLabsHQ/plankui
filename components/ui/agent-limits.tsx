import * as React from "react";
import { TriangleAlert, Zap } from "lucide-react";
import { cn } from "@/lib/cn";
import { Button } from "./button";

export interface Limit {
  label: string;
  used: number;
  max: number;
  /** Shown after the numbers, such as "messages". */
  unit?: string;
}

export interface AgentLimitsProps {
  plan?: string;
  limits: Limit[];
  /** When the allowance resets, such as "in 3 days". */
  resets?: string;
  onUpgrade?: () => void;
  className?: string;
}

const tone = (pct: number) => (pct >= 1 ? "bg-danger" : pct >= 0.8 ? "bg-warning" : "bg-accent [background-image:var(--control-on-image)]");

/** Usage against plan limits. Bars turn amber at 80% and red when a limit is reached. */
export function AgentLimits({ plan = "Free", limits, resets, onUpgrade, className }: AgentLimitsProps) {
  const worst = Math.max(...limits.map((l) => l.used / l.max));
  return (
    <section aria-label="Usage" className={cn("vx-glass grid w-full max-w-sm gap-2 rounded-panel border border-card-border bg-card p-2 text-ink shadow-card", className)}>
      <header className="flex items-center justify-between gap-2 px-2.5 pt-2">
        <div>
          <p className="text-sm font-medium">Usage</p>
          <p className="text-xs text-muted">{plan} plan{resets && `, resets ${resets}`}</p>
        </div>
        {onUpgrade && <Button size="xs" onClick={onUpgrade}><Zap /> Upgrade</Button>}
      </header>
      <ul className="grid gap-3.5 rounded-input bg-paper p-3.5 shadow-[0_1px_1px_oklch(0%_0_0/0.05)]">
        {limits.map((l) => {
          const pct = Math.min(1, l.used / l.max);
          return (
            <li key={l.label} className="grid gap-1.5">
              <div className="flex items-baseline justify-between gap-2 text-sm">
                <span className="font-medium">{l.label}</span>
                <span className="tabular-nums text-muted"><b className="font-medium text-ink">{l.used.toLocaleString()}</b> / {l.max.toLocaleString()}{l.unit && ` ${l.unit}`}</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-[color:var(--track-off)]" role="meter" aria-label={l.label} aria-valuenow={l.used} aria-valuemin={0} aria-valuemax={l.max}>
                <div className={cn("h-full origin-left rounded-full transition-transform duration-[var(--dur-short)]", tone(pct))} style={{ transform: `scaleX(${pct})` }} />
              </div>
            </li>
          );
        })}
      </ul>
      {worst >= 0.8 && (
        <p className={cn("flex items-start gap-2 rounded-input px-3 py-2 text-xs", worst >= 1 ? "bg-danger-wash text-danger-wash-ink" : "bg-warning-wash text-warning-wash-ink")}>
          <TriangleAlert className="mt-px size-3.5 shrink-0" />
          {worst >= 1 ? "You have reached a limit. New runs wait until it resets." : "You are close to a limit. Runs may pause soon."}
        </p>
      )}
    </section>
  );
}
