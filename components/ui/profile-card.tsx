import * as React from "react";
import { MailIcon, UserPlusIcon } from "@plankui/icons";
import { cn } from "@/lib/cn";
import { Avatar } from "./avatar";
import { Button } from "./button";

export interface ProfileDetail {
  label: string;
  value: React.ReactNode;
}

export interface ProfileCardProps {
  name: string;
  role?: string;
  /** Image URL. Initials from the name show while it loads or if it fails. */
  src?: string;
  status?: "online" | "away" | "offline";
  details?: ProfileDetail[];
  onContact?: () => void;
  onView?: () => void;
  className?: string;
}

const initials = (name: string) => name.split(/\s+/).map((p) => p[0]).join("").slice(0, 2).toUpperCase();

/** A person at a glance: avatar, role, labelled details and two actions. */
export function ProfileCard({ name, role, src, status, details = [], onContact, onView, className }: ProfileCardProps) {
  return (
    <section aria-label={`${name}'s profile`} className={cn("vx-glass grid w-full max-w-sm gap-2 rounded-panel border border-card-border bg-card p-2 text-ink shadow-card", className)}>
      <header className="flex items-center gap-3 px-2.5 pt-2.5">
        <Avatar size="lg" src={src} alt={name} fallback={initials(name)} status={status} />
        <div className="min-w-0 flex-1">
          <p className="truncate font-medium">{name}</p>
          {role && <p className="truncate text-sm text-muted">{role}</p>}
        </div>
        {onContact && (
          <Button size="icon-sm" variant="secondary" aria-label={`Add ${name} to contacts`} onClick={onContact}>
            <UserPlusIcon />
          </Button>
        )}
      </header>
      {details.length > 0 && (
        <dl className="grid gap-3 rounded-input bg-paper-2 p-3.5 text-sm">
          {details.map((d) => (
            <div key={d.label} className="grid gap-0.5">
              <dt className="text-xs text-muted">{d.label}</dt>
              <dd className="[overflow-wrap:anywhere]">{d.value}</dd>
            </div>
          ))}
        </dl>
      )}
      {onView && (
        <Button variant="secondary" className="w-full" onClick={onView}>
          <MailIcon /> View profile
        </Button>
      )}
    </section>
  );
}
