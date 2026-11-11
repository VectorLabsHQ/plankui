import * as React from "react";
import { AlertDialog as AD } from "radix-ui";
import { cn } from "@/lib/cn";
import { buttonVariants } from "./button";

export const AlertDialog = AD.Root;
export const AlertDialogTrigger = AD.Trigger;

export function AlertDialogContent({ className, ...props }: React.ComponentProps<typeof AD.Content>) {
  return (
    <AD.Portal>
      <AD.Overlay className="vx-fade fixed inset-0 z-[400] bg-overlay backdrop-blur-[2px]" />
      <AD.Content
        className={cn(
          "vx-dialog fixed left-1/2 top-1/2 z-[400] grid w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 gap-4",
          "vx-glass rounded-panel border border-pop-border bg-pop p-6 text-ink shadow-pop outline-none",
          className,
        )}
        {...props}
      />
    </AD.Portal>
  );
}

export function AlertDialogHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("grid gap-1.5", className)} {...props} />;
}
export function AlertDialogFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end", className)} {...props} />;
}
export function AlertDialogTitle({ className, ...props }: React.ComponentProps<typeof AD.Title>) {
  return <AD.Title className={cn("font-display text-lg font-semibold tracking-tight", className)} {...props} />;
}
export function AlertDialogDescription({ className, ...props }: React.ComponentProps<typeof AD.Description>) {
  return <AD.Description className={cn("text-sm text-muted", className)} {...props} />;
}
/** The confirming button. Pass destructive for irreversible actions. */
export function AlertDialogAction({ className, destructive, ...props }: React.ComponentProps<typeof AD.Action> & { destructive?: boolean }) {
  return <AD.Action className={cn(buttonVariants({ variant: destructive ? "danger" : "primary" }), className)} {...props} />;
}
export function AlertDialogCancel({ className, ...props }: React.ComponentProps<typeof AD.Cancel>) {
  return <AD.Cancel className={cn(buttonVariants({ variant: "secondary" }), className)} {...props} />;
}
