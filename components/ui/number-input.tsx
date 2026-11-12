import * as React from "react";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/cn";

export interface NumberInputProps {
  value?: number;
  defaultValue?: number;
  onValueChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  className?: string;
  id?: string;
  "aria-label"?: string;
  /** Format the shown value, e.g. (n) => `${n} GB`. Editing shows the raw number. */
  format?: (n: number) => string;
}

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));

/** A number field with step keys. Arrow keys step, Shift steps by ten. */
export function NumberInput({
  value, defaultValue = 0, onValueChange, min = -Infinity, max = Infinity, step = 1, disabled, className, format, ...rest
}: NumberInputProps) {
  const [inner, setInner] = React.useState(defaultValue);
  const [draft, setDraft] = React.useState<string | null>(null);
  const current = value ?? inner;
  const commit = (n: number) => {
    if (Number.isNaN(n)) return;
    const v = clamp(Math.round(n / step) * step, min, max);
    setInner(v);
    onValueChange?.(v);
  };
  const key =
    "grid h-full w-9 place-items-center text-muted transition-[background-color,color] duration-[var(--dur-micro)] hover:bg-paper-3 hover:text-ink focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-focus disabled:pointer-events-none disabled:opacity-40 [&_svg]:size-3.5";
  return (
    <div
      className={cn(
        "inline-flex h-9 items-stretch overflow-hidden rounded-input border border-field-border bg-field shadow-field vx-glass",
        "focus-within:field-focus",
        disabled && "opacity-60",
        className,
      )}
    >
      <button type="button" tabIndex={-1} aria-label="Decrease" className={cn(key, "border-r border-rule")} disabled={disabled || current <= min} onClick={() => commit(current - step)}>
        <Minus />
      </button>
      <input
        id={rest.id}
        role="spinbutton"
        aria-label={rest["aria-label"]}
        aria-valuenow={current}
        aria-valuemin={Number.isFinite(min) ? min : undefined}
        aria-valuemax={Number.isFinite(max) ? max : undefined}
        inputMode="decimal"
        disabled={disabled}
        value={draft ?? (format ? format(current) : String(current))}
        onFocus={() => setDraft(String(current))}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={() => { if (draft !== null) commit(parseFloat(draft)); setDraft(null); }}
        onKeyDown={(e) => {
          const big = e.shiftKey ? 10 : 1;
          if (e.key === "ArrowUp") { e.preventDefault(); commit(current + step * big); setDraft(null); }
          if (e.key === "ArrowDown") { e.preventDefault(); commit(current - step * big); setDraft(null); }
          if (e.key === "Enter") (e.target as HTMLInputElement).blur();
        }}
        className="w-16 min-w-0 flex-1 bg-transparent text-center text-sm tabular-nums text-ink outline-none"
      />
      <button type="button" tabIndex={-1} aria-label="Increase" className={cn(key, "border-l border-rule")} disabled={disabled || current >= max} onClick={() => commit(current + step)}>
        <Plus />
      </button>
    </div>
  );
}
