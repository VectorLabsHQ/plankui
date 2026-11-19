// Optical size: the drawings in icons.mjs sit in a 3..21 live area. At the 1.5 default stroke they read
// small, so the build scales each icon's geometry (not a transform, so the stroke width stays true)
// about the centre by up to SCALE, and by less (or below 1) where that would push a stroke past MAX.

export const SCALE = 1.08;
const MAX = 9.75; // furthest a point may sit from the centre, so a 1.5 stroke edge stays inside 1.5..22.5
const C = 12;
const r3 = (v) => +v.toFixed(3);
const ARGS = { m: 2, l: 2, h: 1, v: 1, c: 6, s: 4, q: 4, t: 2, a: 7, z: 0 };

/** Splits path data into [command, numbers] pairs, repeating a command for extra argument groups. */
function parse(d) {
  const out = [];
  for (const [, cmd, body] of d.matchAll(/([a-zA-Z])([^a-zA-Z]*)/g)) {
    const nums = (body.match(/-?(?:\d+\.?\d*|\.\d+)(?:e-?\d+)?/gi) || []).map(Number);
    const k = ARGS[cmd.toLowerCase()];
    if (k === 0) { out.push([cmd, []]); continue; }
    for (let i = 0; i < nums.length; i += k) {
      // After a moveto, further pairs are linetos.
      const c = i === 0 ? cmd : cmd === "M" ? "L" : cmd === "m" ? "l" : cmd;
      out.push([c, nums.slice(i, i + k)]);
    }
  }
  return out;
}

/** Points along a path, in absolute coordinates, to measure how far it reaches. */
function sample(segs) {
  const pts = [];
  let x = 0, y = 0, sx = 0, sy = 0, cx = 0, cy = 0, prev = "";
  for (const [cmd, a] of segs) {
    const rel = cmd === cmd.toLowerCase();
    const ox = rel ? x : 0, oy = rel ? y : 0;
    const C0 = cmd.toUpperCase();
    if (C0 === "M") { x = ox + a[0]; y = oy + a[1]; sx = x; sy = y; pts.push([x, y]); }
    else if (C0 === "L" || C0 === "T") { x = ox + a[0]; y = oy + a[1]; pts.push([x, y]); }
    else if (C0 === "H") { x = ox + a[0]; pts.push([x, y]); }
    else if (C0 === "V") { y = oy + a[0]; pts.push([x, y]); }
    else if (C0 === "Z") { x = sx; y = sy; }
    else if (C0 === "C" || C0 === "S" || C0 === "Q") {
      // Control points bound the curve, so including them never under-measures.
      for (let i = 0; i < a.length; i += 2) pts.push([ox + a[i], oy + a[i + 1]]);
      cx = ox + a[a.length - 4] || 0; cy = oy + a[a.length - 3] || 0;
      x = ox + a[a.length - 2]; y = oy + a[a.length - 1];
    } else if (C0 === "A") {
      const [rx0, ry0, rot, large, sweep] = a;
      const x2 = ox + a[5], y2 = oy + a[6];
      pts.push(...arcPoints(x, y, rx0, ry0, rot, large, sweep, x2, y2));
      x = x2; y = y2;
    }
    prev = C0;
  }
  return pts;
}

/** Samples an SVG arc via its centre parameterisation (SVG spec, appendix F.6). */
function arcPoints(x1, y1, rx, ry, rotDeg, large, sweep, x2, y2) {
  if (!rx || !ry) return [[x2, y2]];
  const phi = (rotDeg * Math.PI) / 180, cos = Math.cos(phi), sin = Math.sin(phi);
  const dx = (x1 - x2) / 2, dy = (y1 - y2) / 2;
  const x1p = cos * dx + sin * dy, y1p = -sin * dx + cos * dy;
  rx = Math.abs(rx); ry = Math.abs(ry);
  const lam = (x1p * x1p) / (rx * rx) + (y1p * y1p) / (ry * ry);
  if (lam > 1) { rx *= Math.sqrt(lam); ry *= Math.sqrt(lam); }
  const num = rx * rx * ry * ry - rx * rx * y1p * y1p - ry * ry * x1p * x1p;
  const den = rx * rx * y1p * y1p + ry * ry * x1p * x1p;
  let co = Math.sqrt(Math.max(0, num / den));
  if (large === sweep) co = -co;
  const cxp = (co * rx * y1p) / ry, cyp = (-co * ry * x1p) / rx;
  const cx = cos * cxp - sin * cyp + (x1 + x2) / 2, cy = sin * cxp + cos * cyp + (y1 + y2) / 2;
  const ang = (ux, uy, vx, vy) => Math.atan2(ux * vy - uy * vx, ux * vx + uy * vy);
  const t1 = ang(1, 0, (x1p - cxp) / rx, (y1p - cyp) / ry);
  let dt = ang((x1p - cxp) / rx, (y1p - cyp) / ry, (-x1p - cxp) / rx, (-y1p - cyp) / ry);
  if (!sweep && dt > 0) dt -= 2 * Math.PI;
  if (sweep && dt < 0) dt += 2 * Math.PI;
  const pts = [];
  for (let i = 0; i <= 24; i++) {
    const t = t1 + (dt * i) / 24;
    pts.push([cx + rx * Math.cos(t) * cos - ry * Math.sin(t) * sin, cy + rx * Math.cos(t) * sin + ry * Math.sin(t) * cos]);
  }
  return pts;
}

