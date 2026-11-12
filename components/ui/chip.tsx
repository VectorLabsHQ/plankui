import * as React from "react";
import { X } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const chipVariants = cva(
  "inline-flex h-6 items-center gap-1 rounded-[calc(6px*var(--radius-factor))] border pl-1.5 text-[13px] font-medium [&_svg]:size-3.5",
  {
    variants: {
      variant: {
        neutral: "border-transparent bg-paper-3 text-ink-2",
        accent: "border-transparent bg-accent-wash text-accent-wash-ink",
        success: "border-transparent bg-success-wash text-success-wash-ink",
        warning: "border-transparent bg-warning-wash text-warning-wash-ink",
        danger: "border-transparent bg-danger-wash text-danger-wash-ink",
      },
    },
    defaultVariants: { variant: "neutral" },
  },
);

export interface ChipProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof chipVariants> {
  /** Leading icon or avatar. */
  leading?: React.ReactNode;
  /** Shows a remove button when set. */
  onRemove?: () => void;
}

/** A compact, removable token for filters and selections. */
export function Chip({ className, variant, leading, onRemove, children, ...props }: ChipProps) {
  return (
    <span className={cn(chipVariants({ variant }), onRemove ? "pr-0.5" : "pr-1.5", className)} {...props}>
      {leading}
      {children}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove ${typeof children === "string" ? children : "item"}`}
          className="grid size-5 place-items-center rounded-[calc(4px*var(--radius-factor))] opacity-60 hover:bg-ink/10 hover:opacity-100 focus-visible:outline-2 focus-visible:outline-focus"
        >
          <X />
        </button>
      )}
    </span>
  );
}
