import * as React from "react";
import { PauseIcon, PlayIcon, RefreshIcon } from "@plankui/icons";
import { cn } from "@/lib/cn";
import { Button } from "./button";

export interface TimerProps {
  /** Count down from this many seconds. Leave out to count up like a stopwatch. */
  duration?: number;
  /** Start running as soon as it mounts. */
  autoStart?: boolean;
  /** Called once when a countdown reaches zero. */
  onComplete?: () => void;
  /** Show start, pause and reset buttons. */
  controls?: boolean;
  label?: string;
  className?: string;
}

const pad = (n: number) => String(n).padStart(2, "0");
/** 75 → "01:15", 3725 → "1:02:05". */
export function formatTime(total: number) {
  const s = Math.max(0, Math.round(total));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  return h ? `${h}:${pad(m)}:${pad(s % 60)}` : `${pad(m)}:${pad(s % 60)}`;
}

/** A countdown or stopwatch with tabular digits and optional controls. */
export function Timer({ duration, autoStart = false, onComplete, controls = true, label = duration ? "Countdown" : "Stopwatch", className }: TimerProps) {
  const [elapsed, setElapsed] = React.useState(0);
  const [running, setRunning] = React.useState(autoStart);
  const done = duration !== undefined && elapsed >= duration;
  const complete = React.useRef(onComplete);
  complete.current = onComplete;

  React.useEffect(() => {
    if (!running) return;
    // Count from wall-clock time so a busy tab or a slow interval never drifts.
    const start = performance.now() - elapsed * 1000;
    const id = window.setInterval(() => {
      const next = (performance.now() - start) / 1000;
      if (duration !== undefined && next >= duration) {
        setElapsed(duration);
        setRunning(false);
        complete.current?.();
      } else setElapsed(next);
    }, 250);
    return () => window.clearInterval(id);
    // elapsed is read once when the timer starts, on purpose.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, duration]);

  const shown = duration !== undefined ? Math.ceil(duration - elapsed) : Math.floor(elapsed);
  return (
    <div role="timer" aria-label={label} className={cn("inline-flex items-center gap-3", className)}>
      <span className={cn("font-display text-2xl font-semibold tabular-nums text-ink", done && "text-accent")}>{formatTime(shown)}</span>
      {controls && (
        <span className="flex gap-1.5">
          <Button size="icon-sm" variant={running ? "secondary" : "primary"} aria-label={running ? "Pause" : done ? "Restart" : "Start"} onClick={() => {
            if (done) setElapsed(0);
            setRunning((r) => !r);
          }}>
            {running ? <PauseIcon /> : <PlayIcon />}
          </Button>
          <Button size="icon-sm" variant="ghost" aria-label="Reset" disabled={!elapsed} onClick={() => { setRunning(false); setElapsed(0); }}>
            <RefreshIcon />
          </Button>
        </span>
      )}
    </div>
  );
}