const rotation = (tf) => tf && tf.match(/rotate\(([-\d.]+)/) ? +tf.match(/rotate\(([-\d.]+)/)[1] : 0;

/** How far a node reaches from the centre, per axis (the box is square, so the larger of x and y). */
function reach([tag, a]) {
  const off = (x, y) => Math.max(Math.abs(x - C), Math.abs(y - C));
  if (tag === "path") return Math.max(...sample(parse(a.d)).map(([x, y]) => off(x, y)));
  if (tag === "circle") return off(a.cx, a.cy) + a.r;
  if (tag === "ellipse") {
    // A turned ellipse is bounded by its larger radius; an upright one per axis.
    if (rotation(a.transform)) return off(a.cx, a.cy) + Math.max(a.rx, a.ry);
    return Math.max(Math.abs(a.cx - C) + a.rx, Math.abs(a.cy - C) + a.ry);
  }
  if (tag === "rect") {
    const cx = a.x + a.width / 2, cy = a.y + a.height / 2, t = (rotation(a.transform) * Math.PI) / 180;
    const hw = (Math.abs(a.width * Math.cos(t)) + Math.abs(a.height * Math.sin(t))) / 2;
    const hh = (Math.abs(a.width * Math.sin(t)) + Math.abs(a.height * Math.cos(t))) / 2;
    return Math.max(Math.abs(cx - C) + hw, Math.abs(cy - C) + hh);
  }
  return 0;
}

const sp = (v, s) => r3(C + (v - C) * s);

function scalePath(d, s) {
  return parse(d).map(([cmd, a], i) => {
    // A path's first moveto is absolute even when written as a lowercase m.
    const rel = cmd === cmd.toLowerCase() && i > 0;
    const P = (v) => (rel ? r3(v * s) : sp(v, s));
    switch (cmd.toUpperCase()) {
      case "A": return cmd + [r3(a[0] * s), r3(a[1] * s), a[2], a[3], a[4], P(a[5]), P(a[6])].join(" ");
      case "Z": return cmd;
      default: return cmd + a.map(P).join(" ");
    }
  }).join("");
}

function scaleNode([tag, a], s) {
  const out = { ...a };
  const turn = rotation(a.transform);
  if (tag === "path") out.d = scalePath(a.d, s);
  if (tag === "circle") Object.assign(out, { cx: sp(a.cx, s), cy: sp(a.cy, s), r: r3(a.r * s) });
  if (tag === "ellipse") Object.assign(out, { cx: sp(a.cx, s), cy: sp(a.cy, s), rx: r3(a.rx * s), ry: r3(a.ry * s) });
  if (tag === "rect") Object.assign(out, { x: sp(a.x, s), y: sp(a.y, s), width: r3(a.width * s), height: r3(a.height * s), ...(a.rx ? { rx: r3(a.rx * s) } : {}) });
  if (turn) {
    const cx = tag === "rect" ? out.x + out.width / 2 : out.cx, cy = tag === "rect" ? out.y + out.height / 2 : out.cy;
    out.transform = `rotate(${turn} ${r3(cx)} ${r3(cy)})`;
  }
  return [tag, out];
}

/** Scales one icon's nodes to its optical size. */
export function fit(nodes) {
  const far = Math.max(...nodes.map(reach));
  const s = Math.min(SCALE, MAX / far);
  // Icons drawn past the cap shrink to it, so every icon ends up inside the same box.
  return s === 1 ? nodes : nodes.map((nd) => scaleNode(nd, s));
}

// Self-check: a circle and a path scale the same way and stay inside the cap.
{
  const [[, m]] = fit([["path", { d: "m15.4 15.4 4.6 4.6" }]]);
  if (!m.d.startsWith("m15.672 15.672")) throw new Error(`fit self-check: leading m ${m.d}`);
  const [[, c], [, p]] = fit([["circle", { cx: 12, cy: 12, r: 8.75 }], ["path", { d: "M12 3.25a8.75 8.75 0 0 1 0 17.5" }]]);
  if (Math.abs(c.r - 9.45) > 0.01 || !p.d.startsWith("M12 2.55a9.45 9.45")) throw new Error(`fit self-check failed: ${c.r} ${p.d}`);
  if (Math.abs(reach(["path", { d: "M3 12A9 9 0 0 1 21 12" }]) - 9) > 0.01) throw new Error("fit self-check: arc reach");
}
