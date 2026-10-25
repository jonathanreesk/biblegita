"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { GLOSSARY, SIDE_LABEL, type Side } from "@/lib/glossary";
import { findStation } from "@/lib/stations";

const FILTERS: { v: Side | "all"; label: string }[] = [
  { v: "all", label: "All" },
  { v: "hindu", label: "Hindu" },
  { v: "christian", label: "Christian" },
  { v: "logic", label: "Reasoning" },
];

export function GlossaryView({ appears }: { appears: Record<string, string[]> }) {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<Side | "all">("all");

  const items = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return [...GLOSSARY]
      .sort((a, b) => a.term.localeCompare(b.term))
      .filter((t) => filter === "all" || t.side === filter)
      .filter((t) => !needle || `${t.term} ${t.plain} ${t.match.join(" ")}`.toLowerCase().includes(needle));
  }, [q, filter]);

  // Jump to a term when arriving from a definition sheet (#id)
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;
    const el = document.getElementById(id);
    el?.scrollIntoView({ block: "center" });
    el?.classList.add("flash");
  }, []);

  return (
    <div className="fade-in stack">
      <span className="label">Hard words, plain English</span>
      <h2>Glossary</h2>
      <p className="lede">
        Every unfamiliar word in the guide, explained the way you would to a friend over coffee. While reading, tap any
        underlined word to see its meaning without leaving the page.
      </p>
      <input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search a word, like karma or Trinity"
        aria-label="Search the glossary"
        className="w-full rounded-full border border-line bg-surface px-5 py-3 text-base text-ink shadow-soft placeholder:text-muted"
      />
      <div role="group" aria-label="Filter by topic" className="inline-flex flex-wrap gap-0.5 self-start rounded-full border border-line bg-surface p-1 shadow-soft">
        {FILTERS.map((o) => (
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

      {items.length === 0 && <p className="py-5 text-muted">No words match. Try a shorter search.</p>}
      <ul className="m-0 flex list-none flex-col gap-3 p-0">
        {items.map((t) => (
          <li key={t.id} id={t.id} className="term-card flex scroll-mt-24 flex-col gap-2 rounded-[22px] border border-line bg-surface p-5 shadow-soft">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
              <h3 className="text-[1.3rem]">{t.term}</h3>
              {t.say && <span className="font-label text-[.85rem] text-muted">{t.say}</span>}
            </div>
            <p>{t.plain}</p>
            <div className="flex flex-wrap items-center gap-2">
              <span className={`chip ${t.side === "christian" ? "g" : t.side === "hindu" ? "d" : ""}`} style={t.side === "logic" ? { background: "var(--sand)", color: "var(--muted)" } : undefined}>
                {SIDE_LABEL[t.side]}
              </span>
              {(appears[t.id] ?? []).map((sid) => (
                <Link key={sid} href={`/journey/${sid}`} className="inline-flex min-h-9 items-center rounded-full bg-sand px-3.5 py-1.5 font-label text-[.82rem] font-semibold no-underline">
                  {findStation(sid)?.title}
                </Link>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
