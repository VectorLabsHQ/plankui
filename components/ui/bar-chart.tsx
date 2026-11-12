import * as React from "react";
import { cn } from "@/lib/cn";

export interface BarDatum {
  label: string;
  value: number;
}

export interface BarChartProps {
  data: BarDatum[];
  height?: number;
  /** Format values in the tooltip and axis. */
  format?: (n: number) => string;
  /** Number of horizontal guide lines. */
  ticks?: number;
  /** Index drawn in the full accent; the rest use a lighter tint. */
  highlight?: number;
  /** Show the value axis on the left. Turn off in tight cards. */
  axis?: boolean;
  className?: string;
  "aria-label"?: string;
}

/** Each bar blends up from its partner hue into the accent; solid in Flat and Brutal. */
const BAR_FILL = `linear-gradient(to top, ${blendFrom("var(--accent)")}, var(--accent))`;

/** Rounded bars on a track. Bars grow with clip-path, hover or focus a bar for its value. */
export function BarChart({ data, height = 200, format = (n) => n.toLocaleString(), ticks = 4, highlight, axis = true, className, ...rest }: BarChartProps) {
  const max = Math.max(...data.map((d) => d.value), 1);
  const top = niceMax(max);
  const [hover, setHover] = React.useState<number | null>(null);
  const [ready, setReady] = React.useState(false);
  React.useEffect(() => {
    const r = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(r);
  }, []);
  return (
    <div className={cn("grid gap-x-3 gap-y-2", axis ? "grid-cols-[auto_minmax(0,1fr)]" : "grid-cols-[0_minmax(0,1fr)] gap-x-0", className)} role="img" aria-label={rest["aria-label"] ?? "Bar chart"}>
      <div className={cn("relative text-right text-[11px] tabular-nums text-muted", !axis && "invisible")} style={{ height }}>
        {Array.from({ length: ticks + 1 }, (_, i) => (
          <span key={i} className="absolute right-0 -translate-y-1/2" style={{ top: `${(i / ticks) * 100}%` }}>
            {format(Math.round(top - (top / ticks) * i))}
          </span>
        ))}
      </div>
      <div className="relative" style={{ height }}>
        {Array.from({ length: ticks + 1 }, (_, i) => (
          <span key={i} aria-hidden className="absolute inset-x-0 border-t border-dashed border-rule" style={{ top: `${(i / ticks) * 100}%` }} />
        ))}
        <div className="absolute inset-0 flex items-stretch gap-[6%] px-[2%]" onMouseLeave={() => setHover(null)}>
          {data.map((d, i) => {
            const pct = (d.value / top) * 100;
            const on = hover === i || (hover === null && highlight === i);
            return (
              <button
                key={d.label}
                type="button"
                aria-label={`${d.label}: ${format(d.value)}`}
                onMouseEnter={() => setHover(i)}
                onFocus={() => setHover(i)}
                onBlur={() => setHover(null)}
                className="group relative flex-1 rounded-[6px] bg-paper-2 outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
              >
                <span
                  className={cn(
                    "absolute inset-0 rounded-[6px] transition-[clip-path,opacity] duration-700 ease-[var(--ease-out)]",
                    on ? "opacity-100" : hover !== null ? "opacity-35" : "opacity-60",
                  )}
                  style={{ backgroundImage: BAR_FILL, backgroundSize: `100% ${Math.max(pct, 1)}%`, backgroundPosition: "bottom", backgroundRepeat: "no-repeat", clipPath: `inset(${ready ? 100 - pct : 100}% 0 0 0 round 6px)`, transitionDelay: ready ? "0ms" : `${i * 40}ms` }}
                />
                {hover === i && (
                  <span className="vx-fade-up pointer-events-none absolute left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-input bg-graphite px-2 py-1 text-xs font-medium text-graphite-ink shadow-pop" style={{ bottom: `calc(${pct}% + 8px)` }}>
                    {d.label} · {format(d.value)}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
      <span />
      <div className="flex gap-[6%] px-[2%] text-center text-[11px] text-muted">
        {data.map((d) => <span key={d.label} className="flex-1 truncate">{d.label}</span>)}
      </div>
    </div>
  );
}

/** Round a maximum up to a tidy axis value. */
export function niceMax(n: number) {
  const p = Math.pow(10, Math.floor(Math.log10(n)));
  const m = n / p;
  return (m <= 1 ? 1 : m <= 2 ? 2 : m <= 2.5 ? 2.5 : m <= 5 ? 5 : 10) * p;
}

/* ───────── Shared chart helpers, used by the other charts ───────── */

/** A point on a chart, in SVG units. */
export type Point = readonly [number, number];

function sign(n: number) {
  return n < 0 ? -1 : 1;
}

/**
 * A smooth SVG path through the points, using monotone cubic interpolation (the "monotone" curve most chart
 * libraries default to). It bends gently through every point without overshooting, so a line never dips
 * below a real minimum or rises above a real maximum between two values.
 */
export function smoothPath(pts: readonly Point[]): string {
  const n = pts.length;
  if (!n) return "";
  if (n < 3) return pts.map(([x, y], i) => `${i ? "L" : "M"} ${x} ${y}`).join(" ");

  // Slope of each segment, then a tangent at each point that keeps the curve monotone between points.
  const h = pts.slice(1).map(([x], i) => x - pts[i][0]);
  const s = pts.slice(1).map(([, y], i) => (y - pts[i][1]) / (h[i] || 1));
  const t = pts.map((_, i) => {
    if (i === 0 || i === n - 1) return 0;
    const [s0, s1, h0, h1] = [s[i - 1], s[i], h[i - 1], h[i]];
    const p = (s0 * h1 + s1 * h0) / (h0 + h1);
    return (sign(s0) + sign(s1)) * Math.min(Math.abs(s0), Math.abs(s1), 0.5 * Math.abs(p)) || 0;
  });
  // The ends lean into their neighbour instead of starting flat.
  t[0] = (3 * s[0] - t[1]) / 2;
  t[n - 1] = (3 * s[n - 2] - t[n - 2]) / 2;

  let d = `M ${pts[0][0]} ${pts[0][1]}`;
  for (let i = 0; i < n - 1; i++) {
    const [x0, y0] = pts[i];
    const [x1, y1] = pts[i + 1];
    const k = h[i] / 3;
    d += ` C ${x0 + k} ${y0 + t[i] * k}, ${x1 - k} ${y1 - t[i + 1] * k}, ${x1} ${y1}`;
  }
  return d;
}

/**
 * The partner colour a series blends from: the same colour turned around the hue wheel and lifted, by amounts
 * each style sets (--chart-shift, --chart-lift). In Flat and Brutal both are 0, so charts stay solid.
 */
export function blendFrom(color: string) {
  return `oklch(from ${color} calc(l + var(--chart-lift, 0)) c calc(h + var(--chart-shift, 0)))`;
}
