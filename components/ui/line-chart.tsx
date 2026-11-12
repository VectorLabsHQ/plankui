import * as React from "react";
import { cn } from "@/lib/cn";
import { blendFrom, niceMax, smoothPath, type Point } from "./bar-chart";

export interface LineSeries {
  name: string;
  values: number[];
  color?: string;
  /** Draw as a dashed line, for targets or last period. */
  dashed?: boolean;
}

export interface LineChartProps {
  labels: string[];
  series: LineSeries[];
  height?: number;
  /** Smooth curves instead of straight segments. */
  curved?: boolean;
  /** Show the legend above the plot. */
  legend?: boolean;
  format?: (n: number) => string;
  className?: string;
  "aria-label"?: string;
}

const palette = ["var(--accent)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)"];

function toPath(pts: Point[], curved: boolean) {
  return curved ? smoothPath(pts) : pts.map(([x, y], i) => `${i ? "L" : "M"} ${x} ${y}`).join(" ");
}

/** Lines with a y axis, a legend and dashed comparison series. Hover or arrow through points. */
export function LineChart({ labels, series, height = 240, curved = true, legend = true, format = (n) => n.toLocaleString(), className, ...rest }: LineChartProps) {
  const W = 600;
  const H = height;
  const top = niceMax(Math.max(...series.flatMap((s) => s.values), 1));
  const [hover, setHover] = React.useState<number | null>(null);
  const ref = React.useRef<SVGSVGElement>(null);
  const id = React.useId().replace(/:/g, "");
  const step = W / Math.max(1, labels.length - 1);
  const color = (s: LineSeries, i: number) => s.color ?? palette[i % palette.length];
  const y = (v: number) => H - (v / top) * H;
  const pick = (clientX: number) => {
    const r = ref.current!.getBoundingClientRect();
    setHover(Math.max(0, Math.min(labels.length - 1, Math.round((((clientX - r.left) / r.width) * W) / step))));
  };
  const ticks = [1, 0.75, 0.5, 0.25, 0];
  return (
    <div className={cn("grid gap-3", className)}>
      {legend && (
        <ul className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink-2">
          {series.map((s, i) => (
            <li key={s.name} className="flex items-center gap-1.5">
              <span aria-hidden className={cn("h-0.5 w-3 rounded-full", s.dashed && "bg-transparent border-t-2 border-dashed")} style={s.dashed ? { borderColor: color(s, i) } : { background: color(s, i) }} />
              {s.name}
            </li>
          ))}
        </ul>
      )}
      <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-3">
        <div className="flex flex-col justify-between text-right text-[11px] tabular-nums text-muted" style={{ height: H }} aria-hidden>
          {ticks.map((t) => <span key={t} className="-translate-y-1/2 first:translate-y-0 last:translate-y-0">{format(Math.round(top * t))}</span>)}
        </div>
        <div className="relative">
          <svg
            ref={ref}
            viewBox={`0 0 ${W} ${H}`}
            preserveAspectRatio="none"
            className="block w-full overflow-visible outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
            style={{ height: H }}
            tabIndex={0}
            role="img"
            aria-label={rest["aria-label"] ?? "Line chart"}
            onMouseMove={(e) => pick(e.clientX)}
            onMouseLeave={() => setHover(null)}
            onBlur={() => setHover(null)}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") setHover((h) => Math.min(labels.length - 1, (h ?? -1) + 1));
              if (e.key === "ArrowLeft") setHover((h) => Math.max(0, (h ?? labels.length) - 1));
            }}
          >
            {ticks.map((t) => (
              <line key={t} x1="0" x2={W} y1={(1 - t) * H} y2={(1 - t) * H} stroke="var(--rule)" strokeDasharray={t === 0 ? undefined : "4 4"} vectorEffect="non-scaling-stroke" />
            ))}
            {hover !== null && <line x1={hover * step} x2={hover * step} y1="0" y2={H} stroke="var(--rule-2)" vectorEffect="non-scaling-stroke" />}
            <defs>
              {series.map((s, i) => (
                <React.Fragment key={s.name}>
                  <linearGradient id={`${id}-s${i}`} x1="0" x2="1" y1="0" y2="0">
                    <stop offset="0%" style={{ stopColor: blendFrom(color(s, i)) }} />
                    <stop offset="100%" style={{ stopColor: color(s, i) }} />
                  </linearGradient>
                  <linearGradient id={`${id}-f${i}`} x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" style={{ stopColor: color(s, i), stopOpacity: "var(--chart-area-a)" }} />
                    <stop offset="100%" style={{ stopColor: color(s, i), stopOpacity: 0 }} />
                  </linearGradient>
                </React.Fragment>
              ))}
            </defs>
            {series.map((s, i) =>
              s.dashed || i > 0 ? null : (
                <path key={s.name} d={`${toPath(s.values.map((v, j) => [j * step, y(v)] as const), curved)} L ${(s.values.length - 1) * step} ${H} L 0 ${H} Z`} fill={`url(#${id}-f${i})`} className="vx-fade-up" />
              ),
            )}
            <g className="vx-wipe">
            {series.map((s, i) => (
              <path
                key={s.name}
                d={toPath(s.values.map((v, j) => [j * step, y(v)] as const), curved)}
                fill="none"
                stroke={s.dashed ? color(s, i) : `url(#${id}-s${i})`}
                strokeWidth="2.25"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray={s.dashed ? "6 6" : undefined}
                vectorEffect="non-scaling-stroke"
              />
            ))}
            </g>
          </svg>
          {hover !== null && (
            <>
              {series.map((s, i) => (
                <span
                  key={s.name}
                  aria-hidden
                  className="pointer-events-none absolute size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-paper"
                  style={{ left: `${(hover / Math.max(1, labels.length - 1)) * 100}%`, top: y(s.values[hover]), background: color(s, i) }}
                />
              ))}
              <div
                className="vx-fade-up pointer-events-none absolute top-0 z-10 grid min-w-32 gap-1 rounded-card border border-pop-border bg-pop p-2.5 text-xs shadow-pop"
                style={{ left: `${(hover / Math.max(1, labels.length - 1)) * 100}%`, transform: `translateX(${hover > labels.length / 2 ? "calc(-100% - 12px)" : "12px"})` }}
              >
                <span className="font-medium text-ink">{labels[hover]}</span>
                {series.map((s, i) => (
                  <span key={s.name} className="flex items-center gap-2 text-ink-2">
                    <span className="size-2 rounded-full" style={{ background: color(s, i) }} />
                    {s.name}
                    <span className="ml-auto font-medium tabular-nums text-ink">{format(s.values[hover])}</span>
                  </span>
                ))}
              </div>
            </>
          )}
          <div className="mt-2 flex justify-between text-[11px] text-muted" aria-hidden>
            {labels.map((l, i) => <span key={i}>{l}</span>)}
          </div>
        </div>
      </div>
    </div>
  );
}
