/*
 * PlankUI Icons, drawn by Vector Labs for PlankUI. MIT licence.
 *
 * Every icon is drawn on a 24 x 24 grid as strokes only (no fills), so one stroke width, round caps and
 * round joins carry the whole set. House rules, so new icons match:
 *   - Live area 3..21. Containers are soft: squares are 16.5 wide with a 4.5 radius (R(3.75, 3.75, 16.5, 16.5, 4.5)),
 *     circles are r 8.75 on the centre, cards and screens use a 2.5 to 3.5 radius.
 *   - Arrowheads and chevrons open at 90 degrees with 5.5 long arms.
 *   - Dots are tiny stroked circles (dot()), so they grow with the stroke width.
 *   - Details inside a container keep at least 2.5 units from its edge.
 *
 * Each entry: [name, category, search words, shapes]. A shape is a path string or a helper object.
 */

const n = (v) => +v.toFixed(2);

/** A circle. */
export const C = (cx, cy, r) => ({ t: "circle", a: { cx, cy, r } });
/** A rounded rectangle. */
export const R = (x, y, width, height, rx = 0) => ({ t: "rect", a: rx ? { x, y, width, height, rx } : { x, y, width, height } });
/** A dot: a tiny circle that takes its size from the stroke. */
export const dot = (cx, cy) => ({ t: "circle", a: { cx, cy, r: 0.5 } });
/** An ellipse, optionally turned about its centre. */
export const E = (cx, cy, rx, ry, turn = 0) => ({ t: "ellipse", a: turn ? { cx, cy, rx, ry, transform: `rotate(${turn} ${cx} ${cy})` } : { cx, cy, rx, ry } });

/** A gear with flat, softly joined teeth. */
function gear(cx, cy, outer, inner, teeth) {
  const step = (Math.PI * 2) / teeth;
  const pts = [];
  for (let i = 0; i < teeth; i++) {
    const a = i * step - Math.PI / 2;
    for (const [r, o] of [[inner, -0.5], [inner, -0.3], [outer, -0.18], [outer, 0.18], [inner, 0.3]]) {
      pts.push(`${n(cx + r * Math.cos(a + o * step))} ${n(cy + r * Math.sin(a + o * step))}`);
    }
  }
  return `M${pts.join("L")}z`;
}

/** A star; round joins soften its points. */
function star(cx, cy, outer, inner, points = 5) {
  const pts = [];
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 ? inner : outer;
    const a = -Math.PI / 2 + (Math.PI / points) * i;
    pts.push(`${n(cx + r * Math.cos(a))} ${n(cy + r * Math.sin(a))}`);
  }
  return `M${pts.join("L")}z`;
}

/** A circle broken into short arcs. */
function dashedCircle(cx, cy, r, parts = 8, gap = 0.42) {
  const step = (Math.PI * 2) / parts;
  const out = [];
  for (let i = 0; i < parts; i++) {
    const a0 = i * step - Math.PI / 2 + gap / 2;
    const a1 = (i + 1) * step - Math.PI / 2 - gap / 2;
    out.push(`M${n(cx + r * Math.cos(a0))} ${n(cy + r * Math.sin(a0))}A${r} ${r} 0 0 1 ${n(cx + r * Math.cos(a1))} ${n(cy + r * Math.sin(a1))}`);
  }
  return out.join("");
}

/* Shared parts. */
const SQ = R(3.75, 3.75, 16.5, 16.5, 4.5);
const RING = C(12, 12, 8.75);
const FILE = "M13.75 3.5H7.5A2.5 2.5 0 0 0 5 6v12a2.5 2.5 0 0 0 2.5 2.5h9A2.5 2.5 0 0 0 19 18V8.75z";
const FILE_FOLD = "M13.75 3.5v3.75a1.5 1.5 0 0 0 1.5 1.5H19";
const FOLDER = "M3.75 7.25a2.5 2.5 0 0 1 2.5-2.5h3.1a2 2 0 0 1 1.5.68l1.25 1.42a2 2 0 0 0 1.5.68h4.15a2.5 2.5 0 0 1 2.5 2.5v7.22a2.5 2.5 0 0 1-2.5 2.5H6.25a2.5 2.5 0 0 1-2.5-2.5z";
const AXIS = "M4 4v14.25A1.75 1.75 0 0 0 5.75 20H20";
const TRAY = "M4.5 15.5v1.5a3 3 0 0 0 3 3h9a3 3 0 0 0 3-3v-1.5";
const BELL = "M6 16.5V11a6 6 0 0 1 12 0v5.5l1.5 2h-15z";
const BELL_TONGUE = "M9.75 20.75a2.5 2.5 0 0 0 4.5 0";
const EYE = "M2.75 12C4.6 8 8 5.75 12 5.75S19.4 8 21.25 12C19.4 16 16 18.25 12 18.25S4.6 16 2.75 12z";
const CLOUD = "M7 18.5a4 4 0 0 1-.6-7.95A5.75 5.75 0 0 1 17.6 9.3 4.6 4.6 0 0 1 17 18.5z";
const CLOUD_OPEN = "M8.5 18.5H7a4 4 0 0 1-.6-7.95A5.75 5.75 0 0 1 17.6 9.3 4.6 4.6 0 0 1 17 18.5h-1.5";
const MAG = C(10.75, 10.75, 6.25);
const MAG_HANDLE = "m15.4 15.4 4.6 4.6";
const LOCK_BODY = R(4.75, 10.5, 14.5, 10, 3);
const CHAT = "M4 7a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v7.5a3 3 0 0 1-3 3H9l-5 3.5z";
const CAL = [R(3.75, 5, 16.5, 15.5, 4), "M8 3v4M16 3v4M3.75 10h16.5"];
const PERSON = [C(12, 8, 3.75), "M5 20a7 7 0 0 1 14 0"];
const PERSON_L = [C(10, 8, 3.75), "M3 20a7 7 0 0 1 14 0"];
const SHIELD = "M12 3.5l7 2.6v5.4c0 4.45-2.9 7.9-7 9.25-4.1-1.35-7-4.8-7-9.25V6.1z";
const SPEAKER = "M4 9.5v5a1 1 0 0 0 1 1h2.5l4.25 3.5a.75.75 0 0 0 1.25-.6V5.6a.75.75 0 0 0-1.25-.6L7.5 8.5H5a1 1 0 0 0-1 1z";
const MIC = [R(9, 3.5, 6, 11, 3), "M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5v3"];

const CLIP = ["M8.5 4.75H8a3 3 0 0 0-3 3V18a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V7.75a3 3 0 0 0-3-3h-.5", R(8.5, 3, 7, 3.5, 1.25)];
const CLOUD_S = "M7 16a4 4 0 0 1-.6-7.95A5.75 5.75 0 0 1 17.6 6.8 4.6 4.6 0 0 1 17 16z";
const TAG = "M3.75 5.75a2 2 0 0 1 2-2h5.4a2 2 0 0 1 1.42.59l7.5 7.5a2 2 0 0 1 0 2.83l-5.4 5.4a2 2 0 0 1-2.83 0l-7.5-7.5a2 2 0 0 1-.59-1.42z";
const BOOK = "M12 6.5c-1.6-1.3-3.8-2-6.5-2H4.25a.75.75 0 0 0-.75.75v12c0 .41.34.75.75.75H6c2.4 0 4.4.6 6 1.75 1.6-1.15 3.6-1.75 6-1.75h1.75a.75.75 0 0 0 .75-.75v-12a.75.75 0 0 0-.75-.75H18.5c-2.7 0-4.9.7-6.5 2z";
const PHONE = "M8.6 4.1 6.4 3.9A2 2 0 0 0 4.3 5.6c-.6 7.4 6.7 14.7 14.1 14.1a2 2 0 0 0 1.7-2.1l-.2-2.2a1.5 1.5 0 0 0-1.1-1.3l-2.6-.7a1.5 1.5 0 0 0-1.5.4l-1.2 1.2a12 12 0 0 1-4.8-4.8l1.2-1.2a1.5 1.5 0 0 0 .4-1.5l-.7-2.6a1.5 1.5 0 0 0-1.3-1.1z";
/** A soft wave across the grid at height y. */
const wave = (y) => `M3 ${y}c1.5 0 2.25-1.5 4.5-1.5s3 1.5 4.5 1.5 2.25-1.5 4.5-1.5 3 1.5 4.5 1.5`;

export const categories = ["Arrows", "Interface", "Status", "Users", "Text", "Files", "Communication", "Media", "Devices", "Charts", "Commerce", "Development", "Places", "Nature"];

