import * as React from "react";
import { ToggleGroup as ToggleGroupPrimitive } from "radix-ui";
import { type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";
import { toggleVariants } from "./toggle";

type Look = VariantProps<typeof toggleVariants>;
const LookContext = React.createContext<Look>({});

/** A set of toggles where one (type "single") or several (type "multiple") can be on. Arrow keys move between them. */
export function ToggleGroup({
  className,
  variant,
  size,
  children,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Root> & Look) {
  return (
    <ToggleGroupPrimitive.Root
      className={cn("vx-glass inline-flex w-fit items-center gap-0.5 rounded-input border border-tray-border bg-tray p-1", className)}
      {...props}
    >
      <LookContext.Provider value={{ variant, size }}>{children}</LookContext.Provider>
    </ToggleGroupPrimitive.Root>
  );
}

export function ToggleGroupItem({ className, variant, size, ...props }: React.ComponentProps<typeof ToggleGroupPrimitive.Item> & Look) {
  const look = React.useContext(LookContext);
  return (
    <ToggleGroupPrimitive.Item
      className={cn(toggleVariants({ variant: variant ?? look.variant, size: size ?? look.size ?? "sm" }), className)}
      {...props}
    />
  );
}
