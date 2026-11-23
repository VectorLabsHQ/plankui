import * as React from "react";
import { cn } from "@/lib/cn";

export interface TextRotateProps {
  /** Shown one at a time, in order, then from the start again. */
  words: string[];
  /** Milliseconds each word stays. */
  interval?: number;
  /** Show this word instead of running the timer, such as to follow a picker. */
  index?: number;
  className?: string;
}

/**
 * Swaps one word in a sentence on a timer, each new word rising into place.
 * It pauses while hovered, screen readers get every word once (or just the chosen one when `index` is set), and with reduced motion it shows the first word only.
 */
export function TextRotate({ words, interval = 2400, index, className }: TextRotateProps) {
  const [own, setI] = React.useState(0);
  const i = index ?? own;
  const [paused, setPaused] = React.useState(false);

  React.useEffect(() => {
    if (index !== undefined || paused || words.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setI((n) => (n + 1) % words.length), interval);
    return () => window.clearInterval(id);
  }, [index, paused, words.length, interval]);

  return (
    <span
      className={cn("relative inline-grid align-bottom", className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <span className="sr-only">{index === undefined ? words.join(", ") : words[i]}</span>
      {/* Every word sits in the same grid cell, so the width fits the longest and nothing around it jumps. */}
      {words.map((w) => (
        <span key={w} aria-hidden className="invisible col-start-1 row-start-1 whitespace-nowrap">{w}</span>
      ))}
      <span key={i} aria-hidden className="col-start-1 row-start-1 whitespace-nowrap animate-[vx-word-in_var(--dur-short)_var(--ease-out)]">
        {words[i]}
      </span>
    </span>
  );
}
