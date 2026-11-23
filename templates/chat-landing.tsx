import { useEffect, useRef, useState } from "react";
import { ArrowUpIcon, BarChartIcon, FileTextIcon, LightbulbIcon, MailIcon, PlusIcon } from "@plankui/icons";
import { Button } from "@/components/ui/button";
import { ChatMessage } from "@/components/ui/chat-message";
import { Citation } from "@/components/ui/citation";
import { IconButton } from "@/components/ui/icon-button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/cn";

const suggestions = [
  { icon: FileTextIcon, text: "Summarise this week's release notes" },
  { icon: MailIcon, text: "Draft a reply to a late invoice" },
  { icon: BarChartIcon, text: "Explain last month's churn" },
  { icon: LightbulbIcon, text: "Ideas for an onboarding email" },
];

interface Turn { id: number; who: "you" | "assistant"; text: string }
// A canned reply so the template runs without a model; swap `reply` for your own API call.
const reply = (q: string) => `Here is a first pass at “${q.toLowerCase()}”. I kept it short so you can edit it, and linked the sources I used.`;

/** `hideNav` drops the page header when a host page already provides one. */
export default function ChatLandingTemplate({ hideNav = false }: { hideNav?: boolean }) {
  const [draft, setDraft] = useState("");
  const [turns, setTurns] = useState<Turn[]>([]);
  const [thinking, setThinking] = useState(false);
  const end = useRef<HTMLDivElement>(null);
  useEffect(() => {
    end.current?.scrollIntoView({ block: "end" });
  }, [turns.length, thinking]);

  const send = (text: string) => {
    const q = text.trim();
    if (!q || thinking) return;
    setTurns((t) => [...t, { id: Date.now(), who: "you", text: q }]);
    setDraft("");
    setThinking(true);
    window.setTimeout(() => {
      setTurns((t) => [...t, { id: Date.now() + 1, who: "assistant", text: reply(q) }]);
      setThinking(false);
    }, 900);
  };

  const empty = turns.length === 0;
  return (
    <div className="@container flex min-h-full flex-col bg-paper text-ink">
      {!hideNav && (
        <header className="flex items-center justify-between gap-3 px-4 py-3">
          <span className="font-semibold">Assistant</span>
          <Button variant="ghost" size="sm" disabled={empty} onClick={() => setTurns([])}><PlusIcon /> New chat</Button>
        </header>
      )}
      <main className={cn("mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 px-4 pb-4", empty ? "justify-center" : "justify-end pt-4")}>
        {empty ? (
          <div className="grid gap-6 text-center">
            <h2 className="text-[clamp(1.6rem,4cqi,2.4rem)] leading-tight">What can I help with?</h2>
            <ul className="grid gap-2 text-left @lg:grid-cols-2">
              {suggestions.map(({ icon: Icon, text }) => (
                <li key={text}>
                  <button
                    type="button"
                    onClick={() => send(text)}
                    className="flex h-full w-full items-start gap-2.5 rounded-card border border-rule bg-paper p-3 text-sm text-ink-2 transition-[border-color,color] duration-[var(--dur-micro)] hover:border-rule-2 hover:text-ink focus-visible:outline-2 focus-visible:outline-focus"
                  >
                    <Icon className="mt-0.5 size-4 shrink-0 text-accent" /> {text}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div aria-live="polite" className="grid gap-3">
            {turns.map((t) =>
              t.who === "you" ? (
                <ChatMessage key={t.id} author="You" side="end">{t.text}</ChatMessage>
              ) : (
                <ChatMessage key={t.id} author="Assistant">
                  {t.text}
                  <Citation index={1} title="Release notes, week 47" href="https://example.com/notes" snippet="Three fixes and one new export option." />
                </ChatMessage>
              ),
            )}
            {thinking && <p className="text-sm text-muted">Writing a reply…</p>}
            <div ref={end} />
          </div>
        )}

        <form
          onSubmit={(e) => { e.preventDefault(); send(draft); }}
          className="vx-glass grid gap-2 rounded-panel border border-field-border bg-field p-2 shadow-field focus-within:border-accent"
        >
          <Textarea
            aria-label="Message"
            rows={2}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(draft); } }}
            placeholder="Ask anything. Enter sends, Shift+Enter adds a line."
            className="min-h-0 resize-none border-0 bg-transparent shadow-none focus-visible:outline-none"
          />
          <div className="flex items-center justify-between gap-2">
            <span className="px-2 text-xs text-muted">Answers can be wrong. Check the sources.</span>
            <IconButton label="Send" type="submit" variant="primary" size="icon-sm" icon={<ArrowUpIcon />} disabled={!draft.trim() || thinking} />
          </div>
        </form>
      </main>
    </div>
  );
}
