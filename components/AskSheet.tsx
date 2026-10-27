"use client";

import { useEffect, useRef } from "react";
import { AskQuestion } from "./AskQuestion";

// The question form as a bottom sheet (a floating card on desktop).
export function AskSheet({ step, path, onClose }: { step?: string; path: string; onClose: () => void }) {
  const sheet = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    sheet.current?.focus();
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
        ref={sheet}
        role="dialog"
        aria-modal="true"
        aria-label="Ask a question"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="sheet absolute inset-x-0 bottom-0 mx-auto max-h-[90vh] max-w-lg overflow-y-auto rounded-t-[28px] border border-line bg-surface p-6 shadow-lift outline-none lg:bottom-8 lg:rounded-[28px]"
        style={{ paddingBottom: "max(24px, env(safe-area-inset-bottom, 0px))" }}
      >
        <AskQuestion step={step} path={path} startOpen card={false} onClose={onClose} />
      </div>
    </div>
  );
}
