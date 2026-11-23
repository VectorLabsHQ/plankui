import { useMemo, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon, ClockIcon, MapPinIcon, PlusIcon, UsersIcon, VideoIcon, XIcon } from "@plankui/icons";
import { AvatarGroup, Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Segmented } from "@/components/ui/segmented";
import { cn } from "@/lib/cn";

type Cal = "work" | "personal" | "team";
const calendars: { id: Cal; name: string; color: string }[] = [
  { id: "work", name: "Work", color: "var(--accent)" },
  { id: "team", name: "Team", color: "var(--chart-3)" },
  { id: "personal", name: "Personal", color: "var(--chart-5)" },
];
interface Ev { id: number; day: number; start: number; end: number; title: string; cal: Cal; where?: string; people?: string[] }
/** day: 0 is Monday. start and end are hours, halves allowed. */
const events: Ev[] = [
  { id: 1, day: 0, start: 9, end: 9.5, title: "Standup", cal: "team", where: "Video call", people: ["AK", "MR", "JL"] },
  { id: 2, day: 0, start: 11, end: 12.5, title: "Design review", cal: "work", where: "Room 3", people: ["AK", "SO"] },
  { id: 3, day: 1, start: 9, end: 9.5, title: "Standup", cal: "team", where: "Video call", people: ["AK", "MR", "JL"] },
  { id: 4, day: 1, start: 14, end: 15, title: "Interview: frontend", cal: "work", where: "Video call", people: ["AK", "TB"] },
  { id: 5, day: 2, start: 8, end: 9, title: "Run by the river", cal: "personal" },
  { id: 6, day: 2, start: 10, end: 12, title: "Roadmap planning", cal: "work", where: "Main room", people: ["AK", "MR", "SO", "TB"] },
  { id: 7, day: 2, start: 13, end: 14, title: "Lunch with Mia", cal: "personal", where: "Casa Lupa" },
  { id: 8, day: 3, start: 9, end: 9.5, title: "Standup", cal: "team", where: "Video call", people: ["AK", "MR", "JL"] },
  { id: 9, day: 3, start: 15, end: 16.5, title: "Ship the release", cal: "team", people: ["AK", "JL"] },
  { id: 10, day: 4, start: 10, end: 11, title: "One to one", cal: "work", where: "Café", people: ["AK", "MR"] },
  { id: 11, day: 4, start: 17, end: 18, title: "Climbing", cal: "personal", where: "Boulder Hall" },
];
const START = 8;
const END = 19;
const ROW = 52;
const fmt = (h: number) => `${Math.floor(h)}:${h % 1 ? "30" : "00"}`;

