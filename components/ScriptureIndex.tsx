"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { PARTS, findStation } from "@/lib/stations";
import type { RefGroup } from "@/lib/content";
import type { VerseMap } from "@/lib/scripture";
import { REF_RE, keyFromMatch } from "@/lib/scriptureRef.mjs";
import { VerseSheet } from "./VerseSheet";

type Filter = "all" | "g" | "d";

export function ScriptureIndex({ groups, verses }: { groups: RefGroup[]; verses: VerseMap }) {
  const [open, setOpen] = useState<{ key: string; stationId: string } | null>(null);
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    return groups
      .map((g) => ({
        ...g,
        refs: g.refs.filter(
          (r) => (filter === "all" || r.kind === filter) && (!query || r.text.toLowerCase().includes(query)),
        ),
      }))
      .filter((g) => g.refs.length > 0);
  }, [groups, q, filter]);

  const options: { v: Filter; label: string }[] = [
    { v: "all", label: "All" },
    { v: "g", label: "Bible" },
    { v: "d", label: "Gita and Vedas" },
  ];

  return (
    <div className="fade-in stack">
      <span className="label">Every reference in the guide</span>
      <h2>Verse index</h2>
      <input
        id="vsearch"
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search a book or verse, like John 14 or Gita 18"
        aria-label="Search references"
        className="w-full rounded-full border border-line bg-surface px-5 py-3 text-base shadow-soft text-ink placeholder:text-muted"
      />
      <div role="group" aria-label="Filter by scripture" className="inline-flex flex-wrap gap-0.5 self-start rounded-full border border-line bg-surface p-1 shadow-soft">
        {options.map((o) => (
          <button
            key={o.v}
            type="button"
            aria-pressed={filter === o.v}
            onClick={() => setFilter(o.v)}
            className={`min-h-10 rounded-full px-4 py-2 font-label text-[.88rem] font-semibold ${
              filter === o.v ? "bg-gospel text-surface" : "text-muted"
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>
      <p className="note">Tap a reference to read the verse.</p>

      <div>
        {results.length === 0 && <p className="py-5 text-muted">No references match. Try a book name like Romans or Gita.</p>}
        {results.map((g) => {
          const s = findStation(g.stationId)!;
          return (
            <div key={g.stationId} className="flex flex-col gap-2 border-b border-line py-3.5">
              <h4 className="m-0 font-label text-[.8rem] font-semibold uppercase tracking-[.08em] text-muted">
                {PARTS[s.part].title} · {s.title}
              </h4>
              <div className="flex flex-wrap gap-2">
                {g.refs.map((r) => {
                  const m = REF_RE().exec(r.text);
                  const key = m ? keyFromMatch(m) : null;
                  const cls = `rounded-full border bg-surface px-3 py-1.5 font-label text-[.88rem] font-semibold no-underline ${
                    r.kind === "g" ? "border-gospel text-gospel" : r.kind === "d" ? "border-dharma text-dharma" : "border-line text-muted"
                  }`;
                  return key && verses[key] ? (
                    <button key={r.text} type="button" onClick={() => setOpen({ key, stationId: s.id })} className={cls}>
                      {r.text}
                    </button>
                  ) : (
                    <Link key={r.text} href={`/journey/${s.id}`} className={cls}>
                      {r.text}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      {open && (
        <VerseSheet
          refKey={open.key}
          entry={verses[open.key]}
          onClose={() => setOpen(null)}
          usedIn={{ href: `/journey/${open.stationId}`, title: findStation(open.stationId)?.title ?? "" }}
        />
      )}
    </div>
  );
}
