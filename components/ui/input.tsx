import * as React from "react";
import { cn } from "@/lib/cn";

export const fieldBase = [
  "vx-glass w-full rounded-input border border-field-border bg-field text-sm text-ink shadow-field",
  "placeholder:text-muted/80 outline-none",
  "transition-[border-color,box-shadow] duration-[var(--dur-micro)]",
  "hover:field-hover",
  "focus-visible:field-focus focus-visible:outline-none",
  "disabled:cursor-not-allowed disabled:bg-paper-2 disabled:opacity-60",
  "aria-invalid:border-danger aria-invalid:focus-visible:shadow-[0_0_0_3px_color-mix(in_oklab,var(--danger)_22%,transparent)]",
].join(" ");

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Icon or text placed before the value. */
  leading?: React.ReactNode;
  /** Icon, text or a button placed after the value. */
  trailing?: React.ReactNode;
  inputSize?: "sm" | "md" | "lg";
}

const sizes = { sm: "h-8 px-2.5", md: "h-9 px-3", lg: "h-11 px-3.5 text-base" };

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, leading, trailing, inputSize = "md", ...props }, ref) => {
    if (!leading && !trailing) {
      return <input ref={ref} className={cn(fieldBase, sizes[inputSize], className)} {...props} />;
    }
    return (
      <div className={cn("relative flex items-center", className)}>
        {leading && (
          <span className="pointer-events-none absolute left-3 flex items-center text-muted [&_svg]:size-4">
            {leading}
          </span>
        )}
        <input
          ref={ref}
          className={cn(fieldBase, sizes[inputSize], leading && "pl-9", trailing && "pr-10")}
          {...props}
        />
        {trailing && (
          <span className="absolute right-2 flex items-center text-muted [&_svg]:size-4">{trailing}</span>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";
