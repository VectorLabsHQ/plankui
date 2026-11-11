#!/usr/bin/env node
// PlankUI MCP server. Gives AI agents (Cursor, Claude Code, VS Code, Windsurf) the
// component list, source, props, usage, templates and setup files.
// Zero dependencies: speaks MCP's JSON-RPC over stdio, one message per line.
import { readFileSync } from "node:fs";
import { createInterface } from "node:readline";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const reg = JSON.parse(readFileSync(join(dirname(fileURLToPath(import.meta.url)), "registry.json"), "utf8"));
const PRO_NOTE = "This is a PlankUI Pro component. Its preview and API are open; the source comes with a Pro licence at https://plankui.com/pricing.";

const bySlug = (list, slug) => list.find((x) => x.slug === String(slug ?? "").toLowerCase().trim());
const pascal = (s) => s.replace(/(^|-)(\w)/g, (_, __, c) => c.toUpperCase());

/** Every PlankUI file a component needs, itself first, then what it builds on. */
function closure(slug, seen = new Set()) {
  if (seen.has(slug)) return seen;
  seen.add(slug);
  for (const u of bySlug(reg.components, slug)?.uses ?? []) closure(u, seen);
  return seen;
}

function componentDoc(c, withSource = true) {
  const files = [...closure(c.slug)];
  const deps = [...new Set(files.flatMap((s) => bySlug(reg.components, s)?.deps ?? []))];
  const props = c.props.map(([n, t, d, desc]) => `| \`${n}\` | \`${t}\` | ${d ? `\`${d}\`` : ""} | ${desc} |`).join("\n");
  let out = `# ${c.name}${c.pro ? " (Pro)" : ""}\n\n${c.description}\n\nCategory: ${c.category}\n\n## Install\n\n`;
  out += deps.length ? `\`\`\`bash\nnpm i ${deps.join(" ")}\n\`\`\`\n\n` : "No extra dependencies.\n\n";
  out += `Copy into \`src/components/ui/\`: ${files.map((f) => `\`${f}.tsx\``).join(", ")}.\n\n`;
  out += `## Usage\n\n\`\`\`tsx\nimport { ${pascal(c.slug)} } from "@/components/ui/${c.slug}";\n\n${c.usage}\n\`\`\`\n\n`;
  if (props) out += `## Props\n\n| Prop | Type | Default | Description |\n| --- | --- | --- | --- |\n${props}\n\n`;
  if (withSource) {
    for (const f of files) {
      const dep = bySlug(reg.components, f);
      out += `## src/components/ui/${f}.tsx\n\n`;
      out += dep?.source ? `\`\`\`tsx\n${dep.source}\n\`\`\`\n\n` : `${PRO_NOTE}\n\n`;
    }
  }
  return out;
}

