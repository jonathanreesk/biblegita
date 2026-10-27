"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { NUMBERED, PARTS, STATIONS } from "@/lib/stations";
import { useProgress } from "./Providers";
import { ChevronIcon } from "./Icons";
import { ReaderChoice } from "./ReaderChoice";
import { ThemeToggle } from "./ThemeToggle";
import { SettleIn } from "./SettleIn";

const CIRC = 2 * Math.PI * 34;

function totalPhrase(minutes: Record<string, number>) {
  const total = Object.values(minutes).reduce((a, b) => a + b, 0);
  if (total <= 50) return `${Math.round(total / 5) * 5} minutes`;
  if (total <= 80) return "an hour";
  if (total <= 105) return "an hour and a half";
  const halves = Math.round(total / 30);
  const words = ["", "one", "two", "three", "four", "five", "six"];
  const whole = words[Math.floor(halves / 2)] ?? String(Math.floor(halves / 2));
  return halves % 2 ? `${whole} and a half hours` : `${whole} hours`;
}

export function Home({ minutes }: { minutes: Record<string, number> }) {
  const { done, prefs } = useProgress();
  const router = useRouter();
  // Begin asks gently for the reader choice first, then carries on once it is made
  const [nudge, setNudge] = useState(false);
  const count = STATIONS.filter((s) => done[s.id]).length;
  const next = STATIONS.find((s) => !done[s.id]);
  const finished = !next;
  const href = `/journey/${finished ? "made" : next.id}`;
  // First time in: a moment to settle in before the first step
  const [settle, setSettle] = useState(false);
  const closeSettle = useCallback(() => setSettle(false), []);
  const go = () => (count === 0 ? setSettle(true) : router.push(href));

  return (
    <div className="fade-in flex flex-col">
      {/* Desktop: the welcome on the left, and everything needed to start in one card on the right */}
      <div className="relative flex flex-col gap-3 pb-2 pt-0 lg:grid lg:min-h-[calc(100svh-3rem)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-center lg:gap-12 lg:pb-12 lg:pt-14">
        <div className="absolute right-0 top-0 hidden lg:block">
          <ThemeToggle />
        </div>
        <div className="flex flex-col gap-2.5 lg:gap-5">
        <h1 className="lg:text-[3.6rem]">The Gita and the Gospel</h1>
        <p className="lede max-lg:text-[1rem] max-lg:leading-snug lg:text-[1.15rem] [@media(max-height:620px)_and_(max-width:1023px)]:hidden">The Hindu texts, from the Vedas to the Gita, set beside the Bible and its one story of redemption (mukti) in Jesus Christ.</p>

        <ul className="m-0 flex list-none flex-wrap gap-x-4 gap-y-1 p-0 lg:flex-col lg:gap-2" aria-label="The questions this guide explores">
          {["Who is God?", "Does He love us?", "What are we here for?"].map((q, i) => (
            <li
              key={q}
              style={{ ["--i" as string]: i }}
              className="rise flex items-center gap-3 border-l-[3px] border-amber py-0.5 pl-2.5 font-display text-[1.05rem] leading-tight text-ink lg:pl-3.5 lg:text-[1.45rem]"
            >
              {q}
            </li>
          ))}
        </ul>
        </div>

        <div className="flex flex-col gap-3 lg:gap-6 lg:rounded-[32px] lg:border lg:border-line lg:bg-surface lg:p-9 lg:shadow-lift">
        <ReaderChoice stacked nudge={nudge} onChosen={() => nudge && go()} />


        <div className={`flex flex-wrap items-center gap-x-[18px] rounded-[28px] border border-line bg-surface shadow-lift lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none ${count > 0 ? "gap-y-3 p-4 lg:gap-y-4 lg:p-5" : "gap-y-2 p-4"}`}>
          {count > 0 && (
            <>
          <svg className="h-14 w-14 flex-none lg:h-[72px] lg:w-[72px]" viewBox="0 0 84 84" aria-hidden="true">
            <circle cx="42" cy="42" r="34" fill="none" strokeWidth="8" stroke="var(--line)" />
            <circle
              cx="42"
              cy="42"
              r="34"
              fill="none"
              strokeWidth="8"
              stroke="var(--gospel)"
              strokeLinecap="round"
              strokeDasharray={CIRC}
              strokeDashoffset={CIRC * (1 - count / STATIONS.length)}
              style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%", transition: "stroke-dashoffset .6s ease" }}
            />
            <text x="42" y="47" textAnchor="middle" fontSize="16" fontWeight={600} fill="var(--ink)" fontFamily="var(--f-label)">
              {count}/{STATIONS.length}
            </text>
          </svg>
          <div className="flex min-w-0 flex-1 flex-col gap-1.5">
            <span className="label max-lg:hidden">{finished ? "Journey complete" : count ? "Keep going" : "Your journey"}</span>
            <p className="leading-snug">
              {finished
                ? prefs.reader === "believer" ? "You have walked the whole journey. Now go and make disciples." : "You have walked the whole journey. The invitation of Jesus is still open: come and see."
                : count
                  ? `Next up: ${next.title}.`
                  : "Start with the question beneath both texts: what are we here for?"}
            </p>
          </div>
            </>
          )}
          <Link
            href={href}
            onClick={(e) => {
              if (prefs.reader && count > 0) return;
              e.preventDefault();
              if (prefs.reader) return setSettle(true);
              setNudge(true);
              document.getElementById("reader-choice")?.scrollIntoView({ behavior: "smooth", block: "center" });
            }}
            className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-gospel bg-gospel px-6 py-3 text-center font-label text-[.95rem] font-semibold text-surface no-underline shadow-soft transition hover:-translate-y-0.5 hover:bg-gospel-deep active:scale-[.98] lg:min-h-14 lg:text-[1.05rem]"
          >
            {finished ? "Walk it again" : count ? "Continue" : "Begin the journey"}
          </Link>
          <a
            href="#steps"
            className="mx-auto inline-flex min-h-10 items-center gap-1.5 font-label text-[.9rem] font-semibold text-gospel no-underline"
          >
            Or browse the whole guide <span aria-hidden="true" className="nudge">↓</span>
          </a>
        </div>
        </div>

      </div>

      <div id="steps" className="flex scroll-mt-24 flex-col gap-3 pt-10">
        <span className="label">The whole guide</span>
        <h2 className="text-[1.7rem]">{NUMBERED} steps. Takes about {totalPhrase(minutes)}.</h2>
        <p className="text-[.95rem] text-muted">Each step allows time to read and to stop and think, so most take three to eight minutes. Walk through them from the top, from why we are here to the glory ahead, over a few sittings or a step at a time, or jump straight to the question that matters most to you. Look for these two colors throughout:</p>
        <div className="legend">
          <span className="chip d">Hindu framework</span>
          <span className="chip g">Christian framework</span>
        </div>
      </div>

      {PARTS.map((p, pi) => (
        <div key={p.title} className="flex flex-col gap-2.5 pt-7">
          <span className="label">{pi === 0 ? "Begin" : `Part ${pi} of ${PARTS.length - 1}`}</span>
          <h3 className="text-[1.35rem]">{p.title}</h3>
          <p className="text-[.93rem] text-muted">{p.desc}</p>
          <div className="relative flex flex-col gap-2.5 lg:grid lg:grid-cols-2 lg:before:hidden before:absolute before:bottom-6 before:left-[34px] before:top-6 before:w-0.5 before:bg-line">
            {STATIONS.filter((s) => s.part === pi).map((s, si) => {
              const isDone = !!done[s.id];
              return (
                <Link
                  key={s.id}
                  href={`/journey/${s.id}`}
                  style={{ ['--i' as string]: si }}
                  className="group relative flex items-center gap-3.5 rise rounded-[22px] border border-line bg-surface p-4 text-ink no-underline shadow-soft transition hover:-translate-y-0.5 hover:border-gospel hover:shadow-lift active:scale-[.98]"
                >
                  <span
                    className={`grid h-10 w-10 flex-none place-items-center rounded-full border font-label font-semibold ${
                      isDone ? "border-gospel bg-gospel text-surface" : "border-line bg-page text-muted"
                    }`}
                  >
                    {isDone ? "✓" : s.n}
                  </span>
                  <span className="flex min-w-0 flex-col gap-0.5">
                    <b className="font-display text-[1.08rem] font-normal leading-tight">{s.title}</b>
                    <span className="text-[.84rem] text-muted">{s.desc} · {minutes[s.id] ?? 1} min</span>
                  </span>
                  <span className="ml-auto flex-none text-muted transition-transform group-hover:translate-x-0.5">
                    <ChevronIcon />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      ))}
      {settle && <SettleIn total={totalPhrase(minutes)} onReady={() => router.push(href)} onClose={closeSettle} />}
    </div>
  );
}
