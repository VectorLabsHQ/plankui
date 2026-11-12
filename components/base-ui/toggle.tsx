import * as React from "react";
import { Toggle as TogglePrimitive } from "@base-ui/react/toggle";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

export const toggleVariants = cva(
  [
    "inline-flex items-center justify-center gap-1.5 rounded-input text-sm font-medium text-ink-2",
    "transition-[background-color,color,box-shadow,border-color] duration-[var(--dur-micro)] hover:bg-paper-3 hover:text-ink",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
    "data-[pressed]:bg-accent-wash data-[pressed]:text-accent-wash-ink [&_svg]:size-4 [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        ghost: "",
        outline: "vx-glass border border-[color:var(--key-border)] bg-key-face shadow-key data-[pressed]:border-accent/40",
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
}: Omit<React.ComponentProps<typeof TogglePrimitive>, "className"> & { className?: string } & VariantProps<typeof toggleVariants>) {
  return <TogglePrimitive className={cn(toggleVariants({ variant, size }), className)} {...props} />;
}
