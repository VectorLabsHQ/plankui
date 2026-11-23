import * as React from "react";
import { cn } from "@/lib/cn";

export interface TypewriterProps {
  /** Typed one after another; the last one stays when `loop` is off. */
  words: string[];
  /** Milliseconds per typed letter. Deleting runs twice as fast. */
  speed?: number;
  /** How long a finished word stays before it is deleted. */
  pause?: number;
  loop?: boolean;
  /** Show the blinking caret. */
  caret?: boolean;
  /** Called with the index of the word on screen, such as to copy it. */
  onWordChange?: (index: number) => void;
  className?: string;
  caretClassName?: string;
}

/**
 * Types words letter by letter, deletes them and types the next.
 * Screen readers get the first word as plain text; with reduced motion it shows the first word and stops.
 */
export function Typewriter({ words, speed = 70, pause = 1600, loop = true, caret = true, onWordChange, className, caretClassName }: TypewriterProps) {
  const [index, setIndex] = React.useState(0);
  const [shown, setShown] = React.useState(words[0] ?? "");
  const [still, setStill] = React.useState(true);
  const report = React.useRef(onWordChange);
  report.current = onWordChange;

  // Keyed on the words themselves, so a parent passing a new array with the same words does not restart it.
  const key = words.join("\u0000");
  React.useEffect(() => {
    if (words.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setStill(false);
    // Start with the first word typed out, wait, then delete it and type the next.
    let i = 0;
    let n = words[0].length;
    let phase: "type" | "delete" = "delete";
    let timer = window.setTimeout(function tick() {
      let delay = speed;
      if (phase === "delete") {
        n -= 1;
        delay = speed / 2;
        if (n <= 0) {
          i = (i + 1) % words.length;
          phase = "type";
          setIndex(i);
          report.current?.(i);
        }
      } else {
        n += 1;
        if (n >= words[i].length) {
          setShown(words[i]);
          if (!loop && i === words.length - 1) return;
          phase = "delete";
          delay = pause;
        }
      }
      setShown(words[i].slice(0, Math.max(0, n)));
      timer = window.setTimeout(tick, delay);
    }, pause);
    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, speed, pause, loop]);

  return (
    <span className={cn("inline-flex items-baseline", className)}>
      <span className="sr-only">{words[index]}</span>
      <span aria-hidden className="whitespace-pre">{shown}</span>
      {caret && (
        <span
          aria-hidden
          className={cn("ml-px inline-block h-[1.1em] w-[2px] translate-y-[0.15em] self-start bg-current", !still && "animate-[vx-blink_1s_steps(1)_infinite]", caretClassName)}
        />
      )}
    </span>
  );
}
