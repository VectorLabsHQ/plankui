import * as React from "react";
import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import { Check, Minus } from "lucide-react";
import { cn } from "@/lib/cn";

type CheckedState = boolean | "indeterminate";

export interface CheckboxProps
  extends Omit<React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>, "className" | "checked" | "defaultChecked" | "onCheckedChange"> {
  className?: string;
  /** true, false or "indeterminate", the same as the Radix version. */
  checked?: CheckedState;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export const Checkbox = React.forwardRef<HTMLElement, CheckboxProps>(({ className, checked, onCheckedChange, ...props }, ref) => {
  const mixed = checked === "indeterminate";
  return (
    <CheckboxPrimitive.Root
      ref={ref}
      checked={mixed ? false : checked}
      indeterminate={mixed}
      onCheckedChange={(next) => onCheckedChange?.(next)}
      className={cn(
        "peer grid size-4 shrink-0 place-items-center rounded-[calc(4px*var(--radius-factor))] border border-[color:var(--control-border)] bg-[color:var(--control)] shadow-[var(--elev-control)]",
        "transition-[background-color,border-color,box-shadow] duration-[var(--dur-micro)] hover:border-muted",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus",
        "data-[checked]:border-transparent data-[checked]:bg-accent data-[checked]:[background-image:var(--control-on-image)] data-[checked]:shadow-[var(--elev-control-on)] data-[checked]:text-accent-ink",
        "data-[indeterminate]:border-transparent data-[indeterminate]:bg-accent data-[indeterminate]:[background-image:var(--control-on-image)] data-[indeterminate]:shadow-[var(--elev-control-on)] data-[indeterminate]:text-accent-ink",
        "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="grid place-items-center">
        {mixed ? <Minus className="size-3" strokeWidth={3} /> : <Check className="size-3" strokeWidth={3.5} />}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
});
Checkbox.displayName = "Checkbox";
