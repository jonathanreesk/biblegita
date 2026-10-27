"use client";

import { useProgress, type Reader } from "./Providers";

const OPTIONS: { v: Reader; title: string; text: string }[] = [
  { v: "seeker", title: "I'm Hindu, or exploring", text: "and curious how the texts compare" },
  { v: "believer", title: "I follow Jesus", text: "and want to share Him with Hindu friends" },
];

// Asks who is reading. The same content shows for both; the framing around it adapts.
export function ReaderChoice({
  compact = false,
  nudge = false,
  onChosen,
}: {
  compact?: boolean;
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
      <span id="reader-q" className="label">Who is reading?</span>
      {nudge && (
        <p role="status" className="text-[.92rem] font-semibold text-gospel">
          First, tell us who is reading. Then we will begin.
        </p>
      )}
      <div role="group" aria-labelledby="reader-q" className="grid grid-cols-2 gap-2.5">
        {OPTIONS.map((o) => {
          const on = prefs.reader === o.v;
          return (
            <button
              key={o.v}
              type="button"
              aria-pressed={on}
              onClick={() => choose(o.v)}
              className={`flex min-h-14 flex-col items-start gap-0.5 rounded-[20px] border px-3.5 py-3 text-left transition active:scale-[.98] ${
                on ? "border-gospel bg-gospel-soft" : "border-line bg-page hover:border-gospel"
              }`}
            >
              <b className="font-display text-[1.05rem] font-normal leading-tight">
                {on && <span aria-hidden="true">✓ </span>}
                {o.title}
              </b>
              <span className="text-[.8rem] leading-snug text-muted">{o.text}</span>
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
