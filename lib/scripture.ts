import data from "./scripture-data.json";

export type Verse = { n: number; text: string };
export type VerseMap = Record<string, Verse[]>;

export const SCRIPTURE = data as VerseMap;

// Where the text comes from, shown on each verse card
export function sourceFor(key: string) {
  return key.startsWith("Gita ")
    ? { book: "Bhagavad Gita", credit: "Translation by Swami Sivananda", url: (k: string) => gitaUrl(k) }
    : { book: "Bible", credit: "World English Bible, public domain", url: (k: string) => bibleUrl(k) };
}

function gitaUrl(key: string) {
  const m = /Gita (\d+):(\d+)/.exec(key)!;
  return `https://www.holy-bhagavad-gita.org/chapter/${m[1]}/verse/${m[2]}`;
}

// Opens the passage in the NIV on Bible Gateway, so readers can compare translations
function bibleUrl(key: string) {
  return `https://www.biblegateway.com/passage/?search=${encodeURIComponent(key)}&version=NIV`;
}
