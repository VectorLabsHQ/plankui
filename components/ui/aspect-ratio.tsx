import * as React from "react";
import { cn } from "@/lib/cn";

export interface AspectRatioProps extends React.ComponentProps<"div"> {
  /** Width divided by height, such as 16 / 9 or 1. */
  ratio?: number;
}

/** Keeps its content at a fixed shape as the width changes. Children fill it, so images and video crop cleanly. */
export function AspectRatio({ ratio = 16 / 9, className, style, ...props }: AspectRatioProps) {
  return (
    <div
      className={cn("relative w-full overflow-hidden [&>*]:absolute [&>*]:inset-0 [&>*]:size-full [&>img]:object-cover [&>video]:object-cover", className)}
      style={{ aspectRatio: ratio, ...style }}
      {...props}
    />
  );
}
