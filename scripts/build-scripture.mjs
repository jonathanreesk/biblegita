// Collects every scripture reference used in content/stations and saves the verse text
// to lib/scripture-data.json, so the site builds with no network.
//   Bible: ESV for any book found in data/esv/*.json (kept out of git; only quoted verses are saved),
//          otherwise the World English Bible (public domain), from github.com/TehShrike/world-english-bible
//   Gita:  Swami Sivananda's English translation, from github.com/gita/gita
// Run: node scripts/build-scripture.mjs
import fs from "node:fs";
import path from "node:path";
import { BARE_RE, REF_RE, keyFromBare, keyFromMatch, parseKey } from "../lib/scriptureRef.mjs";

const DIR = path.join(process.cwd(), "content", "stations");
const keys = new Set();
for (const f of fs.readdirSync(DIR)) {
  const text = fs.readFileSync(path.join(DIR, f), "utf8").replace(/<[^>]+>/g, "|");
  for (const m of text.matchAll(REF_RE())) keys.add(keyFromMatch(m));
  for (const m of text.matchAll(BARE_RE())) keys.add(keyFromBare(m));
}

const fileFor = (book) => (book === "Psalm" ? "psalms" : book.toLowerCase().replace(/\s+/g, ""));
// ESV books supplied locally: { "1 Peter": { 1: { 1: "text", ... } } }
const esv = {};
const ESV_DIR = path.join(process.cwd(), "data", "esv");
if (fs.existsSync(ESV_DIR)) {
  for (const f of fs.readdirSync(ESV_DIR).filter((f) => f.endsWith(".json") || f.endsWith(".txt"))) {
    const book = JSON.parse(fs.readFileSync(path.join(ESV_DIR, f), "utf8"));
    const chapters = {};
    for (const ch of book.text) {
      const n = Number(/\.(\d+)$/.exec(ch.ID)?.[1]);
      chapters[n] = {};
      for (const frag of ch.text) chapters[n][frag.ID] = ((chapters[n][frag.ID] ?? "") + " " + frag.text).trim();
    }
    esv[book.name] = chapters;
  }
}

const WEB = "https://raw.githubusercontent.com/TehShrike/world-english-bible/master/json/";
const cache = new Map();
async function bibleBook(book) {
  const name = fileFor(book.replace("Corinthians", "corinthians").replace("Thessalonians", "thessalonians").replace("Timothy", "timothy").replace("Peter", "peter"));
  if (!cache.has(name)) {
    const res = await fetch(`${WEB}${name}.json`);
    if (!res.ok) throw new Error(`${name}: ${res.status}`);
    cache.set(name, await res.json());
  }
  return cache.get(name);
}

const GITA = "https://raw.githubusercontent.com/gita/gita/main/data/";
const [gv, gt] = await Promise.all([fetch(GITA + "verse.json").then((r) => r.json()), fetch(GITA + "translation.json").then((r) => r.json())]);
const gitaText = (c, v) => {
  const verse = gv.find((x) => x.chapter_number === c && x.verse_number === v);
  const t = verse && gt.find((x) => x.verse_id === verse.id && x.lang === "english" && x.authorName === "Swami Sivananda");
  return t?.description.replace(/^\s*[\d.।]+\s*/, "").replace(/\s+/g, " ").trim();
};

const out = {};
for (const k of [...keys].sort()) {
  const r = parseKey(k);
  const verses = [];
  let tr = r.book === "Gita" ? "Sivananda" : "WEB";
  if (r.book === "Gita") {
    for (let v = r.from; v <= r.to; v++) verses.push({ n: v, text: gitaText(r.chapter, v) });
  } else if (esv[r.book]) {
    for (let v = r.from; v <= r.to; v++) verses.push({ n: v, text: esv[r.book][r.chapter]?.[v]?.replace(/\s+/g, " ").trim() });
    tr = "ESV";
  } else {
    const data = await bibleBook(r.book);
    const byVerse = new Map();
    for (const x of data) {
      if (x.chapterNumber !== r.chapter || !x.verseNumber || x.verseNumber < r.from || x.verseNumber > r.to || typeof x.value !== "string") continue;
      byVerse.set(x.verseNumber, (byVerse.get(x.verseNumber) ?? "") + x.value);
    }
    for (let v = r.from; v <= r.to; v++) verses.push({ n: v, text: byVerse.get(v)?.replace(/\s+/g, " ").trim() });
  }
  if (verses.some((v) => !v.text)) {
    console.warn("MISSING", k);
    continue;
  }
  out[k] = { t: tr, v: verses };
}
fs.writeFileSync(path.join(process.cwd(), "lib", "scripture-data.json"), JSON.stringify(out, null, 1) + "\n");
console.log(`${Object.keys(out).length} of ${keys.size} references saved`);
