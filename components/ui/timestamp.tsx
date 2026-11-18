import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

export interface TimestampProps extends ComponentProps<"time"> {
  dateTime: string;
}

export function Timestamp({ dateTime, children, className, ...props }: TimestampProps) {
  return (
    <time {...props} dateTime={dateTime} className={cn("text-xs tabular-nums text-muted", className)}>
      {children ?? dateTime}
    </time>
  );
}
