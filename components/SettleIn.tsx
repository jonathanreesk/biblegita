"use client";

import { useEffect, useRef } from "react";

// Shown once, before the first step: what this guide is, how long it takes, and that there is no rush.
export function SettleIn({ total, onReady, onClose }: { total: string; onReady: () => void; onClose: () => void }) {
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    box.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[60] grid place-items-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/35 backdrop-blur-[3px]" aria-hidden="true" />
      <div
        ref={box}
        role="dialog"
        aria-modal="true"
        aria-labelledby="settle-title"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        style={{ outline: "none", borderRadius: 28 }}
        className="fade-in relative flex max-h-[92svh] w-full max-w-[480px] flex-col gap-4 overflow-y-auto border border-line bg-surface p-6 text-center shadow-lift sm:p-8"
      >
        <svg className="cup settle-art mx-auto h-auto w-full max-w-[260px]" viewBox="0 0 240 130" aria-hidden="true">
          <ellipse cx="120" cy="118" rx="112" ry="9" fill="var(--sand)" />
          {/* an open book */}
          <path d="M20 108c18-8 38-8 56 0V64c-18-8-38-8-56 0z" fill="var(--gospel-soft)" stroke="var(--gospel)" strokeWidth="2" strokeLinejoin="round" />
          <path d="M76 108c18-8 38-8 56 0V64c-18-8-38-8-56 0z" fill="var(--gospel-soft)" stroke="var(--gospel)" strokeWidth="2" strokeLinejoin="round" />
          <path d="M30 76c10-3 26-3 36 0M30 86c10-3 26-3 36 0M86 76c10-3 26-3 36 0M86 86c10-3 26-3 36 0" stroke="var(--gospel)" strokeOpacity=".45" strokeWidth="1.6" strokeLinecap="round" fill="none" />
          {/* a cup of chai, steaming */}
          <g className="steam" fill="none" stroke="var(--dharma)" strokeWidth="2.6" strokeLinecap="round">
            <path d="M166 58c-4-6 4-9 0-16" />
            <path d="M180 58c-4-6 4-9 0-16" />
            <path d="M194 58c-4-6 4-9 0-16" />
          </g>
          <path d="M152 66h56v12a28 28 0 0 1-56 0z" fill="var(--amber)" />
          <path d="M157 71h46" stroke="var(--surface)" strokeOpacity=".45" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M208 71h5a9 9 0 0 1 0 18h-7" fill="none" stroke="var(--amber)" strokeWidth="4" strokeLinecap="round" />
          <path d="M146 110h68" stroke="var(--dharma)" strokeWidth="3.4" strokeLinecap="round" />
        </svg>

        <h2 id="settle-title" className="text-[1.9rem]">Settle in</h2>
        <p className="text-[1rem] leading-relaxed text-muted">
          This guide sets the Hindu texts beside the Bible, one step at a time, and asks the same honest questions of both. Pour a cup of chai or coffee, find a quiet spot, and take your time.
        </p>

        <ul className="m-0 grid list-none grid-cols-2 gap-2.5 p-0 text-left">
          <li className="rounded-[18px] bg-sand px-4 py-3">
            <b className="block font-display text-[1.15rem] font-normal leading-tight text-ink">About {total}</b>
            <span className="text-[.84rem] leading-snug text-muted">in all, a few minutes a step</span>
          </li>
          <li className="rounded-[18px] bg-sand px-4 py-3">
            <b className="block font-display text-[1.15rem] font-normal leading-tight text-ink">Come back anytime</b>
            <span className="text-[.84rem] leading-snug text-muted">pick any step from the list</span>
          </li>
        </ul>

        <button
          type="button"
          onClick={onReady}
          className="inline-flex min-h-14 w-full items-center justify-center rounded-full border border-gospel bg-gospel px-6 font-label text-[1.02rem] font-semibold text-surface shadow-soft transition hover:-translate-y-0.5 hover:bg-gospel-deep active:scale-[.98]"
        >
          I'm ready
        </button>
        <button type="button" onClick={onClose} className="-mt-1 font-label text-[.9rem] font-semibold text-muted">
          Not now
        </button>
      </div>
    </div>
  );
}
