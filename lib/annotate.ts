// Server-only: wraps every mention of a glossary term in a tap-to-define button.
import { GLOSSARY } from "./glossary";

const VOID = new Set(["br", "hr", "img", "input", "meta", "link", "path", "circle", "rect", "line", "ellipse"]);
const SKIP_TAGS = new Set(["svg", "h1", "h2", "h3", "h4", "a", "button", "script", "style"]);
const SKIP_CLASS = /\bclass="[^"]*\b(label|ref|chip|head)\b/;

const lookup = new Map<string, string>();
for (const t of GLOSSARY) for (const m of t.match) lookup.set(m, t.id);

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const alternation = [...lookup.keys()].sort((a, b) => b.length - a.length).map(escape).join("|");
const WORD = alternation ? new RegExp(`(?<![A-Za-z0-9])(${alternation})(?![A-Za-z0-9])`, "g") : null;

export function annotate(html: string): { html: string; used: string[] } {
  const used = new Set<string>();
  if (!WORD) return { html, used: [] };
  // Terms placed by hand in the content count as already explained
  for (const m of html.matchAll(/data-term="([a-z]+)"/g)) used.add(m[1]);
  const stack: { name: string; skip: boolean }[] = [];
  const out = html.split(/(<[^>]+>)/g).map((part) => {
    if (part.startsWith("<")) {
      const m = /^<(\/?)([a-zA-Z0-9]+)/.exec(part);
      if (!m) return part;
      const [, closing, raw] = m;
      const name = raw.toLowerCase();
      if (closing) {
        const i = stack.map((s) => s.name).lastIndexOf(name);
        if (i >= 0) stack.length = i;
      } else if (!VOID.has(name) && !part.endsWith("/>")) {
        stack.push({ name, skip: SKIP_TAGS.has(name) || SKIP_CLASS.test(part) });
      }
      return part;
    }
    if (stack.some((s) => s.skip) || !part.trim()) return part;
    return part.replace(WORD, (match: string) => {
      const id = lookup.get(match)!;
      used.add(id);
      return `<button type="button" class="term" data-term="${id}" aria-haspopup="dialog">${match}</button>`;
    });
  });
  return { html: out.join(""), used: [...used] };
}
