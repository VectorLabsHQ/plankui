import { useState } from "react";
import { CalendarIcon, GridIcon, ListIcon, MailIcon, MapPinIcon, PlusIcon, XIcon } from "@plankui/icons";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { SearchField } from "@/components/ui/search-field";
import { Segmented } from "@/components/ui/segmented";
import { cn } from "@/lib/cn";

type Status = "Working" | "Away" | "On leave";
interface Person { id: number; name: string; role: string; team: string; city: string; status: Status; started: string; manager: string; leave: [number, number] }
const people: Person[] = [
  { id: 1, name: "Ana Kovač", role: "Design engineer", team: "Design", city: "Zagreb", status: "Working", started: "Mar 2022", manager: "Sara Okafor", leave: [9, 25] },
  { id: 2, name: "Mateo Ruiz", role: "Backend engineer", team: "Engineering", city: "Madrid", status: "Working", started: "Jan 2021", manager: "Tom Berg", leave: [14, 25] },
  { id: 3, name: "Jun Li", role: "Product manager", team: "Product", city: "Singapore", status: "Away", started: "Aug 2023", manager: "Sara Okafor", leave: [4, 25] },
  { id: 4, name: "Sara Okafor", role: "Head of product", team: "Product", city: "Lagos", status: "Working", started: "May 2020", manager: "Mia Novak", leave: [18, 30] },
  { id: 5, name: "Tom Berg", role: "Engineering lead", team: "Engineering", city: "Oslo", status: "On leave", started: "Feb 2020", manager: "Mia Novak", leave: [22, 30] },
  { id: 6, name: "Mia Novak", role: "Chief executive", team: "Leadership", city: "Ljubljana", status: "Working", started: "Jan 2019", manager: "Board", leave: [11, 30] },
  { id: 7, name: "Priya Shah", role: "Frontend engineer", team: "Engineering", city: "Pune", status: "Working", started: "Oct 2023", manager: "Tom Berg", leave: [6, 25] },
  { id: 8, name: "Leo Duarte", role: "Brand designer", team: "Design", city: "Lisbon", status: "Away", started: "Jun 2022", manager: "Ana Kovač", leave: [12, 25] },
];
const teams = ["All", "Design", "Engineering", "Product"];
const tone: Record<Status, "success" | "warning" | "neutral"> = { Working: "success", Away: "warning", "On leave": "neutral" };
const initials = (n: string) => n.split(" ").map((w) => w[0]).join("");

