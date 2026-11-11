import * as React from "react";
import { Checkbox as CheckboxPrimitive } from "radix-ui";
import { Check, Minus } from "lucide-react";
import { cn } from "@/lib/cn";

export const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer grid size-4 shrink-0 place-items-center rounded-[calc(4px*var(--radius-factor))] border border-[color:var(--control-border)] bg-[color:var(--control)] shadow-[var(--elev-control)]",
      "transition-[background-color,border-color,box-shadow] duration-[var(--dur-micro)] hover:border-muted",
      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus",
      "data-[state=checked]:border-transparent data-[state=checked]:bg-accent data-[state=checked]:[background-image:var(--control-on-image)] data-[state=checked]:shadow-[var(--elev-control-on)] data-[state=checked]:text-accent-ink",
      "data-[state=indeterminate]:border-transparent data-[state=indeterminate]:bg-accent data-[state=indeterminate]:[background-image:var(--control-on-image)] data-[state=indeterminate]:shadow-[var(--elev-control-on)] data-[state=indeterminate]:text-accent-ink",
      "disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className="grid place-items-center">
      {props.checked === "indeterminate" ? (
        <Minus className="size-3" strokeWidth={3} />
      ) : (
        <Check className="size-3" strokeWidth={3.5} />
      )}
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = "Checkbox";
