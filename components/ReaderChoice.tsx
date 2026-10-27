"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useProgress, type Reader } from "./Providers";

const OPTIONS: { v: Reader; title: string; text: string; icon: React.ReactNode }[] = [
  {
    v: "seeker",
    title: "I'm Hindu, or exploring",
    text: "and curious how the texts compare",
    // a compass: finding the way
    icon: (
      <>
        <circle cx="24" cy="24" r="13" fill="none" stroke="currentColor" strokeWidth="2.4" />
        <path d="M29.5 18.5l-3.6 7.4-7.4 3.6 3.6-7.4z" fill="currentColor" />
      </>
    ),
  },
  {
    v: "believer",
    title: "I follow Jesus",
    text: "and want to share Him with Hindu friends",
    // the cross
    icon: (
      <>
        <path d="M24 10v28M15 19h18" stroke="currentColor" strokeWidth="3.6" strokeLinecap="round" />
      </>
    ),
  },
];

// Asks who is reading. The same content shows for both; the framing around it adapts.
// "stacked" enlarges it on desktop; "big" enlarges it at every size.
const SIZES = {
  normal: { head: "", sub: "hidden", grid: "grid-cols-2", btn: "max-sm:relative max-sm:overflow-hidden max-sm:flex-col max-sm:items-start max-sm:gap-0.5", title: "", text: "", icon: "wm h-9 w-9" },
  stacked: {
    head: "lg:font-display lg:text-[1.75rem] lg:font-medium lg:normal-case lg:tracking-[-.01em] lg:text-ink lg:before:hidden",
    sub: "text-[.86rem] lg:text-[.95rem]",
    grid: "grid-cols-2 lg:grid-cols-1",
    btn: "max-sm:relative max-sm:overflow-hidden max-sm:flex-col max-sm:items-start max-sm:gap-0.5 lg:min-h-[92px] lg:gap-4 lg:border-2 lg:px-6 lg:py-4 lg:hover:-translate-y-0.5 lg:hover:shadow-soft",
    title: "lg:text-[1.4rem]",
    text: "lg:text-[.95rem]",
    icon: "wm h-9 w-9 lg:h-14 lg:w-14",
  },
  big: {
    head: "font-display text-[1.6rem] font-medium leading-tight tracking-[-.01em] text-ink",
    sub: "text-[.95rem]",
    grid: "grid-cols-1",
    btn: "min-h-[84px] gap-4 border-2 px-5 py-4 hover:-translate-y-0.5 hover:shadow-soft",
    title: "text-[1.3rem]",
    text: "text-[.92rem]",
    icon: "h-12 w-12",
  },
};

export function ReaderChoice({
  stacked = false,
  big = false,
  nudge = false,
  onChosen,
}: {
  stacked?: boolean; // one option per row on desktop, for a narrow column
  big?: boolean; // one option per row and large at every size, for the step gate
  nudge?: boolean; // asked to choose before going on
  onChosen?: (reader: Reader) => void;
}) {
  const { prefs, setPrefs, ready } = useProgress();
  if (!ready) return null;
  const z = SIZES[big ? "big" : stacked ? "stacked" : "normal"];
  const choose = (reader: Reader) => {
    setPrefs({ ...prefs, reader });
    onChosen?.(reader);
  };

  return (
    <section id="reader-choice" aria-labelledby="reader-q" className={`flex scroll-mt-24 flex-col gap-2.5 rounded-[24px] transition-shadow ${nudge ? "nudge-ring" : ""}`}>
      <span id="reader-q" className={big ? z.head : `label ${z.head}`}>
        Who is reading?
      </span>
      <p className={`-mt-1 text-muted ${z.sub}`}>Choose one, and the guide will speak to you as you read.</p>
      {nudge && (
        <p role="status" className="text-[.92rem] font-semibold text-gospel">
          First, tell us who is reading. Then we will begin.
        </p>
      )}
      <div role="group" aria-labelledby="reader-q" className={`grid gap-2.5 ${z.grid}`}>
        {OPTIONS.map((o) => {
          const on = prefs.reader === o.v;
          return (
            <button
              key={o.v}
              type="button"
              aria-pressed={on}
              onClick={() => choose(o.v)}
              className={`flex min-h-14 items-center gap-3 rounded-[20px] border px-3.5 py-3 text-left transition active:scale-[.98] ${z.btn} ${
                on ? "border-gospel bg-gospel-soft" : "border-line bg-page hover:border-gospel"
              }`}
            >
              <span className={`reader-icon ${o.v} ${z.icon}`} aria-hidden="true">
                <svg viewBox="0 0 48 48">{o.icon}</svg>
                {on && <i>✓</i>}
              </span>
              <span className="relative flex min-w-0 flex-col gap-0.5">
                <b className={`font-display text-[1.05rem] font-normal leading-tight ${z.title}`}>
                  {on && <span aria-hidden="true" className="text-gospel sm:hidden">✓ </span>}
                  {o.title}
                </b>
                <span className={`text-[.8rem] leading-snug text-muted ${z.text}`}>{o.text}</span>
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

// On a step: until the reader has chosen, the page waits, greyed out behind this question.
export function ReaderPrompt() {
  const { prefs, ready } = useProgress();
  const router = useRouter();
  const box = useRef<HTMLDivElement>(null);
  const open = ready && !prefs.reader;

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    box.current?.focus();
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[60] grid place-items-center p-4">
      <div className="absolute inset-0 bg-black/35 backdrop-blur-[3px] backdrop-grayscale" aria-hidden="true" />
      <div
        ref={box}
        role="dialog"
        aria-modal="true"
        aria-labelledby="reader-q"
        tabIndex={-1}
        style={{ outline: "none", borderRadius: 28 }}
        className="fade-in relative flex w-full max-w-[520px] flex-col gap-3 rounded-[28px] border border-line bg-surface p-6 shadow-lift outline-none sm:p-8"
      >
        <button
          type="button"
          onClick={() => router.push("/")}
          aria-label="Close and go back to the home page"
          className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-line bg-surface text-ink shadow-soft"
        >
          <span aria-hidden="true" className="text-lg leading-none">✕</span>
        </button>
        <ReaderChoice stacked big />
      </div>
    </div>
  );
}
