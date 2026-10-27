"use client";

import { useProgress, type Reader } from "./Providers";

const OPTIONS: { v: Reader; title: string; text: string }[] = [
  { v: "seeker", title: "I'm Hindu, or exploring", text: "and curious how the texts compare" },
  { v: "believer", title: "I follow Jesus", text: "and want to share Him with Hindu friends" },
];

// Asks who is reading. The same content shows for both; the framing around it adapts.
export function ReaderChoice({
  compact = false,
  stacked = false,
  nudge = false,
  onChosen,
}: {
  compact?: boolean;
  stacked?: boolean; // one option per row on desktop, for a narrow column
  nudge?: boolean; // asked to choose before going on
  onChosen?: (reader: Reader) => void;
}) {
  const { prefs, setPrefs, ready } = useProgress();
  if (!ready) return null;
  const choose = (reader: Reader) => {
    setPrefs({ ...prefs, reader });
    onChosen?.(reader);
  };

  return (
    <section id="reader-choice" aria-labelledby="reader-q" className={`flex scroll-mt-24 flex-col gap-2.5 rounded-[24px] transition-shadow ${nudge ? "nudge-ring" : ""}`}>
      <span
        id="reader-q"
        className={`label ${stacked ? "lg:font-display lg:text-[1.75rem] lg:font-medium lg:normal-case lg:tracking-[-.01em] lg:text-ink lg:before:hidden" : ""}`}
      >
        Who is reading?
      </span>
      {stacked && <p className="-mt-1 hidden text-[.95rem] text-muted lg:block">Choose one, and the guide will speak to you as you read.</p>}
      {nudge && (
        <p role="status" className="text-[.92rem] font-semibold text-gospel">
          First, tell us who is reading. Then we will begin.
        </p>
      )}
      <div role="group" aria-labelledby="reader-q" className={`grid grid-cols-2 gap-2.5 ${stacked ? "lg:grid-cols-1" : ""}`}>
        {OPTIONS.map((o) => {
          const on = prefs.reader === o.v;
          return (
            <button
              key={o.v}
              type="button"
              aria-pressed={on}
              onClick={() => choose(o.v)}
              className={`flex min-h-14 flex-col items-start gap-0.5 rounded-[20px] border px-3.5 py-3 text-left transition active:scale-[.98] ${
                stacked ? "lg:min-h-[92px] lg:justify-center lg:gap-1 lg:border-2 lg:px-6 lg:py-4 lg:hover:-translate-y-0.5 lg:hover:shadow-soft" : ""
              } ${on ? "border-gospel bg-gospel-soft" : "border-line bg-page hover:border-gospel"}`}
            >
              <b className={`font-display text-[1.05rem] font-normal leading-tight ${stacked ? "lg:text-[1.4rem]" : ""}`}>
                {on && <span aria-hidden="true">✓ </span>}
                {o.title}
              </b>
              <span className={`text-[.8rem] leading-snug text-muted ${stacked ? "lg:text-[.95rem]" : ""}`}>{o.text}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

// On a step: asks once, only if the reader has not chosen yet.
export function ReaderPrompt() {
  const { prefs, ready } = useProgress();
  if (!ready || prefs.reader) return null;
  return (
    <div className="mb-6 rounded-[24px] border border-line bg-sand p-4">
      <ReaderChoice compact />
    </div>
  );
}
