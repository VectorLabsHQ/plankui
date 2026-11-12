import * as React from "react";
import { Megaphone, X } from "lucide-react";
import { cn } from "@/lib/cn";

export interface AnnouncementProps {
  title: React.ReactNode;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  /** Shows a close button. The component does not remember dismissal; store it if you need to. */
  onDismiss?: () => void;
  className?: string;
}

/** A dismissible card for product news. */
export function Announcement({ title, children, icon = <Megaphone />, action, onDismiss, className }: AnnouncementProps) {
  return (
    <div role="status" className={cn("vx-glass relative grid w-full max-w-sm gap-3 rounded-panel border border-card-border bg-card p-4 shadow-card", className)}>
      <div className="flex items-start gap-3 pr-6">
        <span className="grid size-9 shrink-0 place-items-center rounded-input border border-[color:var(--btn-border)] bg-[color:var(--btn-bg)] [background-image:var(--btn-image)] text-accent-ink shadow-key-accent [&_svg]:size-4">
          {icon}
        </span>
        <div className="grid gap-1">
          <p className="text-sm font-semibold text-ink">{title}</p>
          {children && <p className="text-sm text-muted">{children}</p>}
        </div>
      </div>
      {action}
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss"
          className="absolute right-3 top-3 grid size-7 place-items-center rounded-input text-muted hover:bg-paper-3 hover:text-ink focus-visible:outline-2 focus-visible:outline-focus"
        >
          <X className="size-4" />
        </button>
      )}
    </div>
  );
}
