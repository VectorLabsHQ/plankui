import * as React from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/cn";

export interface RatingProps {
  value?: number;
  defaultValue?: number;
  onValueChange?: (value: number) => void;
  max?: number;
  readOnly?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
  "aria-label"?: string;
}

const sizes = { sm: "size-4", md: "size-5", lg: "size-7" };

/** Stars as a radio group: hover to preview, arrow keys to change, click a set star again to clear. */
export function Rating({ value, defaultValue = 0, onValueChange, max = 5, readOnly, size = "md", className, ...rest }: RatingProps) {
  const [inner, setInner] = React.useState(defaultValue);
  const current = value ?? inner;
  const [hover, setHover] = React.useState<number | null>(null);
  const shown = hover ?? current;
  const set = (n: number) => {
    if (readOnly) return;
    setInner(n);
    onValueChange?.(n);
  };
  return (
    <div
      role="radiogroup"
      aria-label={rest["aria-label"] ?? "Rating"}
      aria-readonly={readOnly || undefined}
      className={cn("inline-flex items-center gap-0.5", className)}
      onMouseLeave={() => setHover(null)}
    >
      {Array.from({ length: max }, (_, i) => i + 1).map((n) => (
        <button
          key={n}
          type="button"
          role="radio"
          aria-checked={current === n}
          aria-label={`${n} of ${max}`}
          tabIndex={readOnly ? -1 : current === n || (current === 0 && n === 1) ? 0 : -1}
          disabled={readOnly}
          onMouseEnter={() => !readOnly && setHover(n)}
          onClick={() => set(current === n ? 0 : n)}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight" || e.key === "ArrowUp") { e.preventDefault(); set(Math.min(max, current + 1)); }
            if (e.key === "ArrowLeft" || e.key === "ArrowDown") { e.preventDefault(); set(Math.max(0, current - 1)); }
          }}
          className="rounded-sm p-0.5 transition-transform duration-[var(--dur-micro)] enabled:hover:scale-110 focus-visible:outline-2 focus-visible:outline-focus disabled:cursor-default"
        >
          <Star className={cn(sizes[size], n <= shown ? "fill-warning text-warning" : "fill-transparent text-rule-2")} />
        </button>
      ))}
    </div>
  );
}
