import * as React from "react";
import { cn } from "@/lib/cn";

export interface InputOTPProps {
  length?: number;
  value?: string;
  onChange?: (value: string) => void;
  /** Called once every cell is filled. */
  onComplete?: (value: string) => void;
  /** Insert a gap after this many cells, e.g. 3 for 123-456. */
  groupSize?: number;
  disabled?: boolean;
  invalid?: boolean;
  className?: string;
  "aria-label"?: string;
}

/** One-time code entry: digits only, auto-advance, paste the full code. */
export function InputOTP({ length = 6, value, onChange, onComplete, groupSize, disabled, invalid, className, ...rest }: InputOTPProps) {
  const [inner, setInner] = React.useState("");
  const [focused, setFocused] = React.useState(false);
  const code = (value ?? inner).slice(0, length);
  const ref = React.useRef<HTMLInputElement>(null);

  const set = (next: string) => {
    const clean = next.replace(/\D/g, "").slice(0, length);
    setInner(clean);
    onChange?.(clean);
    if (clean.length === length) onComplete?.(clean);
  };

  return (
    <div className={cn("relative inline-flex items-center gap-2", className)} onClick={() => ref.current?.focus()}>
      <input
        ref={ref}
        value={code}
        onChange={(e) => set(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        inputMode="numeric"
        autoComplete="one-time-code"
        maxLength={length}
        disabled={disabled}
        aria-label={rest["aria-label"] ?? "One-time code"}
        aria-invalid={invalid || undefined}
        className="absolute inset-0 cursor-text opacity-0 disabled:cursor-not-allowed"
      />
      {Array.from({ length }).map((_, i) => {
        const active = focused && (i === code.length || (i === length - 1 && code.length === length));
        return (
          <React.Fragment key={i}>
            {groupSize && i > 0 && i % groupSize === 0 && <span aria-hidden className="h-px w-3 bg-rule-2" />}
            <span
              aria-hidden
              className={cn(
                "vx-glass grid size-11 place-items-center rounded-input border bg-field font-mono text-lg text-ink shadow-field",
                "transition-[border-color,box-shadow] duration-[var(--dur-micro)]",
                invalid ? "border-danger" : active ? "field-focus" : "border-field-border",
                disabled && "bg-paper-2 opacity-60",
              )}
            >
              {code[i] ?? (active ? <span className="vx-caret h-5 w-px bg-ink" /> : "")}
            </span>
          </React.Fragment>
        );
      })}
    </div>
  );
}
