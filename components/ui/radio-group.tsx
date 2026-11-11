import * as React from "react";
import { RadioGroup as RadioGroupPrimitive } from "radix-ui";
import { cn } from "@/lib/cn";

export function RadioGroup({ className, ...props }: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return <RadioGroupPrimitive.Root className={cn("grid gap-2.5", className)} {...props} />;
}

export function RadioGroupItem({ className, ...props }: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      className={cn(
        "peer grid size-4 shrink-0 place-items-center rounded-full border border-[color:var(--control-border)] bg-[color:var(--control)] shadow-[var(--elev-control)]",
        "transition-[background-color,border-color,box-shadow] duration-[var(--dur-micro)] hover:border-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus",
        "data-[state=checked]:border-transparent data-[state=checked]:bg-accent data-[state=checked]:[background-image:var(--control-on-image)] data-[state=checked]:shadow-[var(--elev-control-on)]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="block size-1.5 rounded-full bg-accent-ink" />
    </RadioGroupPrimitive.Item>
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
        "has-[[data-state=checked]]:border-accent has-[[data-state=checked]]:bg-accent-wash/50",
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
