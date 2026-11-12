import * as React from "react";
import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import { cn } from "@/lib/cn";

/** asChild, as in the Radix version: the child element becomes the trigger. */
function slot(asChild: boolean | undefined, children: React.ReactNode) {
  if (!asChild || !React.isValidElement(children)) return { children };
  const nativeButton = typeof children.type !== "string" || children.type === "button";
  return { render: children as React.ReactElement<Record<string, unknown>>, nativeButton };
}

export const Popover = PopoverPrimitive.Root;

export function PopoverTrigger({
  asChild,
  children,
  ...props
}: Omit<React.ComponentProps<typeof PopoverPrimitive.Trigger>, "render"> & { asChild?: boolean }) {
  return <PopoverPrimitive.Trigger {...props} {...slot(asChild, children)} />;
}

export function PopoverClose({
  asChild,
  children,
  ...props
}: Omit<React.ComponentProps<typeof PopoverPrimitive.Close>, "render"> & { asChild?: boolean }) {
  return <PopoverPrimitive.Close {...props} {...slot(asChild, children)} />;
}

type Positioner = React.ComponentProps<typeof PopoverPrimitive.Positioner>;

export interface PopoverContentProps extends Omit<React.ComponentProps<typeof PopoverPrimitive.Popup>, "className"> {
  className?: string;
  side?: Positioner["side"];
  align?: Positioner["align"];
  sideOffset?: number;
  alignOffset?: number;
}

export function PopoverContent({ className, side = "bottom", align = "center", sideOffset = 8, alignOffset, ...props }: PopoverContentProps) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Positioner side={side} align={align} sideOffset={sideOffset} alignOffset={alignOffset} className="z-[100]">
        <PopoverPrimitive.Popup
          className={cn("vx-pop w-72 vx-glass rounded-card border border-pop-border bg-pop p-4 text-ink shadow-pop outline-none", className)}
          {...props}
        />
      </PopoverPrimitive.Positioner>
    </PopoverPrimitive.Portal>
  );
}
