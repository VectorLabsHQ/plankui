import * as React from "react";
import { CheckIcon } from "@plankui/icons";
import { cn } from "@/lib/cn";
import { Button } from "./button";

export interface PollOption {
  id: string;
  label: string;
  /** Votes before this visitor's. */
  votes: number;
}

export interface PollCardProps {
  question: string;
  options: PollOption[];
  /** Called with the chosen option's id when the vote is sent. */
  onVote?: (id: string) => void;
  /** Show the results straight away, such as for someone who already voted. */
  voted?: string;
  /** A line under the results, such as "Closes in 2 days". */
  note?: React.ReactNode;
  className?: string;
}

/** A question with options to vote on; after voting it shows each option's share. */
export function PollCard({ question, options, onVote, voted, note, className }: PollCardProps) {
  const id = React.useId();
  const [pick, setPick] = React.useState<string | undefined>(voted);
  const [sent, setSent] = React.useState<string | undefined>(voted);
  const total = options.reduce((n, o) => n + o.votes, 0) + (sent && !voted ? 1 : 0);
  const count = (o: PollOption) => o.votes + (sent === o.id && !voted ? 1 : 0);

  return (
    <section aria-labelledby={`${id}-q`} className={cn("vx-glass grid gap-4 rounded-panel border border-card-border bg-card p-5 text-ink shadow-card", className)}>
      <h3 id={`${id}-q`} className="font-semibold leading-snug">{question}</h3>
      {sent ? (
        <ul className="grid gap-2.5" aria-label="Results">
          {options.map((o) => {
            const share = total ? Math.round((count(o) / total) * 100) : 0;
            return (
              <li key={o.id} className="relative overflow-hidden rounded-input border border-rule bg-paper px-3 py-2 text-sm">
                <span aria-hidden className={cn("absolute inset-y-0 left-0 transition-[width] duration-[var(--dur-short)]", sent === o.id ? "bg-accent-wash" : "bg-paper-3")} style={{ width: `${share}%` }} />
                <span className="relative flex items-center justify-between gap-3">
                  <span className="flex items-center gap-1.5 font-medium">{o.label}{sent === o.id && <CheckIcon className="size-3.5 text-accent-wash-ink" aria-label="Your vote" />}</span>
                  <span className="tabular-nums text-ink-2">{share}%</span>
                </span>
              </li>
            );
          })}
        </ul>
      ) : (
        <form
          className="grid gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            if (!pick) return;
            setSent(pick);
            onVote?.(pick);
          }}
        >
          <fieldset className="grid gap-2">
            <legend className="sr-only">{question}</legend>
            {options.map((o) => (
              <label key={o.id} className="flex cursor-pointer items-center gap-3 rounded-input border border-rule px-3 py-2.5 text-sm transition-colors duration-[var(--dur-micro)] hover:bg-paper-2 has-[:checked]:border-accent has-[:checked]:bg-accent-wash/50 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-focus">
                <input type="radio" name={`${id}-o`} value={o.id} checked={pick === o.id} onChange={() => setPick(o.id)} className="size-4 accent-[var(--color-accent)] outline-none" />
                {o.label}
              </label>
            ))}
          </fieldset>
          <Button type="submit" disabled={!pick} className="justify-self-start">Vote</Button>
        </form>
      )}
      <p className="text-xs text-muted">
        {total.toLocaleString()} {total === 1 ? "vote" : "votes"}{note && <> · {note}</>}
      </p>
    </section>
  );
}
