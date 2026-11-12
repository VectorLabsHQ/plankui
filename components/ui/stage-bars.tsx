import { cn } from "@/lib/cn";

export interface Stage {
  label: string;
  value: number;
  color?: string;
}

export interface StageBarsProps {
  /** One row per item, each split into the same stages. */
  rows: { label: string; stages: Stage[] }[];
  format?: (n: number) => string;
  /** Show the stage legend. */
  legend?: boolean;
  className?: string;
}

const palette = ["var(--accent)", "var(--chart-3)", "var(--chart-2)", "var(--chart-5)", "var(--chart-4)"];

/** Horizontal bars split into stages, such as sleep phases or a deal pipeline per rep. */
export function StageBars({ rows, format = (n) => n.toLocaleString(), legend = true, className }: StageBarsProps) {
  const max = Math.max(...rows.map((r) => r.stages.reduce((a, s) => a + s.value, 0)), 1);
  const stageNames = rows[0]?.stages ?? [];
  return (
    <div className={cn("grid gap-3", className)}>
      {legend && (
        <ul className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink-2">
          {stageNames.map((s, i) => <li key={s.label} className="flex items-center gap-1.5"><span aria-hidden className="size-2.5 rounded-[3px]" style={{ background: s.color ?? palette[i % 5] }} />{s.label}</li>)}
        </ul>
      )}
      <ul className="grid gap-2.5">
        {rows.map((r, ri) => {
          const total = r.stages.reduce((a, s) => a + s.value, 0);
          return (
            <li key={r.label} className="grid grid-cols-[88px_minmax(0,1fr)_auto] items-center gap-3 text-sm">
              <span className="truncate text-ink-2">{r.label}</span>
              <span
                className="vx-grow-x flex h-3 gap-0.5 overflow-hidden rounded-full"
                style={{ width: `${(total / max) * 100}%`, animationDelay: `${ri * 60}ms` }}
                role="img"
                aria-label={`${r.label}: ${r.stages.map((s) => `${s.label} ${format(s.value)}`).join(", ")}`}
              >
                {r.stages.map((s, i) => <span key={s.label} title={`${s.label}: ${format(s.value)}`} className="h-full first:rounded-l-full last:rounded-r-full" style={{ flexGrow: s.value, background: s.color ?? palette[i % 5] }} />)}
              </span>
              <span className="text-right tabular-nums text-ink">{format(total)}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
