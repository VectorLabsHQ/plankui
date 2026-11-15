import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

const tones = {
  neutral: "bg-muted",
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-danger",
};

export interface StatusIndicatorProps extends Omit<ComponentPropsWithoutRef<"span">, "children"> {
  label: string;
  tone?: keyof typeof tones;
}

export function StatusIndicator({ label, tone = "neutral", className, ...props }: StatusIndicatorProps) {
  return (
    <span className={cn("inline-flex items-center gap-2 text-sm font-medium text-ink", className)} {...props}>
      <span aria-hidden="true" className={cn("size-2 shrink-0 rounded-full", tones[tone])} />
      {label}
    </span>
  );
}
