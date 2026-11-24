import * as React from "react";
import { cn } from "@/lib/cn";
import { Avatar } from "./avatar";
import { Button } from "./button";
import { Textarea } from "./textarea";

export interface Comment {
  id: string | number;
  author: string;
  avatar?: string;
  dateTime: string;
  time: string;
  body: React.ReactNode;
}

export interface CommentThreadProps {
  comments: Comment[];
  /** Who is writing, for the box's avatar. */
  me: { name: string; avatar?: string };
  /** Called with the new comment's text; clear happens on success. */
  onPost?: (text: string) => void | Promise<void>;
  className?: string;
}

const initials = (n: string) => n.split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase();

/** A thread of comments with a box to add one. Enter with ⌘ or Ctrl posts. */
export function CommentThread({ comments, me, onPost, className }: CommentThreadProps) {
  const id = React.useId();
  const [text, setText] = React.useState("");
  const [busy, setBusy] = React.useState(false);
  const post = async () => {
    const t = text.trim();
    if (!t || busy) return;
    setBusy(true);
    try {
      await onPost?.(t);
      setText("");
    } finally {
      setBusy(false);
    }
  };
  return (
    <section aria-label="Comments" className={cn("grid gap-5", className)}>
      <ul className="grid gap-4">
        {comments.map((c) => (
          <li key={c.id} className="grid grid-cols-[auto_minmax(0,1fr)] gap-3">
            <Avatar size="sm" src={c.avatar} alt="" fallback={initials(c.author)} />
            <div className="grid gap-1">
              <p className="text-sm">
                <span className="font-medium text-ink">{c.author}</span>
                <time dateTime={c.dateTime} className="ml-2 text-xs text-muted">{c.time}</time>
              </p>
              <div className="text-sm leading-relaxed text-ink-2">{c.body}</div>
            </div>
          </li>
        ))}
      </ul>
      <form
        className="grid grid-cols-[auto_minmax(0,1fr)] gap-3"
        onSubmit={(e) => {
          e.preventDefault();
          post();
        }}
      >
        <Avatar size="sm" src={me.avatar} alt="" fallback={initials(me.name)} />
        <div className="grid gap-2">
          <label htmlFor={`${id}-c`} className="sr-only">Add a comment</label>
          <Textarea
            id={`${id}-c`}
            rows={2}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                post();
              }
            }}
            placeholder="Add a comment"
          />
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs text-muted">⌘ Enter to post</span>
            <Button type="submit" size="sm" disabled={!text.trim() || busy}>{busy ? "Posting" : "Comment"}</Button>
          </div>
        </div>
      </form>
    </section>
  );
}
