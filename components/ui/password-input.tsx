import * as React from "react";
import { Check, Eye, EyeOff, Lock, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { Input, type InputProps } from "./input";

const rules = [
  { label: "At least 8 characters", test: (v: string) => v.length >= 8 },
  { label: "An uppercase letter", test: (v: string) => /[A-Z]/.test(v) },
  { label: "A number", test: (v: string) => /\d/.test(v) },
  { label: "A symbol", test: (v: string) => /[^A-Za-z0-9]/.test(v) },
];
const levels = ["Too weak", "Weak", "Fair", "Good", "Strong"];
const tone = ["bg-paper-3", "bg-danger", "bg-warning", "bg-accent", "bg-success"];

export interface PasswordInputProps extends Omit<InputProps, "type" | "trailing"> {
  /** Show a four-step strength meter and the rules under the field. */
  showStrength?: boolean;
}

/** A password field with a show and hide key, and an optional strength meter. */
export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ showStrength, value, defaultValue, onChange, className, ...props }, ref) => {
    const [shown, setShown] = React.useState(false);
    const [inner, setInner] = React.useState(String(defaultValue ?? ""));
    const v = value === undefined ? inner : String(value);
    const score = rules.filter((r) => r.test(v)).length;
    return (
      <div className={cn("grid gap-2", className)}>
        <Input
          ref={ref}
          type={shown ? "text" : "password"}
          value={v}
          onChange={(e) => {
            setInner(e.target.value);
            onChange?.(e);
          }}
          leading={<Lock />}
          trailing={
            <button
              type="button"
              onClick={() => setShown(!shown)}
              aria-label={shown ? "Hide password" : "Show password"}
              aria-pressed={shown}
              className="grid size-7 place-items-center rounded-sm text-muted hover:text-ink focus-visible:outline-2 focus-visible:outline-focus"
            >
              {shown ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          }
          {...props}
        />
        {showStrength && (
          <div className="grid gap-2" aria-live="polite">
            <div className="flex items-center gap-2">
              <div className="grid flex-1 grid-cols-4 gap-1">
                {[1, 2, 3, 4].map((i) => (
                  <span key={i} className={cn("h-1.5 rounded-full transition-[background-color] duration-[var(--dur-short)]", score >= i ? tone[score] : "bg-paper-3")} />
                ))}
              </div>
              <span className="w-16 text-right text-xs text-muted">{v ? levels[score] : ""}</span>
            </div>
            <ul className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs">
              {rules.map((r) => {
                const ok = r.test(v);
                return (
                  <li key={r.label} className={cn("flex items-center gap-1.5", ok ? "text-success-wash-ink" : "text-muted")}>
                    {ok ? <Check className="size-3.5" /> : <X className="size-3.5" />} {r.label}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    );
  },
);
PasswordInput.displayName = "PasswordInput";
