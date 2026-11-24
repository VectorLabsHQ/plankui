import * as React from "react";
import { KeyIcon, PlusIcon, TrashIcon } from "@plankui/icons";
import { cn } from "@/lib/cn";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./alert-dialog";
import { Button } from "./button";

export interface ApiKey {
  id: string;
  name: string;
  /** The key's last characters; the rest is never shown again after creation. */
  last4: string;
  /** Key prefix, such as "sk_live". */
  prefix?: string;
  created: string;
  lastUsed?: string;
}

export interface ApiKeysProps {
  keys: ApiKey[];
  onCreate?: () => void;
  /** Called after the visitor confirms in the dialog. */
  onRevoke?: (id: string) => void;
  className?: string;
}

/** A project's API keys, masked, with when each was made and last used, a create button and a confirmed revoke. */
export function ApiKeys({ keys, onCreate, onRevoke, className }: ApiKeysProps) {
  return (
    <section aria-label="API keys" className={cn("vx-glass grid gap-3 rounded-panel border border-card-border bg-card p-5 text-ink shadow-card", className)}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="grid gap-0.5">
          <h3 className="font-semibold">API keys</h3>
          <p className="text-sm text-muted">Keys can read and write this project. Keep them on the server.</p>
        </div>
        {onCreate && <Button size="sm" onClick={onCreate}><PlusIcon /> Create key</Button>}
      </div>
      {keys.length === 0 ? (
        <p className="rounded-input bg-paper-2 px-4 py-6 text-center text-sm text-muted">No keys yet.</p>
      ) : (
        <ul className="grid gap-2">
          {keys.map((k) => (
            <li key={k.id} className="flex flex-wrap items-center gap-3 rounded-input border border-rule px-3 py-2.5">
              <KeyIcon className="size-4 shrink-0 text-muted" />
              <div className="grid min-w-0 flex-1 gap-0.5">
                <span className="truncate text-sm font-medium">{k.name}</span>
                <code className="truncate font-mono text-xs text-muted">{k.prefix ?? "key"}_••••••••{k.last4}</code>
              </div>
              <span className="text-xs text-muted">Created {k.created}{k.lastUsed ? `, used ${k.lastUsed}` : ", never used"}</span>
              {onRevoke && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon-sm" aria-label={`Revoke ${k.name}`}><TrashIcon /></Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Revoke {k.name}?</AlertDialogTitle>
                      <AlertDialogDescription>Anything using this key stops working at once. This cannot be undone.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Keep key</AlertDialogCancel>
                      <AlertDialogAction destructive onClick={() => onRevoke(k.id)}>Revoke key</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
