import * as React from "react";
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group";
import { Radio } from "@base-ui/react/radio";
import { cn } from "@/lib/cn";

export interface RadioGroupProps
  extends Omit<React.ComponentProps<typeof RadioGroupPrimitive>, "className" | "value" | "defaultValue" | "onValueChange"> {
  className?: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

export function RadioGroup({ className, onValueChange, ...props }: RadioGroupProps) {
  return <RadioGroupPrimitive className={cn("grid gap-2.5", className)} onValueChange={(v) => onValueChange?.(String(v))} {...props} />;
}

export function RadioGroupItem({
  className,
  ...props
}: Omit<React.ComponentProps<typeof Radio.Root>, "className" | "value"> & { className?: string; value: string }) {
  return (
    <Radio.Root
      className={cn(
        "peer grid size-4 shrink-0 place-items-center rounded-full border border-[color:var(--control-border)] bg-[color:var(--control)] shadow-[var(--elev-control)]",
        "transition-[background-color,border-color,box-shadow] duration-[var(--dur-micro)] hover:border-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus",
        "data-[checked]:border-transparent data-[checked]:bg-accent data-[checked]:[background-image:var(--control-on-image)] data-[checked]:shadow-[var(--elev-control-on)]",
        "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
        className,
      )}
      {...props}
    >
      <Radio.Indicator className="block size-1.5 rounded-full bg-accent-ink" />
    </Radio.Root>
  );
}

/** A bordered, selectable card that wraps a radio. */
export function RadioCard({
  value,
  title,
  description,
  className,
}: {
  value: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
}) {
  return (
    <label
      className={cn(
        "vx-glass flex cursor-pointer items-start gap-3 rounded-card border border-card-border bg-card p-3.5 shadow-card",
        "transition-[border-color,background-color] duration-[var(--dur-micro)] hover:border-rule-2",
        "has-[[data-checked]]:border-accent has-[[data-checked]]:bg-accent-wash/50",
        className,
      )}
    >
      <RadioGroupItem value={value} className="mt-0.5" />
      <span className="grid gap-0.5">
        <span className="text-sm font-medium text-ink">{title}</span>
        {description && <span className="text-sm text-muted">{description}</span>}
      </span>
    </label>
  );
}
