#!/usr/bin/env node
// plankui: copies PlankUI components into your project and installs what they need.
// Zero dependencies. Reads the registry from the PlankUI site.
//
//   npx plankui@latest init
//   npx plankui@latest add button select dialog
//   npx plankui@latest add select --base       (the Base UI version)
//   npx plankui@latest list
//   npx plankui@latest login YOUR_LICENSE_KEY
import { existsSync, lstatSync, mkdirSync, readFileSync, realpathSync, rmSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, isAbsolute, join, relative, resolve, sep } from "node:path";
import { spawnSync } from "node:child_process";
import { createInterface } from "node:readline/promises";

const VERSION = "0.1.3";
const DEFAULT_REGISTRY = "https://plankui.com/r";

/* ── Arguments ── */
const argv = process.argv.slice(2);
const flags = new Set(argv.filter((a) => a.startsWith("--") && !a.includes("=")));
const opt = (name, fallback) => {
  const hit = argv.find((a) => a.startsWith(`--${name}=`));
  if (hit) return hit.split("=").slice(1).join("=");
  const i = argv.indexOf(`--${name}`);
  return i >= 0 && argv[i + 1] && !argv[i + 1].startsWith("--") ? argv[i + 1] : fallback;
};
const valued = new Set(["--cwd", "--registry"]);
const positional = argv.filter((a, i) => !a.startsWith("--") && !valued.has(argv[i - 1]));
const [command, ...names] = positional;
const yes = flags.has("--yes") || flags.has("-y");
const overwrite = flags.has("--overwrite");
const skipInstall = flags.has("--no-install");
const cwd = opt("cwd", process.cwd());
/** Primitives asked for on this run: --base or --radix. Otherwise plankui.json decides. */
const libFlag = flags.has("--base") ? "base" : flags.has("--radix") ? "radix" : null;
const registry = (opt("registry", process.env.PLANKUI_REGISTRY) ?? DEFAULT_REGISTRY).replace(/\/$/, "");

/* ── Output ── */
const tty = process.stdout.isTTY;
const paint = (code) => (s) => (tty ? `\x1b[${code}m${s}\x1b[0m` : s);
const dim = paint(2), bold = paint(1), green = paint(32), yellow = paint(33), red = paint(31);
const say = (s = "") => console.log(s);
const fail = (msg) => {
  console.error(`${red("error")} ${msg}`);
  process.exit(1);
};

/** Ask a yes/no question. With --yes, takes the default. With no terminal and no --yes, stops instead of guessing. */
async function confirm(question, fallback) {
  if (yes) return fallback;
  if (!process.stdin.isTTY) fail(`${question}\n      No terminal to answer in. Run again with --yes to accept the defaults.`);
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  const answer = (await rl.question(`${question} ${dim(fallback ? "(Y/n)" : "(y/N)")} `)).trim().toLowerCase();
  rl.close();
  return answer ? answer.startsWith("y") : fallback;
}

/** Pick one of two answers. With --yes or no terminal, takes the first. */
async function choose(question, options) {
  if (yes || !process.stdin.isTTY) return options[0].value;
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  say(question);
  options.forEach((o, i) => say(`  ${i + 1}. ${o.label}${i === 0 ? dim(" (default)") : ""}`));
  const answer = (await rl.question(dim("Choose 1 or 2: "))).trim();
  rl.close();
  return options[Number(answer) - 1]?.value ?? options[0].value;
}

/* ── Project settings: plankui.json ── */
const settingsFile = () => join(cwd, "plankui.json");
function settings() {
  try {
    return JSON.parse(readFileSync(settingsFile(), "utf8"));
  } catch {
    return {};
  }
}
/** "radix" or "base": the flag, then plankui.json, then Radix. */
const primitives = () => libFlag ?? (settings().primitives === "base" ? "base" : "radix");

