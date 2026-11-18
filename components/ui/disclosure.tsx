import type { ComponentProps, ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

export interface DisclosureProps extends ComponentProps<"details"> {
  summary: ReactNode;
}

/** A single expandable section with native keyboard and focus behavior. */
export function Disclosure({ summary, children, className, ...props }: DisclosureProps) {
  return (
    <details className={cn("group vx-glass rounded-card border border-card-border bg-card shadow-card text-sm text-ink", className)} {...props}>
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 rounded-card px-4 py-3 font-medium focus-visible:outline-2 focus-visible:outline-focus [&::-webkit-details-marker]:hidden">
        {summary}
        <ChevronDown aria-hidden="true" className="size-4 shrink-0 text-muted transition-transform duration-[var(--dur-short)] ease-[var(--ease-out)] group-open:rotate-180" />
      </summary>
      <div className="border-t border-rule px-4 py-3 text-ink-2">{children}</div>
    </details>
  );
}
