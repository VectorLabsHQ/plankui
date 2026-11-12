import * as React from "react";
import { HoverCard as HC } from "radix-ui";
import { cn } from "@/lib/cn";

export const HoverCard = HC.Root;
export const HoverCardTrigger = HC.Trigger;

export function HoverCardContent({ className, align = "center", sideOffset = 8, ...props }: React.ComponentProps<typeof HC.Content>) {
  return (
    <HC.Portal>
      <HC.Content
        align={align}
        sideOffset={sideOffset}
        className={cn("vx-pop z-[100] w-72 vx-glass rounded-card border border-pop-border bg-pop p-4 text-ink shadow-pop outline-none", className)}
        {...props}
      />
    </HC.Portal>
  );
}
