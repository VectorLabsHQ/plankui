import * as React from "react";
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";

/** asChild, as in the Radix version: the child element becomes the trigger. */
function slot(asChild: boolean | undefined, children: React.ReactNode) {
  if (!asChild || !React.isValidElement(children)) return { children };
  const nativeButton = typeof children.type !== "string" || children.type === "button";
  return { render: children as React.ReactElement<Record<string, unknown>>, nativeButton };
}

export const Dialog = DialogPrimitive.Root;

export function DialogTrigger({
  asChild,
  children,
  ...props
}: Omit<React.ComponentProps<typeof DialogPrimitive.Trigger>, "render"> & { asChild?: boolean }) {
  return <DialogPrimitive.Trigger {...props} {...slot(asChild, children)} />;
}

export function DialogClose({
  asChild,
  children,
  ...props
}: Omit<React.ComponentProps<typeof DialogPrimitive.Close>, "render"> & { asChild?: boolean }) {
  return <DialogPrimitive.Close {...props} {...slot(asChild, children)} />;
}

export function DialogContent({
  className,
  children,
  hideClose,
  ...props
}: Omit<React.ComponentProps<typeof DialogPrimitive.Popup>, "className"> & { className?: string; hideClose?: boolean }) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Backdrop className="vx-fade fixed inset-0 z-[400] bg-overlay backdrop-blur-[2px]" />
      <DialogPrimitive.Popup
        className={cn(
          "vx-dialog fixed left-1/2 top-1/2 z-[400] grid w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 gap-4",
          "vx-glass rounded-panel border border-pop-border bg-pop p-6 text-ink shadow-pop outline-none",
          className,
        )}
        {...props}
      >
        {children}
        {!hideClose && (
          <DialogPrimitive.Close
            aria-label="Close"
            className="absolute right-4 top-4 grid size-7 place-items-center rounded-input text-muted hover:bg-paper-3 hover:text-ink focus-visible:outline-2 focus-visible:outline-focus"
          >
            <X className="size-4" />
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Popup>
    </DialogPrimitive.Portal>
  );
}

export function DialogHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("grid gap-1.5 pr-8", className)} {...props} />;
}
export function DialogFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end", className)} {...props} />;
}
export function DialogTitle({ className, ...props }: Omit<React.ComponentProps<typeof DialogPrimitive.Title>, "className"> & { className?: string }) {
  return <DialogPrimitive.Title className={cn("font-display text-lg font-semibold tracking-tight", className)} {...props} />;
}
export function DialogDescription({
  className,
  ...props
}: Omit<React.ComponentProps<typeof DialogPrimitive.Description>, "className"> & { className?: string }) {
  return <DialogPrimitive.Description className={cn("text-sm text-muted", className)} {...props} />;
}
