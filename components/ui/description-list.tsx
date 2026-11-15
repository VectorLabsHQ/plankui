import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface DescriptionListProps extends Omit<ComponentPropsWithoutRef<"dl">, "children"> {
  items: readonly { id: string; term: ReactNode; description: ReactNode }[];
}

/** A list of labeled values, grouped with native definition-list semantics. */
export function DescriptionList({ items, className, ...props }: DescriptionListProps) {
  return (
    <dl className={cn("divide-y divide-rule rounded-card border border-rule bg-card px-4 text-sm", className)} {...props}>
      {items.map(({ id, term, description }) => (
        <div key={id} className="grid grid-cols-[minmax(0,1fr)_minmax(0,2fr)] gap-3 py-3 [overflow-wrap:anywhere]">
          <dt className="text-muted">{term}</dt>
          <dd className="text-ink">{description}</dd>
        </div>
      ))}
    </dl>
  );
}
