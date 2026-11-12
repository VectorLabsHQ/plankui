import * as React from "react";
import { cn } from "@/lib/cn";

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

/** What a list or page shows when it has nothing in it yet. */
export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center gap-3 rounded-panel border border-dashed border-rule-2 px-6 py-12 text-center", className)}>
      {icon && (
        <span className="mb-1 grid size-11 place-items-center rounded-card border border-[color:var(--key-border)] bg-key-face text-muted shadow-key [&_svg]:size-5">
          {icon}
        </span>
      )}
      <p className="font-display text-lg font-medium tracking-tight text-ink">{title}</p>
      {description && <p className="max-w-sm text-sm text-muted">{description}</p>}
      {action && <div className="mt-2 flex flex-wrap justify-center gap-2">{action}</div>}
    </div>
  );
}
