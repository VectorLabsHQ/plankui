import * as React from "react";
import { cn } from "@/lib/cn";

export interface ProgressCircleProps {
  value: number;
  size?: number;
  /** Ring thickness in pixels. */
  thickness?: number;
  tone?: "accent" | "success" | "warning" | "danger";
  /** Centre content. Defaults to the percentage. */
  children?: React.ReactNode;
  label?: string;
  className?: string;
}

const stroke = { accent: "var(--accent)", success: "var(--success)", warning: "var(--warning)", danger: "var(--danger)" };

/** A ring that fills to a value. The fill eases between values. */
export function ProgressCircle({ value, size = 96, thickness = 8, tone = "accent", children, label, className }: ProgressCircleProps) {
  const v = Math.min(100, Math.max(0, value));
  const r = (size - thickness) / 2;
  const c = 2 * Math.PI * r;
  return (
    <div
      role="progressbar"
      aria-valuenow={Math.round(v)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
      className={cn("relative inline-grid place-items-center", className)}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90" aria-hidden>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--paper-3)" strokeWidth={thickness} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={stroke[tone]}
          strokeWidth={thickness}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - v / 100)}
          className="transition-[stroke-dashoffset] duration-700 ease-[var(--ease-out)]"
        />
      </svg>
      <span className="absolute inset-0 grid place-content-center text-center">
        {children ?? <span className="font-semibold tabular-nums tracking-tight" style={{ fontSize: size * 0.24 }}>{Math.round(v)}%</span>}
      </span>
    </div>
  );
}