/** `hideNav` drops the page header when a host page already provides one. */
export default function PeopleTemplate({ hideNav = false }: { hideNav?: boolean }) {
  const [q, setQ] = useState("");
  const [team, setTeam] = useState("All");
  const [layout, setLayout] = useState("grid");
  const [picked, setPicked] = useState<Person | null>(null);
  const shown = people.filter((p) => (team === "All" || p.team === team) && `${p.name} ${p.role} ${p.city}`.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="@container min-h-full bg-paper text-ink">
      <div className={cn("grid min-h-full", picked && "@4xl:grid-cols-[minmax(0,1fr)_320px]")}>
        <main className="grid content-start gap-4 p-4 @xl:p-6">
          {!hideNav && (
            <header className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-xl">People</h2>
                <p className="text-sm text-muted">{people.length} people across {teams.length - 1} teams.</p>
              </div>
              <Button size="sm"><PlusIcon /> Invite</Button>
            </header>
          )}
          <div className="flex flex-wrap items-center gap-2">
            <SearchField value={q} onValueChange={setQ} placeholder="Search by name, role or city" aria-label="Search people" className="min-w-[220px] flex-1 @3xl:max-w-sm" />
            <Segmented size="sm" aria-label="Team" value={team} onValueChange={setTeam} options={teams.map((t) => ({ value: t, label: t }))} />
            <Segmented size="sm" aria-label="Layout" className="ml-auto" value={layout} onValueChange={setLayout} options={[{ value: "grid", label: <GridIcon className="size-4" aria-label="Grid" /> }, { value: "list", label: <ListIcon className="size-4" aria-label="List" /> }]} />
          </div>

          {shown.length === 0 ? (
            <p className="rounded-card border border-dashed border-rule-2 p-8 text-center text-sm text-muted">No one matches “{q}”.</p>
          ) : layout === "grid" ? (
            <ul className="grid gap-3 @lg:grid-cols-2 @3xl:grid-cols-3 @5xl:grid-cols-4">
              {shown.map((p) => (
                <li key={p.id}>
                  <button
                    type="button"
                    onClick={() => setPicked(p)}
                    className={cn(
                      "vx-glass grid w-full justify-items-center gap-3 rounded-panel border border-card-border bg-card p-5 text-center shadow-card transition-[border-color,transform] duration-[var(--dur-micro)] hover:-translate-y-0.5 hover:border-rule-2 focus-visible:outline-2 focus-visible:outline-focus",
                      picked?.id === p.id && "border-accent",
                    )}
                  >
                    <Avatar size="lg" fallback={initials(p.name)} status={p.status === "Working" ? "online" : p.status === "Away" ? "away" : "offline"} />
                    <span className="grid gap-0.5">
                      <span className="font-semibold">{p.name}</span>
                      <span className="text-sm text-muted">{p.role}</span>
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted"><MapPinIcon className="size-3.5" /> {p.city}</span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="overflow-x-auto rounded-panel border border-card-border bg-card shadow-card">
              <table className="w-full min-w-[560px] text-left text-sm">
                <thead className="text-muted"><tr className="border-b border-rule"><th className="px-4 py-2.5 font-medium">Name</th><th className="px-4 py-2.5 font-medium">Team</th><th className="px-4 py-2.5 font-medium">City</th><th className="px-4 py-2.5 font-medium">Status</th></tr></thead>
                <tbody className="divide-y divide-rule">
                  {shown.map((p) => (
                    <tr key={p.id} className={cn("cursor-pointer hover:bg-paper-2", picked?.id === p.id && "bg-paper-2")} onClick={() => setPicked(p)}>
                      <td className="px-4 py-2.5">
                        <button type="button" onClick={() => setPicked(p)} className="flex items-center gap-2.5 text-left focus-visible:outline-2 focus-visible:outline-focus">
                          <Avatar size="sm" fallback={initials(p.name)} />
                          <span className="grid"><span className="font-medium">{p.name}</span><span className="text-xs text-muted">{p.role}</span></span>
                        </button>
                      </td>
                      <td className="px-4 py-2.5 text-ink-2">{p.team}</td>
                      <td className="px-4 py-2.5 text-ink-2">{p.city}</td>
                      <td className="px-4 py-2.5"><Badge variant={tone[p.status]}>{p.status}</Badge></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>

        {picked && (
          <aside aria-label={`${picked.name}'s profile`} className="grid min-w-0 grid-cols-[minmax(0,1fr)] content-start gap-5 border-t border-rule bg-paper-2 p-5 @4xl:border-l @4xl:border-t-0">
            <div className="flex items-start justify-between">
              <Avatar size="lg" fallback={initials(picked.name)} />
              <Button size="icon-sm" variant="ghost" aria-label="Close profile" onClick={() => setPicked(null)}><XIcon /></Button>
            </div>
            <div className="grid gap-1">
              <h3 className="text-lg font-semibold">{picked.name}</h3>
              <p className="text-sm text-muted">{picked.role}, {picked.team}</p>
              <Badge variant={tone[picked.status]} className="mt-1 justify-self-start">{picked.status}</Badge>
            </div>
            <dl className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 gap-y-2 text-sm">
              <dt className="text-muted">Manager</dt><dd>{picked.manager}</dd>
              <dt className="text-muted">Location</dt><dd>{picked.city}</dd>
              <dt className="text-muted">Started</dt><dd>{picked.started}</dd>
            </dl>
            <div className="grid gap-2 rounded-card border border-card-border bg-card p-4 shadow-card">
              <div className="flex items-baseline justify-between text-sm"><span className="font-medium">Time off used</span><span className="tabular-nums text-muted">{picked.leave[0]} of {picked.leave[1]} days</span></div>
              <Progress value={(picked.leave[0] / picked.leave[1]) * 100} aria-label="Time off used" />
            </div>
            <div className="flex gap-2">
              <Button size="sm"><MailIcon /> Message</Button>
              <Button size="sm" variant="secondary"><CalendarIcon /> Book a meeting</Button>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
