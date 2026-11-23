import { useState } from "react";
import { BookIcon, ClockIcon } from "@plankui/icons";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { SearchField } from "@/components/ui/search-field";
import { Segmented } from "@/components/ui/segmented";

type Topic = "Design" | "Engineering" | "Product";
interface Guide { id: number; title: string; summary: string; topic: Topic; minutes: number; author: string }
const guides: Guide[] = [
  { id: 1, title: "Picking a type scale", summary: "Five sizes cover almost every screen. How to choose them and when to break the rule.", topic: "Design", minutes: 6, author: "Ana Kovač" },
  { id: 2, title: "Forms people finish", summary: "Labels, errors and the order of fields, tested on a real checkout.", topic: "Design", minutes: 9, author: "Leo Duarte" },
  { id: 3, title: "Shipping behind flags", summary: "Release to five percent, watch, then widen. A setup that fits a small team.", topic: "Engineering", minutes: 7, author: "Mateo Ruiz" },
  { id: 4, title: "Fast lists in React", summary: "When to virtualise, when to paginate, and the cost of each.", topic: "Engineering", minutes: 11, author: "Priya Shah" },
  { id: 5, title: "Writing a one-page spec", summary: "The problem, who has it, what done looks like. Everything else is optional.", topic: "Product", minutes: 5, author: "Jun Li" },
  { id: 6, title: "Reading your funnel", summary: "Which drop-offs matter and which are noise, with three real examples.", topic: "Product", minutes: 8, author: "Sara Okafor" },
  { id: 7, title: "Dark mode without regret", summary: "Tokens first, then contrast checks, then the images nobody remembers.", topic: "Design", minutes: 7, author: "Ana Kovač" },
  { id: 8, title: "Errors users can act on", summary: "Say what happened, why, and the one thing to do next.", topic: "Engineering", minutes: 4, author: "Tom Berg" },
];
const tone: Record<Topic, "accent" | "success" | "warning"> = { Design: "accent", Engineering: "success", Product: "warning" };
const initials = (n: string) => n.split(" ").map((w) => w[0]).join("");

/** `hideNav` drops the page header when a host page already provides one. */
export default function CardGridTemplate({ hideNav = false }: { hideNav?: boolean }) {
  const [q, setQ] = useState("");
  const [topic, setTopic] = useState("All");
  const shown = guides.filter((g) => (topic === "All" || g.topic === topic) && `${g.title} ${g.summary} ${g.author}`.toLowerCase().includes(q.toLowerCase()));
  const reset = () => { setQ(""); setTopic("All"); };

  return (
    <div className="@container min-h-full bg-paper text-ink">
      <main className="mx-auto grid max-w-6xl content-start gap-5 p-4 @xl:p-6">
        {!hideNav && (
          <header className="grid gap-1">
            <h2 className="text-xl">Guides</h2>
            <p className="text-sm text-muted">Short reads from the team, {guides.length} so far.</p>
          </header>
        )}
        <div className="flex flex-wrap items-center gap-2">
          <SearchField value={q} onValueChange={setQ} shortcut="/" placeholder="Search guides" aria-label="Search guides" className="min-w-[220px] flex-1 @3xl:max-w-sm" />
          <Segmented size="sm" aria-label="Topic" value={topic} onValueChange={setTopic} options={["All", "Design", "Engineering", "Product"].map((t) => ({ value: t, label: t }))} />
        </div>
        <p aria-live="polite" className="sr-only">{shown.length} guides shown</p>

        {shown.length === 0 ? (
          <EmptyState
            icon={<BookIcon />}
            title="No guides match"
            description={q ? `Nothing for “${q}”${topic === "All" ? "" : ` in ${topic}`}. Try a shorter word.` : `No ${topic.toLowerCase()} guides yet.`}
            action={<Button variant="secondary" size="sm" onClick={reset}>Clear search and filter</Button>}
            className="py-14"
          />
        ) : (
          <ul className="grid gap-3 @lg:grid-cols-2 @4xl:grid-cols-3">
            {shown.map((g) => (
              <li key={g.id}>
                <a
                  href={`#guide-${g.id}`}
                  className="vx-glass grid h-full content-start gap-3 rounded-panel border border-card-border bg-card p-5 text-ink no-underline shadow-card transition-[border-color,transform] duration-[var(--dur-micro)] hover:-translate-y-0.5 hover:border-rule-2 focus-visible:outline-2 focus-visible:outline-focus"
                >
                  <Badge variant={tone[g.topic]} className="w-fit">{g.topic}</Badge>
                  <span className="grid gap-1.5">
                    <span className="text-lg font-semibold leading-snug">{g.title}</span>
                    <span className="text-sm text-muted">{g.summary}</span>
                  </span>
                  <span className="mt-auto flex items-center justify-between gap-2 pt-2 text-sm text-ink-2">
                    <span className="flex items-center gap-2"><Avatar size="xs" fallback={initials(g.author)} /> {g.author}</span>
                    <span className="flex items-center gap-1 text-muted"><ClockIcon className="size-3.5" /> {g.minutes} min</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
