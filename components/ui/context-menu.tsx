import * as React from "react";
import { ContextMenu as Menu } from "radix-ui";
import { Check, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { menuItem, menuLabel, menuPanel, menuSeparator } from "./menu-styles";

export const ContextMenu = Menu.Root;
export const ContextMenuTrigger = Menu.Trigger;
export const ContextMenuGroup = Menu.Group;
export const ContextMenuSub = Menu.Sub;

const panel = menuPanel;
const item = menuItem;

/** The menu that opens on right-click or a long press. */
export function ContextMenuContent({ className, ...props }: React.ComponentProps<typeof Menu.Content>) {
  return (
    <Menu.Portal>
      <Menu.Content className={cn(panel, className)} {...props} />
    </Menu.Portal>
  );
}

export function ContextMenuItem({
  className,
  shortcut,
  destructive,
  children,
  ...props
}: React.ComponentProps<typeof Menu.Item> & { shortcut?: string; destructive?: boolean }) {
  return (
    <Menu.Item className={cn(item, destructive && "text-danger data-[highlighted]:bg-danger-wash [&_svg]:text-danger", className)} {...props}>
      {children}
      {shortcut && <span className="ml-auto font-mono text-xs text-muted">{shortcut}</span>}
    </Menu.Item>
  );
}

export function ContextMenuCheckboxItem({ className, children, ...props }: React.ComponentProps<typeof Menu.CheckboxItem>) {
  return (
    <Menu.CheckboxItem className={cn(item, "pl-9", className)} {...props}>
      <span className="absolute left-2.5 flex size-4 items-center justify-center">
        <Menu.ItemIndicator><Check className="!text-accent" /></Menu.ItemIndicator>
      </span>
      {children}
    </Menu.CheckboxItem>
  );
}

export function ContextMenuLabel({ className, ...props }: React.ComponentProps<typeof Menu.Label>) {
  return <Menu.Label className={cn(menuLabel, className)} {...props} />;
}

export function ContextMenuSeparator({ className, ...props }: React.ComponentProps<typeof Menu.Separator>) {
  return <Menu.Separator className={cn(menuSeparator, className)} {...props} />;
}

export function ContextMenuSubTrigger({ className, children, ...props }: React.ComponentProps<typeof Menu.SubTrigger>) {
  return (
    <Menu.SubTrigger className={cn(item, "data-[state=open]:bg-paper-3", className)} {...props}>
      {children}
      <ChevronRight className="ml-auto" />
    </Menu.SubTrigger>
  );
}

export function ContextMenuSubContent({ className, ...props }: React.ComponentProps<typeof Menu.SubContent>) {
  return (
    <Menu.Portal>
      <Menu.SubContent className={cn(panel, className)} {...props} />
    </Menu.Portal>
  );
}
