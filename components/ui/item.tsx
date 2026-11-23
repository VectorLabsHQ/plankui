import * as React from "react";
import { cn } from "@/lib/cn";

export interface ItemProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  title: React.ReactNode;
  description?: React.ReactNode;
  /** An icon, avatar or thumbnail at the start. */
  media?: React.ReactNode;
  /** Buttons, a badge or a value at the end. */
  actions?: React.ReactNode;
  /** Make the whole row a link. Actions stay separate clickable controls. */
  href?: string;
  size?: "sm" | "md";
}

/** One row of a list: media, a title and description, and actions at the end. */
export function Item({ title, description, media, actions, href, size = "md", className, ...props }: ItemProps) {
  const pad = size === "sm" ? "gap-3 px-3 py-2" : "gap-3.5 px-4 py-3";
  return (
    <div {...props} className={cn("relative flex items-center rounded-tile", pad, href && "transition-colors duration-[var(--dur-micro)] hover:bg-paper-2", className)}>
      {media && <span className="grid size-9 shrink-0 place-items-center overflow-hidden rounded-tile bg-paper-2 text-ink [&_svg]:size-4.5">{media}</span>}
      <span className="grid min-w-0 flex-1 gap-0.5">
        {href ? (
          // The link's ::after covers the row, so the whole row is clickable with one Tab stop.
          <a href={href} className="truncate text-sm font-medium text-ink no-underline after:absolute after:inset-0 after:rounded-tile focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-focus">{title}</a>
        ) : (
          <span className="truncate text-sm font-medium text-ink">{title}</span>
        )}
        {description && <span className="truncate text-sm text-muted">{description}</span>}
      </span>
      {actions && <span className="relative z-10 flex shrink-0 items-center gap-1.5">{actions}</span>}
    </div>
  );
}

/** Stacks items with even spacing. */
export function ItemGroup({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={cn("grid gap-0.5", className)} />;
}
