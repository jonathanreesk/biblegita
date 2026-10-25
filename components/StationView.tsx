"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { neighbors } from "@/lib/stations";
import { useProgress } from "./Providers";
import { TermSheet, type TermInfo } from "./TermSheet";

export function StationView({ id, html, terms }: { id: string; html: string; terms: TermInfo[] }) {
  const router = useRouter();
  const { done, toggle } = useProgress();
  const { prev, next } = neighbors(id);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const isDone = !!done[id];
  const [open, setOpen] = useState<TermInfo | null>(null);
  const close = useCallback(() => setOpen(null), []);

  // Words in the text are buttons with data-term; one listener handles them all
  const onContentClick = (e: React.MouseEvent) => {
    const btn = (e.target as HTMLElement).closest<HTMLElement>("button.term");
    if (!btn) return;
    const t = terms.find((x) => x.id === btn.dataset.term);
    if (t) setOpen(t);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (prev) router.prefetch(`/journey/${prev.id}`);
    if (next) router.prefetch(`/journey/${next.id}`);
  }, [id, prev, next, router]);

  // Arrow keys move along the journey on desktop
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (open || (e.target as HTMLElement).closest("input, textarea")) return;
      if (e.key === "ArrowRight" && next) router.push(`/journey/${next.id}`);
      if (e.key === "ArrowLeft" && prev) router.push(`/journey/${prev.id}`);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next, router, open]);

  // Swipe on phones, ignoring swipes inside scrollable diagrams and tables
  const onTouchStart = (e: React.TouchEvent) => {
    if ((e.target as HTMLElement).closest(".diagram, .tablewrap, [role=dialog]")) {
      touch.current = null;
      return;
    }
    touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touch.current) return;
    const dx = e.changedTouches[0].clientX - touch.current.x;
    const dy = e.changedTouches[0].clientY - touch.current.y;
    touch.current = null;
    if (Math.abs(dx) < 70 || Math.abs(dy) > Math.abs(dx) * 0.6) return;
    const target = dx < 0 ? next : prev;
    if (target) router.push(`/journey/${target.id}`);
  };

  return (
    <div onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <section key={id} id={id} className="station fade-in" onClick={onContentClick} dangerouslySetInnerHTML={{ __html: html }} />
      {open && <TermSheet term={open} onClose={close} />}

      <nav aria-label="Journey navigation" className="mt-9 flex flex-col gap-3 border-t border-line pt-5">
        <button
          type="button"
          onClick={() => toggle(id)}
          aria-pressed={isDone}
          className={`min-h-12 self-center rounded-full border px-7 py-3 font-label font-semibold transition hover:-translate-y-0.5 active:scale-[.98] ${
            isDone ? "border-gospel bg-gospel-soft text-gospel" : "border-line bg-surface text-ink shadow-soft"
          }`}
        >
          {isDone ? "Completed ✓" : "Mark complete"}
        </button>
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
            className="flex min-h-14 min-w-0 flex-col items-end justify-center rounded-[20px] border border-gospel bg-gospel px-4 py-2.5 text-right font-label font-semibold text-surface no-underline shadow-soft transition hover:-translate-y-0.5"
          >
            <small className="text-[.7rem] uppercase tracking-[.08em] opacity-80">{next ? "Next →" : "Finished"}</small>
            <span className="line-clamp-2 w-full text-[.9rem] leading-tight">{next ? next.title : "Back to home"}</span>
          </Link>
        </div>
      </nav>
      <p className="mt-2.5 text-center font-label text-[.78rem] text-muted lg:hidden">Swipe left or right to move along the journey</p>
    </div>
  );
}
