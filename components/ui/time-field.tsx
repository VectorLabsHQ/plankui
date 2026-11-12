import * as React from "react";
import { Clock } from "lucide-react";
import { cn } from "@/lib/cn";

export interface Time {
  hours: number;
  minutes: number;
}

export interface TimeFieldProps {
  value?: Time;
  defaultValue?: Time;
  onValueChange?: (time: Time) => void;
  /** 12-hour clock with an AM/PM segment. */
  hour12?: boolean;
  /** Minutes moved per arrow press. */
  step?: number;
  disabled?: boolean;
  className?: string;
  "aria-label"?: string;
}

const pad = (n: number) => String(n).padStart(2, "0");

/** A time input made of segments. Arrow up and down change a segment, digits type into it, left and right move between them. */
export function TimeField({ value, defaultValue = { hours: 9, minutes: 0 }, onValueChange, hour12, step = 1, disabled, className, ...rest }: TimeFieldProps) {
  const [inner, setInner] = React.useState(defaultValue);
  const t = value ?? inner;
  const typed = React.useRef("");
  const refs = React.useRef<(HTMLSpanElement | null)[]>([]);
  const set = (next: Time) => {
    setInner(next);
    onValueChange?.(next);
  };
  const pm = t.hours >= 12;
  const shownHours = hour12 ? (t.hours % 12 || 12) : t.hours;

  type Seg = "hours" | "minutes" | "period";
  const segs: Seg[] = hour12 ? ["hours", "minutes", "period"] : ["hours", "minutes"];

  const bump = (seg: Seg, dir: 1 | -1) => {
    if (seg === "hours") set({ ...t, hours: (t.hours + dir + 24) % 24 });
    if (seg === "minutes") set({ ...t, minutes: (t.minutes + dir * step + 60) % 60 });
    if (seg === "period") set({ ...t, hours: (t.hours + 12) % 24 });
  };
  const type = (seg: Seg, digit: string, i: number) => {
    const next = (typed.current + digit).slice(-2);
    const n = Number(next);
    if (seg === "hours") {
      const max = hour12 ? 12 : 23;
      if (n > max) typed.current = digit;
      else typed.current = next;
      let h = Number(typed.current);
      if (hour12) h = (h % 12) + (pm ? 12 : 0);
      set({ ...t, hours: h });
    } else {
      typed.current = n > 59 ? digit : next;
      set({ ...t, minutes: Number(typed.current) });
    }
    if (typed.current.length === 2 || Number(typed.current) > (seg === "hours" ? (hour12 ? 1 : 2) : 5)) {
      typed.current = "";
      refs.current[i + 1]?.focus();
    }
  };

  const segClass =
    "rounded-sm px-1 tabular-nums outline-none caret-transparent focus:bg-accent focus:text-accent-ink data-[placeholder]:text-muted";
  return (
    <div
      role="group"
      aria-label={rest["aria-label"] ?? "Time"}
      aria-disabled={disabled || undefined}
      className={cn(
        "vx-glass inline-flex h-9 items-center gap-0.5 rounded-input border border-field-border bg-field pl-3 pr-3 text-sm text-ink shadow-field",
        "focus-within:field-focus",
        disabled && "pointer-events-none opacity-60",
        className,
      )}
    >
      <Clock aria-hidden className="mr-1.5 size-4 text-muted" />
      {segs.map((seg, i) => {
        const label = seg === "hours" ? "Hours" : seg === "minutes" ? "Minutes" : "AM or PM";
        const text = seg === "hours" ? pad(shownHours) : seg === "minutes" ? pad(t.minutes) : pm ? "PM" : "AM";
        return (
          <React.Fragment key={seg}>
            {seg === "minutes" && <span aria-hidden className="text-muted">:</span>}
            {seg === "period" && <span aria-hidden className="w-1" />}
            <span
              ref={(el) => {
                refs.current[i] = el;
              }}
              role="spinbutton"
              tabIndex={disabled ? -1 : 0}
              aria-label={label}
              aria-valuenow={seg === "hours" ? t.hours : seg === "minutes" ? t.minutes : pm ? 1 : 0}
              aria-valuetext={text}
              aria-valuemin={0}
              aria-valuemax={seg === "hours" ? 23 : seg === "minutes" ? 59 : 1}
              className={segClass}
              onBlur={() => (typed.current = "")}
              onKeyDown={(e) => {
                if (e.key === "ArrowUp") bump(seg, 1);
                else if (e.key === "ArrowDown") bump(seg, -1);
                else if (e.key === "ArrowRight") refs.current[i + 1]?.focus();
                else if (e.key === "ArrowLeft") refs.current[i - 1]?.focus();
                else if (seg === "period" && /^[ap]$/i.test(e.key)) {
                  if ((e.key.toLowerCase() === "p") !== pm) bump("period", 1);
                } else if (seg !== "period" && /^\d$/.test(e.key)) type(seg, e.key, i);
                else return;
                e.preventDefault();
              }}
            >
              {text}
            </span>
          </React.Fragment>
        );
      })}
    </div>
  );
}
