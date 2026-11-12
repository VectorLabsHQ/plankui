import * as React from "react";
import { Select as SelectPrimitive } from "@base-ui/react/select";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/cn";
import { menuItem, menuLabel, menuPanel, menuSeparator } from "./menu-styles";

/** Finds every SelectItem below the root, so the trigger can show an item's label rather than its value. */
function collectItems(node: React.ReactNode, out: Record<string, React.ReactNode> = {}) {
  React.Children.forEach(node, (child) => {
    if (!React.isValidElement<{ value?: string; children?: React.ReactNode }>(child)) return;
    if (child.type === SelectItem && child.props.value !== undefined) out[child.props.value] = child.props.children;
    else collectItems(child.props.children, out);
  });
  return out;
}

export interface SelectProps
  extends Omit<React.ComponentProps<typeof SelectPrimitive.Root>, "value" | "defaultValue" | "onValueChange" | "items"> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

/** Same props as the Radix version, with string values. */
export function Select({ children, onValueChange, ...props }: SelectProps) {
  const items = collectItems(children);
  return (
    <SelectPrimitive.Root items={items} onValueChange={(v) => onValueChange?.(v == null ? "" : String(v))} {...props}>
      {children}
    </SelectPrimitive.Root>
  );
}

export const SelectGroup = SelectPrimitive.Group;

export function SelectValue({ className, ...props }: Omit<React.ComponentProps<typeof SelectPrimitive.Value>, "className"> & { className?: string }) {
  return <SelectPrimitive.Value className={cn("truncate data-[placeholder]:text-muted", className)} {...props} />;
}

export function SelectTrigger({ className, children, ...props }: Omit<React.ComponentProps<typeof SelectPrimitive.Trigger>, "className"> & { className?: string }) {
  return (
    <SelectPrimitive.Trigger
      className={cn(
        "flex h-9 w-full items-center justify-between gap-2 rounded-input border border-field-border bg-field px-3 text-sm text-ink shadow-field vx-glass",
        "hover:field-hover focus-visible:field-focus focus-visible:outline-none",
        "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 [&>span]:truncate",
        className,
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon render={<ChevronsUpDown className="size-4 shrink-0 text-muted" />} />
    </SelectPrimitive.Trigger>
  );
}

export function SelectContent({
  className,
  children,
  ...props
}: Omit<React.ComponentProps<typeof SelectPrimitive.Popup>, "className"> & { className?: string; position?: "popper" | "item-aligned" }) {
  const { position = "popper", ...rest } = props as typeof props & { position?: string };
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner alignItemWithTrigger={position === "item-aligned"} sideOffset={6} className="z-[100]">
        <SelectPrimitive.Popup
          className={cn(menuPanel, "relative min-w-[max(8rem,var(--anchor-width))]", className)}
          {...rest}
        >
          <SelectPrimitive.List className="max-h-[min(var(--available-height),340px)] overflow-y-auto">{children}</SelectPrimitive.List>
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  );
}

/** A heading inside the list. A plain element, so it works inside or outside a group. */
export function SelectLabel({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div role="presentation" className={cn(menuLabel, className)} {...props} />;
}

export function SelectItem({
  className,
  children,
  ...props
}: Omit<React.ComponentProps<typeof SelectPrimitive.Item>, "className" | "value"> & { className?: string; value: string }) {
  return (
    <SelectPrimitive.Item className={cn(menuItem, "w-full pr-9", className)} {...props}>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <span className="absolute right-2.5 flex size-4 items-center justify-center [&_svg]:!text-accent">
        <SelectPrimitive.ItemIndicator>
          <Check className="size-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
    </SelectPrimitive.Item>
  );
}

export function SelectSeparator({ className, ...props }: Omit<React.ComponentProps<typeof SelectPrimitive.Separator>, "className"> & { className?: string }) {
  return <SelectPrimitive.Separator className={cn(menuSeparator, className)} {...props} />;
}
