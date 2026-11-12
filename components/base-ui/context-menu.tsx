import * as React from "react";
import { ContextMenu as Menu } from "@base-ui/react/context-menu";
import { Check, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { menuItem, menuLabel, menuPanel, menuSeparator } from "./menu-styles";

/** asChild, as in the Radix version: the child element becomes the trigger. */
function slot(asChild: boolean | undefined, children: React.ReactNode) {
  if (!asChild || !React.isValidElement(children)) return { children };
  return { render: children as React.ReactElement<Record<string, unknown>> };
}

export const ContextMenu = Menu.Root;
export const ContextMenuGroup = Menu.Group;
export const ContextMenuSub = Menu.SubmenuRoot;

export function ContextMenuTrigger({ asChild, children, ...props }: Omit<React.ComponentProps<typeof Menu.Trigger>, "render"> & { asChild?: boolean }) {
  return <Menu.Trigger {...props} {...slot(asChild, children)} />;
}

const panel = menuPanel;
const item = menuItem;

/** The menu that opens on right-click or a long press. */
export function ContextMenuContent({ className, ...props }: Omit<React.ComponentProps<typeof Menu.Popup>, "className"> & { className?: string }) {
  return (
    <Menu.Portal>
      <Menu.Positioner className="z-[100]">
        <Menu.Popup className={cn(panel, className)} {...props} />
      </Menu.Positioner>
    </Menu.Portal>
  );
}

export function ContextMenuItem({
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

export function ContextMenuCheckboxItem({ className, children, ...props }: Omit<React.ComponentProps<typeof Menu.CheckboxItem>, "className"> & { className?: string }) {
  return (
    <Menu.CheckboxItem className={cn(item, "pl-9", className)} {...props}>
      <span className="absolute left-2.5 flex size-4 items-center justify-center">
        <Menu.CheckboxItemIndicator><Check className="!text-accent" /></Menu.CheckboxItemIndicator>
      </span>
      {children}
    </Menu.CheckboxItem>
  );
}

/** A heading inside the menu. A plain element, so it works inside or outside a group. */
export function ContextMenuLabel({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div role="presentation" className={cn(menuLabel, className)} {...props} />;
}

export function ContextMenuSeparator({ className, ...props }: Omit<React.ComponentProps<typeof Menu.Separator>, "className"> & { className?: string }) {
  return <Menu.Separator className={cn(menuSeparator, className)} {...props} />;
}

export function ContextMenuSubTrigger({ className, children, ...props }: Omit<React.ComponentProps<typeof Menu.SubmenuTrigger>, "className"> & { className?: string }) {
  return (
    <Menu.SubmenuTrigger className={cn(item, "data-[popup-open]:bg-paper-3", className)} {...props}>
      {children}
      <ChevronRight className="ml-auto" />
    </Menu.SubmenuTrigger>
  );
}

export function ContextMenuSubContent({ className, ...props }: Omit<React.ComponentProps<typeof Menu.Popup>, "className"> & { className?: string }) {
  return (
    <Menu.Portal>
      <Menu.Positioner side="right" align="start" sideOffset={4} className="z-[100]">
        <Menu.Popup className={cn(panel, className)} {...props} />
      </Menu.Positioner>
    </Menu.Portal>
  );
}
