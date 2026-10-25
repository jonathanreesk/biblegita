// Server-only: wraps every mention of a glossary term in a tap-to-define button.
import { GLOSSARY } from "./glossary";
import { BARE_RE, REF_RE, keyFromBare, keyFromMatch } from "./scriptureRef.mjs";
import { SCRIPTURE } from "./scripture";

const VOID = new Set(["br", "hr", "img", "input", "meta", "link", "path", "circle", "rect", "line", "ellipse"]);
const SKIP_TAGS = new Set(["svg", "h1", "h2", "h3", "h4", "a", "button", "script", "style"]);
const SKIP_CLASS = /\bclass="[^"]*\b(label|ref|chip|head)\b/;

const EXPLORE: Record<string, string> = {
  "The Hindu claim": "What this tradition teaches",
  "The apologetic argument": "The question this raises",
  "Expect this reply": "A thoughtful reply",
  "Your strongest answer": "How the Bible answers",
  "How to speak the warning": "A gentle way to say it",
  "Expect these questions": "Questions you may have",
};

const lookup = new Map<string, string>();
for (const t of GLOSSARY) for (const m of t.match) lookup.set(m, t.id);

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const alternation = [...lookup.keys()].sort((a, b) => b.length - a.length).map(escape).join("|");
const WORD = alternation ? new RegExp(`(?<![A-Za-z0-9])(${alternation})(?![A-Za-z0-9])`, "g") : null;

export function annotate(html: string): { html: string; used: string[]; refs: string[] } {
  const used = new Set<string>();
  const refs = new Set<string>();
  if (!WORD) return { html, used: [], refs: [] };
  // Terms placed by hand in the content count as already explained
  for (const m of html.matchAll(/data-term="([a-z]+)"/g)) used.add(m[1]);
  const stack: { name: string; skip: boolean }[] = [];
  // Headings that coach a Christian get a friendlier twin for everyone else (toggled in Settings)
  const html1 = html.replace(/<h4>([^<]+)<\/h4>/g, (all, label: string) => {
    const open = EXPLORE[label];
    return open ? `<h4><span class="for-share">${label}</span><span class="for-explore">${open}</span></h4>` : all;
  });
  // Reference chips become buttons that open the verse
  const prepared = html1.replace(/<span class="ref( g| d)?">([^<]+)<\/span>/g, (all, kind = "", text: string) => {
    const m = REF_RE().exec(text.trim());
    const key = m && keyFromMatch(m);
    if (!key || !SCRIPTURE[key]) return all;
    refs.add(key);
    return `<button type="button" class="ref${kind} verse" data-ref="${key}" aria-haspopup="dialog">${text}</button>`;
  });
  const out = prepared.split(/(<[^>]+>)/g).map((part) => {
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
    if (!part.trim()) return part;
    const skips = stack.filter((s) => s.skip);
    // Inside a diagram only verse references are linked (as tappable text), not glossary words
    if (skips.length === 1 && skips[0].name === "svg") return linkScripture(part, refs, (t) => t, svgWrap);
    if (skips.length) return part;
    return linkScripture(part, refs, (text) =>
      text.replace(WORD, (match: string) => {
        const id = lookup.get(match)!;
        used.add(id);
        return `<button type="button" class="term" data-term="${id}" aria-haspopup="dialog">${match}</button>`;
      }),
    );
  });
  return { html: out.join(""), used: [...used], refs: [...refs] };
}

// Wraps scripture references in a text segment; the rest goes through `rest` (glossary words).
const buttonWrap = (shown: string, key: string) =>
  `<button type="button" class="verse" data-ref="${key}" aria-haspopup="dialog">${shown}</button>`;
const svgWrap = (shown: string, key: string) =>
  `<tspan class="verse" data-ref="${key}" role="button" tabindex="0" aria-haspopup="dialog">${shown}</tspan>`;

function linkScripture(text: string, refs: Set<string>, rest: (t: string) => string, wrap = buttonWrap): string {
  const found: { start: number; end: number; key: string; from: number }[] = [];
  for (const m of text.matchAll(REF_RE())) found.push({ start: m.index!, end: m.index! + m[0].length, key: keyFromMatch(m), from: 0 });
  for (const m of text.matchAll(BARE_RE())) {
    // Only the numbers inside the parentheses are linked
    found.push({ start: m.index! + 1, end: m.index! + m[0].length - 1, key: keyFromBare(m), from: 0 });
  }
  found.sort((a, b) => a.start - b.start);
  let out = "";
  let last = 0;
  for (const f of found) {
    if (f.start < last || !SCRIPTURE[f.key]) continue;
    refs.add(f.key);
    out += rest(text.slice(last, f.start));
    out += wrap(text.slice(f.start, f.end), f.key);
    last = f.end;
  }
  return out + rest(text.slice(last));
}
