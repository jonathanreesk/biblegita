"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { splitTerms, termById, type Term } from "@/lib/glossary";

// A small bottom sheet (a floating card on desktop) that explains a word in plain English.
export function TermSheet({ term, onClose, onOpen }: { term: Term; onClose: () => void; onOpen?: (t: Term) => void }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    ref.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      opener?.focus?.();
    };
  }, [onClose, term.id]);

  return (
    <div className="fixed inset-0 z-50" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label={`Meaning of ${term.term}`}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="sheet absolute inset-x-0 bottom-0 mx-auto flex max-w-lg flex-col gap-3 rounded-t-[28px] border border-line bg-surface p-6 shadow-lift outline-none lg:bottom-8 lg:rounded-[28px]"
        style={{ paddingBottom: "max(24px, env(safe-area-inset-bottom, 0px))" }}
      >
        <span className="label">In plain words</span>
        <div className="flex flex-col gap-0.5">
          <h3 className="text-[1.6rem]">{term.term}</h3>
          {term.say && <span className="font-label text-[.9rem] text-muted">Say it: {term.say}</span>}
        </div>
        <p className="text-[1.05rem] leading-relaxed">
          {splitTerms(term.plain, term.id).map((p, i) =>
            p.id && onOpen ? (
              <button key={i} type="button" className="term" onClick={() => onOpen(termById(p.id!)!)}>
                {p.text}
              </button>
            ) : (
              p.text
            ),
          )}
        </p>
        <div className="mt-1 flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="min-h-12 rounded-full border border-gospel bg-gospel px-6 py-3 font-label font-semibold text-surface shadow-soft active:scale-[.98]"
          >
            Got it
          </button>
          <Link
            href={`/glossary#${term.id}`}
            onClick={onClose}
            className="min-h-12 rounded-full border border-line px-5 py-3 font-label font-semibold text-ink no-underline"
          >
            Open glossary
          </Link>
        </div>
      </div>
    </div>
  );
}
