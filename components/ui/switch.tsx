import * as React from "react";
import { Switch as SwitchPrimitive } from "radix-ui";
import { cn } from "@/lib/cn";

export const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> & { size?: "sm" | "md" }
>(({ className, size = "md", ...props }, ref) => (
  <SwitchPrimitive.Root
    ref={ref}
    className={cn(
      "peer inline-flex shrink-0 cursor-pointer items-center rounded-full border border-transparent p-0.5",
      "bg-[color:var(--track-off)] shadow-[inset_0_1px_2px_oklch(0%_0_0/calc(var(--sh-a)*1.2))] transition-[background-color,box-shadow] duration-[var(--dur-short)]",
      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus",
      "data-[state=checked]:bg-accent data-[state=checked]:[background-image:var(--control-on-image)] data-[state=checked]:shadow-[var(--elev-control-on)] disabled:cursor-not-allowed disabled:opacity-50",
      size === "md" ? "h-6 w-[42px]" : "h-4 w-7",
      className,
    )}
    {...props}
  >
    <SwitchPrimitive.Thumb
      className={cn(
        "pointer-events-none grid place-items-center rounded-full bg-key-face [background-image:var(--thumb-image)] shadow-[var(--elev-thumb)]",
        "transition-transform duration-[var(--dur-short)] ease-[var(--ease-out)] data-[state=unchecked]:translate-x-0",
        size === "md" ? "size-[18px] data-[state=checked]:translate-x-[18px]" : "size-2.5 data-[state=checked]:translate-x-3",
      )}
    />
  </SwitchPrimitive.Root>
));
Switch.displayName = "Switch";
