import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

export interface ScrollAreaProps extends ComponentPropsWithoutRef<"div"> {
  "aria-label": string;
}

export function ScrollArea({ className, ...props }: ScrollAreaProps) {
  return (
    <div
      role="region"
      tabIndex={0}
      className={cn("max-h-48 overflow-auto rounded-card border border-rule bg-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus", className)}
      {...props}
    />
  );
}
