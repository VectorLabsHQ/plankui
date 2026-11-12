import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

export interface DateRange {
  from?: Date;
  to?: Date;
}

interface BaseProps {
  /** Days that carry an event dot. */
  events?: Date[];
  /** Days that cannot be picked. */
  isDisabled?: (date: Date) => boolean;
  /** 0 is Sunday, 1 is Monday. */
  weekStartsOn?: 0 | 1;
  /** The month shown first. Defaults to the selection or today. */
  defaultMonth?: Date;
  className?: string;
}

export interface CalendarSingleProps extends BaseProps {
  mode?: "single";
  value?: Date | null;
  defaultValue?: Date;
  onValueChange?: (date: Date) => void;
}

export interface CalendarRangeProps extends BaseProps {
  mode: "range";
  range?: DateRange;
  defaultRange?: DateRange;
  onRangeChange?: (range: DateRange) => void;
}

export type CalendarProps = CalendarSingleProps | CalendarRangeProps;

const day = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
const same = (a?: Date | null, b?: Date | null) => !!a && !!b && day(a) === day(b);
const names = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

/**
 * A month grid. Single mode picks one day; range mode picks a start and an end, previewing on hover.
 * Keyboard: arrows move a day or a week, Page Up and Page Down change month, Enter or Space picks.
 */
export function Calendar(props: CalendarProps) {
  const { events = [], isDisabled, weekStartsOn = 1, className } = props;
  const isRange = props.mode === "range";

  const [innerOne, setInnerOne] = React.useState<Date | null>(!isRange ? props.defaultValue ?? null : null);
  const one = !isRange ? (props.value === undefined ? innerOne : props.value) : null;
  const [innerRange, setInnerRange] = React.useState<DateRange>(isRange ? props.defaultRange ?? {} : {});
  const range = isRange ? props.range ?? innerRange : {};
  const [hover, setHover] = React.useState<Date | null>(null);

  const anchor = props.defaultMonth ?? one ?? range.from ?? new Date();
  const [month, setMonth] = React.useState(() => new Date(anchor.getFullYear(), anchor.getMonth(), 1));
  const [focus, setFocus] = React.useState<Date>(anchor);
  const grid = React.useRef<HTMLDivElement>(null);
  const today = new Date();

  const offset = (month.getDay() - weekStartsOn + 7) % 7;
  const days = Array.from({ length: 42 }, (_, i) => new Date(month.getFullYear(), month.getMonth(), i - offset + 1));

  const pick = (d: Date) => {
    if (isDisabled?.(d)) return;
    if (!isRange) {
      setInnerOne(d);
      props.onValueChange?.(d);
      return;
    }
    const next: DateRange = !range.from || range.to || day(d) < day(range.from) ? { from: d, to: undefined } : { from: range.from, to: d };
    setInnerRange(next);
    props.onRangeChange?.(next);
  };
  const move = (d: Date) => {
    setFocus(d);
    if (d.getMonth() !== month.getMonth() || d.getFullYear() !== month.getFullYear()) setMonth(new Date(d.getFullYear(), d.getMonth(), 1));
    requestAnimationFrame(() => grid.current?.querySelector<HTMLButtonElement>(`[data-day="${d.toDateString()}"]`)?.focus());
  };
  const shift = (n: number) => setMonth(new Date(month.getFullYear(), month.getMonth() + n, 1));

  const end = range.to ?? (range.from && hover && day(hover) > day(range.from) ? hover : undefined);
  const inRange = (d: Date) => !!range.from && !!end && day(d) > day(range.from) && day(d) < day(end);
  const isStart = (d: Date) => same(d, range.from);
  const isEnd = (d: Date) => same(d, end);

  return (
    <div className={cn("w-[280px] select-none", className)}>
      <div className="mb-3 flex items-center justify-between">
        <button type="button" onClick={() => shift(-1)} aria-label="Previous month" className="grid size-8 place-items-center rounded-input text-ink-2 hover:bg-paper-3 focus-visible:outline-2 focus-visible:outline-focus">
          <ChevronLeft className="size-4" />
        </button>
        <p className="text-sm font-semibold" aria-live="polite">
          {month.toLocaleDateString(undefined, { month: "long", year: "numeric" })}
        </p>
        <button type="button" onClick={() => shift(1)} aria-label="Next month" className="grid size-8 place-items-center rounded-input text-ink-2 hover:bg-paper-3 focus-visible:outline-2 focus-visible:outline-focus">
          <ChevronRight className="size-4" />
        </button>
      </div>
      <div className="grid grid-cols-7 pb-1 text-center text-xs text-muted">
        {Array.from({ length: 7 }, (_, i) => <span key={i}>{names[(i + weekStartsOn) % 7]}</span>)}
      </div>
      <div ref={grid} role="grid" className="grid grid-cols-7 gap-y-1" onMouseLeave={() => setHover(null)}>
        {days.map((d) => {
          const out = d.getMonth() !== month.getMonth();
          const dis = isDisabled?.(d);
          const hasEvent = events.some((e) => same(e, d));
          const sel = isRange ? isStart(d) || isEnd(d) : same(d, one);
          const band = isRange && (inRange(d) || ((isStart(d) || isEnd(d)) && !!end && !!range.from && !same(range.from, end)));
          return (
            <div
              key={d.toISOString()}
              className={cn(
                "relative",
                band && "bg-accent-wash",
                band && isStart(d) && "rounded-l-input",
                band && isEnd(d) && "rounded-r-input",
              )}
            >
              <button
                type="button"
                data-day={d.toDateString()}
                tabIndex={same(d, focus) ? 0 : -1}
                disabled={dis}
                aria-pressed={sel}
                aria-label={d.toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
                onClick={() => { pick(d); setFocus(d); }}
                onMouseEnter={() => isRange && setHover(d)}
                onKeyDown={(e) => {
                  const step = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 }[e.key];
                  if (step) { e.preventDefault(); move(new Date(d.getFullYear(), d.getMonth(), d.getDate() + step)); }
                  if (e.key === "PageUp") { e.preventDefault(); move(new Date(d.getFullYear(), d.getMonth() - 1, d.getDate())); }
                  if (e.key === "PageDown") { e.preventDefault(); move(new Date(d.getFullYear(), d.getMonth() + 1, d.getDate())); }
                }}
                className={cn(
                  "relative grid aspect-square w-full place-items-center rounded-input text-sm tabular-nums transition-[background-color,color] duration-[var(--dur-micro)]",
                  "focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-focus disabled:pointer-events-none disabled:opacity-30",
                  sel
                    ? "border border-[color:var(--btn-border)] bg-[color:var(--btn-bg)] [background-image:var(--btn-image)] font-semibold text-accent-ink shadow-key-accent"
                    : band
                      ? "text-accent-wash-ink hover:bg-accent/15"
                      : out
                        ? "text-muted/60 hover:bg-paper-3"
                        : "text-ink hover:bg-paper-3",
                  !sel && same(d, today) && "font-semibold text-accent-wash-ink ring-1 ring-inset ring-accent/40",
                )}
              >
                {d.getDate()}
                {hasEvent && <span aria-hidden className={cn("absolute bottom-1 size-1 rounded-full", sel ? "bg-accent-ink" : "bg-accent")} />}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
