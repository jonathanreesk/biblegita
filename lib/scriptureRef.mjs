// Finds and normalises scripture references like "2 Thess 1:9" or "Gita 4:36-37".
// Plain JS so both the Next.js build and scripts/build-scripture.mjs can import it.

const BOOKS = {
  Gita: "Gita",
  Genesis: "Genesis", Gen: "Genesis",
  Exodus: "Exodus",
  Deuteronomy: "Deuteronomy",
  Jeremiah: "Jeremiah",
  Isaiah: "Isaiah",
  Job: "Job",
  Samuel: "Samuel",
  Nehemiah: "Nehemiah",
  Colossians: "Colossians",
  Philippians: "Philippians",
  Psalm: "Psalm",
  Zephaniah: "Zephaniah",
  Micah: "Micah",
  Malachi: "Malachi",
  Ezekiel: "Ezekiel",
  Matthew: "Matthew",
  Mark: "Mark",
  Luke: "Luke",
  John: "John",
  Acts: "Acts",
  Romans: "Romans", Rom: "Romans",
  Corinthians: "Corinthians", Cor: "Corinthians",
  Galatians: "Galatians",
  Ephesians: "Ephesians",
  Hebrews: "Hebrews", Heb: "Hebrews",
  Peter: "Peter",
  Revelation: "Revelation", Rev: "Revelation",
  Thessalonians: "Thessalonians", Thess: "Thessalonians",
  Timothy: "Timothy", Tim: "Timothy",
  James: "James",
};

const names = Object.keys(BOOKS).sort((a, b) => b.length - a.length).join("|");
const source = `(?<![A-Za-z0-9])((?:[123] )?(?:${names}))\\.? (\\d{1,3}):(\\d{1,3})(?:[-–](\\d{1,3}))?(?![0-9])`;

export const REF_RE = () => new RegExp(source, "g");
// A bare "(18:64-65)" in the text is a Gita verse
export const BARE_RE = () => /\((\d{1,2}):(\d{1,3})(?:[-–](\d{1,3}))?\)/g;

const key = (book, c, a, b) => `${book} ${c}:${a}${b && b !== a ? `-${b}` : ""}`;

/** Canonical key for a regex match from REF_RE, e.g. "2 Thess 1:9" -> "2 Thessalonians 1:9". */
export function keyFromMatch(m) {
  const full = m[1].replace(/^([123]) /, "$1 ");
  const num = /^[123] /.test(full) ? full.slice(0, 2) : "";
  const word = full.slice(num.length);
  return key(num + BOOKS[word], m[2], m[3], m[4]);
}

export const keyFromBare = (m) => key("Gita", m[1], m[2], m[3]);

/** "John 3:16-17" -> { book: "John", chapter: 3, from: 16, to: 17 } */
export function parseKey(k) {
  const m = /^((?:[123] )?[A-Za-z]+) (\d+):(\d+)(?:-(\d+))?$/.exec(k);
  if (!m) return null;
  return { book: m[1], chapter: +m[2], from: +m[3], to: +(m[4] ?? m[3]) };
}
