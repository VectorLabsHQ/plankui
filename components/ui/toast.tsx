import * as React from "react";
import { CircleAlert, CircleCheck, Info, X } from "lucide-react";
import { cn } from "@/lib/cn";

type Tone = "default" | "success" | "danger";
export interface ToastItem {
  id: number;
  title: string;
  description?: string;
  tone?: Tone;
  action?: { label: string; onClick: () => void };
  duration?: number;
}

let items: ToastItem[] = [];
let nextId = 1;
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

export function dismissToast(id: number) {
  items = items.filter((t) => t.id !== id);
  emit();
}

/** Show a toast from anywhere: toast("Saved") or toast({ title, description, tone, action }). */
export function toast(input: string | Omit<ToastItem, "id">) {
  const t: ToastItem = typeof input === "string" ? { id: nextId++, title: input } : { id: nextId++, ...input };
  items = [...items, t].slice(-4);
  emit();
  window.setTimeout(() => dismissToast(t.id), t.duration ?? 4000);
  return t.id;
}
toast.success = (title: string, description?: string) => toast({ title, description, tone: "success" });
toast.error = (title: string, description?: string) => toast({ title, description, tone: "danger" });

const icons = { default: Info, success: CircleCheck, danger: CircleAlert };
const iconTone = { default: "text-accent", success: "text-success", danger: "text-danger" };

/** Mount once near the root of your app. */
export function Toaster({ className }: { className?: string }) {
  const list = React.useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => items,
    () => items,
  );
  return (
    <ol
      aria-live="polite"
      className={cn("pointer-events-none fixed bottom-4 right-4 z-[500] flex w-[min(360px,calc(100vw-2rem))] flex-col gap-2", className)}
    >
      {list.map((t) => {
        const Icon = icons[t.tone ?? "default"];
        return (
          <li
            key={t.id}
            className="vx-toast pointer-events-auto flex items-start gap-3 rounded-card border border-pop-border bg-pop p-3.5 text-sm text-ink shadow-pop vx-glass"
          >
            <Icon className={cn("mt-0.5 size-4 shrink-0", iconTone[t.tone ?? "default"])} />
            <div className="grid flex-1 gap-0.5">
              <p className="font-medium">{t.title}</p>
              {t.description && <p className="text-muted">{t.description}</p>}
            </div>
            {t.action && (
              <button
                onClick={() => {
                  t.action!.onClick();
                  dismissToast(t.id);
                }}
                className="rounded-sm px-1.5 py-0.5 text-sm font-medium text-accent hover:bg-accent-wash focus-visible:outline-2 focus-visible:outline-focus"
              >
                {t.action.label}
              </button>
            )}
            <button
              onClick={() => dismissToast(t.id)}
              aria-label="Dismiss"
              className="-m-1 grid size-6 place-items-center rounded-sm text-muted hover:text-ink focus-visible:outline-2 focus-visible:outline-focus"
            >
              <X className="size-4" />
            </button>
          </li>
        );
      })}
    </ol>
  );
}
