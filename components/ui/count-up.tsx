import * as React from "react";

export interface CountUpProps {
  value: number;
  /** Milliseconds for the climb. */
  duration?: number;
  /** Format each frame, e.g. (n) => `$${n.toFixed(0)}`. */
  format?: (n: number) => string;
  className?: string;
}

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

/** A number that counts from its previous value to the new one. Static under reduced motion. */
export function CountUp({ value, duration = 900, format = (n) => Math.round(n).toLocaleString(), className }: CountUpProps) {
  const [shown, setShown] = React.useState(value);
  const from = React.useRef(0);
  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(value);
      from.current = value;
      return;
    }
    const start = performance.now();
    const a = from.current;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setShown(a + (value - a) * easeOut(t));
      if (t < 1) raf = requestAnimationFrame(tick);
      else from.current = value;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);
  return <span className={className} style={{ fontVariantNumeric: "tabular-nums" }}>{format(shown)}</span>;
}
