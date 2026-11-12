import * as React from "react";
import { Separator as SeparatorPrimitive } from "@base-ui/react/separator";
import { cn } from "@/lib/cn";

export function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: Omit<React.ComponentProps<typeof SeparatorPrimitive>, "className"> & { className?: string; decorative?: boolean }) {
  return (
    <SeparatorPrimitive
      orientation={orientation}
      {...(decorative ? { role: "none", "aria-orientation": undefined } : {})}
      className={cn("shrink-0 bg-rule", orientation === "horizontal" ? "h-px w-full" : "h-full w-px", className)}
      {...props}
    />
  );
}
