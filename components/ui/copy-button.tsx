import * as React from "react";
import { CheckIcon, CopyIcon } from "@plankui/icons";
import { Button, type ButtonProps } from "./button";

export interface CopyButtonProps extends Omit<ButtonProps, "onClick"> {
  /** The text written to the clipboard. */
  value: string;
  /** Text shown beside the icon. Omit for an icon-only button. */
  label?: string;
  onCopied?: () => void;
}

/** Copies a value and confirms with a check for a moment. */
export function CopyButton({ value, label, onCopied, variant = "secondary", size, ...props }: CopyButtonProps) {
  const [done, setDone] = React.useState(false);
  return (
    <Button
      variant={variant}
      size={size ?? (label ? "sm" : "icon-sm")}
      aria-label={label ? undefined : done ? "Copied" : "Copy"}
      onClick={() =>
        navigator.clipboard?.writeText(value).then(() => {
          setDone(true);
          onCopied?.();
          window.setTimeout(() => setDone(false), 1500);
        })
      }
      {...props}
    >
      {done ? <CheckIcon className="text-success" /> : <CopyIcon />}
      {label && (done ? "Copied" : label)}
    </Button>
  );
}
