import * as React from "react";
import { cn } from "@/lib/cn";
import { ChartCard } from "./chart-card";

export interface StepsCardProps {
  days?: { label: string; value: number }[];
  goal?: number;
  className?: string;
}

const week = [
  { label: "Mon", value: 8420 }, { label: "Tue", value: 11240 }, { label: "Wed", value: 6310 }, { label: "Thu", value: 10380 },
  { label: "Fri", value: 12950 }, { label: "Sat", value: 4120 }, { label: "Sun", value: 9060 },
];

/** Daily steps against a dashed goal line. Days over the goal are filled; hover a day for its count. */
export function StepsCard({ days = week, goal = 10000, className }: StepsCardProps) {
  const [hover, setHover] = React.useState<number | null>(null);
  const max = Math.max(goal * 1.25, ...days.map((d) => d.value));
  const total = days.reduce((a, d) => a + d.value, 0);
  const hit = days.filter((d) => d.value >= goal).length;
  const H = 150;
  return (
    <ChartCard className={className} title="Steps" value={Math.round(total / days.length).toLocaleString()} caption="a day on average" footer={`Goal met on ${hit} of ${days.length} days.`}>
      <div className="relative" style={{ height: H }}>
        <span aria-hidden className="absolute inset-x-0 border-t border-dashed border-muted/60" style={{ bottom: (goal / max) * H }}>
          <span className="absolute -top-2.5 right-0 bg-paper pl-1 text-[11px] text-muted">{goal.toLocaleString()}</span>
        </span>
        <ul className="relative flex h-full items-end gap-2" aria-label="Steps by day">
          {days.map((d, i) => {
            const over = d.value >= goal;
            return (
              <li
                key={d.label}
                className="relative flex h-full flex-1 items-end"
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
                tabIndex={0}
                onFocus={() => setHover(i)}
                onBlur={() => setHover(null)}
                aria-label={`${d.label}: ${d.value.toLocaleString()} steps`}
              >
                <span
                  className={cn("vx-rise w-full rounded-[6px] transition-opacity duration-[var(--dur-micro)]", over ? "bg-accent [background-image:var(--control-on-image)]" : "bg-accent/25", hover !== null && hover !== i && "opacity-50")}
                  style={{ height: `${(d.value / max) * 100}%`, transformOrigin: "bottom", animationDelay: `${i * 40}ms` }}
                />
                {hover === i && (
                  <span className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-1 -translate-x-1/2 whitespace-nowrap rounded-input border border-pop-border bg-pop px-2 py-1 text-xs font-medium tabular-nums shadow-pop">{d.value.toLocaleString()}</span>
                )}
              </li>
            );
          })}
        </ul>
      </div>
      <div aria-hidden className="mt-2 flex gap-2 text-center text-[11px] text-muted">{days.map((d) => <span key={d.label} className="flex-1">{d.label}</span>)}</div>
    </ChartCard>
  );
}
