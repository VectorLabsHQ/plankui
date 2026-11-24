import * as React from "react";
import { CheckIcon, ChevronRightIcon, XIcon } from "@plankui/icons";
import { cn } from "@/lib/cn";
import { Progress } from "./progress";

export interface OnboardingStep {
  id: string;
  title: string;
  description?: string;
  done?: boolean;
  /** Where the step is done, or what to run. */
  href?: string;
  onSelect?: () => void;
}

export interface OnboardingChecklistProps {
  title?: string;
  steps: OnboardingStep[];
  /** Shows a close button, such as to hide the checklist for good. */
  onDismiss?: () => void;
  className?: string;
}

/** Setup steps for a new account, with progress; each open step links to where it is done. */
export function OnboardingChecklist({ title = "Get set up", steps, onDismiss, className }: OnboardingChecklistProps) {
  const done = steps.filter((s) => s.done).length;
  const pct = steps.length ? Math.round((done / steps.length) * 100) : 0;
  return (
    <section aria-label={title} className={cn("vx-glass grid gap-4 rounded-panel border border-card-border bg-card p-5 text-ink shadow-card", className)}>
      <div className="flex items-start justify-between gap-3">
        <div className="grid gap-1">
          <h3 className="font-semibold">{title}</h3>
          <p className="text-sm text-muted">{done === steps.length ? "All done. Nice work." : `${done} of ${steps.length} steps done`}</p>
        </div>
        {onDismiss && (
          <button type="button" onClick={onDismiss} aria-label="Hide checklist" className="grid size-7 place-items-center rounded-input text-muted hover:bg-paper-3 hover:text-ink focus-visible:outline-2 focus-visible:outline-focus">
            <XIcon className="size-4" />
          </button>
        )}
      </div>
      <Progress value={pct} aria-label={`${pct}% set up`} />
      <ol className="grid gap-1">
        {steps.map((s) => {
          const body = (
            <>
              <span className={cn("grid size-6 shrink-0 place-items-center rounded-pill border", s.done ? "border-transparent bg-success text-white" : "border-rule-2")}>
                {s.done && <CheckIcon className="size-3.5" />}
              </span>
              <span className="grid min-w-0 flex-1 gap-0.5 text-left">
                <span className={cn("text-sm font-medium", s.done ? "text-muted line-through decoration-rule-2" : "text-ink")}>{s.title}</span>
                {s.description && !s.done && <span className="text-sm text-muted">{s.description}</span>}
              </span>
              {!s.done && (s.href || s.onSelect) && <ChevronRightIcon className="size-4 shrink-0 text-muted transition-transform duration-[var(--dur-micro)] group-hover:translate-x-0.5" />}
            </>
          );
          const row = "group flex w-full items-start gap-3 rounded-input px-2 py-2.5";
          const live = "transition-colors duration-[var(--dur-micro)] hover:bg-paper-2 focus-visible:outline-2 focus-visible:outline-focus";
          return (
            <li key={s.id}>
              {s.done ? (
                <div className={row}><span className="sr-only">Done: </span>{body}</div>
              ) : s.href ? (
                <a href={s.href} className={cn(row, live, "no-underline")}>{body}</a>
              ) : s.onSelect ? (
                <button type="button" onClick={s.onSelect} className={cn(row, live)}>{body}</button>
              ) : (
                <div className={row}>{body}</div>
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
