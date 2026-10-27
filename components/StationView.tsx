"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { neighbors } from "@/lib/stations";
import { useProgress } from "./Providers";
import { termById, type Term } from "@/lib/glossary";
import { findStation } from "@/lib/stations";
import { Reflect } from "./Reflect";
import { ReaderPrompt } from "./ReaderChoice";
import { AskQuestion } from "./AskQuestion";
import type { VerseMap } from "@/lib/scripture";
import { TermSheet } from "./TermSheet";
import { VerseSheet } from "./VerseSheet";

export function StationView({ id, html, verses, ask = false }: { id: string; html: string; verses: VerseMap; ask?: boolean }) {
  const router = useRouter();
  const { complete } = useProgress();
  const { prev, next } = neighbors(id);
  const station = findStation(id);
  const [open, setOpen] = useState<Term | null>(null);
  const [verse, setVerse] = useState<string | null>(null);
  const close = useCallback(() => {
    setOpen(null);
    setVerse(null);
  }, []);

  // Words in the text are buttons with data-term; one listener handles them all
  const onContentClick = (e: React.MouseEvent) => {
    const v = (e.target as HTMLElement).closest<HTMLElement>(".verse[data-ref]");
    if (v?.dataset.ref) return setVerse(v.dataset.ref);
    const btn = (e.target as HTMLElement).closest<HTMLElement>("button.term, tspan.term");
    if (!btn) return;
    const t = termById(btn.dataset.term ?? "");
    if (t) setOpen(t);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (prev) router.prefetch(`/journey/${prev.id}`);
    if (next) router.prefetch(`/journey/${next.id}`);
  }, [id, prev, next, router]);

  // Highlight the in-page tab for the section being read. Elements are looked up on every
  // scroll because the page content can be re-rendered after the first paint.
  useEffect(() => {
    const update = () => {
      const links = Array.from(document.querySelectorAll<HTMLAnchorElement>(".jump a[href^='#']"));
      if (!links.length) return;
      const targets = links.map((l) => document.getElementById(l.hash.slice(1))).filter(Boolean) as HTMLElement[];
      let current = targets[0];
      for (const t of targets) if (t.getBoundingClientRect().top <= 150) current = t;
      links.forEach((l) => l.classList.toggle("on", l.hash === `#${current?.id}`));
      // keep the active tab visible in the scrolling tab bar
      const active = links.find((l) => l.classList.contains("on"));
      const bar = active?.parentElement;
      if (active && bar) bar.scrollTo({ left: active.offsetLeft - bar.clientWidth / 2 + active.clientWidth / 2, behavior: "smooth" });
    };
    const first = window.setTimeout(update, 120);
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      window.clearTimeout(first);
      window.removeEventListener("scroll", update);
    };
  }, [id]);

  // Wide diagrams open scrolled to the part that matters (data-focus is a fraction of the width)
  useEffect(() => {
    const focus = () =>
      document.querySelectorAll<HTMLElement>(".diagram[data-focus]").forEach((d) => {
        if (d.scrollWidth > d.clientWidth) d.scrollLeft = Number(d.dataset.focus) * d.scrollWidth - d.clientWidth / 2;
      });
    const t1 = window.setTimeout(focus, 150);
    const t2 = window.setTimeout(focus, 700);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [id]);

  // Arrow keys move along the journey on desktop
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (open || verse || (e.target as HTMLElement).closest("input, textarea")) return;
      if (e.key === "ArrowRight" && next) router.push(`/journey/${next.id}`);
      if (e.key === "ArrowLeft" && prev) router.push(`/journey/${prev.id}`);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next, router, open, verse]);

  // Verse references inside diagrams are tspans, so Enter and Space open them too
  const onContentKey = (e: React.KeyboardEvent) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    const target = (e.target as HTMLElement).closest<HTMLElement>("tspan.verse[data-ref], tspan.term[data-term]");
    if (!target) return;
    e.preventDefault();
    if (target.dataset.ref) return setVerse(target.dataset.ref);
    const t = termById(target.dataset.term ?? "");
    if (t) setOpen(t);
  };

  return (
    <div>
      <ReaderPrompt />
      <section key={id} id={id} className="station fade-in" onClick={onContentClick} onKeyDown={onContentKey} dangerouslySetInnerHTML={{ __html: html }} />
      {station && (
        <section aria-labelledby={`recap-${id}`} className="mt-9 flex flex-col gap-3 rounded-[24px] border border-line bg-surface p-5 shadow-soft">
          <span id={`recap-${id}`} className="label">In short</span>
          <p className="text-[1.02rem] leading-relaxed">{station.recap}</p>
        </section>
      )}
      {station?.reflect && <Reflect id={id} prompt={station.reflect} seeker={station.reflectSeeker} />}
      {ask && station && <AskQuestion step={`${station.n}. ${station.title}`} path={`/journey/${id}`} />}
      {verse && verses[verse] && <VerseSheet refKey={verse} entry={verses[verse]} onClose={close} />}
      {open && <TermSheet term={open} onClose={close} onOpen={setOpen} />}

      <nav aria-label="Journey navigation" className="mt-9 flex flex-col gap-3 border-t border-line pt-5">
        <div className="grid grid-cols-2 gap-2.5">
          {prev ? (
            <Link
              href={`/journey/${prev.id}`}
              className="flex min-h-14 min-w-0 flex-col items-start justify-center rounded-[20px] border border-line bg-surface px-4 py-2.5 font-label font-semibold text-ink no-underline shadow-soft transition hover:-translate-y-0.5"
            >
              <small className="text-[.7rem] uppercase tracking-[.08em] opacity-75">← Previous</small>
              <span className="line-clamp-2 w-full text-[.9rem] leading-tight">{prev.title}</span>
            </Link>
          ) : (
            <span />
          )}
          <Link
            href={next ? `/journey/${next.id}` : "/"}
            onClick={() => complete(id)}
            className="flex min-h-14 min-w-0 flex-col items-end justify-center rounded-[20px] border border-gospel bg-gospel px-4 py-2.5 text-right font-label font-semibold text-surface no-underline shadow-soft transition hover:-translate-y-0.5"
          >
            <small className="text-[.7rem] uppercase tracking-[.08em] opacity-80">{next ? "Next →" : "Finished"}</small>
            <span className="line-clamp-2 w-full text-[.9rem] leading-tight">{next ? next.title : "Back to home"}</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
