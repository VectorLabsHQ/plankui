import * as React from "react";
import { Collapsible as CollapsiblePrimitive } from "radix-ui";
import { ChevronDownIcon } from "@plankui/icons";
import { cn } from "@/lib/cn";

export const Collapsible = CollapsiblePrimitive.Root;

/** The button that shows and hides the content. Pass asChild to use your own button. */
export function CollapsibleTrigger({ className, children, asChild, ...props }: React.ComponentProps<typeof CollapsiblePrimitive.Trigger>) {
  if (asChild) return <CollapsiblePrimitive.Trigger asChild {...props}>{children}</CollapsiblePrimitive.Trigger>;
  return (
    <CollapsiblePrimitive.Trigger
      className={cn(
        "group inline-flex items-center gap-1.5 rounded-input text-sm font-medium text-ink-2 hover:text-ink",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronDownIcon aria-hidden className="size-4 text-muted transition-transform duration-[var(--dur-short)] ease-[var(--ease-out)] group-data-[state=open]:rotate-180" />
    </CollapsiblePrimitive.Trigger>
  );
}

/** The content. It grows from zero to its measured height when opened. */
export function CollapsibleContent({ className, ...props }: React.ComponentProps<typeof CollapsiblePrimitive.Content>) {
  return <CollapsiblePrimitive.Content className={cn("vx-collapse", className)} {...props} />;
}
