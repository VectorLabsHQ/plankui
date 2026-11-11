import * as React from "react";
import { Slot } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";
import { Spinner } from "./spinner";

export const buttonVariants = cva(
  [
    "relative inline-flex select-none items-center justify-center gap-2 whitespace-nowrap font-medium",
    "transition-[transform,box-shadow,background-color,color] duration-[var(--dur-micro)] ease-[var(--ease-out)]",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus",
    "disabled:pointer-events-none disabled:opacity-50 aria-busy:pointer-events-none",
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        primary:
          "vx-glass border border-[color:var(--btn-border)] bg-[color:var(--btn-bg)] [background-image:var(--btn-image)] text-accent-ink shadow-key-accent hover:translate-y-[var(--lift)] hover:brightness-110 active:translate-y-[var(--press)] active:shadow-key-press",
        secondary:
          "vx-glass border border-[color:var(--key-border)] bg-key-face text-ink shadow-key hover:translate-y-[var(--lift)] hover:bg-paper-2 active:translate-y-[var(--press)] active:shadow-key-press",
        soft: "bg-accent-wash text-accent-wash-ink hover:bg-accent-wash/70",
        outline: "border border-[color:var(--key-border)] text-ink hover:bg-paper-2",
        ghost: "text-ink-2 hover:bg-paper-3 hover:text-ink",
        danger:
          "border border-[color:var(--btn-border)] bg-danger [background-image:var(--btn-danger-image)] text-white shadow-key-danger hover:translate-y-[var(--lift)] hover:brightness-110 active:translate-y-[var(--press)] active:shadow-key-press",
        link: "h-auto px-0 text-accent underline-offset-4 decoration-rule-2 hover:underline hover:decoration-accent",
      },
      size: {
        xs: "h-7 rounded-sm px-2.5 text-xs",
        sm: "h-8 rounded-input px-3 text-sm",
        md: "h-9 rounded-input px-4 text-sm",
        lg: "h-11 rounded-card px-5 text-base",
        icon: "size-9 rounded-input",
        "icon-sm": "size-8 rounded-input",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Render the child element instead of a button, keeping the styles. */
  asChild?: boolean;
  /** Show a spinner and block interaction. */
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild, loading, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot.Root : "button";
    return (
      <Comp
        ref={ref}
        data-slot="button"
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        {...props}
      >
        {asChild ? (
          children
        ) : (
          <>
            {loading && <Spinner className="size-4" />}
            {children}
          </>
        )}
      </Comp>
    );
  },
);
Button.displayName = "Button";
