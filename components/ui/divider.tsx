import * as React from "react";
import { cn } from "@/lib/cn";

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Where the label sits on the line. */
  align?: "start" | "center" | "end";
  /** "dashed" for softer breaks inside a card. */
  variant?: "solid" | "dashed";
}

/** A rule with an optional label, such as "or" between sign-in options, or a date between messages. */
export function Divider({ align = "center", variant = "solid", className, children, ...props }: DividerProps) {
  const line = cn("h-px flex-1", variant === "dashed" ? "bg-[length:6px_1px] bg-repeat-x [background-image:linear-gradient(to_right,var(--rule-2)_50%,transparent_0)]" : "bg-rule");
  if (!children) return <div role="separator" className={cn(line, "w-full", className)} {...props} />;
  return (
    <div role="separator" className={cn("flex w-full items-center gap-3 text-xs text-muted", className)} {...props}>
      {align !== "start" && <span aria-hidden className={line} />}
      <span className="shrink-0">{children}</span>
      {align !== "end" && <span aria-hidden className={line} />}
    </div>
  );
}
