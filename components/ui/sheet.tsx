import * as React from "react";
import { Dialog as SheetPrimitive } from "radix-ui";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";

export const Sheet = SheetPrimitive.Root;
export const SheetTrigger = SheetPrimitive.Trigger;
export const SheetClose = SheetPrimitive.Close;

const sides = {
  right: "vx-sheet-right inset-y-0 right-0 h-full w-[min(420px,100%)] border-l",
  left: "vx-sheet-left inset-y-0 left-0 h-full w-[min(420px,100%)] border-r",
  bottom: "vx-sheet-bottom inset-x-0 bottom-0 max-h-[85svh] rounded-t-panel border-t",
};

export function SheetContent({
  side = "right",
  className,
  children,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Content> & { side?: keyof typeof sides }) {
  return (
    <SheetPrimitive.Portal>
      <SheetPrimitive.Overlay className="vx-fade fixed inset-0 z-[400] bg-overlay" />
      <SheetPrimitive.Content
        className={cn("vx-glass fixed z-[400] flex flex-col gap-4 overflow-y-auto border-pop-border bg-pop p-6 text-ink shadow-pop outline-none", sides[side], className)}
        {...props}
      >
        {children}
        <SheetPrimitive.Close
          aria-label="Close"
          className="absolute right-4 top-4 grid size-7 place-items-center rounded-input text-muted hover:bg-paper-3 hover:text-ink focus-visible:outline-2 focus-visible:outline-focus"
        >
          <X className="size-4" />
        </SheetPrimitive.Close>
      </SheetPrimitive.Content>
    </SheetPrimitive.Portal>
  );
}

export function SheetHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("grid gap-1.5 pr-8", className)} {...props} />;
}
export function SheetFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mt-auto flex flex-col-reverse gap-2 border-t border-rule pt-4 sm:flex-row sm:justify-end", className)} {...props} />;
}
export function SheetTitle({ className, ...props }: React.ComponentProps<typeof SheetPrimitive.Title>) {
  return <SheetPrimitive.Title className={cn("font-display text-lg font-semibold tracking-tight", className)} {...props} />;
}
export function SheetDescription({ className, ...props }: React.ComponentProps<typeof SheetPrimitive.Description>) {
  return <SheetPrimitive.Description className={cn("text-sm text-muted", className)} {...props} />;
}
