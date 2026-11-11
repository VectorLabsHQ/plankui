import * as React from "react";
import { Slider as SliderPrimitive } from "radix-ui";
import { cn } from "@/lib/cn";

export function Slider({ className, defaultValue, value, ...props }: React.ComponentProps<typeof SliderPrimitive.Root>) {
  const count = (value ?? defaultValue ?? [0]).length;
  return (
    <SliderPrimitive.Root
      defaultValue={defaultValue}
      value={value}
      className={cn("relative flex w-full touch-none select-none items-center py-2 data-[disabled]:opacity-50", className)}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-[color:var(--track-off)] shadow-[inset_0_1px_1px_oklch(0%_0_0/0.06)]">
        <SliderPrimitive.Range className="absolute h-full rounded-full bg-accent [background-image:var(--control-on-image)] shadow-[inset_0_1px_0_oklch(100%_0_0/0.24)]" />
      </SliderPrimitive.Track>
      {Array.from({ length: count }).map((_, i) => (
        <SliderPrimitive.Thumb
          key={i}
          aria-label={props["aria-label"] ?? "Value"}
          className={cn(
            "block size-5 cursor-grab rounded-full border border-[color:var(--key-border)] bg-key-face [background-image:var(--thumb-image)] shadow-[0_2px_4px_oklch(0%_0_0/0.1),inset_0_1px_0_oklch(100%_0_0/0.8)]",
            "transition-transform duration-[var(--dur-micro)] hover:scale-110 active:cursor-grabbing",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus",
          )}
        />
      ))}
    </SliderPrimitive.Root>
  );
}
