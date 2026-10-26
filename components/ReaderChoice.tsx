"use client";

import { useProgress, type Reader } from "./Providers";

const OPTIONS: { v: Reader; title: string; text: string }[] = [
  { v: "believer", title: "I follow Jesus", text: "and want to understand Hindu friends and share Christ with them" },
  { v: "seeker", title: "I'm Hindu, or exploring", text: "and want to see how the Hindu texts and the Bible compare" },
];

// Asks who is reading. The same content shows for both; the framing around it adapts.
export function ReaderChoice({ compact = false }: { compact?: boolean }) {
  const { prefs, setPrefs, ready } = useProgress();
  if (!ready) return null;
  const choose = (reader: Reader) => setPrefs({ ...prefs, reader });

  return (
    <section aria-labelledby="reader-q" className={`flex flex-col gap-3 ${compact ? "" : "rounded-[28px] border border-line bg-surface p-5 shadow-lift"}`}>
      <span id="reader-q" className="label">Who is reading?</span>
      {!compact && <p className="leading-snug text-muted">The guide is the same for everyone. We will frame it for you, and you can change this any time in Settings.</p>}
      <div role="group" aria-labelledby="reader-q" className="grid gap-2.5 sm:grid-cols-2">
        {OPTIONS.map((o) => {
          const on = prefs.reader === o.v;
          return (
            <button
              key={o.v}
              type="button"
              aria-pressed={on}
              onClick={() => choose(o.v)}
              className={`flex min-h-14 flex-col items-start gap-0.5 rounded-[20px] border px-4 py-3 text-left transition active:scale-[.98] ${
                on ? "border-gospel bg-gospel-soft" : "border-line bg-page hover:border-gospel"
              }`}
            >
              <b className="font-display text-[1.12rem] font-normal leading-tight">
                {on && <span aria-hidden="true">✓ </span>}
                {o.title}
              </b>
              <span className="text-[.86rem] leading-snug text-muted">{o.text}</span>
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
