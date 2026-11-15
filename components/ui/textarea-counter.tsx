import { useId, type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";
import { Textarea } from "./textarea";

export interface TextareaCounterProps extends Omit<ComponentPropsWithoutRef<typeof Textarea>, "defaultValue" | "maxLength" | "value"> {
  value: string;
  maxLength: number;
}

export function TextareaCounter({ value, maxLength, className, "aria-describedby": description, ...props }: TextareaCounterProps) {
  const counterId = useId();
  return (
    <div className="grid gap-1.5">
      <Textarea
        {...props}
        value={value}
        maxLength={maxLength}
        aria-describedby={description ? `${description} ${counterId}` : counterId}
        className={cn("w-full", className)}
      />
      <span id={counterId} className="justify-self-end text-xs tabular-nums text-muted">
        {value.length} / {maxLength}<span className="sr-only"> characters</span>
      </span>
    </div>
  );
}
