"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

// Who is reading: a follower of Jesus, or a Hindu reader or seeker. Unset until they choose.
export type Reader = "believer" | "seeker";
export type Prefs = { theme: "system" | "light" | "dark"; size: "default" | "large"; reader?: Reader };

const DEFAULT_PREFS: Prefs = { theme: "system", size: "default" };

type Ctx = {
  done: Record<string, boolean>;
  toggle: (id: string) => void;
  reset: () => void;
  prefs: Prefs;
  setPrefs: (p: Prefs) => void;
  ready: boolean;
};

const ProgressContext = createContext<Ctx | null>(null);

const DONE_KEY = "gg-done";
const PREFS_KEY = "gg-prefs";

function read<T>(key: string, fallback: T): T {
  try {
    const v = localStorage.getItem(key);
    return v ? (JSON.parse(v) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable: progress lives for this visit only */
  }
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [done, setDone] = useState<Record<string, boolean>>({});
  const [prefs, setPrefsState] = useState<Prefs>(DEFAULT_PREFS);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setDone(read(DONE_KEY, {}));
    setPrefsState({ ...DEFAULT_PREFS, ...read<Partial<Prefs>>(PREFS_KEY, {}) });
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) write(DONE_KEY, done);
  }, [done, ready]);

  useEffect(() => {
    const root = document.documentElement;
    if (prefs.theme === "system") root.removeAttribute("data-theme");
    else root.setAttribute("data-theme", prefs.theme);
    if (prefs.size === "large") root.setAttribute("data-size", "large");
    else root.removeAttribute("data-size");
    if (prefs.reader) root.setAttribute("data-reader", prefs.reader);
    else root.removeAttribute("data-reader");
    if (ready) write(PREFS_KEY, prefs);
  }, [prefs, ready]);

  const toggle = useCallback((id: string) => setDone((d) => ({ ...d, [id]: !d[id] })), []);
  const reset = useCallback(() => setDone({}), []);

  return (
    <ProgressContext.Provider value={{ done, toggle, reset, prefs, setPrefs: setPrefsState, ready }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used inside <Providers>");
  return ctx;
}
