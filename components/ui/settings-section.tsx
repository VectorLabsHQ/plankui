import * as React from "react";
import { cn } from "@/lib/cn";
import { Switch } from "./switch";

export interface SettingRow {
  id: string;
  label: string;
  description?: string;
  /** A switch row: its state and handler. Leave out and pass `control` for anything else. */
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  /** Any control in place of the switch, such as a Select or a Button. */
  control?: React.ReactNode;
}

export interface SettingsSectionProps {
  title: string;
  description?: string;
  rows: SettingRow[];
  className?: string;
}

/** One group of settings: a heading, then a row per setting with its label, a line of help and its control. */
export function SettingsSection({ title, description, rows, className }: SettingsSectionProps) {
  const id = React.useId();
  return (
    <section aria-labelledby={`${id}-t`} className={cn("vx-glass grid rounded-panel border border-card-border bg-card text-ink shadow-card", className)}>
      <header className="grid gap-1 px-5 pb-3 pt-5">
        <h3 id={`${id}-t`} className="font-semibold">{title}</h3>
        {description && <p className="text-sm text-muted">{description}</p>}
      </header>
      <ul className="grid px-2 pb-2">
        {rows.map((r) => {
          const labelId = `${id}-${r.id}`;
          return (
            <li key={r.id} className="flex items-center justify-between gap-4 rounded-input px-3 py-3">
              <div className="grid min-w-0 gap-0.5">
                <span id={labelId} className="text-sm font-medium">{r.label}</span>
                {r.description && <span id={`${labelId}-d`} className="text-sm text-muted">{r.description}</span>}
              </div>
              {r.control ?? (
                <Switch
                  checked={r.checked}
                  onCheckedChange={(v) => r.onCheckedChange?.(v === true)}
                  aria-labelledby={labelId}
                  aria-describedby={r.description ? `${labelId}-d` : undefined}
                />
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
