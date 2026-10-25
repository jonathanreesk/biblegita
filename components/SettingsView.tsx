"use client";

import { useState } from "react";
import { useProgress, type Prefs } from "./Providers";

function Segmented<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: { v: T; label: string }[];
  onChange: (v: T) => void;
}) {
  return (
    <div role="group" aria-label={label} className="inline-flex flex-wrap gap-0.5 self-start rounded-full border border-line bg-surface p-1 shadow-soft">
      {options.map((o) => (
        <button
          key={o.v}
          type="button"
          aria-pressed={value === o.v}
          onClick={() => onChange(o.v)}
          className={`min-h-10 rounded-full px-4 py-2 font-label text-[.88rem] font-semibold ${
            value === o.v ? "bg-gospel text-surface" : "text-muted"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function SettingsView() {
  const { prefs, setPrefs, reset } = useProgress();
  const [confirming, setConfirming] = useState(false);
  const [cleared, setCleared] = useState(false);

  return (
    <div className="fade-in stack">
      <span className="label">Make it yours</span>
      <h2>Settings</h2>

      <div className="flex flex-col gap-2.5 border-b border-line py-[18px]">
        <span className="label">How are you reading?</span>
        <Segmented<Prefs["mode"]>
          label="How are you reading"
          value={prefs.mode}
          onChange={(mode) => setPrefs({ ...prefs, mode })}
          options={[
            { v: "explore", label: "Exploring for myself" },
            { v: "share", label: "Preparing to share" },
          ]}
        />
        <p className="note">
          Exploring keeps the wording open and conversational. Preparing to share adds coaching for talking with a friend, such
          as the replies to expect.
        </p>
      </div>

      <div className="flex flex-col gap-2.5 border-b border-line py-[18px]">
        <span className="label">Theme</span>
        <Segmented<Prefs["theme"]>
          label="Theme"
          value={prefs.theme}
          onChange={(theme) => setPrefs({ ...prefs, theme })}
          options={[
            { v: "system", label: "System" },
            { v: "light", label: "Light" },
            { v: "dark", label: "Dark" },
          ]}
        />
      </div>

      <div className="flex flex-col gap-2.5 border-b border-line py-[18px]">
        <span className="label">Text size</span>
        <Segmented<Prefs["size"]>
          label="Text size"
          value={prefs.size}
          onChange={(size) => setPrefs({ ...prefs, size })}
          options={[
            { v: "default", label: "Default" },
            { v: "large", label: "Large" },
          ]}
        />
      </div>

      <div className="flex flex-col gap-2.5 border-b border-line py-[18px]">
        <span className="label">Progress</span>
        <p className="note">Your journey progress is saved on this device only.</p>
        <div className="flex flex-wrap items-center gap-2.5">
          {confirming ? (
            <>
              <span className="note">Clear your journey progress?</span>
              <button
                type="button"
                onClick={() => {
                  reset();
                  setConfirming(false);
                  setCleared(true);
                }}
                className="min-h-12 rounded-full border border-gospel bg-gospel px-6 py-3 font-label font-semibold text-surface"
              >
                Yes, reset
              </button>
              <button
                type="button"
                onClick={() => setConfirming(false)}
                className="min-h-12 rounded-full border border-line bg-surface px-6 py-3 font-label font-semibold text-ink"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => {
                  setConfirming(true);
                  setCleared(false);
                }}
                className="min-h-12 rounded-full border border-line bg-surface px-6 py-3 font-label font-semibold text-ink"
              >
                Reset progress
              </button>
              {cleared && <span className="note">Progress reset.</span>}
            </>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2.5 py-[18px]">
        <span className="label">About this guide</span>
        <p className="note">
          Built from <i>The Architecture of Sacred Texts</i>. Gita references follow the standard 18-chapter, 700-verse
          numbering; wording varies between translations, so read each verse in a translation you trust before using it.
        </p>
      </div>
    </div>
  );
}
