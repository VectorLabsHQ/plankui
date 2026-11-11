import * as React from "react";
import { Tooltip as TooltipPrimitive } from "radix-ui";
import { cn } from "@/lib/cn";

export const TooltipProvider = TooltipPrimitive.Provider;

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  shortcut?: React.ReactNode;
  className?: string;
}

export function Tooltip({ content, children, side = "top", shortcut, className }: TooltipProps) {
  return (
    <TooltipPrimitive.Root>
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          side={side}
          sideOffset={6}
          className={cn(
            "vx-pop z-[600] flex items-center gap-2 rounded-input bg-graphite px-2 py-1 text-xs font-medium text-graphite-ink shadow-pop",
            className,
          )}
        >
          {content}
          {shortcut && <span className="font-mono text-graphite-muted">{shortcut}</span>}
          <TooltipPrimitive.Arrow className="fill-graphite" />
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  );
}
