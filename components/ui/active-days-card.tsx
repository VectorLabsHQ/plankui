import * as React from "react";
import { cn } from "@/lib/cn";
import { ChartCard } from "./chart-card";

export interface ActiveDaysCardProps {
  /** Seven values, Monday first. */
  values?: number[];
  /** Unit for the tooltip, such as "sessions". */
  unit?: string;
  className?: string;
}

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const long = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

/** Which weekday is busiest: seven rounded columns with the peak lit and named. */
export function ActiveDaysCard({ values = [62, 78, 96, 84, 70, 34, 28], unit = "sessions", className }: ActiveDaysCardProps) {
  const [hover, setHover] = React.useState<number | null>(null);
  const max = Math.max(...values, 1);
  const peak = values.indexOf(max);
  const shown = hover ?? peak;
  return (
    <ChartCard className={className} title="Most active days" value={long[peak]} caption={`${max} ${unit} on average`}>
      <div className="flex h-36 items-end gap-2">
        {values.map((v, i) => (
          <button
            key={days[i]}
            type="button"
            aria-label={`${long[i]}: ${v} ${unit}`}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
            onFocus={() => setHover(i)}
            onBlur={() => setHover(null)}
            className="group relative flex h-full flex-1 items-end rounded-[8px] bg-paper-2 focus-visible:outline-2 focus-visible:outline-focus"
          >
            <span
              className={cn("vx-rise w-full rounded-[8px] transition-colors duration-[var(--dur-micro)]", i === shown ? "bg-accent [background-image:var(--control-on-image)]" : "bg-accent/20 group-hover:bg-accent/35")}
              style={{ height: `${(v / max) * 100}%`, transformOrigin: "bottom", animationDelay: `${i * 40}ms` }}
            />
          </button>
        ))}
      </div>
      <div aria-hidden className="mt-2 flex gap-2 text-center text-[11px] text-muted">
        {days.map((d, i) => <span key={d} className={cn("flex-1", i === shown && "font-medium text-ink")}>{d}</span>)}
      </div>
      <p className="mt-2 text-center text-xs text-muted" aria-live="polite">{long[shown]}: <b className="font-medium tabular-nums text-ink">{values[shown]}</b> {unit}</p>
    </ChartCard>
  );
}
