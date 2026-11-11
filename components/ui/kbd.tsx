import * as React from "react";
import { cn } from "@/lib/cn";

export function Kbd({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <kbd
      className={cn(
        "inline-flex h-5 min-w-5 items-center justify-center rounded-sm border border-rule bg-key-face px-1 font-mono text-[11px] font-medium text-ink-2 shadow-[0_1px_0_0_var(--key-edge)]",
        className,
      )}
      {...props}
    />
  );
}
