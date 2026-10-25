"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { neighbors } from "@/lib/stations";
import { useProgress } from "./Providers";

export function StationView({ id, html }: { id: string; html: string }) {
  const router = useRouter();
  const { done, toggle } = useProgress();
  const { prev, next } = neighbors(id);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const isDone = !!done[id];

  useEffect(() => {
    window.scrollTo(0, 0);
    if (prev) router.prefetch(`/journey/${prev.id}`);
    if (next) router.prefetch(`/journey/${next.id}`);
  }, [id, prev, next, router]);

  // Arrow keys move along the journey on desktop
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).closest("input, textarea")) return;
      if (e.key === "ArrowRight" && next) router.push(`/journey/${next.id}`);
      if (e.key === "ArrowLeft" && prev) router.push(`/journey/${prev.id}`);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next, router]);

  // Swipe on phones, ignoring swipes inside scrollable diagrams and tables
  const onTouchStart = (e: React.TouchEvent) => {
    if ((e.target as HTMLElement).closest(".diagram, .tablewrap")) {
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
      <section key={id} id={id} className="station fade-in" dangerouslySetInnerHTML={{ __html: html }} />

      <nav aria-label="Journey navigation" className="mt-9 grid grid-cols-1 gap-2.5 border-t border-line pt-5 sm:grid-cols-[1fr_auto_1fr]">
        {prev ? (
          <Link
            href={`/journey/${prev.id}`}
            className="flex min-h-11 flex-col items-start rounded-xl border border-line bg-surface px-4 py-3 font-label font-semibold text-ink no-underline"
          >
            <small className="text-[.7rem] uppercase tracking-[.08em] opacity-75">Previous</small>
            <span>{prev.title}</span>
          </Link>
        ) : (
          <span className="hidden sm:block" />
        )}
        <button
          type="button"
          onClick={() => toggle(id)}
          aria-pressed={isDone}
          className={`min-h-11 rounded-xl border px-4 py-3 font-label font-semibold transition ${
            isDone ? "border-gospel bg-gospel-soft text-gospel" : "border-line bg-surface text-ink"
          }`}
        >
          {isDone ? "Completed ✓" : "Mark complete"}
        </button>
        {next ? (
          <Link
            href={`/journey/${next.id}`}
            className="flex min-h-11 flex-col items-end rounded-xl border border-gospel bg-gospel px-4 py-3 text-right font-label font-semibold text-surface no-underline"
          >
            <small className="text-[.7rem] uppercase tracking-[.08em] opacity-75">Next</small>
            <span>{next.title}</span>
          </Link>
        ) : (
          <Link
            href="/"
            className="flex min-h-11 flex-col items-end rounded-xl border border-gospel bg-gospel px-4 py-3 text-right font-label font-semibold text-surface no-underline"
          >
            <small className="text-[.7rem] uppercase tracking-[.08em] opacity-75">Finished</small>
            <span>Back to home</span>
          </Link>
        )}
      </nav>
      <p className="mt-2.5 text-center font-label text-[.78rem] text-muted lg:hidden">Swipe left or right to move along the journey</p>
    </div>
  );
}
