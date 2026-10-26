// Server-only helpers: read station content from content/stations at build time.
import fs from "node:fs";
import path from "node:path";
import { annotate } from "./annotate";
import { STATIONS } from "./stations";

const DIR = path.join(process.cwd(), "content", "stations");

export function getStationHtml(id: string): string {
  return fs.readFileSync(path.join(DIR, `${id}.html`), "utf8");
}

export type Ref = { text: string; kind: "g" | "d" | "" };
export type RefGroup = { stationId: string; refs: Ref[] };

// Collects every scripture reference chip (<span class="ref g|d">) per station.
export function getAllRefs(): RefGroup[] {
  return STATIONS.map((s) => {
    const html = getStationHtml(s.id);
    const re = /<span class="ref(?: (g|d))?">([^<]+)<\/span>/g;
    const seen = new Set<string>();
    const refs: Ref[] = [];
    let m: RegExpExecArray | null;
    while ((m = re.exec(html))) {
      const text = m[2].trim();
      if (seen.has(text)) continue;
      seen.add(text);
      refs.push({ text, kind: (m[1] as "g" | "d") ?? "" });
    }
    return { stationId: s.id, refs };
  }).filter((g) => g.refs.length > 0);
}

// Which stations mention each glossary term (for the "Where it appears" links).
export function getTermStations(): Record<string, string[]> {
  const map: Record<string, string[]> = {};
  for (const s of STATIONS) {
    for (const id of annotate(getStationHtml(s.id)).used) (map[id] ??= []).push(s.id);
  }
  return map;
}

// Rough reading time per step, at a comfortable 230 words a minute (diagrams excluded).
export function getReadMinutes(): Record<string, number> {
  const out: Record<string, number> = {};
  for (const s of STATIONS) {
    const text = getStationHtml(s.id).replace(/<svg[\s\S]*?<\/svg>/g, " ").replace(/<[^>]+>/g, " ");
    out[s.id] = Math.max(1, Math.ceil(text.split(/\s+/).filter(Boolean).length / 230));
  }
  return out;
}
