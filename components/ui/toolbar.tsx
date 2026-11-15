import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

export interface ToolbarProps extends ComponentPropsWithoutRef<"div"> {
  label: string;
}

export function Toolbar({ label, className, children, ...props }: ToolbarProps) {
  return (
    <div {...props} role="group" aria-label={label} className={cn("inline-flex flex-wrap items-center gap-1 rounded-card border border-rule bg-card p-1", className)}>
      {children}
    </div>
  );
}
