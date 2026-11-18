import * as React from "react";
import { cn } from "@/lib/cn";
import { Textarea } from "./textarea";

export interface TextareaCounterProps extends Omit<React.ComponentProps<typeof Textarea>, "defaultValue" | "maxLength" | "value"> {
  /** Controlled value. Leave it out and use defaultValue to let the field keep its own state. */
  value?: string;
  defaultValue?: string;
  maxLength: number;
}

/** A textarea with a live character count, announced to screen readers through aria-describedby. */
export function TextareaCounter({ value, defaultValue = "", maxLength, className, onChange, "aria-describedby": description, ...props }: TextareaCounterProps) {
  const counterId = React.useId();
  const [inner, setInner] = React.useState(defaultValue);
  const current = value ?? inner;
  return (
    <div className="grid gap-1.5">
      <Textarea
        {...props}
        value={current}
        onChange={(event) => {
          if (value === undefined) setInner(event.currentTarget.value);
          onChange?.(event);
        }}
        maxLength={maxLength}
        aria-describedby={description ? `${description} ${counterId}` : counterId}
        className={cn("w-full", className)}
      />
      <span id={counterId} className={cn("justify-self-end text-xs tabular-nums text-muted", current.length >= maxLength && "text-danger")}>
        {current.length} / {maxLength}<span className="sr-only"> characters</span>
      </span>
    </div>
  );
}
