import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

export interface NativeSelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  /** Classes for the wrapper; className styles the select itself. */
  wrapperClassName?: string;
  size?: "sm" | "md";
}

/**
 * The browser's own select, restyled. The arrow is ours, inset from the edge with room to breathe,
 * so it never crowds the border the way the default arrow does.
 */
export const NativeSelect = React.forwardRef<HTMLSelectElement, NativeSelectProps>(
  ({ className, wrapperClassName, size = "md", children, ...props }, ref) => (
    <span className={cn("relative inline-flex", wrapperClassName)}>
      <select
        ref={ref}
        className={cn(
          "vx-glass w-full cursor-pointer appearance-none rounded-input border border-field-border bg-field text-ink shadow-field",
          "outline-none focus-visible:field-focus disabled:cursor-not-allowed disabled:opacity-50",
          size === "md" ? "h-9 pl-3 pr-10 text-sm" : "h-8 pl-2.5 pr-9 text-sm",
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown
        aria-hidden
        className={cn("pointer-events-none absolute top-1/2 size-4 -translate-y-1/2 text-muted", size === "md" ? "right-3.5" : "right-3")}
      />
    </span>
  ),
);
NativeSelect.displayName = "NativeSelect";
