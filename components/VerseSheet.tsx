"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { sourceFor, type Entry } from "@/lib/scripture";

// A bottom sheet (a floating card on desktop) that shows the verse itself.
export function VerseSheet({
  refKey,
  entry,
  onClose,
  usedIn,
}: {
  refKey: string;
  entry: Entry;
  onClose: () => void;
  usedIn?: { href: string; title: string };
}) {
  const ref = useRef<HTMLDivElement>(null);
  const src = sourceFor(refKey, entry.t);
  const verses = entry.v;
  const gita = src.book === "Bhagavad Gita";

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    ref.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      opener?.focus?.();
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label={refKey}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="sheet absolute inset-x-0 bottom-0 mx-auto flex max-h-[85vh] max-w-lg flex-col gap-3 overflow-y-auto rounded-t-[28px] border border-line bg-surface p-6 shadow-lift outline-none lg:bottom-8 lg:rounded-[28px]"
        style={{ paddingBottom: "max(24px, env(safe-area-inset-bottom, 0px))" }}
      >
        <span className="label">{src.book}</span>
        <h3 className="text-[1.6rem]">{refKey.replace(/^Gita/, "Gita")}</h3>
        <blockquote className={`m-0 flex flex-col gap-2 border-l-[3px] pl-4 text-[1.05rem] leading-relaxed ${gita ? "border-dharma" : "border-gospel"}`}>
          {verses.map((v) => (
            <p key={v.n}>
              {verses.length > 1 && <sup className="mr-1.5 font-label text-[.7rem] font-semibold text-muted">{v.n}</sup>}
              {v.text}
            </p>
          ))}
        </blockquote>
        <span className="font-label text-[.78rem] leading-snug text-muted">{src.credit}</span>
        <div className="mt-1 flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="min-h-12 rounded-full border border-gospel bg-gospel px-6 py-3 font-label font-semibold text-surface shadow-soft active:scale-[.98]"
          >
            Got it
          </button>
          {usedIn && (
            <Link href={usedIn.href} onClick={onClose} className="min-h-12 rounded-full border border-line px-5 py-3 font-label font-semibold text-ink no-underline">
              See where it is used
            </Link>
          )}
          <a
            href={src.url(refKey)}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-12 rounded-full px-3 py-3 font-label text-[.9rem] font-semibold"
          >
            {gita ? "Read the full chapter" : "Read in the NIV"} ↗
          </a>
        </div>
      </div>
    </div>
  );
}