export default function CalendarTemplate({ hideNav = false }: { hideNav?: boolean }) {
  const [view, setView] = useState("week");
  const [on, setOn] = useState<Set<Cal>>(new Set(["work", "team", "personal"]));
  const [picked, setPicked] = useState<Ev | null>(events[5]);
  const [weekOffset, setWeekOffset] = useState(0);
  const monday = useMemo(() => {
    const d = new Date(2026, 10, 9 + weekOffset * 7);
    return d;
  }, [weekOffset]);
  const days = Array.from({ length: 5 }, (_, i) => new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + i));
  const shown = events.filter((e) => on.has(e.cal));
  const color = (c: Cal) => calendars.find((x) => x.id === c)!.color;
  const today = weekOffset === 0 ? 2 : -1;

  return (
    <div className="@container min-h-full bg-paper text-ink">
      <div className={cn("grid min-h-full", !hideNav && "@4xl:grid-cols-[264px_minmax(0,1fr)]")}>
        <aside className={cn("hidden min-w-0 grid-cols-[minmax(0,1fr)] content-start gap-5 border-r border-rule bg-paper-2 p-4 @4xl:grid", hideNav && "!hidden")}>
          <Button className="w-full"><PlusIcon /> New event</Button>
          <Calendar defaultValue={days[Math.max(0, today)]} defaultMonth={monday} className="w-full" />
          <div className="grid gap-2">
            <p className="px-1 text-xs text-muted">My calendars</p>
            {calendars.map((c) => (
              <label key={c.id} className="flex cursor-pointer items-center gap-2.5 rounded-input px-1 py-1 text-sm hover:bg-paper">
                <Checkbox
                  checked={on.has(c.id)}
                  onCheckedChange={(v) => setOn((prev) => { const n = new Set(prev); if (v) n.add(c.id); else n.delete(c.id); return n; })}
                  style={{ ["--accent" as string]: c.color }}
                />
                {c.name}
              </label>
            ))}
          </div>
        </aside>

        <main className="grid min-w-0 content-start">
          <header className="flex flex-wrap items-center justify-between gap-3 border-b border-rule px-4 py-3">
            <div className="flex items-center gap-2">
              <Button size="sm" variant="secondary" onClick={() => setWeekOffset(0)}>Today</Button>
              <Button size="icon-sm" variant="ghost" aria-label="Previous week" onClick={() => setWeekOffset((w) => w - 1)}><ChevronLeftIcon /></Button>
              <Button size="icon-sm" variant="ghost" aria-label="Next week" onClick={() => setWeekOffset((w) => w + 1)}><ChevronRightIcon /></Button>
              <h2 className="ml-1 text-lg">{monday.toLocaleDateString("en-US", { month: "long", year: "numeric" })}</h2>
            </div>
            <Segmented size="sm" aria-label="View" value={view} onValueChange={setView} options={[{ value: "day", label: "Day" }, { value: "week", label: "Week" }, { value: "month", label: "Month" }]} />
          </header>

          <div className="grid @4xl:grid-cols-[minmax(0,1fr)_240px] @6xl:grid-cols-[minmax(0,1fr)_280px]">
            <div className="overflow-x-auto">
              <div className="min-w-[560px]">
                <div className="grid grid-cols-[56px_repeat(5,minmax(0,1fr))] border-b border-rule">
                  <span />
                  {days.map((d, i) => (
                    <div key={i} className="grid justify-items-center gap-0.5 py-2 text-xs text-muted">
                      {d.toLocaleDateString("en-US", { weekday: "short" })}
                      <span className={cn("grid size-7 place-items-center rounded-full text-sm font-semibold text-ink", i === today && "bg-accent text-accent-ink")}>{d.getDate()}</span>
                    </div>
                  ))}
                </div>
                <div className="relative grid grid-cols-[56px_repeat(5,minmax(0,1fr))]" style={{ height: (END - START) * ROW }}>
                  <div className="relative">
                    {Array.from({ length: END - START }, (_, i) => (
                      <span key={i} className="absolute right-2 -translate-y-1/2 text-[11px] tabular-nums text-muted" style={{ top: i * ROW }}>{i ? `${START + i}:00` : ""}</span>
                    ))}
                  </div>
                  {days.map((_, d) => (
                    <div key={d} className={cn("relative border-l border-rule", d === today && "bg-accent/[0.03]")}>
                      {Array.from({ length: END - START }, (_, i) => <span key={i} aria-hidden className="absolute inset-x-0 border-t border-rule/70" style={{ top: i * ROW }} />)}
                      {shown.filter((e) => e.day === d).map((e) => (
                        <button
                          key={e.id}
                          type="button"
                          onClick={() => setPicked(e)}
                          className={cn(
                            "absolute inset-x-1 grid content-start overflow-hidden rounded-input border-l-[3px] px-2 py-1 text-left text-xs transition-[box-shadow] duration-[var(--dur-micro)]",
                            "focus-visible:outline-2 focus-visible:outline-focus",
                            picked?.id === e.id && "shadow-[0_0_0_2px_var(--ring)]",
                          )}
                          style={{ top: (e.start - START) * ROW + 2, height: (e.end - e.start) * ROW - 4, borderColor: color(e.cal), background: `color-mix(in oklab, ${color(e.cal)} 14%, var(--paper))` }}
                        >
                          <span className={cn("font-medium text-ink", e.end - e.start > 1 ? "line-clamp-2" : "truncate")}>{e.title}</span>
                          {e.end - e.start > 0.5 && <span className="truncate text-ink-2">{fmt(e.start)} to {fmt(e.end)}</span>}
                        </button>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <aside aria-label="Event details" className="border-t border-rule p-4 @4xl:border-l @4xl:border-t-0">
              {picked ? (
                <div className="grid gap-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="grid gap-1">
                      <span className="flex items-center gap-1.5 text-xs text-muted"><span className="size-2 rounded-full" style={{ background: color(picked.cal) }} />{calendars.find((c) => c.id === picked.cal)!.name}</span>
                      <h3 className="text-lg font-semibold leading-tight">{picked.title}</h3>
                    </div>
                    <Button size="icon-sm" variant="ghost" aria-label="Close details" onClick={() => setPicked(null)}><XIcon /></Button>
                  </div>
                  <ul className="grid gap-2.5 text-sm text-ink-2 [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-muted">
                    <li className="flex items-center gap-2.5"><ClockIcon /> {days[picked.day].toLocaleDateString("en-US", { weekday: "long", day: "numeric", month: "short" })}, {fmt(picked.start)} to {fmt(picked.end)}</li>
                    {picked.where && <li className="flex items-center gap-2.5">{picked.where === "Video call" ? <VideoIcon /> : <MapPinIcon />} {picked.where}</li>}
                    {picked.people && <li className="flex items-center gap-2.5"><UsersIcon /> {picked.people.length} people</li>}
                  </ul>
                  {picked.people && (
                    <AvatarGroup max={4}>{picked.people.map((p) => <Avatar key={p} size="sm" fallback={p} />)}</AvatarGroup>
                  )}
                  <div className="flex gap-2">
                    {picked.where === "Video call" && <Button size="sm"><VideoIcon /> Join</Button>}
                    <Button size="sm" variant="secondary">Edit</Button>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted">Pick an event to see its details.</p>
              )}
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}
