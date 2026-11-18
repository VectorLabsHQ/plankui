import * as React from "react";
import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

/** asChild, as in the Radix version: the child element becomes the trigger. */
function slot(asChild: boolean | undefined, children: React.ReactNode) {
  if (!asChild || !React.isValidElement(children)) return null;
  const nativeButton = typeof children.type !== "string" || children.type === "button";
  return { render: children as React.ReactElement<Record<string, unknown>>, nativeButton };
}

export const Collapsible = CollapsiblePrimitive.Root;

/** The button that shows and hides the content. Pass asChild to use your own button. */
export function CollapsibleTrigger({
  className,
  children,
  asChild,
  ...props
}: Omit<React.ComponentProps<typeof CollapsiblePrimitive.Trigger>, "className" | "render"> & { className?: string; asChild?: boolean }) {
  const own = slot(asChild, children);
  if (own) return <CollapsiblePrimitive.Trigger {...props} {...own} />;
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
      <ChevronDown aria-hidden className="size-4 text-muted transition-transform duration-[var(--dur-short)] ease-[var(--ease-out)] group-data-[panel-open]:rotate-180" />
    </CollapsiblePrimitive.Trigger>
  );
}

/** The content. It grows from zero to its measured height when opened. */
export function CollapsibleContent({ className, ...props }: Omit<React.ComponentProps<typeof CollapsiblePrimitive.Panel>, "className"> & { className?: string }) {
  return <CollapsiblePrimitive.Panel className={cn("vx-collapse", className)} {...props} />;
}
