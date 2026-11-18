import * as React from "react";
import { CheckIcon, LinkIcon, MailIcon } from "@plankui/icons";
import { cn } from "@/lib/cn";
import { Avatar } from "./avatar";
import { Button } from "./button";
import { Input } from "./input";
import { NativeSelect } from "./native-select";

export interface Member {
  id: string;
  name: string;
  email: string;
  role: string;
  src?: string;
}

export interface InviteMembersProps {
  members: Member[];
  /** The roles a member can have, such as ["Owner", "Editor", "Viewer"]. */
  roles?: string[];
  onInvite?: (email: string) => void;
  onRoleChange?: (id: string, role: string) => void;
  /** Shown with a copy button, so people can share access by link. */
  shareLink?: string;
  className?: string;
}

const initials = (name: string) => name.split(/\s+/).map((p) => p[0]).join("").slice(0, 2).toUpperCase();

/** Invite by email, change who can do what, and copy a share link. */
export function InviteMembers({ members, roles = ["Owner", "Editor", "Viewer"], onInvite, onRoleChange, shareLink, className }: InviteMembersProps) {
  const [email, setEmail] = React.useState("");
  const [copied, setCopied] = React.useState(false);
  const id = React.useId();
  return (
    <section aria-labelledby={`${id}-t`} className={cn("vx-glass grid w-full max-w-md gap-2 rounded-panel border border-card-border bg-card p-2 text-ink shadow-card", className)}>
      <header className="px-2.5 pt-2.5">
        <p id={`${id}-t`} className="font-medium">Invite to project</p>
        <p className="text-sm text-muted">Collaborate with members on this project.</p>
      </header>
      <form
        className="flex gap-2 px-2.5"
        onSubmit={(e) => {
          e.preventDefault();
          if (!email.trim()) return;
          onInvite?.(email.trim());
          setEmail("");
        }}
      >
        <Input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@company.com" aria-label="Email to invite" leading={<MailIcon />} className="flex-1" />
        <Button type="submit">Invite</Button>
      </form>
      <div className="grid gap-1 rounded-input bg-paper-2 p-2">
        <p className="px-1.5 pb-1 pt-0.5 text-xs text-muted">Members with access</p>
        <ul className="grid gap-1">
          {members.map((m) => (
            <li key={m.id} className="flex items-center gap-3 rounded-input px-1.5 py-1.5">
              <Avatar size="sm" src={m.src} alt={m.name} fallback={initials(m.name)} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{m.name}</p>
                <p className="truncate text-xs text-muted">{m.email}</p>
              </div>
              <NativeSelect size="sm" aria-label={`Role for ${m.name}`} defaultValue={m.role} onChange={(e) => onRoleChange?.(m.id, e.target.value)}>
                {roles.map((r) => <option key={r} value={r}>{r}</option>)}
              </NativeSelect>
            </li>
          ))}
        </ul>
      </div>
      {shareLink && (
        <div className="flex items-center gap-3 px-2.5 pb-1.5 pt-0.5">
          <span className="grid size-8 shrink-0 place-items-center rounded-input bg-paper-2 text-ink-2 [&_svg]:size-4"><LinkIcon /></span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium">Anyone with the link</p>
            <p className="truncate text-xs text-muted">{shareLink}</p>
          </div>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => {
              navigator.clipboard?.writeText(shareLink);
              setCopied(true);
              window.setTimeout(() => setCopied(false), 1500);
            }}
          >
            {copied ? <><CheckIcon /> Copied</> : "Copy link"}
          </Button>
        </div>
      )}
    </section>
  );
}