/* ── Project ── */
function project() {
  const pkgPath = join(cwd, "package.json");
  if (!existsSync(pkgPath)) fail(`No package.json in ${cwd}. Run this inside your React project.`);
  const pkg = JSON.parse(readFileSync(pkgPath, "utf8"));
  const deps = { ...pkg.dependencies, ...pkg.devDependencies };
  const base = existsSync(join(cwd, "src")) ? join(cwd, "src") : cwd;
  const pm = existsSync(join(cwd, "pnpm-lock.yaml")) ? "pnpm"
    : existsSync(join(cwd, "yarn.lock")) ? "yarn"
    : existsSync(join(cwd, "bun.lockb")) || existsSync(join(cwd, "bun.lock")) ? "bun"
    : "npm";
  return { pkg, deps, base, pm };
}

function install(pm, packages, haveDeps) {
  const missing = [...new Set(packages)].filter((p) => !haveDeps[p]);
  if (!missing.length) return;
  if (skipInstall) {
    say(`${yellow("skip")} install ${missing.join(" ")} ${dim("(--no-install)")}`);
    return;
  }
  const verb = pm === "npm" ? "install" : "add";
  say(`${dim("installing")} ${missing.join(" ")}`);
  const run = spawnSync(pm, [verb, ...missing], { cwd, stdio: "inherit", shell: process.platform === "win32" });
  if (run.status !== 0) fail(`${pm} ${verb} failed. Install these yourself: ${missing.join(" ")}`);
}

/* ── Licence ── */
const configFile = join(process.env.XDG_CONFIG_HOME || join(homedir(), ".config"), "plankui", "config.json");
function licenceKey() {
  if (process.env.PLANKUI_LICENSE_KEY) return process.env.PLANKUI_LICENSE_KEY.trim();
  try {
    return JSON.parse(readFileSync(configFile, "utf8")).licenseKey || null;
  } catch {
    return null;
  }
}

async function login() {
  const key = names[0]?.trim();
  if (!key) fail(`Pass the key from your purchase email: ${green("npx plankui@latest login YOUR_LICENSE_KEY")}`);
  mkdirSync(dirname(configFile), { recursive: true });
  writeFileSync(configFile, JSON.stringify({ licenseKey: key }, null, 2) + "\n", { mode: 0o600 });
  say(`${green("saved")} your licence key to ${configFile}`);
  say(`Add Pro components the same way as free ones:  ${green("npx plankui@latest add <name>")}`);
}

function logout() {
  rmSync(configFile, { force: true });
  say(`${green("removed")} the saved licence key.`);
}

/** Pro sources come from /r/pro/<name>.json, which answers only with a valid licence key. */
async function fetchPro(name, key) {
  let res;
  try {
    res = await fetch(`${registry}/pro/${name}.json`, { headers: { authorization: `Bearer ${key}` } });
  } catch {
    fail(`Could not reach ${registry}. Check your connection, or pass --registry.`);
  }
  if (res.status === 401 || res.status === 403) {
    fail(`The registry refused your licence key. Check it against your purchase email and run ${green("npx plankui@latest login <key>")} again.`);
  }
  let body = null;
  try {
    body = JSON.parse(await res.text());
  } catch {
    return null;
  }
  if (res.ok) return body;
  if (res.status !== 404 && body?.error) fail(body.error);
  return null;
}

