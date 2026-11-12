import * as React from "react";
import { AlertDialog as AD } from "@base-ui/react/alert-dialog";
import { cn } from "@/lib/cn";
import { buttonVariants } from "./button";

/** asChild, as in the Radix version: the child element becomes the trigger. */
function slot(asChild: boolean | undefined, children: React.ReactNode) {
  if (!asChild || !React.isValidElement(children)) return { children };
  const nativeButton = typeof children.type !== "string" || children.type === "button";
  return { render: children as React.ReactElement<Record<string, unknown>>, nativeButton };
}

export const AlertDialog = AD.Root;

export function AlertDialogTrigger({
  asChild,
  children,
  ...props
}: Omit<React.ComponentProps<typeof AD.Trigger>, "render"> & { asChild?: boolean }) {
  return <AD.Trigger {...props} {...slot(asChild, children)} />;
}

export function AlertDialogContent({ className, ...props }: Omit<React.ComponentProps<typeof AD.Popup>, "className"> & { className?: string }) {
  return (
    <AD.Portal>
      <AD.Backdrop className="vx-fade fixed inset-0 z-[400] bg-overlay backdrop-blur-[2px]" />
      <AD.Popup
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
export function AlertDialogTitle({ className, ...props }: Omit<React.ComponentProps<typeof AD.Title>, "className"> & { className?: string }) {
  return <AD.Title className={cn("font-display text-lg font-semibold tracking-tight", className)} {...props} />;
}
export function AlertDialogDescription({ className, ...props }: Omit<React.ComponentProps<typeof AD.Description>, "className"> & { className?: string }) {
  return <AD.Description className={cn("text-sm text-muted", className)} {...props} />;
}

type CloseProps = Omit<React.ComponentProps<typeof AD.Close>, "className" | "render"> & { className?: string; asChild?: boolean };

/** The confirming button. Pass destructive for irreversible actions. It runs onClick, then closes. */
export function AlertDialogAction({ className, destructive, asChild, children, ...props }: CloseProps & { destructive?: boolean }) {
  return <AD.Close className={cn(buttonVariants({ variant: destructive ? "danger" : "primary" }), className)} {...props} {...slot(asChild, children)} />;
}
export function AlertDialogCancel({ className, asChild, children, ...props }: CloseProps) {
  return <AD.Close className={cn(buttonVariants({ variant: "secondary" }), className)} {...props} {...slot(asChild, children)} />;
}
