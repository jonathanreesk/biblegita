"use client";

import { useEffect, useState } from "react";

const KEY = "gg-notes";

function readAll(): Record<string, string> {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "{}");
  } catch {
    return {};
  }
}

// A question to sit with, plus a private place to write. Notes never leave this device.
export function Reflect({ id, prompt, seeker }: { id: string; prompt: string; seeker?: string }) {
  const [note, setNote] = useState("");

  useEffect(() => {
    setNote(readAll()[id] ?? "");
  }, [id]);

  const save = (value: string) => {
    setNote(value);
    try {
      const all = readAll();
      if (value.trim()) all[id] = value;
      else delete all[id];
      localStorage.setItem(KEY, JSON.stringify(all));
    } catch {
      /* storage unavailable: the note lasts for this visit only */
    }
  };

  return (
    <section aria-labelledby={`reflect-${id}`} className="mt-9 flex flex-col gap-3 rounded-[24px] border border-line bg-sand p-5">
      <span id={`reflect-${id}`} className="label">Pause and reflect</span>
      {seeker ? (
        <>
          <p data-for="believer" className="font-display text-[1.2rem] leading-snug">{prompt}</p>
          <p data-for="seeker" className="font-display text-[1.2rem] leading-snug">{seeker}</p>
        </>
      ) : (
        <p className="font-display text-[1.2rem] leading-snug">{prompt}</p>
      )}
      <label className="sr-only" htmlFor={`note-${id}`}>Your private note</label>
      <textarea
        id={`note-${id}`}
        value={note}
        onChange={(e) => save(e.target.value)}
        rows={3}
        placeholder="Write anything you like. It stays on this device."
        className="w-full resize-y rounded-[18px] border border-line bg-surface px-4 py-3 text-base text-ink placeholder:text-muted"
      />
    </section>
  );
}
