import * as React from "react";
import { Toggle as TogglePrimitive } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

export const toggleVariants = cva(
  [
    "inline-flex items-center justify-center gap-1.5 rounded-input text-sm font-medium text-ink-2",
    "transition-[background-color,color,box-shadow,border-color] duration-[var(--dur-micro)] hover:bg-paper-3 hover:text-ink",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus disabled:pointer-events-none disabled:opacity-50",
    "data-[state=on]:bg-accent-wash data-[state=on]:text-accent-wash-ink [&_svg]:size-4 [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        ghost: "",
        outline: "vx-glass border border-[color:var(--key-border)] bg-key-face shadow-key data-[state=on]:border-accent/40",
      },
      size: { sm: "h-8 min-w-8 px-2", md: "h-9 min-w-9 px-2.5", lg: "h-11 min-w-11 px-3" },
    },
    defaultVariants: { variant: "ghost", size: "md" },
  },
);

export function Toggle({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> & VariantProps<typeof toggleVariants>) {
  return <TogglePrimitive.Root className={cn(toggleVariants({ variant, size }), className)} {...props} />;
}
