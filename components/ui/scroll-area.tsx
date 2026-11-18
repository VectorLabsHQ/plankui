import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

export interface ScrollAreaProps extends ComponentProps<"div"> {
  "aria-label": string;
}

export function ScrollArea({ className, ...props }: ScrollAreaProps) {
  return (
    <div
      role="region"
      tabIndex={0}
      className={cn("vx-glass rounded-card border border-card-border bg-card shadow-card max-h-48 overflow-auto [scrollbar-color:var(--rule-2)_transparent] [scrollbar-width:thin] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[color:var(--rule-2)] [&::-webkit-scrollbar-thumb:hover]:bg-[color:var(--muted)] [&::-webkit-scrollbar-track]:bg-transparent", className)}
      {...props}
    />
  );
}
