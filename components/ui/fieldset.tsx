import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface FieldsetProps extends ComponentProps<"fieldset"> {
  legend: ReactNode;
}

export function Fieldset({ legend, children, className, ...props }: FieldsetProps) {
  return (
    <fieldset {...props} className={cn("min-w-0 rounded-card border border-card-border px-4 pb-4 pt-2", className)}>
      <legend className="px-1 text-sm font-medium text-ink">{legend}</legend>
      <div className="grid gap-3">{children}</div>
    </fieldset>
  );
}
