// Plain-English definitions for the words a newcomer is likely to trip on.
// `match` lists the exact spellings found in the content (case-sensitive, longest wins).
// Only the first appearance of each term on a page is underlined, so pages stay calm.

export type Side = "hindu" | "christian" | "logic";

export type Term = {
  id: string;
  term: string;
  say?: string; // how to pronounce it, in plain syllables
  plain: string; // one or two sentences, no jargon
  side: Side;
  match: string[];
};

export const SIDE_LABEL: Record<Side, string> = {
  hindu: "Hindu thought",
  christian: "Christian words",
  logic: "Ways of reasoning",
};

export const GLOSSARY: Term[] = [
  // Schools of Hindu thought
  { id: "advaita", term: "Advaita (non-dualism)", say: "ad-VY-tuh", side: "hindu", match: ["Advaita", "Advaitins", "Advaitin", "non-dualism"],
    plain: "The school that teaches there is only one ultimate reality, Brahman. Seeing yourself as separate from it, or the world as made of many separate things, is a kind of mistake the wise see through. The name means \"not two\"." },
  { id: "vishishtadvaita", term: "Vishishtadvaita (qualified non-dualism)", say: "vi-SHISH-tuh-ad-VY-tuh", side: "hindu", match: ["qualified non-dualism", "Vishishtadvaita"],
    plain: "A middle view: God and souls are one reality, yet souls stay distinct, like a body and the person living in it. It treats God as truly personal and is taught by Ramanuja." },
  { id: "dvaita", term: "Dvaita (dualism)", say: "DVY-tuh", side: "hindu", match: ["Dvaita", "dualism"],
    plain: "The school that teaches God and souls are two different, eternal things. God is the Lord and souls depend on him forever. The name means \"two\"." },
  { id: "monism", term: "Monism", say: "MON-iz-um", side: "logic", match: ["monism"],
    plain: "The belief that everything is ultimately one thing, so the many differences we see are not the final truth." },
  { id: "pluralism", term: "Pluralism", say: "PLOOR-uh-liz-um", side: "logic", match: ["pluralism"],
    plain: "The belief that many different religions can all be equally true paths to the same God." },
  { id: "vedanta", term: "Vedanta", say: "vay-DAHN-tuh", side: "hindu", match: ["Vedanta"],
    plain: "A big family of Hindu schools that build their teaching on the Upanishads, the Gita and a short summary text. Advaita and Dvaita are both Vedanta schools." },
  { id: "brahman", term: "Brahman", say: "BRAH-mun", side: "hindu", match: ["Brahman"],
    plain: "In Hindu philosophy, the ultimate reality: the one infinite source and ground of everything." },
  { id: "nirguna", term: "Nirguna Brahman", say: "nir-GOO-nuh", side: "hindu", match: ["Nirguna Brahman", "Nirguna"],
    plain: "Ultimate reality \"without qualities\": beyond any description, with no personality, no love and no will." },
  { id: "saguna", term: "Saguna Brahman", say: "suh-GOO-nuh", side: "hindu", match: ["Saguna Brahman", "Saguna"],
    plain: "Ultimate reality \"with qualities\": God as a personal Lord who can be known, loved and worshipped." },
  { id: "ishvara", term: "Ishvara", say: "ISH-vuh-ruh", side: "hindu", match: ["Ishvara"],
    plain: "\"The Lord\": God seen as a personal ruler and creator." },
  { id: "maya", term: "Maya", say: "MAH-yah", side: "hindu", match: ["Maya", "MAYA"],
    plain: "In Advaita, the veil that makes the one reality look like many separate things. It is often translated \"illusion\", though thinkers say it is more like an appearance than a lie. In the Gita it is also God's own mysterious power." },
  { id: "anirvachaniya", term: "Anirvachaniya", say: "uh-nir-vuh-CHUH-nee-yuh", side: "hindu", match: ["anirvachaniya"],
    plain: "\"Cannot be put into words\": a way Advaita describes the world, as neither fully real nor fully unreal." },
  { id: "atman", term: "Atman", say: "AHT-mun", side: "hindu", match: ["atman", "Atman"],
    plain: "The true self or soul inside every person. Advaita says it is the same as Brahman." },
  { id: "purusha", term: "Purusha", say: "POO-roo-shuh", side: "hindu", match: ["Purusha"],
    plain: "\"Person\" or spirit. In some texts it names the cosmic person from whom the world comes." },
  { id: "samsara", term: "Samsara", say: "sum-SAH-ruh", side: "hindu", match: ["samsara"],
    plain: "The endless cycle of birth, death and rebirth that a soul is caught in until it is set free." },
  { id: "karma", term: "Karma", say: "KAR-muh", side: "hindu", match: ["karma"],
    plain: "\"Action\", and the idea that every action has a result that comes back to you, in this life or a later one." },
  { id: "rebirth", term: "Rebirth", side: "hindu", match: ["rebirth"],
    plain: "The belief that after death a soul is born again in a new body, shaped by what it did before." },
  { id: "moksha", term: "Moksha", say: "MOKE-shuh", side: "hindu", match: ["moksha"],
    plain: "Liberation: being set free from the cycle of rebirth. It is the highest goal in most Hindu paths." },
  { id: "dharma", term: "Dharma", say: "DAR-muh", side: "hindu", match: ["dharma"],
    plain: "Duty and the right way to live. It means doing what is right for your role and station in life." },
  { id: "bhakti", term: "Bhakti", say: "BUCK-tee", side: "hindu", match: ["bhakti"],
    plain: "Loving devotion to a personal God. It is the path of trust and worship rather than knowledge or ritual." },
  { id: "puja", term: "Puja", say: "POO-jah", side: "hindu", match: ["puja"],
    plain: "Worship done with offerings such as flowers, light and food, usually before an image or at a home shrine." },
  { id: "papa", term: "Papa", say: "PAH-puh", side: "hindu", match: ["papa"],
    plain: "Sin or wrongdoing, in the sense of an action that harms you and others and gathers bad karma." },
  { id: "prapatti", term: "Prapatti", say: "pruh-PUH-tee", side: "hindu", match: ["prapatti"],
    plain: "Complete surrender to God, trusting him to save instead of trying to earn it." },
  { id: "yuga", term: "Yuga", say: "YOO-guh", side: "hindu", match: ["Yugas", "Yuga"],
    plain: "One of four ages in a cosmic cycle that repeats forever. We are said to live in the last, the Kali Yuga." },

  // Texts and people
  { id: "pandavas", term: "Pandavas", say: "PAHN-duh-vuhs", side: "hindu", match: ["Pandavas"],
    plain: "The five royal brothers at the center of the Mahabharata, led by Yudhishthira. Arjuna is one of them." },
  { id: "kauravas", term: "Kauravas", say: "KOW-ruh-vuhs", side: "hindu", match: ["Kauravas"],
    plain: "The hundred cousins of the Pandavas, led by Duryodhana, who fight them for the throne." },
  { id: "kurukshetra", term: "Kurukshetra", say: "koo-roo-SHAY-truh", side: "hindu", match: ["Kurukshetra"],
    plain: "The battlefield where the great war of the Mahabharata is fought and where the Gita is spoken." },
  { id: "ahimsa", term: "Ahimsa", say: "uh-HIM-sah", side: "hindu", match: ["ahimsa"],
    plain: "Non-harm: the principle of not hurting any living being. It is one of the highest values in Hindu, Buddhist and Jain thought." },
  { id: "kshatriya", term: "Kshatriya", say: "KSHAT-ree-yuh", side: "hindu", match: ["Kshatriya"],
    plain: "The warrior and ruler class in traditional Hindu society, the role Arjuna holds." },
  { id: "gita", term: "Bhagavad Gita", say: "BUG-uh-vud GEE-tah", side: "hindu", match: ["Bhagavad Gita", "Gita"],
    plain: "\"Song of the Lord\": a 700-verse conversation between the warrior Arjuna and Krishna just before a battle. It is the best-loved Hindu scripture." },
  { id: "mahabharata", term: "Mahabharata", say: "muh-hah-BAH-ruh-tuh", side: "hindu", match: ["Mahabharata"],
    plain: "A huge ancient epic poem about a war inside one royal family. The Gita is one short section within it." },
  { id: "parva", term: "Parva", say: "PAR-vuh", side: "hindu", match: ["Parva"],
    plain: "A \"book\" or major section of the Mahabharata." },
  { id: "upanishads", term: "Upanishads", say: "oo-PAN-ih-shads", side: "hindu", match: ["Upanishads", "Upanishad"],
    plain: "Philosophical texts at the end of the Vedas that explore what ultimate reality is and who we really are. Vedanta schools build on them." },
  { id: "brahmin", term: "Brahmin", say: "BRAH-min", side: "hindu", match: ["Brahmin", "Brahmins"],
    plain: "The priestly class in traditional Hindu society, historically the keepers of the Vedas." },
  { id: "sanskrit", term: "Sanskrit", say: "SAN-skrit", side: "hindu", match: ["Sanskrit"],
    plain: "The ancient sacred language of the Vedas and the Gita. Few people speak it today, so most read these texts in translation." },
  { id: "veda", term: "Veda", say: "VAY-duh", side: "hindu", match: ["Vedas", "Veda's", "Veda"],
    plain: "The oldest Hindu sacred texts: hymns, prayers and rituals, passed on by memory for centuries before being written." },
  { id: "rigveda", term: "Rig Veda", say: "RIG VAY-duh", side: "hindu", match: ["Rig Veda"],
    plain: "The oldest of the Vedas: a collection of over a thousand hymns to the gods." },
  { id: "sukta", term: "Sukta", say: "SOOK-tuh", side: "hindu", match: ["Sukta"],
    plain: "A single hymn in the Vedas." },
  { id: "sutra", term: "Sutra", say: "SOO-truh", side: "hindu", match: ["Sutra"],
    plain: "A very short saying packed with meaning, written to be memorised and then explained by a teacher." },
  { id: "shruti", term: "Shruti", say: "SHROO-tee", side: "hindu", match: ["Shruti"],
    plain: "\"What is heard\": the Vedas, seen as revealed truth, with fixed wording that must not be changed." },
  { id: "smriti", term: "Smriti", say: "SMRIH-tee", side: "hindu", match: ["Smriti"],
    plain: "\"What is remembered\": the epics, laws and stories handed down by tradition. Unlike Shruti, they can be retold and adapted." },
  { id: "arjuna", term: "Arjuna", say: "AR-joo-nuh", side: "hindu", match: ["Arjuna"],
    plain: "The warrior prince in the Gita who freezes before a battle against his own relatives and asks Krishna what to do." },
  { id: "krishna", term: "Krishna", say: "KRISH-nuh", side: "hindu", match: ["Krishna"],
    plain: "Arjuna's charioteer and guide in the Gita. Many Hindus worship him as God himself, appearing in human form." },
  { id: "vaishnava", term: "Vaishnava", say: "VISH-nuh-vuh", side: "hindu", match: ["Vaishnava"],
    plain: "A follower of Vishnu, or of Krishna and Rama, who are seen as his appearances." },
  { id: "theistic", term: "Theistic", say: "thee-IS-tik", side: "logic", match: ["Theistic"],
    plain: "Believing in a personal God who knows and loves, not just an impersonal force." },
  { id: "shankara", term: "Shankara", say: "SHUN-kuh-ruh", side: "hindu", match: ["Shankara's", "Shankara"],
    plain: "An eighth-century teacher who gave Advaita its classic form." },
  { id: "ramanuja", term: "Ramanuja", say: "rah-MAH-noo-juh", side: "hindu", match: ["Ramanuja"],
    plain: "An eleventh-century teacher of the \"qualified\" view, in which God is personal and souls are his devoted servants." },
  { id: "madhva", term: "Madhva", say: "MUDH-vuh", side: "hindu", match: ["Madhva"],
    plain: "A thirteenth-century teacher of the view that God and souls are eternally separate." },

  // Ways of reasoning
  { id: "apologetic", term: "Apologetics", say: "uh-pol-uh-JET-iks", side: "logic", match: ["apologetic"],
    plain: "Giving clear, reasoned answers for why you believe what you believe. \"Apology\" here means defence, not saying sorry." },
  { id: "equivocation", term: "Equivocation", say: "ih-kwiv-uh-KAY-shun", side: "logic", match: ["equivocation"],
    plain: "Using one word in two different senses in the same argument, so it seems to prove more than it does." },
  { id: "regress", term: "Infinite regress", say: "REE-gress", side: "logic", match: ["infinite regress"],
    plain: "A chain of \"because\" that never reaches a start. If every cause needs an earlier cause forever, nothing is ever finally explained." },
  { id: "noncontradiction", term: "Non-contradiction", side: "logic", match: ["non-contradiction"],
    plain: "The basic rule of thought that two opposite claims cannot both be true in the same way at the same time." },
  { id: "exnihilo", term: "Ex nihilo", say: "eks NEE-hee-loh", side: "logic", match: ["ex nihilo"],
    plain: "Latin for \"out of nothing\": the Christian teaching that God made the world without using anything already there." },

  // Christian words
  { id: "gospel", term: "Gospel", side: "christian", match: ["gospel"],
    plain: "\"Good news\": that Jesus died to forgive our sins and rose again, so anyone can be made right with God." },
  { id: "incarnation", term: "Incarnation", say: "in-kar-NAY-shun", side: "christian", match: ["Incarnation"],
    plain: "God becoming a real human being in Jesus, once, and for good." },
  { id: "trinity", term: "Trinity", side: "christian", match: ["Trinity"],
    plain: "The Christian teaching that there is one God in three persons: Father, Son and Holy Spirit, who have loved each other forever." },
  { id: "lamb", term: "The Lamb", side: "christian", match: ["Lamb"],
    plain: "A name for Jesus, who like the Passover lamb gives His life so that others go free from judgment." },
  { id: "passover", term: "Passover", side: "christian", match: ["Passover"],
    plain: "The Jewish feast remembering how God rescued His people from slavery in Egypt, when a lamb's blood marked the homes He passed over." },
  { id: "torah", term: "Torah", say: "TOR-uh", side: "christian", match: ["Torah"],
    plain: "The first five books of the Bible, the foundation of Jewish scripture." },
  { id: "septuagint", term: "Septuagint", say: "sep-TOO-uh-jint", side: "christian", match: ["Septuagint"],
    plain: "An ancient Greek translation of the Hebrew Old Testament, made about 250 years before Jesus." },
  { id: "masoretic", term: "Masoretic text", say: "mass-uh-RET-ik", side: "christian", match: ["Masoretic"],
    plain: "The standard Hebrew text of the Old Testament, carefully copied by Jewish scribes over the centuries." },
  { id: "inerrancy", term: "Inerrancy", say: "in-AIR-un-see", side: "christian", match: ["inerrancy"],
    plain: "The Christian teaching that the Bible, as God originally gave it, is true and without error in everything it affirms." },
  { id: "sinaiticus", term: "Codex Sinaiticus", say: "sy-NAY-ih-tik-us", side: "christian", match: ["Codex Sinaiticus", "Sinaiticus"],
    plain: "A Greek Bible copied by hand around AD 350 and found at St Catherine's Monastery on Mount Sinai. It contains the complete New Testament and is one of the oldest and best-known manuscripts." },
  { id: "vaticanus", term: "Codex Vaticanus", say: "vat-ih-KAY-nus", side: "christian", match: ["Codex Vaticanus", "Vaticanus"],
    plain: "Another very early Greek Bible, about the same age as Codex Sinaiticus, kept in the Vatican Library." },
  { id: "canon", term: "Canon", side: "christian", match: ["canon"],
    plain: "The official list of books accepted as scripture." },
  { id: "messiah", term: "Messiah", say: "meh-SY-uh", side: "christian", match: ["Messiah"],
    plain: "The promised king and rescuer sent by God. \"Christ\" is the same word in Greek, and Christians believe Jesus is the Messiah." },
  { id: "covenant", term: "Covenant", side: "christian", match: ["covenant"],
    plain: "A solemn, binding promise between God and His people. The Bible speaks of an old covenant with Israel and a new one through Jesus." },
  { id: "grace", term: "Grace", side: "christian", match: ["grace"],
    plain: "A gift you do not earn: God's kindness and forgiveness given freely." },
  { id: "righteous", term: "Righteous", side: "christian", match: ["righteous"],
    plain: "Right and good in God's sight, with nothing held against you." },
];

const BY_ID = new Map(GLOSSARY.map((t) => [t.id, t]));
export const termById = (id: string) => BY_ID.get(id);

// Splits plain text into pieces, turning glossary words into links (used inside definitions).
const lookup = new Map<string, string>();
for (const t of GLOSSARY) for (const m of t.match) lookup.set(m, t.id);
const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const pattern = new RegExp(`(?<![A-Za-z0-9])(${[...lookup.keys()].sort((a, b) => b.length - a.length).map(esc).join("|")})(?![A-Za-z0-9])`, "g");

export type Piece = { text: string; id?: string };

export function splitTerms(text: string, selfId?: string): Piece[] {
  const out: Piece[] = [];
  let last = 0;
  for (const m of text.matchAll(pattern)) {
    const id = lookup.get(m[0])!;
    if (id === selfId) continue;
    if (m.index! > last) out.push({ text: text.slice(last, m.index) });
    out.push({ text: m[0], id });
    last = m.index! + m[0].length;
  }
  if (last < text.length) out.push({ text: text.slice(last) });
  return out;
}
