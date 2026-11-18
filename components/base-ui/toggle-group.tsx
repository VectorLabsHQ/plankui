import * as React from "react";
import { ToggleGroup as ToggleGroupPrimitive } from "@base-ui/react/toggle-group";
import { Toggle } from "@base-ui/react/toggle";
import { type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";
import { toggleVariants } from "./toggle";

type Look = VariantProps<typeof toggleVariants>;
const LookContext = React.createContext<Look>({});

type Single = { type: "single"; value?: string; defaultValue?: string; onValueChange?: (value: string) => void };
type Multiple = { type: "multiple"; value?: string[]; defaultValue?: string[]; onValueChange?: (value: string[]) => void };

export type ToggleGroupProps = Omit<
  React.ComponentProps<typeof ToggleGroupPrimitive>,
  "className" | "value" | "defaultValue" | "onValueChange" | "multiple"
> & { className?: string } & Look & (Single | Multiple);

const asList = (v: string | string[] | undefined) => (v === undefined ? undefined : Array.isArray(v) ? v : v ? [v] : []);

/** Same props as the Radix version: type "single" or "multiple", with string values. Arrow keys move between items. */
export function ToggleGroup({ type, value, defaultValue, onValueChange, className, variant, size, children, ...props }: ToggleGroupProps) {
  return (
    <ToggleGroupPrimitive
      multiple={type === "multiple"}
      value={asList(value)}
      defaultValue={asList(defaultValue)}
      onValueChange={(v) => {
        const list = (v as unknown[]).map(String);
        if (type === "multiple") (onValueChange as Multiple["onValueChange"])?.(list);
        else (onValueChange as Single["onValueChange"])?.(list[0] ?? "");
      }}
      className={cn("vx-glass inline-flex w-fit items-center gap-0.5 rounded-input border border-tray-border bg-tray p-1", className)}
      {...props}
    >
      <LookContext.Provider value={{ variant, size }}>{children}</LookContext.Provider>
    </ToggleGroupPrimitive>
  );
}

export function ToggleGroupItem({
  className,
  variant,
  size,
  ...props
}: Omit<React.ComponentProps<typeof Toggle>, "className" | "value"> & { className?: string; value: string } & Look) {
  const look = React.useContext(LookContext);
  return <Toggle className={cn(toggleVariants({ variant: variant ?? look.variant, size: size ?? look.size ?? "sm" }), className)} {...props} />;
}
