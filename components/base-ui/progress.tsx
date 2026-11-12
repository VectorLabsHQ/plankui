import * as React from "react";
import { Progress as ProgressPrimitive } from "@base-ui/react/progress";
import { cn } from "@/lib/cn";

export function Progress({
  value = 0,
  className,
  tone = "accent",
  ...props
}: Omit<React.ComponentProps<typeof ProgressPrimitive.Root>, "className" | "value"> & {
  value?: number | null;
  className?: string;
  tone?: "accent" | "success" | "danger";
}) {
  const fill = { accent: "bg-accent [background-image:var(--control-on-image)]", success: "bg-success", danger: "bg-danger" }[tone];
  const v = Math.min(100, Math.max(0, value ?? 0));
  return (
    <ProgressPrimitive.Root value={v} {...props}>
      <ProgressPrimitive.Track
        className={cn("relative block h-2 w-full overflow-hidden rounded-full bg-[color:var(--track-off)] shadow-[inset_0_1px_1px_oklch(0%_0_0/0.06)]", className)}
      >
        <ProgressPrimitive.Indicator
          className={cn("block h-full rounded-full transition-[width] duration-[var(--dur-short)] ease-[var(--ease-out)]", fill)}
        />
      </ProgressPrimitive.Track>
    </ProgressPrimitive.Root>
  );
}

/** A meter of discrete cells, useful for quotas and usage. */
export function Meter({ value, cells = 24, className, label }: { value: number; cells?: number; className?: string; label?: string }) {
  const on = Math.round((value / 100) * cells);
  return (
    <div role="meter" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100} aria-label={label} className={cn("flex gap-[3px]", className)}>
      {Array.from({ length: cells }).map((_, i) => (
        <span key={i} className={cn("h-4 flex-1 rounded-[2px]", i < on ? "bg-accent" : "bg-paper-3")} />
      ))}
    </div>
  );
}
