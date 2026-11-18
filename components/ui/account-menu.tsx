import * as React from "react";
import { ChevronsUpDownIcon, LogOutIcon, MoonIcon, UserPlusIcon } from "@plankui/icons";
import { cn } from "@/lib/cn";
import { Avatar } from "./avatar";
import { Badge } from "./badge";
import { Switch } from "./switch";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./dropdown-menu";

export interface AccountMenuItem {
  label: string;
  icon?: React.ReactNode;
  shortcut?: string;
  onSelect?: () => void;
}

export interface AccountMenuProps {
  name: string;
  email: string;
  src?: string;
  /** A plan badge next to the name, such as "Pro". */
  plan?: string;
  items?: AccountMenuItem[];
  dark?: boolean;
  onDarkChange?: (dark: boolean) => void;
  onAddAccount?: () => void;
  onSignOut?: () => void;
  /** Small print at the bottom, such as a version number. */
  footer?: React.ReactNode;
  className?: string;
}

const initials = (name: string) => name.split(/\s+/).map((p) => p[0]).join("").slice(0, 2).toUpperCase();

/** The signed-in user's menu: who they are, a dark mode switch, links, another account and sign out. */
export function AccountMenu({ name, email, src, plan, items = [], dark, onDarkChange, onAddAccount, onSignOut, footer, className }: AccountMenuProps) {
  const who = (
    <span className="flex min-w-0 flex-1 items-center gap-2.5 text-left">
      <Avatar size="sm" src={src} alt={name} fallback={initials(name)} />
      <span className="grid min-w-0">
        <span className="flex items-center gap-1.5 truncate text-sm font-medium text-ink">
          {name} {plan && <Badge variant="accent" className="px-1.5 text-[10px]">{plan}</Badge>}
        </span>
        <span className="truncate text-xs text-muted">{email}</span>
      </span>
    </span>
  );
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "vx-glass flex w-full max-w-64 items-center gap-2 rounded-card border border-field-border bg-field p-1.5 pr-2.5 shadow-field",
          "transition-[background-color,border-color] duration-[var(--dur-micro)] hover:bg-[color:var(--field-hover)] focus-visible:outline-2 focus-visible:outline-focus",
          className,
        )}
      >
        {who}
        <ChevronsUpDownIcon className="size-4 shrink-0 text-muted" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-64">
        <div className="px-1 py-1.5">{who}</div>
        <DropdownMenuSeparator />
        {onDarkChange && (
          <DropdownMenuItem onSelect={(e) => { e.preventDefault(); onDarkChange(!dark); }}>
            <MoonIcon /> Dark mode
            <Switch size="sm" checked={dark} tabIndex={-1} aria-hidden className="pointer-events-none ml-auto" />
          </DropdownMenuItem>
        )}
        {items.map((i) => (
          <DropdownMenuItem key={i.label} shortcut={i.shortcut} onSelect={i.onSelect}>
            {i.icon} {i.label}
          </DropdownMenuItem>
        ))}
        {(onAddAccount || onSignOut) && <DropdownMenuSeparator />}
        {onAddAccount && <DropdownMenuItem onSelect={onAddAccount}><UserPlusIcon /> Add account</DropdownMenuItem>}
        {onSignOut && <DropdownMenuItem onSelect={onSignOut}><LogOutIcon /> Sign out</DropdownMenuItem>}
        {footer && <p className="px-2 pb-1 pt-2 text-xs text-muted">{footer}</p>}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
