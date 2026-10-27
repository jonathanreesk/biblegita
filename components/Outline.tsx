"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { PARTS, STATIONS } from "@/lib/stations";

type Props = { pathname: string; done: Record<string, boolean>; onNavigate?: () => void; showDesc?: boolean; minutes?: Record<string, number> };

// The journey outline: every part and step in order, with the current step highlighted.
export function OutlineList({ pathname, done, onNavigate, showDesc, minutes }: Props) {
  return (
    <>
      {PARTS.map((p, pi) => (
        <div key={p.title} className="flex flex-col gap-0.5">
          <h5 className="mx-2.5 mb-1 mt-3.5 font-label text-[.72rem] font-semibold uppercase tracking-[.09em] text-muted">{p.title}</h5>
          {showDesc && <p className="mx-2.5 mb-1 text-[.8rem] leading-snug text-muted">{p.desc}</p>}
          {STATIONS.filter((s) => s.part === pi).map((s) => {
            const current = pathname === `/journey/${s.id}`;
            const isDone = !!done[s.id];
            return (
              <Link
                key={s.id}
                href={`/journey/${s.id}`}
                onClick={onNavigate}
                aria-current={current ? "page" : undefined}
                className={`flex items-center gap-2.5 rounded-xl px-3 py-2 text-[.92rem] leading-snug no-underline transition-colors ${
                  current ? "bg-gospel-soft text-gospel" : "text-ink hover:bg-page"
                }`}
              >
                <span
                  className={`grid h-6 w-6 flex-none place-items-center rounded-full border font-label text-[.75rem] font-semibold ${
                    isDone ? "border-gospel bg-gospel text-surface" : current ? "border-gospel text-gospel" : "border-line text-muted"
                  }`}
                >
                  {isDone ? "✓" : s.n}
                </span>
                <span className="min-w-0 flex-1">{s.title}</span>
                {minutes?.[s.id] && <span className="flex-none font-label text-[.72rem] text-muted">{minutes[s.id]} min</span>}
              </Link>
            );
          })}
        </div>
      ))}
    </>
  );
}

// A side panel for phones: where you are, and every other step, one tap away.
export function OutlineDrawer({ open, onClose, pathname, done, minutes }: { open: boolean; onClose: () => void; pathname: string; done: Record<string, boolean>; minutes?: Record<string, number> }) {
  const panel = useRef<HTMLDivElement>(null);
  const count = STATIONS.filter((s) => done[s.id]).length;

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panel.current?.focus();
    panel.current?.querySelector('[aria-current="page"]')?.scrollIntoView({ block: "center" });
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 lg:hidden" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-label="Journey outline"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="outline-panel absolute right-0 top-0 flex h-full w-[88%] max-w-[380px] flex-col border-l border-line bg-surface shadow-lift outline-none"
        style={{ paddingTop: "env(safe-area-inset-top, 0px)", paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      >
        <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-4">
          <div className="flex flex-col">
            <strong className="font-display text-[1.25rem] font-normal">Outline</strong>
            <span className="font-label text-[.8rem] text-muted">
              {count} of {STATIONS.length} chapters done
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close outline"
            className="grid h-10 w-10 place-items-center rounded-full border border-line bg-surface text-ink shadow-soft"
          >
            <span aria-hidden="true" className="text-lg leading-none">✕</span>
          </button>
        </div>
        <div className="flex flex-1 flex-col gap-1 overflow-y-auto px-3.5 pb-8 pt-1">
          <OutlineList pathname={pathname} done={done} onNavigate={onClose} showDesc minutes={minutes} />
        </div>
      </div>
    </div>
  );
}
