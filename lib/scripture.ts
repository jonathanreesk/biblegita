import data from "./scripture-data.json";

export type Verse = { n: number; text: string };
export type Entry = { t: "WEB" | "ESV" | "Sivananda"; v: Verse[] };
export type VerseMap = Record<string, Entry>;

export const SCRIPTURE = data as VerseMap;

// Where the text comes from, shown on each verse card
const CREDIT = {
  Sivananda: "Translation by Swami Sivananda",
  WEB: "World English Bible, public domain",
  ESV: "ESV® Bible (The Holy Bible, English Standard Version®), © 2001 by Crossway, a publishing ministry of Good News Publishers. Used by permission. All rights reserved.",
};

export function sourceFor(key: string, t: Entry["t"]) {
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
