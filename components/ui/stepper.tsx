import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/cn";

export interface StepperProps {
  steps: { title: React.ReactNode; description?: React.ReactNode }[];
  /** Zero-based index of the current step. */
  current: number;
  orientation?: "horizontal" | "vertical";
  className?: string;
}

/** Progress through a multi-step flow. */
export function Stepper({ steps, current, orientation = "horizontal", className }: StepperProps) {
  const vertical = orientation === "vertical";
  return (
    <ol className={cn("flex", vertical ? "flex-col" : "w-full items-start", className)}>
      {steps.map((s, i) => {
        const state = i < current ? "done" : i === current ? "current" : "todo";
        const last = i === steps.length - 1;
        return (
          <li
            key={i}
            aria-current={state === "current" ? "step" : undefined}
            className={cn("relative flex gap-3", vertical ? "pb-6 last:pb-0" : cn("flex-col", last ? "flex-none" : "min-w-0 flex-1"))}
          >
            <div className={cn("flex items-center", vertical ? "flex-col self-stretch" : "w-full")}>
              <span
                className={cn(
                  "grid size-7 shrink-0 place-items-center rounded-full border text-xs font-medium tabular-nums",
                  state === "done" && "border-accent bg-accent text-accent-ink",
                  state === "current" && "border-accent bg-paper text-accent shadow-[0_0_0_4px_var(--ring)]",
                  state === "todo" && "border-rule-2 bg-paper text-muted",
                )}
              >
                {state === "done" ? <Check className="size-3.5" strokeWidth={3} /> : i + 1}
              </span>
              {!last && (
                <span
                  aria-hidden
                  className={cn(vertical ? "mt-1 w-px flex-1" : "mx-2 h-px flex-1", i < current ? "bg-accent" : "bg-rule-2")}
                />
              )}
            </div>
            <div className={cn("grid gap-0.5", !vertical && !last && "pr-4")}>
              <span className={cn("text-sm font-medium", state === "todo" ? "text-muted" : "text-ink")}>{s.title}</span>
              {s.description && <span className="text-sm text-muted">{s.description}</span>}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
