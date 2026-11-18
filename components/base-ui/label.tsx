import * as React from "react";
import { cn } from "@/lib/cn";

/** A form label. Base UI needs no primitive here: a native label already focuses its control. */
export function Label({ className, ...props }: React.ComponentProps<"label">) {
  return <label className={cn("text-sm font-medium text-ink peer-disabled:opacity-60", className)} {...props} />;
}

/** Label, control and hint stacked with consistent spacing. Wires the label, hint and error to the control for screen readers. */
export function Field({
  label,
  hint,
  error,
  htmlFor,
  children,
  className,
}: {
  label?: React.ReactNode;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  /** The control's id. Leave it out and Field gives the control one. */
  htmlFor?: string;
  children: React.ReactNode;
  className?: string;
}) {
  const auto = React.useId();
  const only = React.Children.count(children) === 1 && React.isValidElement<Record<string, unknown>>(children) ? children : null;
  const id = htmlFor ?? (only?.props.id as string | undefined) ?? auto;
  const noteId = `${id}-note`;
  const note = error ?? hint;
  // With a single control, give it the id, the note and the error state; with several, leave them as they are.
  const control = only
    ? React.cloneElement(only, {
        id,
        "aria-describedby": [only.props["aria-describedby"], note ? noteId : null].filter(Boolean).join(" ") || undefined,
        "aria-invalid": error ? true : only.props["aria-invalid"],
      })
    : children;
  return (
    <div className={cn("grid gap-1.5", className)}>
      {label && <Label htmlFor={id}>{label}</Label>}
      {control}
      {note && (
        <p id={noteId} className={cn("text-xs", error ? "text-danger" : "text-muted")}>
          {note}
        </p>
      )}
    </div>
  );
}
