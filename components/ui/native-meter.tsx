import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

export interface NativeMeterProps extends ComponentPropsWithoutRef<"meter"> {
  label: string;
  value: number;
}

export function NativeMeter({ label, value, className, ...props }: NativeMeterProps) {
  return (
    <meter
      {...props}
      aria-label={label}
      value={value}
      className={cn(
        "block h-2.5 w-full appearance-none overflow-hidden rounded-pill bg-paper-3",
        "[&::-webkit-meter-bar]:border-0 [&::-webkit-meter-bar]:bg-paper-3",
        "[&::-webkit-meter-optimum-value]:bg-accent [&::-webkit-meter-suboptimum-value]:bg-warning [&::-webkit-meter-even-less-good-value]:bg-danger",
        "[&::-moz-meter-bar]:bg-accent [&:-moz-meter-sub-optimum::-moz-meter-bar]:bg-warning [&:-moz-meter-sub-sub-optimum::-moz-meter-bar]:bg-danger",
        className,
      )}
    />
  );
}
