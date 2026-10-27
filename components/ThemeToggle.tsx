"use client";

import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "./Icons";
import { useProgress } from "./Providers";

// One tap between light and dark. Settings still offers "Match my device".
export function ThemeToggle() {
  const { prefs, setPrefs, ready } = useProgress();
  const [deviceDark, setDeviceDark] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const update = () => setDeviceDark(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  if (!ready) return <span className="h-10 w-10 flex-none" aria-hidden="true" />;
  const dark = prefs.theme === "dark" || (prefs.theme === "system" && deviceDark);
  return (
    <button
      type="button"
      onClick={() => setPrefs({ ...prefs, theme: dark ? "light" : "dark" })}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      title={dark ? "Light mode" : "Dark mode"}
      className="grid h-10 w-10 flex-none place-items-center rounded-full border border-line bg-surface text-ink shadow-soft"
    >
      {dark ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
