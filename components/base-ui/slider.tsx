import * as React from "react";
import { Slider as SliderPrimitive } from "@base-ui/react/slider";
import { cn } from "@/lib/cn";

export interface SliderProps
  extends Omit<React.ComponentProps<typeof SliderPrimitive.Root>, "className" | "value" | "defaultValue" | "onValueChange" | "onValueCommitted"> {
  className?: string;
  value?: number[];
  defaultValue?: number[];
  onValueChange?: (value: number[]) => void;
  onValueCommit?: (value: number[]) => void;
  "aria-label"?: string;
}

const list = (v: number | readonly number[]) => (Array.isArray(v) ? [...v] : [v as number]);

export function Slider({ className, defaultValue, value, onValueChange, onValueCommit, ...props }: SliderProps) {
  const count = (value ?? defaultValue ?? [0]).length;
  return (
    <SliderPrimitive.Root
      defaultValue={defaultValue}
      value={value}
      onValueChange={(v) => onValueChange?.(list(v))}
      onValueCommitted={(v) => onValueCommit?.(list(v))}
      className={cn("relative w-full touch-none select-none data-[disabled]:opacity-50", className)}
      {...props}
    >
      <SliderPrimitive.Control className="flex w-full items-center py-2">
        <SliderPrimitive.Track className="relative h-1.5 w-full grow rounded-full bg-[color:var(--track-off)] shadow-[inset_0_1px_1px_oklch(0%_0_0/0.06)]">
          <SliderPrimitive.Indicator className="rounded-full bg-accent [background-image:var(--control-on-image)] shadow-[inset_0_1px_0_oklch(100%_0_0/0.24)]" />
          {Array.from({ length: count }).map((_, i) => (
            <SliderPrimitive.Thumb
              key={i}
              index={i}
              getAriaLabel={() => props["aria-label"] ?? "Value"}
              className={cn(
                "block size-5 cursor-grab rounded-full border border-[color:var(--key-border)] bg-key-face [background-image:var(--thumb-image)] shadow-[0_2px_4px_oklch(0%_0_0/0.1),inset_0_1px_0_oklch(100%_0_0/0.8)]",
                "transition-[scale] duration-[var(--dur-micro)] hover:scale-110 active:cursor-grabbing data-[dragging]:cursor-grabbing",
                "has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-focus",
              )}
            />
          ))}
        </SliderPrimitive.Track>
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  );
}
