import * as React from "react";
import { Menu } from "@base-ui/react/menu";
import { Check, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { menuItem, menuLabel, menuPanel, menuSeparator } from "./menu-styles";

/** asChild, as in the Radix version: the child element becomes the trigger. */
function slot(asChild: boolean | undefined, children: React.ReactNode) {
  if (!asChild || !React.isValidElement(children)) return { children };
  const nativeButton = typeof children.type !== "string" || children.type === "button";
  return { render: children as React.ReactElement<Record<string, unknown>>, nativeButton };
}

export const DropdownMenu = Menu.Root;
export const DropdownMenuGroup = Menu.Group;
export const DropdownMenuSub = Menu.SubmenuRoot;

export function DropdownMenuTrigger({
  asChild,
  children,
  ...props
}: Omit<React.ComponentProps<typeof Menu.Trigger>, "render"> & { asChild?: boolean }) {
  return <Menu.Trigger {...props} {...slot(asChild, children)} />;
}

export function DropdownMenuRadioGroup({
  onValueChange,
  ...props
}: Omit<React.ComponentProps<typeof Menu.RadioGroup>, "value" | "defaultValue" | "onValueChange"> & {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}) {
  return <Menu.RadioGroup onValueChange={(v) => onValueChange?.(String(v))} {...props} />;
}

const panel = menuPanel;
const item = menuItem;

type Positioner = React.ComponentProps<typeof Menu.Positioner>;

export interface DropdownMenuContentProps extends Omit<React.ComponentProps<typeof Menu.Popup>, "className"> {
  className?: string;
  side?: Positioner["side"];
  align?: Positioner["align"];
  sideOffset?: number;
  alignOffset?: number;
}

export function DropdownMenuContent({ className, side = "bottom", align = "center", sideOffset = 6, alignOffset, ...props }: DropdownMenuContentProps) {
  return (
    <Menu.Portal>
      <Menu.Positioner side={side} align={align} sideOffset={sideOffset} alignOffset={alignOffset} className="z-[100]">
        <Menu.Popup className={cn(panel, className)} {...props} />
      </Menu.Positioner>
    </Menu.Portal>
  );
}

export function DropdownMenuItem({
  className,
  shortcut,
  destructive,
  children,
  onSelect,
  onClick,
  ...props
}: Omit<React.ComponentProps<typeof Menu.Item>, "className" | "onSelect"> & {
  className?: string;
  shortcut?: string;
  destructive?: boolean;
  /** Runs when the item is chosen by pointer or keyboard, as in the Radix version. */
  onSelect?: (event: Event) => void;
}) {
  return (
    <Menu.Item
      className={cn(item, destructive && "text-danger data-[highlighted]:bg-danger-wash [&_svg]:text-danger", className)}
      onClick={(e) => {
        onClick?.(e);
        onSelect?.(e.nativeEvent);
      }}
      {...props}
    >
      {children}
      {shortcut && <span className="ml-auto font-mono text-xs text-muted">{shortcut}</span>}
    </Menu.Item>
  );
}

export function DropdownMenuCheckboxItem({
  className,
  children,
  ...props
}: Omit<React.ComponentProps<typeof Menu.CheckboxItem>, "className"> & { className?: string }) {
  return (
    <Menu.CheckboxItem className={cn(item, "pl-9", className)} {...props}>
      <span className="absolute left-2.5 flex size-4 items-center justify-center">
        <Menu.CheckboxItemIndicator>
          <Check className="!text-accent" />
        </Menu.CheckboxItemIndicator>
      </span>
      {children}
    </Menu.CheckboxItem>
  );
}

export function DropdownMenuRadioItem({
  className,
  children,
  ...props
}: Omit<React.ComponentProps<typeof Menu.RadioItem>, "className" | "value"> & { className?: string; value: string }) {
  return (
    <Menu.RadioItem className={cn(item, "pl-9", className)} {...props}>
      <span className="absolute left-2.5 flex size-4 items-center justify-center">
        <Menu.RadioItemIndicator>
          <span className="block size-1.5 rounded-full bg-accent" />
        </Menu.RadioItemIndicator>
      </span>
      {children}
    </Menu.RadioItem>
  );
}

/** A heading inside the menu. Base UI ties its own labels to a group, so this is a plain element that works anywhere. */
export function DropdownMenuLabel({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div role="presentation" className={cn(menuLabel, className)} {...props} />;
}

export function DropdownMenuSeparator({ className, ...props }: Omit<React.ComponentProps<typeof Menu.Separator>, "className"> & { className?: string }) {
  return <Menu.Separator className={cn(menuSeparator, className)} {...props} />;
}

export function DropdownMenuSubTrigger({
  className,
  children,
  ...props
}: Omit<React.ComponentProps<typeof Menu.SubmenuTrigger>, "className"> & { className?: string }) {
  return (
    <Menu.SubmenuTrigger className={cn(item, "data-[popup-open]:bg-paper-3", className)} {...props}>
      {children}
      <ChevronRight className="ml-auto" />
    </Menu.SubmenuTrigger>
  );
}

export function DropdownMenuSubContent({ className, ...props }: Omit<React.ComponentProps<typeof Menu.Popup>, "className"> & { className?: string }) {
  return (
    <Menu.Portal>
      <Menu.Positioner side="right" align="start" sideOffset={4} className="z-[100]">
        <Menu.Popup className={cn(panel, className)} {...props} />
      </Menu.Positioner>
    </Menu.Portal>
  );
}
