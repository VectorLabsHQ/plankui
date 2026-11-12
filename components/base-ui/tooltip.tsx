import * as React from "react";
import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";
import { cn } from "@/lib/cn";

/** Same props as the Radix version: delayDuration maps to Base UI's delay. */
export function TooltipProvider({
  delayDuration,
  skipDelayDuration,
  children,
}: {
  delayDuration?: number;
  skipDelayDuration?: number;
  children: React.ReactNode;
}) {
  return (
    <TooltipPrimitive.Provider delay={delayDuration} timeout={skipDelayDuration}>
      {children}
    </TooltipPrimitive.Provider>
  );
}

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  shortcut?: React.ReactNode;
  className?: string;
}

export function Tooltip({ content, children, side = "top", shortcut, className }: TooltipProps) {
  const trigger = React.isValidElement(children) ? (children as React.ReactElement<Record<string, unknown>>) : <span>{children}</span>;
  return (
    <TooltipPrimitive.Root>
      <TooltipPrimitive.Trigger render={trigger} />
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Positioner side={side} sideOffset={6} className="z-[600]">
          <TooltipPrimitive.Popup
            className={cn(
              "vx-pop flex items-center gap-2 rounded-input bg-graphite px-2 py-1 text-xs font-medium text-graphite-ink shadow-pop",
              className,
            )}
          >
            {content}
            {shortcut && <span className="font-mono text-graphite-muted">{shortcut}</span>}
            <TooltipPrimitive.Arrow className="size-2 rotate-45 rounded-[1px] bg-graphite data-[side=bottom]:-top-1 data-[side=left]:-right-1 data-[side=right]:-left-1 data-[side=top]:-bottom-1" />
          </TooltipPrimitive.Popup>
        </TooltipPrimitive.Positioner>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  );
}
