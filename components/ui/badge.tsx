import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

export const badgeVariants = cva(
  "inline-flex h-[18px] items-center gap-1 whitespace-nowrap rounded-[calc(4px*var(--radius-factor))] border px-1 text-xs font-semibold leading-4 [&_svg]:size-3",
  {
    variants: {
      variant: {
        neutral: "border-transparent bg-paper-3 text-muted",
        accent: "border-transparent bg-accent-wash text-accent-wash-ink",
        success: "border-transparent bg-success-wash text-success-wash-ink",
        warning: "border-transparent bg-warning-wash text-warning-wash-ink",
        danger: "border-transparent bg-danger-wash text-danger-wash-ink",
        solid: "border-transparent bg-accent text-accent-ink",
        outline: "border-rule-2 text-ink-2",
      },
    },
    defaultVariants: { variant: "neutral" },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
