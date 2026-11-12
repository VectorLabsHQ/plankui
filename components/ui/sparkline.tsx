import * as React from "react";
import { cn } from "@/lib/cn";
import { blendFrom, smoothPath } from "./bar-chart";

export interface SparklineProps {
  values: number[];
  width?: number;
  height?: number;
  /** Fill under the line. */
  area?: boolean;
  /** Any CSS colour; defaults to the accent. */
  color?: string;
  /** Mark the last point. */
  showLast?: boolean;
  className?: string;
  "aria-label"?: string;
}

/** A small trend line for tables, stats and cards. */
export function Sparkline({ values, width = 120, height = 36, area, color = "var(--accent)", showLast, className, ...rest }: SparklineProps) {
  const id = React.useId().replace(/:/g, "");
  const min = Math.min(...values);
  const max = Math.max(...values);
  const pts = values.map((v, i) => [(i / (values.length - 1)) * width, height - 3 - ((v - min) / (max - min || 1)) * (height - 6)] as const);
  const line = smoothPath(pts);
  const last = pts[pts.length - 1];
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      className={cn("overflow-visible", className)}
      role="img"
      aria-label={rest["aria-label"] ?? `Trend from ${values[0]} to ${values[values.length - 1]}`}
    >
      <defs>
        <linearGradient id={`${id}-s`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" style={{ stopColor: blendFrom(color) }} />
          <stop offset="100%" style={{ stopColor: color }} />
        </linearGradient>
        {area && (
          <linearGradient id={id} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" style={{ stopColor: color, stopOpacity: "var(--chart-area-a)" }} />
            <stop offset="100%" style={{ stopColor: color, stopOpacity: 0 }} />
          </linearGradient>
        )}
      </defs>
      {area && <path d={`${line} L ${width} ${height} L 0 ${height} Z`} fill={`url(#${id})`} />}
      <path d={line} fill="none" stroke={`url(#${id}-s)`} strokeWidth="1.75" strokeLinejoin="round" strokeLinecap="round" pathLength={1} className="vx-draw" />
      {showLast && <circle cx={last[0]} cy={last[1]} r="2.75" fill={color} stroke="var(--paper)" strokeWidth="1.5" />}
    </svg>
  );
}
