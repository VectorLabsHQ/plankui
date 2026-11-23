import * as React from "react";
import { cn } from "@/lib/cn";
import { Checkbox } from "./checkbox";

export interface CheckboxCardProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  /** An icon, logo or image at the start of the card. */
  media?: React.ReactNode;
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

/** A whole card that toggles like a checkbox. Group several for a pick-any-number choice. */
export function CheckboxCard({ title, description, media, checked, defaultChecked, onCheckedChange, disabled, className }: CheckboxCardProps) {
  return (
    <label
      className={cn(
        "vx-glass flex cursor-pointer items-start gap-3 rounded-card border border-card-border bg-card p-3.5 shadow-card",
        "transition-[border-color,background-color] duration-[var(--dur-micro)] hover:border-rule-2",
        // Radix marks a checked box with data-state, Base UI with data-checked.
        "has-[[data-state=checked]]:border-accent has-[[data-state=checked]]:bg-accent-wash/50 has-[[data-checked]]:border-accent has-[[data-checked]]:bg-accent-wash/50",
        disabled && "cursor-not-allowed opacity-55",
        className,
      )}
    >
      {media && <span className="grid size-9 shrink-0 place-items-center rounded-tile bg-paper-2 text-ink [&_svg]:size-4.5">{media}</span>}
      <span className="grid min-w-0 flex-1 gap-0.5">
        <span className="text-sm font-medium text-ink">{title}</span>
        {description && <span className="text-sm text-muted">{description}</span>}
      </span>
      <Checkbox
        checked={checked}
        defaultChecked={defaultChecked}
        onCheckedChange={onCheckedChange ? (v) => onCheckedChange(v === true) : undefined}
        disabled={disabled}
        className="mt-0.5"
      />
    </label>
  );
}
