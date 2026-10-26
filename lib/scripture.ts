import data from "./scripture-data.json";
import hindu from "./hindu-sources.json";

export type Verse = { n: number; text: string };
// "Summary" entries are Hindu texts: a plain-English summary, with the Sanskrit where we have it
export type Entry = { t: "WEB" | "ESV" | "Sivananda" | "Summary"; v: Verse[]; book?: string; sa?: string; note?: string; src?: string; quote?: string; tr?: string };
export type VerseMap = Record<string, Entry>;

type Source = { book: string; summary: string; sa?: string; note?: string; src: string; quote?: string; tr?: string };
const HINDU: VerseMap = Object.fromEntries(
  Object.entries(hindu as Record<string, Source>).map(([k, e]) => [
    k,
    { t: "Summary", v: [{ n: 1, text: e.summary }], book: e.book, sa: e.sa, note: e.note, src: e.src, quote: e.quote, tr: e.tr },
  ]),
);

export const SCRIPTURE: VerseMap = { ...(data as VerseMap), ...HINDU };

// Where the text comes from, shown on each verse card
const CREDIT = {
  Sivananda: "Translation by Swami Sivananda",
  WEB: "World English Bible, public domain",
  ESV: "ESV® Bible (The Holy Bible, English Standard Version®), © 2001 by Crossway, a publishing ministry of Good News Publishers. Used by permission. All rights reserved.",
};

export function sourceFor(key: string, entry: Entry): { book: string; credit: string; url: ((k: string) => string) | null } {
  const t = entry.t;
  if (t === "Summary")
    return { book: entry.book ?? "Hindu texts", credit: entry.quote ? `Translation: ${entry.tr}.` : `Summary written for this guide. To read the full text, see ${entry.src}.`, url: null };
  return key.startsWith("Gita ")
    ? { book: "Bhagavad Gita", credit: CREDIT[t], url: (k: string) => gitaUrl(k) }
    : { book: "Bible", credit: CREDIT[t], url: (k: string) => bibleUrl(k) };
}

function gitaUrl(key: string) {
  const m = /Gita (\d+):(\d+)/.exec(key)!;
  return `https://www.holy-bhagavad-gita.org/chapter/${m[1]}/verse/${m[2]}`;
}

// Opens the passage in the NIV on Bible Gateway, so readers can compare translations
function bibleUrl(key: string) {
  return `https://www.biblegateway.com/passage/?search=${encodeURIComponent(key)}&version=NIV`;
}