export const icons = [
  /* ───── Arrows ───── */
  ["arrow-right", "Arrows", "next forward go", ["M5 12h14", "m13.5 6.5 5.5 5.5-5.5 5.5"]],
  ["arrow-left", "Arrows", "back previous return", ["M19 12H5", "M10.5 6.5 5 12l5.5 5.5"]],
  ["arrow-up", "Arrows", "top rise increase", ["M12 19V5", "M6.5 10.5 12 5l5.5 5.5"]],
  ["arrow-down", "Arrows", "bottom fall decrease", ["M12 5v14", "m6.5 13.5 5.5 5.5 5.5-5.5"]],
  ["arrow-up-right", "Arrows", "external diagonal open", ["M7 17 17 7", "M8.5 7H17v8.5"]],
  ["arrow-up-left", "Arrows", "diagonal", ["M17 17 7 7", "M7 15.5V7h8.5"]],
  ["arrow-down-right", "Arrows", "diagonal", ["M7 7l10 10", "M17 8.5V17H8.5"]],
  ["arrow-down-left", "Arrows", "diagonal incoming received", ["M17 7 7 17", "M15.5 17H7V8.5"]],
  ["arrow-up-down", "Arrows", "sort order swap", ["M8 4.75v14.5", "M4.75 8 8 4.75 11.25 8", "M16 19.25V4.75", "m12.75 16 3.25 3.25L19.25 16"]],
  ["arrow-left-right", "Arrows", "swap exchange transfer", ["M4.75 8h14.5", "M16 4.75 19.25 8 16 11.25", "M19.25 16H4.75", "M8 12.75 4.75 16 8 19.25"]],
  ["chevron-right", "Arrows", "next caret expand", ["m9.5 6.5 5.5 5.5-5.5 5.5"]],
  ["chevron-left", "Arrows", "back previous caret", ["M14.5 6.5 9 12l5.5 5.5"]],
  ["chevron-up", "Arrows", "collapse caret", ["M6.5 14.5 12 9l5.5 5.5"]],
  ["chevron-down", "Arrows", "expand caret dropdown", ["m6.5 9.5 5.5 5.5 5.5-5.5"]],
  ["chevrons-up-down", "Arrows", "select sort expand", ["m8 9 4-4 4 4", "m8 15 4 4 4-4"]],
  ["chevrons-right", "Arrows", "last skip forward", ["m6 7 5 5-5 5", "m13 7 5 5-5 5"]],
  ["chevrons-left", "Arrows", "first skip back", ["m11 7-5 5 5 5", "m18 7-5 5 5 5"]],
  ["undo", "Arrows", "rotate counterclockwise back reset", ["M4.5 12A7.5 7.5 0 1 0 6.7 6.7L4.5 9", "M4.5 4.75V9h4.25"]],
  ["redo", "Arrows", "rotate clockwise forward", ["M19.5 12a7.5 7.5 0 1 1-2.2-5.3L19.5 9", "M19.5 4.75V9h-4.25"]],
  ["refresh", "Arrows", "reload sync update", ["M19.5 12a7.5 7.5 0 0 0-13.1-5", "M4.5 12a7.5 7.5 0 0 0 13.1 5", "M6.4 3.2V7h3.8", "M17.6 20.8V17h-3.8"]],
  ["external-link", "Arrows", "open new tab outside", ["M18.5 13.5v4a2.5 2.5 0 0 1-2.5 2.5H6.5A2.5 2.5 0 0 1 4 17.5V8a2.5 2.5 0 0 1 2.5-2.5h4", "M14 4h6v6", "M20 4l-8.5 8.5"]],
  ["download", "Arrows", "save get", ["M12 4v11", "m7.5 10.5 4.5 4.5 4.5-4.5", TRAY]],
  ["upload", "Arrows", "send import", ["M12 15V4", "M7.5 8.5 12 4l4.5 4.5", TRAY]],
  ["share", "Arrows", "send export", ["M12 3.5v11", "M8 7.5l4-4 4 4", "M7.5 10.5H7a2.5 2.5 0 0 0-2.5 2.5v5A2.5 2.5 0 0 0 7 20.5h10a2.5 2.5 0 0 0 2.5-2.5v-5a2.5 2.5 0 0 0-2.5-2.5h-.5"]],
  ["log-in", "Arrows", "sign in enter", ["M14.5 4H17a2.5 2.5 0 0 1 2.5 2.5v11A2.5 2.5 0 0 1 17 20h-2.5", "M4 12h10", "m10 8 4 4-4 4"]],
  ["log-out", "Arrows", "sign out exit leave", ["M9.5 20H7a2.5 2.5 0 0 1-2.5-2.5v-11A2.5 2.5 0 0 1 7 4h2.5", "M10 12h10", "m16 8 4 4-4 4"]],
  ["trending-up", "Arrows", "growth increase chart", ["M3.5 17.5l6-6 3.5 3.5 7.5-7.5", "M15 7.5h5.5V13"]],
  ["trending-down", "Arrows", "drop decrease chart", ["M3.5 6.5l6 6 3.5-3.5 7.5 7.5", "M15 16.5h5.5V11"]],
  ["maximize", "Arrows", "fullscreen expand", ["M4 9V6.5A2.5 2.5 0 0 1 6.5 4H9", "M15 4h2.5A2.5 2.5 0 0 1 20 6.5V9", "M20 15v2.5a2.5 2.5 0 0 1-2.5 2.5H15", "M9 20H6.5A2.5 2.5 0 0 1 4 17.5V15"]],
  ["minimize", "Arrows", "exit fullscreen collapse", ["M9 4v2.5A2.5 2.5 0 0 1 6.5 9H4", "M20 9h-2.5A2.5 2.5 0 0 1 15 6.5V4", "M15 20v-2.5a2.5 2.5 0 0 1 2.5-2.5H20", "M4 15h2.5A2.5 2.5 0 0 1 9 17.5V20"]],

  /* ───── Interface ───── */
  ["check", "Interface", "done tick confirm yes", ["M4.75 12.75l4.5 4.5L19.25 7.25"]],
  ["check-check", "Interface", "read seen done all", ["M2.75 12.75l4 4 8.5-9", "m12.25 15.75 1 1 8.5-9"]],
  ["x", "Interface", "close cancel remove times", ["M6 6l12 12", "M18 6 6 18"]],
  ["plus", "Interface", "add new create", ["M12 5v14", "M5 12h14"]],
  ["minus", "Interface", "remove subtract", ["M5 12h14"]],
  ["search", "Interface", "find magnifier look", [MAG, MAG_HANDLE]],
  ["zoom-in", "Interface", "magnify enlarge", [MAG, MAG_HANDLE, "M10.75 8.25v5M8.25 10.75h5"]],
  ["zoom-out", "Interface", "magnify shrink", [MAG, MAG_HANDLE, "M8.25 10.75h5"]],
  ["settings", "Interface", "gear cog preferences options", [gear(12, 12, 9, 6.6, 8), C(12, 12, 2.75)]],
  ["sliders", "Interface", "controls adjust tune settings", ["M4 7.5h7M16 7.5h4", C(13.5, 7.5, 2.5), "M4 16.5h3M12 16.5h8", C(9.5, 16.5, 2.5)]],
  ["filter", "Interface", "funnel refine narrow", ["M4.5 5.25h15l-6 7.25v5.75l-3 1.75v-7.5z"]],
  ["menu", "Interface", "hamburger navigation lines", ["M4.5 7h15M4.5 12h15M4.5 17h15"]],
  ["more", "Interface", "ellipsis dots options horizontal", [dot(6, 12), dot(12, 12), dot(18, 12)]],
  ["more-vertical", "Interface", "ellipsis dots kebab options", [dot(12, 6), dot(12, 12), dot(12, 18)]],
  ["grip-vertical", "Interface", "drag handle reorder", [dot(9, 6), dot(15, 6), dot(9, 12), dot(15, 12), dot(9, 18), dot(15, 18)]],
  ["grip-horizontal", "Interface", "drag handle reorder", [dot(6, 9), dot(6, 15), dot(12, 9), dot(12, 15), dot(18, 9), dot(18, 15)]],
  ["home", "Interface", "house start main", ["M4 10.5 12 4l8 6.5V18a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 18z", "M9.75 20.5v-4.25a2.25 2.25 0 0 1 4.5 0v4.25"]],
  ["grid", "Interface", "layout tiles apps dashboard", [R(4, 4, 6.5, 6.5, 2), R(13.5, 4, 6.5, 6.5, 2), R(4, 13.5, 6.5, 6.5, 2), R(13.5, 13.5, 6.5, 6.5, 2)]],
  ["rows", "Interface", "layout list table", [SQ, "M3.75 9.25h16.5M3.75 14.75h16.5"]],
  ["columns", "Interface", "layout split", [SQ, "M9.25 3.75v16.5M14.75 3.75v16.5"]],
  ["table", "Interface", "grid spreadsheet data", [SQ, "M3.75 9.5h16.5M9.5 9.5v10.75"]],
  ["sidebar", "Interface", "panel layout navigation", [SQ, "M9.5 3.75v16.5", "M6.25 7.5h.5M6.25 10.5h.5"]],
  ["kanban", "Interface", "board columns tasks", [SQ, "M8.5 8v6.5M12 8v3.5M15.5 8v8.5"]],
  ["layers", "Interface", "stack levels arrange", ["M12 3.75 20.25 8 12 12.25 3.75 8z", "M3.75 12 12 16.25 20.25 12", "M3.75 16 12 20.25 20.25 16"]],
  ["box", "Interface", "package cube product", ["M12 3.5l7.5 4.25v8.5L12 20.5l-7.5-4.25v-8.5z", "M4.5 7.75 12 12l7.5-4.25", "M12 12v8.5"]],
  ["square", "Interface", "shape stop", [SQ]],
  ["circle", "Interface", "shape round", [RING]],
  ["corner", "Interface", "radius rounded border", ["M4.5 19.5v-9a6 6 0 0 1 6-6h9"]],
  ["check-square", "Interface", "checkbox done task", [SQ, "m8 12.25 2.75 2.75L16 9.5"]],
  ["circle-dot", "Interface", "radio selected record", [RING, C(12, 12, 3)]],
  ["circle-dashed", "Interface", "draft pending empty", [dashedCircle(12, 12, 8.75)]],
  ["loader", "Interface", "spinner loading progress wait", ["M12 3.75a8.25 8.25 0 1 0 8.25 8.25"]],
  ["eye", "Interface", "view show visible watch", [EYE, C(12, 12, 3)]],
  ["eye-off", "Interface", "hide hidden invisible", ["M9.9 6c.68-.17 1.38-.25 2.1-.25 4 0 7.4 2.25 9.25 6.25a11 11 0 0 1-2.3 3.3", "M6.5 7.6C4.95 8.65 3.7 10.15 2.75 12c1.85 4 5.25 6.25 9.25 6.25 1.9 0 3.65-.5 5.15-1.4", "M9.9 9.9a3 3 0 0 0 4.2 4.2", "M4 4l16 16"]],
  ["lock", "Interface", "secure private password", [LOCK_BODY, "M8 10.5V8a4 4 0 0 1 8 0v2.5"]],
  ["lock-keyhole", "Interface", "secure private vault", [LOCK_BODY, "M8 10.5V8a4 4 0 0 1 8 0v2.5", C(12, 14.75, 1.25), "M12 16v1.5"]],
  ["unlock", "Interface", "open unsecure", [LOCK_BODY, "M8 10.5V8a4 4 0 0 1 7.75-1.4"]],
  ["key", "Interface", "password access credential", [C(15.25, 8.75, 4.25), dot(16.5, 7.5), "M12.25 11.75 4.25 19.75", "M7 17l2.25 2.25", "M9.5 14.5l1.75 1.75"]],
  ["shield", "Interface", "security protect safe", [SHIELD]],
  ["shield-check", "Interface", "security verified safe", [SHIELD, "m9 12 2.1 2.1L15.25 10"]],
  ["trash", "Interface", "delete remove bin", ["M4 6.5h16", "M9 6.5V5a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 5v1.5", "M6 6.5l.8 11.6A2.5 2.5 0 0 0 9.3 20.5h5.4a2.5 2.5 0 0 0 2.5-2.4L18 6.5", "M10 10.5v6M14 10.5v6"]],
  ["copy", "Interface", "duplicate clone clipboard", [R(8.5, 8.5, 12, 12, 3), "M15.5 8.5v-2a3 3 0 0 0-3-3h-6a3 3 0 0 0-3 3v6a3 3 0 0 0 3 3h2"]],
  ["pencil", "Interface", "edit write change", ["M16.2 4.3a2.2 2.2 0 0 1 3.1 3.1L8.5 18.25 4 19.75l1.5-4.5z", "M14.5 6l3.5 3.5"]],
  ["pen-line", "Interface", "edit write sign", ["M15.2 4.3a2.1 2.1 0 0 1 3 3L8 17.5 4 18.75l1.25-4z", "M12.5 20.25H20"]],
  ["edit", "Interface", "write compose square pen", ["M11.5 4.5H7A2.5 2.5 0 0 0 4.5 7v10A2.5 2.5 0 0 0 7 19.5h10a2.5 2.5 0 0 0 2.5-2.5v-4.5", "M17.5 3.9a1.9 1.9 0 0 1 2.7 2.7L13 13.75l-3.5 1 1-3.5z"]],
  ["link", "Interface", "chain url hyperlink", ["M10 14a4 4 0 0 0 5.66 0l3-3a4 4 0 0 0-5.66-5.66l-1 1", "M14 10a4 4 0 0 0-5.66 0l-3 3a4 4 0 0 0 5.66 5.66l1-1"]],
  ["paperclip", "Interface", "attach attachment file", ["M19.5 11.25l-7.35 7.35a4.6 4.6 0 0 1-6.5-6.5l7.7-7.7a3.06 3.06 0 0 1 4.33 4.33l-7.6 7.6a1.53 1.53 0 0 1-2.17-2.17l6.95-6.95"]],
  ["bookmark", "Interface", "save read later", ["M6 6a2.5 2.5 0 0 1 2.5-2.5h7A2.5 2.5 0 0 1 18 6v14l-6-4-6 4z"]],
  ["tag", "Interface", "label price category", ["M3.75 5.75a2 2 0 0 1 2-2h5.4a2 2 0 0 1 1.42.59l7.5 7.5a2 2 0 0 1 0 2.83l-5.4 5.4a2 2 0 0 1-2.83 0l-7.5-7.5a2 2 0 0 1-.59-1.42z", dot(8, 8)]],
  ["flag", "Interface", "report mark milestone", ["M5 20.5V4.5", "M5 4.75c4-2 7 2 11.5 0v8.5c-4.5 2-7.5-2-11.5 0"]],
  ["star", "Interface", "favourite rate bookmark", [star(12, 12.6, 9, 4.3)]],
  ["heart", "Interface", "like love favourite", ["M12 19.5S3.75 15 3.75 9.25A4.25 4.25 0 0 1 12 7.6a4.25 4.25 0 0 1 8.25 1.65C20.25 15 12 19.5 12 19.5z"]],
  ["zap", "Interface", "lightning flash power fast", ["M13 3.5 5 13.5h6.5L11 20.5l8-10h-6.5z"]],
  ["sparkles", "Interface", "ai magic new shine", ["M11 4c.7 4.2 2.8 6.3 7 7-4.2.7-6.3 2.8-7 7-.7-4.2-2.8-6.3-7-7 4.2-.7 6.3-2.8 7-7z", "M18.5 3v3.5M16.75 4.75h3.5"]],
  ["command", "Interface", "keyboard shortcut cmd", ["M9 9V6.75A2.25 2.25 0 1 0 6.75 9h10.5A2.25 2.25 0 1 0 15 6.75v10.5a2.25 2.25 0 1 0 2.25-2.25H6.75A2.25 2.25 0 1 0 9 17.25z"]],
  ["hash", "Interface", "number channel tag", ["M9.5 4 8 20", "M16 4l-1.5 16", "M4.5 9h15", "M4 15h15"]],
  ["at-sign", "Interface", "email mention", [C(12, 12, 3.5), "M15.5 8.5v4.75a2.5 2.5 0 0 0 5 0V12a8.5 8.5 0 1 0-3.4 6.8"]],
  ["inbox", "Interface", "mail tray messages", ["M3.75 13.5h4.5l1.5 2.25h4.5l1.5-2.25h4.5", "M3.75 13.5 6.2 6.1A2.5 2.5 0 0 1 8.6 4.5h6.8a2.5 2.5 0 0 1 2.4 1.6l2.45 7.4v4.25a2.5 2.5 0 0 1-2.5 2.5H6.25a2.5 2.5 0 0 1-2.5-2.5z"]],
  ["archive", "Interface", "box store keep", [R(3.5, 4.5, 17, 4.5, 1.5), "M5 9v8.5A2.5 2.5 0 0 0 7.5 20h9a2.5 2.5 0 0 0 2.5-2.5V9", "M10 13h4"]],
  ["power", "Interface", "on off shutdown", ["M12 3.5v8", "M7 6.5a7.5 7.5 0 1 0 10 0"]],
  ["clock", "Interface", "time schedule history", [RING, "M12 7.5V12l3 2"]],
  ["calendar", "Interface", "date schedule event", CAL],
  ["calendar-days", "Interface", "date schedule month", [...CAL, dot(8, 13.75), dot(12, 13.75), dot(16, 13.75), dot(8, 17), dot(12, 17), dot(16, 17)]],

  /* ───── Status ───── */
  ["info", "Status", "information about details help", [RING, "M12 11v5.25", dot(12, 7.75)]],
  ["alert-circle", "Status", "warning error attention", [RING, "M12 7.5v5", dot(12, 16.25)]],
  ["help-circle", "Status", "question support faq", [RING, "M9.6 9.5a2.5 2.5 0 1 1 3.6 2.25c-.75.35-1.2.9-1.2 1.6v.4", dot(12, 16.75)]],
  ["warning", "Status", "alert triangle caution danger", ["M10.3 4.9a2 2 0 0 1 3.4 0l6.95 12.1a2 2 0 0 1-1.7 3H5.05a2 2 0 0 1-1.7-3z", "M12 9.5v4", dot(12, 16.75)]],
  ["check-circle", "Status", "success done complete", [RING, "m8.25 12.25 2.5 2.5 5-5.25"]],
  ["x-circle", "Status", "error cancel close", [RING, "m9.25 9.25 5.5 5.5M14.75 9.25l-5.5 5.5"]],
  ["plus-circle", "Status", "add new create", [RING, "M12 8.5v7M8.5 12h7"]],
  ["minus-circle", "Status", "remove subtract", [RING, "M8.5 12h7"]],
  ["bell", "Status", "notification alert ring", [BELL, BELL_TONGUE]],
  ["bell-off", "Status", "mute silent notification", [BELL, BELL_TONGUE, "M4 4l16 16"]],

  /* ───── Users ───── */
  ["user", "Users", "person account profile", PERSON],
  ["users", "Users", "people team group", [C(9, 8.5, 3.25), "M3 19.5a6 6 0 0 1 12 0", "M15 5.4a3.25 3.25 0 0 1 0 6.2", "M17.5 14a5.5 5.5 0 0 1 3.5 5.5"]],
  ["user-plus", "Users", "add person invite", [...PERSON_L, "M19.5 7.5v5M17 10h5"]],
  ["user-check", "Users", "verified person approved", [...PERSON_L, "m16.75 10 2 2 3.25-3.75"]],
  ["user-circle", "Users", "avatar account profile", [RING, C(12, 10, 3), "M6.75 18.25a6.25 6.25 0 0 1 10.5 0"]],
  ["bot", "Users", "robot ai assistant agent", [R(4.5, 8, 15, 11.5, 3.5), C(12, 4.25, 1.25), "M12 5.5V8", dot(9.25, 13.25), dot(14.75, 13.25), "M2.5 12.5v2.5M21.5 12.5v2.5"]],

  /* ───── Text ───── */
  ["bold", "Text", "strong format", ["M7 4.5h6a3.75 3.75 0 0 1 0 7.5H7z", "M7 12h7a3.75 3.75 0 0 1 0 7.5H7z"]],
  ["italic", "Text", "emphasis format slant", ["M10 4.5h8M6 19.5h8", "M14 4.5l-4 15"]],
  ["underline", "Text", "format line", ["M7 4v7a5 5 0 0 0 10 0V4", "M5.5 20h13"]],
  ["align-left", "Text", "paragraph text", ["M4 6h16M4 10h10M4 14h16M4 18h10"]],
  ["align-center", "Text", "paragraph text middle", ["M4 6h16M7 10h10M4 14h16M7 18h10"]],
  ["align-right", "Text", "paragraph text", ["M4 6h16M10 10h10M4 14h16M10 18h10"]],
  ["list", "Text", "bullets items", [dot(5, 6.5), dot(5, 12), dot(5, 17.5), "M9 6.5h11M9 12h11M9 17.5h11"]],
  ["list-ordered", "Text", "numbers steps", ["M10.5 6.5h9.5M10.5 12h9.5M10.5 17.5h9.5", "M4.75 5.25 6 4.5v4.75", "M4.75 9.25h2.5", "M4.75 15.5a1.25 1.25 0 0 1 2.5.1c0 1.15-2.5 1.9-2.5 3.4h2.5"]],
  ["list-checks", "Text", "tasks todo done", ["M11 6.5h9M11 12h9M11 17.5h9", "m3.75 6.5 1.5 1.5 3-3", "m3.75 16.5 1.5 1.5 3-3"]],
  ["text-cursor", "Text", "input field type caret", ["M13 6.5h4.5a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H13", "M7 6.5h-.5a3 3 0 0 0-3 3v5a3 3 0 0 0 3 3H7", "M10 4v16M8 4h4M8 20h4"]],
  ["type", "Text", "font text letter", ["M5 7V5.5h14V7", "M12 5.5v13", "M9.25 18.5h5.5"]],
  ["quote", "Text", "blockquote citation", ["M5 11.5h4a1 1 0 0 1 1 1V16a1.5 1.5 0 0 1-1.5 1.5h-2A1.5 1.5 0 0 1 5 16v-5.5C5 8 6.25 6.5 8.5 6", "M14 11.5h4a1 1 0 0 1 1 1V16a1.5 1.5 0 0 1-1.5 1.5h-2A1.5 1.5 0 0 1 14 16v-5.5c0-2.5 1.25-4 3.5-4.5"]],

  /* ───── Files ───── */
  ["file", "Files", "document page blank", [FILE, FILE_FOLD]],
  ["file-text", "Files", "document page notes", [FILE, FILE_FOLD, "M9 12.5h6M9 16h4"]],
  ["file-code", "Files", "document source script", [FILE, FILE_FOLD, "M10 12.25 8.25 14 10 15.75", "M14 12.25 15.75 14 14 15.75"]],
  ["file-sheet", "Files", "spreadsheet table csv excel", [FILE, FILE_FOLD, R(8.5, 11.75, 7, 5.5, 1), "M8.5 14.5h7M12 11.75v5.5"]],
  ["folder", "Files", "directory group", [FOLDER]],
  ["folder-open", "Files", "directory browse", ["M3.75 16.5V7.25a2.5 2.5 0 0 1 2.5-2.5h3.1a2 2 0 0 1 1.5.68l1.25 1.42a2 2 0 0 0 1.5.68h3.15a2.5 2.5 0 0 1 2.5 2.5v.97", "M5.55 18.6l1.9-6.1A2 2 0 0 1 9.35 11.1H19.9a1.25 1.25 0 0 1 1.2 1.6l-1.65 5.4a2 2 0 0 1-1.9 1.4H6.25a1.5 1.5 0 0 1-1.5-1.5"]],
  ["folder-plus", "Files", "new directory create", [FOLDER, "M12 10.5v5.5M9.25 13.25h5.5"]],
  ["folder-kanban", "Files", "project board directory", [FOLDER, "M8.75 11v4M12 11v2M15.25 11v5"]],
  ["book", "Files", "docs read guide manual", ["M12 6.5c-1.6-1.3-3.8-2-6.5-2H4.25a.75.75 0 0 0-.75.75v12c0 .41.34.75.75.75H6c2.4 0 4.4.6 6 1.75 1.6-1.15 3.6-1.75 6-1.75h1.75a.75.75 0 0 0 .75-.75v-12a.75.75 0 0 0-.75-.75H18.5c-2.7 0-4.9.7-6.5 2z", "M12 6.5v13.25"]],
  ["image", "Files", "picture photo media", [SQ, C(9, 9, 1.75), "M20.25 14.5l-3.7-3.6a1.5 1.5 0 0 0-2.1 0L4.5 20"]],
  ["image-plus", "Files", "add picture upload photo", ["M12 3.75H8.25a4.5 4.5 0 0 0-4.5 4.5v7.5a4.5 4.5 0 0 0 4.5 4.5h7.5a4.5 4.5 0 0 0 4.5-4.5V12", C(9, 9.25, 1.5), "M20.25 15.5l-2.6-2.5a1.5 1.5 0 0 0-2.1 0L5.5 19.75", "M18 3v6M15 6h6"]],
  ["cloud", "Files", "storage sync weather", [CLOUD]],
  ["cloud-upload", "Files", "backup sync upload", [CLOUD_OPEN, "M12 20.5v-7", "m9 15.5 3-3 3 3"]],
  ["cloud-download", "Files", "sync download fetch", [CLOUD_OPEN, "M12 12.5v8", "m9 17.5 3 3 3-3"]],

  /* ───── Communication ───── */
  ["mail", "Communication", "email envelope message", [R(3.5, 5.5, 17, 13, 3), "M4.25 7.5 12 13l7.75-5.5"]],
  ["send", "Communication", "paper plane message submit", ["M20.5 3.5 3.5 10.25l7 3.25 3.25 7z", "M20.5 3.5 10.5 13.5"]],
  ["message", "Communication", "chat comment bubble", [CHAT]],
  ["message-text", "Communication", "chat comment reply", [CHAT, "M8.5 9h7M8.5 12.5h4.5"]],
  ["messages", "Communication", "chat conversation thread", ["M4 6a2.5 2.5 0 0 1 2.5-2.5h7.5A2.5 2.5 0 0 1 16.5 6v4.5a2.5 2.5 0 0 1-2.5 2.5H7.5L4 15.5z", "M16.5 8.5h1A2.5 2.5 0 0 1 20 11v9.5L17 18h-6.5A2.5 2.5 0 0 1 8 15.5V15"]],
  ["phone", "Communication", "call contact telephone", ["M8.6 4.1 6.4 3.9A2 2 0 0 0 4.3 5.6c-.6 7.4 6.7 14.7 14.1 14.1a2 2 0 0 0 1.7-2.1l-.2-2.2a1.5 1.5 0 0 0-1.1-1.3l-2.6-.7a1.5 1.5 0 0 0-1.5.4l-1.2 1.2a12 12 0 0 1-4.8-4.8l1.2-1.2a1.5 1.5 0 0 0 .4-1.5l-.7-2.6a1.5 1.5 0 0 0-1.3-1.1z"]],
  ["megaphone", "Communication", "announce marketing broadcast", ["M4 10v4a1.5 1.5 0 0 0 1.5 1.5H7l9.5 4.5V4L7 8.5H5.5A1.5 1.5 0 0 0 4 10z", "M7.5 15.5l1 4.25", "M19.5 9.5v5"]],
  ["globe", "Communication", "world web internet language", [RING, "M3.25 12h17.5", "M12 3.25c2.4 2.4 3.6 5.3 3.6 8.75S14.4 18.35 12 20.75c-2.4-2.4-3.6-5.3-3.6-8.75S9.6 5.65 12 3.25z"]],
  ["wifi", "Communication", "wireless network signal", ["M4.5 9.5a10.6 10.6 0 0 1 15 0", "M7.25 12.75a6.7 6.7 0 0 1 9.5 0", "M10 16a2.8 2.8 0 0 1 4 0", dot(12, 18.75)]],
  ["life-buoy", "Communication", "support help rescue", [RING, C(12, 12, 3.75), "M5.8 5.8l3.55 3.55M14.65 9.35l3.55-3.55M14.65 14.65l3.55 3.55M9.35 14.65 5.8 18.2"]],

  /* ───── Media ───── */
  ["play", "Media", "start video audio", ["M7.5 5.6a1.2 1.2 0 0 1 1.8-1l9.6 6.4a1.2 1.2 0 0 1 0 2L9.3 19.4a1.2 1.2 0 0 1-1.8-1z"]],
  ["pause", "Media", "stop hold", [R(6, 5, 4, 14, 1.5), R(14, 5, 4, 14, 1.5)]],
  ["video", "Media", "camera film record", [R(3, 6, 12.5, 12, 3), "M15.5 10.25l4.2-2.4a.9.9 0 0 1 1.3.8v6.7a.9.9 0 0 1-1.3.8l-4.2-2.4"]],
  ["camera", "Media", "photo picture capture", ["M4 8.5A2.5 2.5 0 0 1 6.5 6h1.75l1.25-2h5l1.25 2h1.75A2.5 2.5 0 0 1 20 8.5v8a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 16.5z", C(12, 12.5, 3.25)]],
  ["mic", "Media", "microphone voice record", MIC],
  ["mic-off", "Media", "mute microphone", [...MIC, "M4 4l16 16"]],
  ["volume", "Media", "sound audio speaker", [SPEAKER, "M16 9a4 4 0 0 1 0 6", "M18.75 6.5a7.5 7.5 0 0 1 0 11"]],
  ["volume-off", "Media", "mute sound silent", [SPEAKER, "M16.5 9.5l5 5M21.5 9.5l-5 5"]],
  ["palette", "Media", "colour paint theme design", ["M12 20.75a8.75 8.75 0 1 1 8.75-8.75c0 2.4-1.95 3.5-3.9 3.5h-1.6a1.9 1.9 0 0 0-1.45 3.15c.85 1-.05 2.1-1.8 2.1z", dot(7.75, 11.25), dot(9.5, 7.5), dot(14, 7), dot(16.75, 10)]],
  ["brush", "Media", "paint design art", ["M18.6 3.9a1.9 1.9 0 0 1 2.7 2.7l-7.55 7.55-2.7-2.7z", "M11.05 11.45c-2.6-.6-5.05 1-5.05 4.05 0 1.4-.75 2.75-2.5 3.5 3.25 1.5 6.85.75 8.35-1.1 1.2-1.5 1.15-3.3.1-4.55"]],

  /* ───── Devices ───── */
  ["monitor", "Devices", "desktop screen display", [R(3, 4, 18, 12.5, 3), "M8.5 20.5h7M12 16.5v4"]],
  ["laptop", "Devices", "computer notebook", [R(5, 5, 14, 10, 2.5), "M2.75 18.75h18.5"]],
  ["tablet", "Devices", "ipad device", [R(4.5, 3, 15, 18, 3), "M11 17.75h2"]],
  ["smartphone", "Devices", "mobile phone device", [R(6.5, 3, 11, 18, 3), "M11 17.75h2"]],
  ["keyboard", "Devices", "type input keys", [R(2.75, 6, 18.5, 12, 3.5), dot(7, 10), dot(10.33, 10), dot(13.67, 10), dot(17, 10), "M8.5 14.25h7"]],
  ["printer", "Devices", "print paper", ["M7 8.5V4.5h10v4", "M7 16.5H6a2.5 2.5 0 0 1-2.5-2.5v-3A2.5 2.5 0 0 1 6 8.5h12a2.5 2.5 0 0 1 2.5 2.5v3a2.5 2.5 0 0 1-2.5 2.5h-1", R(7, 13.5, 10, 7, 1.5)]],
  ["server", "Devices", "hosting backend rack", [R(3.75, 4, 16.5, 7, 2.5), R(3.75, 13, 16.5, 7, 2.5), dot(7.5, 7.5), dot(7.5, 16.5)]],
  ["database", "Devices", "storage data sql", ["M4.75 6c0-1.38 3.25-2.5 7.25-2.5s7.25 1.12 7.25 2.5-3.25 2.5-7.25 2.5S4.75 7.38 4.75 6z", "M4.75 6v12c0 1.38 3.25 2.5 7.25 2.5s7.25-1.12 7.25-2.5V6", "M4.75 12c0 1.38 3.25 2.5 7.25 2.5s7.25-1.12 7.25-2.5"]],
  ["cpu", "Devices", "chip processor hardware", [R(6.5, 6.5, 11, 11, 2.5), R(9.75, 9.75, 4.5, 4.5, 1), "M10 3.5v3M14 3.5v3M10 17.5v3M14 17.5v3M3.5 10h3M3.5 14h3M17.5 10h3M17.5 14h3"]],
  ["plug", "Devices", "connect integration power", ["M9 3.5v4M15 3.5v4", "M6.5 7.5h11v3a5.5 5.5 0 0 1-11 0z", "M12 16v4.5"]],

  /* ───── Charts ───── */
  ["bar-chart", "Charts", "stats analytics graph", [AXIS, "M8.5 16v-4M13 16V8M17.5 16v-6"]],
  ["chart-column", "Charts", "stats analytics graph bars", [AXIS, R(8, 9, 3.5, 7.5, 1.25), R(14, 5, 3.5, 11.5, 1.25)]],
  ["chart-bar", "Charts", "stats horizontal bars", [AXIS, R(7.5, 6, 9, 3.5, 1.25), R(7.5, 12.5, 12, 3.5, 1.25)]],
  ["line-chart", "Charts", "stats trend graph", [AXIS, "M7.5 14.5l3.5-4 3 2.5 4.5-5.5"]],
  ["chart-spline", "Charts", "stats curve smooth graph", [AXIS, "M7.5 15.5c2.75 0 2.5-7 5.5-7 2.75 0 2.25 4.5 5.5 3"]],
  ["pie-chart", "Charts", "stats share donut", ["M12 3.75V12h8.25A8.25 8.25 0 1 1 12 3.75z", "M14.5 2.75a7 7 0 0 1 6.75 6.75H14.5z"]],
  ["target", "Charts", "goal aim focus", [RING, C(12, 12, 5.25), dot(12, 12)]],
  ["radar", "Charts", "scan detect sweep", [RING, "M12 12l5.5-5.5", "M12 7.5a4.5 4.5 0 1 0 4.5 4.5", dot(12, 12)]],

  /* ───── Commerce ───── */
  ["credit-card", "Commerce", "payment card billing", [R(3, 5.5, 18, 13, 3), "M3 10h18", "M7 15h3"]],
  ["wallet", "Commerce", "money balance payment", [R(3.75, 6.5, 16.5, 13.5, 3.5), "M6 6.5l9.2-2.6a1.5 1.5 0 0 1 1.9 1.45V6.5", "M20.25 11h-3.5a2 2 0 0 0 0 4h3.5"]],
  ["dollar", "Commerce", "money price currency usd", ["M12 3.5v17", "M16.5 7.25c-.6-1.3-2.25-2.25-4.5-2.25-2.6 0-4.25 1.3-4.25 3.1 0 4.15 9 2.2 9 6.75 0 1.85-1.9 3.15-4.75 3.15-2.4 0-4.15-1-4.75-2.5"]],
  ["receipt", "Commerce", "invoice bill purchase", ["M5.5 3.5h13v17l-2.15-1.25-2.2 1.25-2.15-1.25-2.15 1.25-2.2-1.25-2.15 1.25z", "M9 8h6M9 11.5h6M9 15h3.5"]],
  ["shopping-bag", "Commerce", "shop buy store", ["M5.75 7.5h12.5l.9 10.6a2.5 2.5 0 0 1-2.5 2.65H7.35a2.5 2.5 0 0 1-2.5-2.65z", "M9 10V7a3 3 0 0 1 6 0v3"]],
  ["cart", "Commerce", "shop basket checkout", ["M3.5 4h2l2.1 10.25a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 1.95-1.55L20.5 8H6.4", C(10, 19.5, 1.25), C(17, 19.5, 1.25)]],
  ["gift", "Commerce", "present reward", [R(4, 8, 16, 4, 1.5), "M5.5 12v6.5a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V12", "M12 8v12.5", "M12 8C11 5.5 9.5 4 8 4a2 2 0 0 0 0 4", "M12 8c1-2.5 2.5-4 4-4a2 2 0 0 1 0 4"]],
  ["gem", "Commerce", "premium pro diamond", ["M7 4.5h10l3.5 4.5-8.5 11L3.5 9z", "M3.5 9h17", "M10 4.5 9 9l3 11 3-11-1-4.5"]],
  ["piggy-bank", "Commerce", "savings money", ["M5 12.5c0-3.9 3.4-6.5 7.75-6.5 3 0 5.25 1.2 6.4 3.25h1.35v4.25l-1.75.6c-.5 1.25-1.35 2.25-2.5 2.95v2.95h-2.75v-2h-3v2H7.75v-3.1C6 15.7 5 14.3 5 12.5z", "M5 12.5c-1.25 0-1.75-.9-1.75-1.75", dot(16, 10.5), "M10.5 8.75H14"]],
  ["scale", "Commerce", "balance legal compare weight", ["M12 4v16.5", "M8.5 20.5h7", "M4.5 7h15", "M4.5 7 2.25 13.25a2.4 2.4 0 0 0 4.5 0z", "M19.5 7l-2.25 6.25a2.4 2.4 0 0 0 4.5 0z"]],
  ["calculator", "Commerce", "math numbers", [R(5, 3, 14, 18, 3), R(8, 6, 8, 4, 1), dot(8.75, 13.5), dot(12, 13.5), dot(15.25, 13.5), dot(8.75, 17), dot(12, 17), dot(15.25, 17)]],
  ["trophy", "Commerce", "award winner prize", ["M7.5 4h9v5.5a4.5 4.5 0 0 1-9 0z", "M7.5 6.25H4.5v1.5a3 3 0 0 0 3.25 3", "M16.5 6.25h3v1.5a3 3 0 0 1-3.25 3", "M12 14v3.5", "M8.5 20.25h7", "M9.5 20.25V19a1.5 1.5 0 0 1 1.5-1.5h2a1.5 1.5 0 0 1 1.5 1.5v1.25"]],

  /* ───── Development ───── */
  ["code", "Development", "source brackets developer", ["M8.5 7.5 4 12l4.5 4.5", "m15.5 7.5 4.5 4.5-4.5 4.5", "M13.5 5.5l-3 13"]],
  ["terminal", "Development", "console shell command", ["M5 7.5l4.5 4.5L5 16.5", "M12 17h7"]],
  ["terminal-square", "Development", "console shell window", [SQ, "M8 9.5l2.5 2.5L8 14.5", "M13 14.5h3"]],
  ["git-branch", "Development", "version source fork", [C(6.5, 6, 2.25), C(6.5, 18, 2.25), C(17.5, 7.5, 2.25), "M6.5 8.25v7.5", "M17.5 9.75c0 3.5-2.5 5-6 5.25-2.3.2-3.75.9-4.6 2"]],
  ["git-merge", "Development", "version source combine", [C(6.5, 5.5, 2.25), C(6.5, 18.5, 2.25), C(17.5, 14, 2.25), "M6.5 7.75v8.5", "M6.5 7.75c0 3.6 3.5 6.25 8.75 6.25"]],
  ["git-pull-request", "Development", "version review merge", [C(6.5, 5.5, 2.25), C(6.5, 18.5, 2.25), C(17.5, 18.5, 2.25), "M6.5 7.75v8.5", "M17.5 16.25V9a3 3 0 0 0-3-3h-3", "M13.5 3.75 11.25 6l2.25 2.25"]],
  ["workflow", "Development", "flow automation process", [R(3.5, 3.5, 7, 7, 2), R(13.5, 13.5, 7, 7, 2), "M7 10.5v3a3 3 0 0 0 3 3h3.5"]],
  ["bug", "Development", "issue error debug", [R(7.5, 7.5, 9, 12, 4.5), "M12 12v7.5", "M9.5 7.5a2.5 2.5 0 0 1 5 0", "M4.5 11h3M16.5 11h3M4.5 15.5h3M16.5 15.5h3", "M8.5 5.5 7 4M15.5 5.5 17 4"]],
  ["rocket", "Development", "launch ship start deploy", ["M12 3.5c3 1.75 4.5 4.75 4.5 8.5v4.5h-9V12c0-3.75 1.5-6.75 4.5-8.5z", "M7.5 12.75 5 15.25v3.25l2.5-1.5", "M16.5 12.75 19 15.25v3.25l-2.5-1.5", "M10.5 19.5 12 21l1.5-1.5", C(12, 9.5, 1.75)]],
  ["lightbulb", "Development", "idea tip hint", ["M9 17.5v-1.75c0-1.2-.7-2-1.5-2.9a5.5 5.5 0 1 1 9 0c-.8.9-1.5 1.7-1.5 2.9v1.75z", "M10 20.75h4"]],
  ["orbit", "Development", "space planet system satellite", [C(12, 12, 3), "M19.59 8.78A8.25 8.25 0 1 1 16.49 5.08", C(18.32, 6.7, 1.75)]],

  /* ───── Places ───── */
  ["map-pin", "Places", "location place marker", ["M12 20.75s-6.5-5.4-6.5-10.75a6.5 6.5 0 0 1 13 0c0 5.35-6.5 10.75-6.5 10.75z", C(12, 10, 2.4)]],
  ["map", "Places", "location directions atlas", ["M3.75 6.25 9 4l6 2.5 5.25-2.25v13.5L15 20l-6-2.5-5.25 2.25z", "M9 4v13.5M15 6.5V20"]],
  ["compass", "Places", "explore direction navigate", [RING, "M15.5 8.5l-1.75 5.25L8.5 15.5l1.75-5.25z"]],
  ["navigation", "Places", "location direction arrow gps", ["M4.5 11 19.5 4.5 13 19.5l-1.75-6.75z"]],
  ["building", "Places", "office company business", ["M5 20.5v-15a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v15", "M15 9.5h2.5a2 2 0 0 1 2 2v9", "M3.5 20.5h17", "M8.5 7.5h3M8.5 11h3M8.5 14.5h3"]],
  ["car", "Places", "vehicle drive transport", ["M5 17H4.5a1 1 0 0 1-1-1v-3.4a2 2 0 0 1 .6-1.4l1.65-1.7 1.4-2.8a2 2 0 0 1 1.8-1.2h6.1a2 2 0 0 1 1.8 1.2l1.4 2.8 1.65 1.7a2 2 0 0 1 .6 1.4V16a1 1 0 0 1-1 1H19", "M9 17h6", C(7, 17, 2), C(17, 17, 2), "M5.75 9.5h12.5"]],
  ["utensils", "Places", "food restaurant eat", ["M6.5 3.5v6a2 2 0 0 0 4 0v-6", "M8.5 3.5v17", "M17.5 20.5v-17c-2 1-3.5 3.5-3.5 7V13h3.5"]],
  ["footprints", "Places", "steps walk track", ["M7.5 12.5c-1.75 0-3-2-3-4.75S5.6 3.5 7.5 3.5s2.75 2 2.75 4.25-.6 4.75-2.75 4.75z", "M5.25 15.5h4.5v1.25a2.25 2.25 0 0 1-4.5 0z", "M16.5 16.5c1.75 0 3-2 3-4.75S18.4 7.5 16.5 7.5s-2.75 2-2.75 4.25.6 4.75 2.75 4.75z", "M14.25 19.25h4.5v.25a2.25 2.25 0 0 1-4.5 0z"]],

  /* ───── Nature ───── */
  ["sun", "Nature", "light mode day bright", [C(12, 12, 3.75), "M12 3v1.75M12 19.25V21M3 12h1.75M19.25 12H21M5.6 5.6l1.25 1.25M17.15 17.15l1.25 1.25M5.6 18.4l1.25-1.25M17.15 6.85l1.25-1.25"]],
  ["moon", "Nature", "dark mode night", ["M19.5 14.25A7.75 7.75 0 1 1 9.75 4.5a7 7 0 0 0 9.75 9.75z"]],
  ["droplet", "Nature", "water liquid colour", ["M12 3.5c3.25 3.75 6 7.2 6 10.5a6 6 0 0 1-12 0c0-3.3 2.75-6.75 6-10.5z"]],
  ["flame", "Nature", "fire hot trending", ["M12 20.5c3.3 0 6-2.4 6-5.75 0-4.25-3.5-6.25-4.25-11.25-2.25 1.75-3.6 4.4-3.25 7.25-1.25-.4-2-1.4-2.25-2.75C6.9 9.6 6 11.5 6 14.75c0 3.35 2.7 5.75 6 5.75z"]],

  /* ───── 0.2.0 ───── */
  ["refresh-ccw", "Arrows", "reload sync reverse", ["M4.5 12a7.5 7.5 0 0 1 13.1-5", "M19.5 12a7.5 7.5 0 0 1-13.1 5", "M17.6 3.2V7h-3.8", "M6.4 20.8V17h3.8"]],
  ["move", "Arrows", "drag position arrows", ["M12 3.5v17M3.5 12h17", "M9.25 6.25 12 3.5l2.75 2.75", "m9.25 17.75 2.75 2.75 2.75-2.75", "M6.25 9.25 3.5 12l2.75 2.75", "m17.75 9.25 2.75 2.75-2.75 2.75"]],
  ["expand", "Arrows", "maximize fullscreen enlarge diagonal", ["M14.5 4H20v5.5", "M20 4l-6.25 6.25", "M9.5 20H4v-5.5", "M4 20l6.25-6.25"]],
  ["shrink", "Arrows", "minimize collapse reduce diagonal", ["M14 4.5V10h5.5", "M14 10l6-6", "M10 19.5V14H4.5", "M10 14l-6 6"]],
  ["corner-down-left", "Arrows", "enter return", ["M19.5 4.5V10a4 4 0 0 1-4 4H5", "M9 10l-4 4 4 4"]],
  ["corner-down-right", "Arrows", "indent reply", ["M4.5 4.5V10a4 4 0 0 0 4 4H19", "m15 10 4 4-4 4"]],
  ["corner-up-left", "Arrows", "back undo", ["M19.5 19.5V14a4 4 0 0 0-4-4H5", "M9 6 5 10l4 4"]],
  ["corner-up-right", "Arrows", "forward redo", ["M4.5 19.5V14a4 4 0 0 1 4-4H19", "m15 6 4 4-4 4"]],
  ["chevrons-up", "Arrows", "top collapse", ["m7 11.5 5-5 5 5", "m7 18 5-5 5 5"]],
  ["chevrons-down", "Arrows", "bottom expand", ["m7 6 5 5 5-5", "m7 12.5 5 5 5-5"]],
  ["arrow-right-circle", "Arrows", "next go forward", [RING, "M8 12h8", "m12.5 8.5 3.5 3.5-3.5 3.5"]],
  ["arrow-down-circle", "Arrows", "download scroll down", [RING, "M12 8v8", "m8.5 12.5 3.5 3.5 3.5-3.5"]],
  ["arrow-down-to-line", "Arrows", "download bottom save", ["M12 4v11", "m7.5 10.5 4.5 4.5 4.5-4.5", "M5 20h14"]],
  ["arrow-up-from-line", "Arrows", "upload share top", ["M12 16.5V4", "M7.5 8.5 12 4l4.5 4.5", "M5 20h14"]],
  ["repeat", "Arrows", "loop again cycle", ["M4.5 11V9.5a3 3 0 0 1 3-3H19", "m16 3.5 3 3-3 3", "M19.5 13v1.5a3 3 0 0 1-3 3H5", "m8 20.5-3-3 3-3"]],
  ["shuffle", "Arrows", "random mix", ["M3.5 7h2.6a4 4 0 0 1 3.3 1.75l5.2 6.5A4 4 0 0 0 17.9 17h2.6", "M3.5 17h2.6a4 4 0 0 0 3.3-1.75", "M14.6 8.75A4 4 0 0 1 17.9 7h2.6", "m18 4.5 2.5 2.5-2.5 2.5", "m18 14.5 2.5 2.5-2.5 2.5"]],

  ["strikethrough", "Text", "format delete line", ["M16.5 7.25c-.6-1.4-2.3-2.5-4.5-2.5-2.6 0-4.5 1.4-4.5 3.25 0 1.1.6 1.9 1.6 2.5", "M15.4 14.5c.7.6 1.1 1.3 1.1 2.25 0 1.85-1.9 3.25-4.5 3.25-2.4 0-4.2-1.1-4.75-2.75", "M4 12h16"]],
  ["heading", "Text", "title header h1", ["M6 4.5v15M18 4.5v15M6 12h12"]],
  ["link-2", "Text", "chain url hyperlink", ["M9 7.5H7.5a4.5 4.5 0 0 0 0 9H9", "M15 7.5h1.5a4.5 4.5 0 0 1 0 9H15", "M8.5 12h7"]],
  ["unlink", "Text", "remove link break chain", ["M9 7.5H7.5a4.5 4.5 0 0 0 0 9H9", "M15 7.5h1.5a4.5 4.5 0 0 1 0 9H15", "M12 3.5v2M12 18.5v2"]],
  ["indent", "Text", "tab increase paragraph", ["M4 5.5h16M11 10h9M11 14h9M4 18.5h16", "m4 9 3 3-3 3"]],
  ["outdent", "Text", "tab decrease paragraph", ["M4 5.5h16M11 10h9M11 14h9M4 18.5h16", "M7 9l-3 3 3 3"]],
  ["align-justify", "Text", "paragraph text full", ["M4 6h16M4 10h16M4 14h16M4 18h16"]],
  ["pilcrow", "Text", "paragraph mark", ["M13 4.5v15M17 4.5v15", "M19 4.5H9.5a4 4 0 0 0 0 8H13"]],
  ["text-quote", "Text", "blockquote citation", ["M4.5 6.5h15M9 12h10.5M9 17.5h10.5", "M4.5 11v7.5"]],

  ["file-plus", "Files", "new document add", [FILE, FILE_FOLD, "M12 11.5v6M9 14.5h6"]],
  ["file-minus", "Files", "remove document", [FILE, FILE_FOLD, "M9 14.5h6"]],
  ["file-check", "Files", "document done approved", [FILE, FILE_FOLD, "m9 14.5 2 2 4-4"]],
  ["file-search", "Files", "find document", [FILE, FILE_FOLD, C(11.25, 14, 2.5), "m13.1 15.85 2.15 2.15"]],
  ["file-type", "Files", "document text font", [FILE, FILE_FOLD, "M9 11.5h6M12 11.5v6"]],
  ["files", "Files", "documents copies pages", ["M15.5 3.5H10a2.5 2.5 0 0 0-2.5 2.5v9.5A2.5 2.5 0 0 0 10 18h7a2.5 2.5 0 0 0 2.5-2.5V7.5z", "M15.5 3.5V6a1.5 1.5 0 0 0 1.5 1.5h2.5", "M7.5 6.5h-1A2.5 2.5 0 0 0 4 9v9.5A2.5 2.5 0 0 0 6.5 21h7a2.5 2.5 0 0 0 2.5-2.5V18"]],
  ["folder-code", "Files", "project source directory", [FOLDER, "m10.25 11.5-1.75 1.75 1.75 1.75", "m13.75 11.5 1.75 1.75-1.75 1.75"]],
  ["clipboard", "Files", "paste board", CLIP],
  ["clipboard-check", "Files", "done task copied", [...CLIP, "m9 13.5 2 2 4-4.25"]],
  ["clipboard-list", "Files", "tasks checklist notes", [...CLIP, "M9 11h6M9 14.5h6M9 18h3.5"]],
  ["save", "Files", "floppy disk store", ["M4 6.5A2.5 2.5 0 0 1 6.5 4h9.4a2 2 0 0 1 1.4.6l2.1 2.1a2 2 0 0 1 .6 1.4v9.4a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 17.5z", "M8 4v3.5a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V4", "M7.5 20v-4.5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1V20"]],
  ["history", "Files", "recent time past log", ["M4.5 12A7.5 7.5 0 1 0 6.7 6.7L4.5 9", "M4.5 4.75V9h4.25", "M12 8v4l2.75 1.75"]],
  ["book-text", "Files", "docs read guide notes", [BOOK, "M12 6.5v13.25", "M6.5 9h3M6.5 12h3M14.5 9h3M14.5 12h3"]],

  ["user-minus", "Users", "remove person", [...PERSON_L, "M17 10h5"]],
  ["user-x", "Users", "remove block person", [...PERSON_L, "m17.5 7.75 4.5 4.5M22 7.75l-4.5 4.5"]],
  ["users-round", "Users", "people team group", [C(8.5, 9, 3), "M3 19.5a5.5 5.5 0 0 1 11 0", C(16, 7.5, 3), "M14.5 13.75a5.5 5.5 0 0 1 6.5 5.75"]],
  ["contact", "Users", "address book person card", [R(4.5, 3, 15, 18, 3), C(12, 10.5, 2.5), "M8 17a4 4 0 0 1 8 0", "M3 8h1.5M3 12h1.5M3 16h1.5"]],
  ["id-card", "Users", "identity badge licence", [R(2.75, 5, 18.5, 14, 3), C(8.5, 11, 2), "M5.5 16a3 3 0 0 1 6 0", "M14 10h4M14 13.5h3"]],
  ["accessibility", "Users", "a11y person access", [C(12, 4.75, 1.75), "M5 8.5l7 1.5 7-1.5", "M12 10v4.5", "M9 21l3-6.5 3 6.5"]],

  ["tag-plus", "Commerce", "add label price", [TAG, dot(8, 8), "M14.5 12.25v4.5M12.25 14.5h4.5"]],
  ["percent", "Commerce", "discount sale rate", ["M18 6 6 18", C(7.5, 7.5, 2.25), C(16.5, 16.5, 2.25)]],
  ["coins", "Commerce", "money cash change", [C(14.5, 14.5, 6), "M15.43 8.57A6 6 0 1 0 8.57 15.43", "M14.5 12v5"]],
  ["banknote", "Commerce", "money cash bill", [R(2.75, 6, 18.5, 12, 3), C(12, 12, 2.5), dot(6.5, 12), dot(17.5, 12)]],
  ["truck", "Commerce", "delivery shipping", ["M3.5 16V6.5A1.5 1.5 0 0 1 5 5h8.5A1.5 1.5 0 0 1 15 6.5V17", "M15 9h3l2.5 3.25V16a1 1 0 0 1-1 1H19", "M3.5 16a1 1 0 0 0 1 1h1", "M9.5 17H15", C(7.75, 17.25, 1.75), C(16.75, 17.25, 1.75)]],
  ["package", "Commerce", "parcel shipping box order", ["M12 3.5l7.5 4.25v8.5L12 20.5l-7.5-4.25v-8.5z", "M4.5 7.75 12 12l7.5-4.25", "M12 12v8.5", "M8.25 5.63 15.75 9.88v3.5"]],
  ["store", "Commerce", "shop market building", ["M4.5 10.5V19a1.5 1.5 0 0 0 1.5 1.5h12a1.5 1.5 0 0 0 1.5-1.5v-8.5", "M4 8l1.25-4h13.5L20 8a2.67 2.67 0 0 1-5.33 0 2.67 2.67 0 0 1-5.34 0A2.67 2.67 0 0 1 4 8z", "M9.5 20.5V16a2.5 2.5 0 0 1 5 0v4.5"]],
  ["barcode", "Commerce", "scan product sku", ["M4 6v12M7 6v12M10.5 6v12M14 6v12M16.5 6v12M20 6v12"]],
  ["qr-code", "Commerce", "scan code link", [R(4, 4, 6, 6, 1.5), R(14, 4, 6, 6, 1.5), R(4, 14, 6, 6, 1.5), dot(14.5, 14.5), dot(17, 17), dot(19.5, 19.5), dot(14.5, 19.5), dot(19.5, 14.5)]],
  ["ticket", "Commerce", "event pass coupon", ["M3.5 8.5V7A1.5 1.5 0 0 1 5 5.5h14A1.5 1.5 0 0 1 20.5 7v1.5a3.5 3.5 0 0 0 0 7V17a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 17v-1.5a3.5 3.5 0 0 0 0-7z", "M14 5.5v2M14 10.75v2.5M14 16.5v2"]],

  ["headphones", "Media", "audio music listen", ["M4 14.5V13a8 8 0 0 1 16 0v1.5", R(4, 13.5, 4, 6.5, 1.75), R(16, 13.5, 4, 6.5, 1.75)]],
  ["speaker", "Media", "audio sound music", [R(5.5, 3, 13, 18, 3), C(12, 14.5, 3.25), dot(12, 7.5)]],
  ["film", "Media", "movie video cinema", [SQ, "M8.5 3.75v16.5M15.5 3.75v16.5M3.75 9.25h4.75M3.75 14.75h4.75M15.5 9.25h4.75M15.5 14.75h4.75"]],
  ["music", "Media", "song audio note", ["M9 18V5.5l11-2v12", C(6.5, 18, 2.5), C(17.5, 15.5, 2.5)]],
  ["battery", "Devices", "power charge level", [R(2.75, 7, 16, 10, 2.5), "M21.25 10.5v3", "M6.5 10.5v3M9.5 10.5v3"]],
  ["battery-charging", "Devices", "power charge plug", [R(2.75, 7, 16, 10, 2.5), "M21.25 10.5v3", "M11.5 9 9.5 12h3l-2 3"]],
  ["bluetooth", "Devices", "wireless connect", ["m7 7.5 10 9-5 4.5v-17l5 4.5-10 9"]],
  ["cast", "Devices", "screen mirror stream", ["M3.5 8.5v-1a3 3 0 0 1 3-3h11a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-4.5", "M3.5 12.5a7 7 0 0 1 7 7", "M3.5 16A3.5 3.5 0 0 1 7 19.5", dot(3.75, 19.5)]],
  ["airplay", "Devices", "screen stream mirror", ["M6.5 17H6a2.5 2.5 0 0 1-2.5-2.5v-8A2.5 2.5 0 0 1 6 4h12a2.5 2.5 0 0 1 2.5 2.5v8A2.5 2.5 0 0 1 18 17h-.5", "M12 14.5l4.5 6h-9z"]],
  ["tv", "Devices", "television screen", [R(3, 6.5, 18, 13, 3), "m8 3 4 3.5 4-3.5"]],
  ["watch", "Devices", "time wearable clock", [R(6.5, 6.5, 11, 11, 3.5), "M12 9.75V12l1.5 1", "M8.5 6.5l.6-2.4A1.5 1.5 0 0 1 10.55 3h2.9a1.5 1.5 0 0 1 1.45 1.1l.6 2.4", "M8.5 17.5l.6 2.4a1.5 1.5 0 0 0 1.45 1.1h2.9a1.5 1.5 0 0 0 1.45-1.1l.6-2.4"]],

  ["activity", "Status", "pulse health heartbeat", ["M3 12h3.5L9 5l5 14 2.5-7H21"]],
  ["ban", "Status", "block forbidden prohibited", [RING, "M5.8 5.8l12.4 12.4"]],
  ["badge-check", "Status", "verified approved", [star(12, 12, 9, 7.6, 8), "m8.75 12 2.25 2.25 4.25-4.5"]],
  ["toggle-left", "Status", "switch off", [R(2.5, 6.5, 19, 11, 5.5), C(8, 12, 2.75)]],
  ["toggle-right", "Status", "switch on", [R(2.5, 6.5, 19, 11, 5.5), C(16, 12, 2.75)]],
  ["power-off", "Status", "shutdown disabled", ["M12 3.5v4", "M7 6.5a7.5 7.5 0 1 0 10 0", "M3.5 3.5l17 17"]],
  ["shield-alert", "Status", "security warning", [SHIELD, "M12 8.5v4", dot(12, 15.75)]],
  ["alert-octagon", "Status", "stop error danger", ["M15.44 3.7 20.3 8.56v6.88l-4.86 4.86H8.56L3.7 15.44V8.56L8.56 3.7z", "M12 8v4.5", dot(12, 16)]],

  ["phone-call", "Communication", "ringing call", [PHONE, "M14.5 3.75a6.5 6.5 0 0 1 5.75 5.75", "M14.5 7.25a3 3 0 0 1 2.25 2.25"]],
  ["voicemail", "Communication", "message recording", [C(7, 12, 3.5), C(17, 12, 3.5), "M7 15.5h10"]],
  ["mail-open", "Communication", "email read", ["M3.5 10.5 12 4l8.5 6.5V18a2.5 2.5 0 0 1-2.5 2.5H6A2.5 2.5 0 0 1 3.5 18z", "M3.75 10.75 12 16l8.25-5.25"]],
  ["inbox-arrow", "Communication", "receive download incoming", ["M8 8.5H6.4l-2.65 5v4.25a2.5 2.5 0 0 0 2.5 2.5h11.5a2.5 2.5 0 0 0 2.5-2.5V13.5L17.6 8.5H16", "M3.75 13.5h4.5l1.5 2.25h4.5l1.5-2.25h4.5", "M12 3.5v8", "m9 8.5 3 3 3-3"]],
  ["reply", "Communication", "answer respond", ["M9.5 6 4 11.5l5.5 5.5", "M4 11.5h9a7 7 0 0 1 7 7v1"]],
  ["reply-all", "Communication", "answer everyone", ["M8 6.5 3 11.5l5 5", "M12.5 6.5l-5 5 5 5", "M7.5 11.5H13a7 7 0 0 1 7 7v1"]],
  ["forward", "Communication", "send share pass on", ["m14.5 6 5.5 5.5-5.5 5.5", "M20 11.5h-9a7 7 0 0 0-7 7v1"]],
  ["send-horizontal", "Communication", "paper plane submit", ["M4 4.5 20.5 12 4 19.5l2.75-7.5z", "M6.75 12H20.5"]],
  ["message-circle", "Communication", "chat comment bubble round", ["M12 20a8 8 0 1 0-7.1-4.3L3.75 20.25l4.5-1.15A8 8 0 0 0 12 20z"]],

  ["cloud-rain", "Nature", "weather rain shower", [CLOUD_S, "M8 18.5l-.75 2M12 18.5l-.75 2M16 18.5l-.75 2"]],
  ["cloud-lightning", "Nature", "weather storm thunder", ["M8.5 16H7a4 4 0 0 1-.6-7.95A5.75 5.75 0 0 1 17.6 6.8 4.6 4.6 0 0 1 17 16h-1", "M13 12.5 10.5 16.5h3L11 20.5"]],
  ["cloud-sun", "Nature", "weather partly cloudy", [C(8.5, 8.5, 3), "M8.5 3v1.25M3 8.5h1.25M4.6 4.6l.9.9M12.4 4.6l-.9.9", "M10.5 19.5a3.25 3.25 0 0 1-.5-6.45A4.75 4.75 0 0 1 19.2 12a3.75 3.75 0 0 1-.45 7.5z"]],
  ["snowflake", "Nature", "winter cold snow", ["M12 3v18M4.2 7.5l15.6 9M4.2 16.5l15.6-9", "m9.5 4.5 2.5 2 2.5-2", "m9.5 19.5 2.5-2 2.5 2"]],
  ["wind", "Nature", "weather air breeze", ["M3.5 9H14a2.75 2.75 0 1 0-2.75-2.75", "M3.5 15h13a3 3 0 1 1-3 3", "M3.5 12h6"]],
  ["leaf", "Nature", "eco plant green", ["M5 19c0-8 4.5-14 15-14.5-.5 10.5-6.5 15-15 14.5z", "M5 19l7-7"]],
  ["tree", "Nature", "pine forest nature", ["M12 3.5 6 11h3l-4 5.5h14l-4-5.5h3z", "M12 16.5v4"]],
  ["mountain", "Nature", "peak landscape hike", ["M3 19.5 9.5 7l4 7.5 2-3 5.5 8z"]],
  ["waves", "Nature", "water sea ocean", [wave(7), wave(12), wave(17)]],
  ["umbrella", "Nature", "rain weather cover insurance", ["M12 3.5a8.5 8.5 0 0 1 8.5 8.5h-17A8.5 8.5 0 0 1 12 3.5z", "M12 12v6.25a1.75 1.75 0 0 1-3.5 0"]],
  ["thermometer", "Nature", "temperature weather heat", ["M10 14.5v-9a2 2 0 0 1 4 0v9a3.75 3.75 0 1 1-4 0z", "M12 9v7"]],

  ["pin", "Interface", "pushpin keep attach", ["M9 3.5h6", "M10 3.5V9l-3 4v1.5h10V13l-3-4V3.5", "M12 14.5v6"]],
  ["pin-off", "Interface", "unpin remove", ["M9 3.5h6", "M10 3.5V9l-3 4v1.5h10V13l-3-4V3.5", "M12 14.5v6", "M4 4l16 16"]],
  ["picture-in-picture", "Interface", "pip video window", [R(3, 5, 18, 14, 3), R(12, 12, 6, 4.5, 1.25)]],
  ["panel-right", "Interface", "sidebar layout inspector", [SQ, "M14.5 3.75v16.5"]],
  ["panel-bottom", "Interface", "layout footer drawer", [SQ, "M3.75 14.5h16.5"]],
  ["layout-dashboard", "Interface", "dashboard widgets grid", [R(4, 4, 7, 9, 2), R(13, 4, 7, 5, 2), R(13, 11, 7, 9, 2), R(4, 15, 7, 5, 2)]],
  ["layout-template", "Interface", "layout page sections", [R(4, 4, 16, 6, 2), R(4, 13, 7, 7, 2), R(14, 13, 6, 7, 2)]],
  ["table-grid", "Interface", "spreadsheet cells", [SQ, "M3.75 9.25h16.5M3.75 14.75h16.5M9.25 3.75v16.5M14.75 3.75v16.5"]],
  ["app-window", "Interface", "browser application", [R(3, 4.5, 18, 15, 3), "M3 9h18", dot(6.5, 6.75), dot(9, 6.75)]],
  ["blocks", "Interface", "components modules build", [R(3.75, 12.5, 7.75, 7.75, 2), R(12.5, 12.5, 7.75, 7.75, 2), R(12.5, 3.75, 7.75, 7.75, 2)]],
  ["shapes", "Interface", "triangle circle square design", ["M7.5 3.5l4 7h-8z", C(16.75, 7.25, 3.5), R(13, 13, 7.5, 7.5, 2), C(7.5, 16.75, 3.5)]],
  ["swatch-book", "Interface", "colours palette theme", [R(3.5, 3.5, 7, 17, 2.5), dot(7, 16.75), "M10.5 8.5l3.75-3.75a2 2 0 0 1 2.83 0l2.17 2.17a2 2 0 0 1 0 2.83L10.5 18", "M7 20.5h11.5a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2h-2.25"]],
  ["mouse-pointer", "Interface", "cursor click select", ["M5 4.5 18.5 10l-5.75 2.25L10.5 18z", "m12.75 12.25 5.5 5.5"]],
  ["mouse-pointer-click", "Interface", "cursor click tap", ["M9 9l11 4.5-4.75 1.75L13.5 20z", "m15.25 15.25 4.25 4.25", "M7 3v2.25M3 7h2.25M4.3 4.3l1.6 1.6M10.5 4.5 9.25 5.75"]],
  ["scan", "Interface", "scanner capture frame", ["M4 9V6.5A2.5 2.5 0 0 1 6.5 4H9", "M15 4h2.5A2.5 2.5 0 0 1 20 6.5V9", "M20 15v2.5a2.5 2.5 0 0 1-2.5 2.5H15", "M9 20H6.5A2.5 2.5 0 0 1 4 17.5V15", "M7.5 12h9"]],
  ["timer", "Interface", "stopwatch countdown", [C(12, 13.5, 7.25), "M10 2.75h4", "M12 13.5V10", "M18 7.5l1.25-1.25"]],
  ["hourglass", "Interface", "wait time loading", ["M6.5 3.5h11M6.5 20.5h11", "M7.5 3.5c0 4 1.5 6 4.5 8.5-3 2.5-4.5 4.5-4.5 8.5", "M16.5 3.5c0 4-1.5 6-4.5 8.5 3 2.5 4.5 4.5 4.5 8.5"]],
  ["alarm", "Interface", "clock wake reminder", [C(12, 13, 7), "M12 9.5V13l2 1.5", "M4 5.5l2.5-2.25M20 5.5l-2.5-2.25", "M6.5 19.5l-1.25 1.5M17.5 19.5l1.25 1.5"]],
];
