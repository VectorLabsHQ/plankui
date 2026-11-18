import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface DescriptionListProps extends Omit<ComponentProps<"dl">, "children"> {
  items: readonly { id: string; term: ReactNode; description: ReactNode }[];
}

/** A list of labeled values, grouped with native definition-list semantics. */
export function DescriptionList({ items, className, ...props }: DescriptionListProps) {
  return (
    <dl className={cn("vx-glass rounded-card border border-card-border bg-card shadow-card divide-y divide-rule px-4 text-sm", className)} {...props}>
      {items.map(({ id, term, description }) => (
        <div key={id} className="grid grid-cols-[minmax(0,1fr)_minmax(0,2fr)] gap-3 py-3 [overflow-wrap:anywhere]">
          <dt className="text-muted">{term}</dt>
          <dd className="text-ink">{description}</dd>
        </div>
      ))}
    </dl>
  );
}