const tools = {
  list_components: {
    description: "List every PlankUI component with its slug, category and one-line description. Call this first to see what exists.",
    inputSchema: { type: "object", properties: { category: { type: "string", description: "Optional: Actions, Forms, Overlays, Feedback, Display, Charts or Navigation." } } },
    run: ({ category }) => {
      const list = reg.components.filter((c) => !category || c.category.toLowerCase() === String(category).toLowerCase());
      return list.map((c) => `- ${c.slug} (${c.category}${c.pro ? ", Pro" : ""}): ${c.description}`).join("\n") || "No components in that category.";
    },
  },
  search_components: {
    description: "Find components by what they do, such as 'date range', 'chat input' or 'chart'.",
    inputSchema: { type: "object", properties: { query: { type: "string" } }, required: ["query"] },
    run: ({ query }) => {
      const words = String(query).toLowerCase().split(/\s+/).filter(Boolean);
      const hits = reg.components
        .map((c) => ({ c, score: words.filter((w) => `${c.slug} ${c.name} ${c.category} ${c.description}`.toLowerCase().includes(w)).length }))
        .filter((h) => h.score > 0).sort((a, b) => b.score - a.score).slice(0, 10);
      return hits.length ? hits.map(({ c }) => `- ${c.slug}: ${c.description}`).join("\n") : "Nothing matched. Try list_components.";
    },
  },
  get_component: {
    description: "Get one component: install command, every file it needs with full source, usage example and props.",
    inputSchema: { type: "object", properties: { slug: { type: "string", description: "Component slug, such as button or dialog." } }, required: ["slug"] },
    run: ({ slug }) => {
      const c = bySlug(reg.components, slug);
      return c ? componentDoc(c) : `No component "${slug}". Call list_components to see the slugs.`;
    },
  },
  get_component_usage: {
    description: "Get a component's usage example and props without the source. Lighter than get_component.",
    inputSchema: { type: "object", properties: { slug: { type: "string" } }, required: ["slug"] },
    run: ({ slug }) => {
      const c = bySlug(reg.components, slug);
      return c ? componentDoc(c, false) : `No component "${slug}".`;
    },
  },
  list_templates: {
    description: "List the complete screen templates, such as dashboard and sign-in.",
    inputSchema: { type: "object", properties: {} },
    run: () => reg.templates.map((t) => `- ${t.slug}${t.pro ? " (Pro)" : ""}: ${t.description} Uses ${t.uses.join(", ")}.`).join("\n"),
  },
  get_template: {
    description: "Get a template's full page source and the components it is built from.",
    inputSchema: { type: "object", properties: { slug: { type: "string" } }, required: ["slug"] },
    run: ({ slug }) => {
      const t = bySlug(reg.templates, slug);
      if (!t) return `No template "${slug}". Call list_templates.`;
      const head = `# ${t.name} template${t.pro ? " (Pro)" : ""}\n\n${t.description}\n\nComponents: ${t.uses.join(", ")}. Fetch each with get_component.\n\n`;
      return head + (t.source ? `## src/templates/${t.slug}.tsx\n\n\`\`\`tsx\n${t.source}\n\`\`\`` : PRO_NOTE);
    },
  },
  get_setup: {
    description: "Set PlankUI up in a React + Tailwind CSS v4 project: dependencies, tokens.css, styles.css and the cn helper.",
    inputSchema: { type: "object", properties: {} },
    run: () => {
      const s = reg.setup;
      let out = `# Set up PlankUI\n\n1. Install:\n\n\`\`\`bash\n${s.deps}\n${s.devDeps}\n\`\`\`\n\n2. Add the files below, then import \`styles.css\` once at your app's root. Map \`@/*\` to \`src/*\` in tsconfig.\n\n`;
      for (const [path, code] of Object.entries(s.files)) out += `## ${path}\n\n\`\`\`${path.endsWith(".css") ? "css" : "ts"}\n${code}\n\`\`\`\n\n`;
      return out + `## src/components/ui/menu-styles.ts\n\nShared by every dropdown.\n\n\`\`\`ts\n${s.menuStyles}\n\`\`\``;
    },
  },
  get_theming: {
    description: "Themes, component styles, accents and radius: the attributes and tokens that restyle PlankUI.",
    inputSchema: { type: "object", properties: {} },
    run: () =>
      `# Theming\n\nSet attributes on <html> or any subtree. Add class \`dark\` for dark mode.\n\n## data-theme\n${reg.themes.map((t) => `- ${t.id}: ${t.note} (font ${t.font}, default style ${t.style})`).join("\n")}\n\n## data-style\n${reg.styles.map((s) => `- ${s.id}: ${s.note}`).join("\n")}\n\n## data-accent\n${reg.accents.filter((a) => a.id !== "auto").map((a) => a.id).join(", ")}\n\n## Tokens\n--h, --c, --l set the accent in OKLCH. --radius-factor scales every corner (0 square, 1 default, 1.5 soft).\n\nExample: <html data-theme="ember" data-style="keycap" class="dark">`,
  },
};

/* ── JSON-RPC over stdio ── */
const send = (msg) => process.stdout.write(JSON.stringify({ jsonrpc: "2.0", ...msg }) + "\n");

function handle({ id, method, params = {} }) {
  switch (method) {
    case "initialize":
      return {
        protocolVersion: params.protocolVersion ?? "2025-06-18",
        capabilities: { tools: {} },
        serverInfo: { name: "plankui", version: reg.version },
        instructions: "PlankUI is a copy-paste React + Tailwind CSS v4 component library on Radix. Run get_setup once per project, then list_components or search_components, then get_component for each component you use. Import from @/components/ui/<slug>.",
      };
    case "ping":
      return {};
    case "tools/list":
      return { tools: Object.entries(tools).map(([name, t]) => ({ name, description: t.description, inputSchema: t.inputSchema })) };
    case "tools/call": {
      const tool = tools[params.name];
      if (!tool) throw Object.assign(new Error(`Unknown tool: ${params.name}`), { code: -32602 });
      return { content: [{ type: "text", text: tool.run(params.arguments ?? {}) }] };
    }
    default:
      if (id === undefined) return undefined; // a notification, such as notifications/initialized
      throw Object.assign(new Error(`Method not found: ${method}`), { code: -32601 });
  }
}

createInterface({ input: process.stdin }).on("line", (line) => {
  if (!line.trim()) return;
  let msg;
  try {
    msg = JSON.parse(line);
  } catch {
    return send({ id: null, error: { code: -32700, message: "Parse error" } });
  }
  try {
    const result = handle(msg);
    if (msg.id !== undefined) send({ id: msg.id, result });
  } catch (e) {
    if (msg.id !== undefined) send({ id: msg.id, error: { code: e.code ?? -32603, message: e.message } });
  }
});
