"use client";

import { useEffect, useRef, useState } from "react";
import { AskQuestion } from "./AskQuestion";

// A small floating "Ask" button, so a question can be asked from anywhere in a step.
// It steps aside while the full question card at the end of the step is on screen.
export function AskFab({ step, path }: { step: string; path: string }) {
  const [open, setOpen] = useState(false);
  const [cardVisible, setCardVisible] = useState(false);
  const sheet = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = document.getElementById("ask-card");
    if (!card) return;
    const io = new IntersectionObserver(([e]) => setCardVisible(e.isIntersecting), { threshold: 0.1 });
    io.observe(card);
    return () => io.disconnect();
  }, [path]);

  useEffect(() => {
    if (!open) return;
    const opener = document.activeElement as HTMLElement | null;
    sheet.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      opener?.focus?.();
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-label="Ask a question about this step"
        className={`fixed right-4 z-30 inline-flex h-12 items-center gap-2 rounded-full border border-gospel bg-gospel px-5 font-label text-[.92rem] font-semibold text-surface shadow-lift transition-[opacity,transform] duration-300 active:scale-[.97] lg:right-8 ${
          cardVisible || open ? "pointer-events-none translate-y-3 opacity-0" : "opacity-100"
        }`}
        style={{ bottom: "calc(72px + env(safe-area-inset-bottom, 0px))" }}
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" />
          <path d="M9.6 9.5a2.5 2.5 0 0 1 4.8 1c0 1.6-2.4 2-2.4 3.2M12 16.5h.01" />
        </svg>
        Ask
      </button>
      {open && (
        <div className="fixed inset-0 z-50" onClick={() => setOpen(false)}>
          <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
          <div
            ref={sheet}
            role="dialog"
            aria-modal="true"
            aria-label="Ask a question"
            tabIndex={-1}
            onClick={(e) => e.stopPropagation()}
            className="sheet absolute inset-x-0 bottom-0 mx-auto max-h-[90vh] max-w-lg overflow-y-auto rounded-t-[28px] border border-line bg-surface p-6 shadow-lift outline-none lg:bottom-8 lg:rounded-[28px]"
            style={{ paddingBottom: "max(24px, env(safe-area-inset-bottom, 0px))" }}
          >
            <AskQuestion step={step} path={path} startOpen card={false} onClose={() => setOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}
