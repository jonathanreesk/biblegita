"use client";

import { useCallback, useState } from "react";
import { termById, type Term } from "@/lib/glossary";
import { TermSheet } from "./TermSheet";

// Words that are explained wherever they appear, even outside the chapter text
const WORDS = /\b(mukti|Mukti|redemption|Redemption)\b/g;

// Plain text with those words made tappable, opening the same meaning card as in the chapters.
export function TermText({ text }: { text: string }) {
  const [open, setOpen] = useState<Term | null>(null);
  const close = useCallback(() => setOpen(null), []);
  const parts = text.split(WORDS);
  return (
    <>
      {parts.map((p, i) => {
        const t = i % 2 ? termById(p.toLowerCase()) : undefined;
        if (!t) return p;
        return (
          <button key={i} type="button" className="term" aria-haspopup="dialog" onClick={() => setOpen(t)}>
            {p}
          </button>
        );
      })}
      {open && <TermSheet term={open} onClose={close} onOpen={setOpen} />}
    </>
  );
}