async function fetchJson(name) {
  const url = `${registry}/${name}.json`;
  let res;
  try {
    res = await fetch(url);
  } catch {
    fail(`Could not reach ${registry}. Check your connection, or pass --registry.`);
  }
  if (res.status === 404) return null;
  if (!res.ok) fail(`${url} answered ${res.status}.`);
  // Static hosts answer unknown paths with the site's HTML page, so anything that is not JSON means "no such item".
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

/** Write files under the project base, keeping existing ones unless asked. Returns what happened per file. */
/** True when `p` is `root` itself or inside it. */
const inside = (root, p) => p === root || p.startsWith(root + sep);

/** The real path of `p`, or of its nearest existing parent, so links are followed before we compare. */
function realish(p) {
  let dir = p;
  while (!existsSync(dir) && dirname(dir) !== dir) dir = dirname(dir);
  return resolve(realpathSync(dir), relative(dir, p));
}

/**
 * Where a registry file may be written: inside the project, never above it.
 * A registry is remote input (and --registry can point anywhere), so a path like "../../.zshrc",
 * an absolute path, or a symlinked folder that leads outside the project stops the whole install.
 */
function safeTarget(base, path) {
  const bad = (why) => fail(`The registry sent an unsafe file path (${why}): ${JSON.stringify(path)}. Nothing was written.`);
  if (typeof path !== "string" || !path.trim()) bad("empty");
  if (path.includes("\0")) bad("null byte");
  if (isAbsolute(path) || /^[a-zA-Z]:/.test(path) || path.startsWith("\\\\")) bad("absolute");
  if (path.split(/[\\/]+/).includes("..")) bad("goes up a folder");
  const root = resolve(base);
  const target = resolve(root, path);
  if (!inside(root, target) || target === root) bad("outside the project");
  if (!inside(realish(root), realish(target))) bad("a linked folder leads outside the project");
  if (existsSync(target) && lstatSync(target).isSymbolicLink()) bad("the file is a symlink");
  return target;
}

async function writeFiles(base, files) {
  // Check every path first, so a bad one stops the install before any file is touched.
  const targets = files.map((f) => safeTarget(base, f.path));
  const done = [];
  for (const [i, f] of files.entries()) {
    const target = targets[i];
    const shown = relative(cwd, target);
    if (existsSync(target) && !overwrite) {
      const same = readFileSync(target, "utf8") === f.content;
      if (same) {
        done.push([dim("same"), shown]);
        continue;
      }
      if (!(await confirm(`${shown} already exists and differs. Replace it?`, false))) {
        done.push([yellow("kept"), shown]);
        continue;
      }
    }
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, f.content);
    done.push([green("wrote"), shown]);
  }
  return done;
}

