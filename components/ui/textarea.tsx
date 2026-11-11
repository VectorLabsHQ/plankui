import * as React from "react";
import { cn } from "@/lib/cn";
import { fieldBase } from "./input";

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea ref={ref} className={cn(fieldBase, "min-h-24 resize-y px-3 py-2 leading-6", className)} {...props} />
  ),
);
Textarea.displayName = "Textarea";
