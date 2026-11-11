import * as React from "react";
import { cn } from "@/lib/cn";

/**
 * Buttons fused into one row: inner corners square, borders shared.
 * Put Button elements inside; pass aria-label to describe the group.
 */
export function ButtonGroup({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      role="group"
      className={cn(
        "inline-flex items-stretch [&>*]:rounded-none [&>*:first-child]:rounded-l-input [&>*:last-child]:rounded-r-input [&>*:not(:first-child)]:-ml-px [&>*]:shadow-none [&>*:focus-visible]:z-10 [&>*:hover]:z-10",
        className,
      )}
      {...props}
    />
  );
}