/* ── Commands ── */
async function init() {
  const { deps, base, pm } = project();
  say(bold("PlankUI") + dim(` init, into ${relative(cwd, base) || "."}`));
  if (!deps.tailwindcss) say(`${yellow("note")} Tailwind CSS v4 is not in package.json. PlankUI needs it: see the framework guides.`);
  if (!deps.react) fail("React is not in package.json. PlankUI is for React 19 projects.");
  const lib = libFlag ?? (await choose("Which primitives should the components use?", [
    { value: "radix", label: "Radix UI" },
    { value: "base", label: "Base UI" },
  ]));
  writeFileSync(settingsFile(), JSON.stringify({ ...settings(), primitives: lib }, null, 2) + "\n");
  say(`${green("saved")} plankui.json ${dim(`(components use ${lib === "base" ? "Base UI" : "Radix UI"})`)}`);
  const spec = await fetchJson("init");
  if (!spec) fail("The registry has no init file.");
  for (const [state, file] of await writeFiles(base, spec.files)) say(`${state} ${file}`);
  install(pm, spec.dependencies, deps);
  const css = relative(cwd, join(base, "styles.css"));
  say();
  say(bold("Two lines left to add:"));
  say(`  1. Import ${css} once in your entry file, for example:  ${green(`import "./styles.css";`)}`);
  say(`  2. Map ${green("@/*")} to ${relative(cwd, base) ? `${relative(cwd, base)}/*` : "./*"} in tsconfig "paths" and in your bundler's alias.`);
  say();
  say(`Then add components:  ${green("npx plankui@latest add button")}`);
}

async function add() {
  if (!names.length) fail("Name at least one component, for example: npx plankui@latest add button select");
  const { deps, base, pm } = project();
  if (!existsSync(join(base, "lib", "cn.ts"))) {
    say(`${yellow("note")} lib/cn.ts is missing. Run ${green("npx plankui@latest init")} first.`);
    if (!(await confirm("Add components anyway?", true))) process.exit(1);
  }
  // Resolve every PlankUI file the requested components build on.
  // With Base UI, each component comes from base/ when it has a Base UI version, otherwise the shared file.
  const lib = primitives();
  const queue = [...names.map((n) => n.toLowerCase())];
  const seen = new Map();
  while (queue.length) {
    const name = queue.shift();
    if (seen.has(name)) continue;
    let item = (lib === "base" ? await fetchJson(`base/${name}`) : null) ?? (await fetchJson(name));
    if (!item) fail(`No component called "${name}". Run ${green("npx plankui@latest list")} to see them all.`);
    const key = item.pro ? licenceKey() : null;
    if (key) item = (await fetchPro(name, key)) ?? item;
    seen.set(name, item);
    queue.push(...item.registryDependencies);
  }
  const items = [...seen.values()];
  const locked = items.filter((i) => i.pro && !i.files?.length);
  const free = items.filter((i) => i.files?.length);
  if (locked.length) {
    const what = `${locked.map((i) => i.title).join(", ")} ${locked.length === 1 ? "is" : "are"} part of PlankUI Pro.`;
    if (licenceKey()) say(`${yellow("pro")} ${what} The registry did not send ${locked.length === 1 ? "it" : "them"} for your key yet. Write to us if this keeps happening.`);
    else say(`${yellow("pro")} ${what} Activate your licence with ${green("npx plankui@latest login <key>")}, or get Pro at ${registry.replace(/\/r$/, "")}/pricing`);
  }
  if (!free.length) process.exit(locked.length ? 1 : 0);
  const extra = free.filter((i) => !names.includes(i.name)).map((i) => i.name);
  say(bold("PlankUI") + dim(` add ${free.map((i) => i.name).join(", ")}`) + (extra.length ? dim(` (needed by your picks: ${extra.join(", ")})`) : "") + (lib === "base" ? dim(", Base UI") : ""));
  for (const [state, file] of await writeFiles(base, free.flatMap((i) => i.files))) say(`${state} ${file}`);
  install(pm, free.flatMap((i) => i.dependencies), deps);
  say();
  const first = free.find((i) => names.includes(i.name)) ?? free[0];
  const pascal = first.name.replace(/(^|-)(\w)/g, (_, __, c) => c.toUpperCase());
  say(`Use it:  ${green(`import { ${pascal} } from "@/components/ui/${first.name}";`)}`);
  if (locked.length) process.exit(1);
}

async function list() {
  const index = await fetchJson("index");
  if (!index) fail("The registry has no index.");
  let category = "";
  for (const c of index) {
    if (c.category !== category) {
      category = c.category;
      say();
      say(bold(category));
    }
    say(`  ${c.name.padEnd(24)}${c.pro ? yellow("pro ") : "    "}${dim(c.description)}`);
  }
  say();
  say(`${index.length} components. Add one with ${green("npx plankui@latest add <name>")}`);
}

const help = () => {
  say(`${bold("plankui")} ${VERSION}: add PlankUI components to your React project.

${bold("Commands")}
  init                 Choose Radix UI or Base UI, write tokens.css, styles.css and the cn helper
  add <names...>       Copy components and every PlankUI file they build on, install their packages
  list                 Show every component
  login <key>          Save your PlankUI Pro licence key (once per machine)
  logout               Forget the saved licence key

${bold("Options")}
  --yes, -y            Answer every prompt with its default (keeps files that already exist)
  --overwrite          Replace files that already exist
  --no-install         Write files but skip installing npm packages
  --base, --radix      Use Base UI or Radix UI primitives (init saves the choice in plankui.json)
  --cwd <dir>          Run in another folder
  --registry <url>     Read components from another registry`);
};

if (flags.has("--version") || flags.has("-v")) say(VERSION);
else if (command === "init") await init();
else if (command === "add") await add();
else if (command === "list") await list();
else if (command === "login") await login();
else if (command === "logout") logout();
else help();
