"use client";

import Link from "next/link";
import { NUMBERED, PARTS, STATIONS } from "@/lib/stations";
import { useProgress } from "./Providers";
import { ChevronIcon } from "./Icons";

const CIRC = 2 * Math.PI * 34;

export function Home() {
  const { done } = useProgress();
  const count = STATIONS.filter((s) => done[s.id]).length;
  const next = STATIONS.find((s) => !done[s.id]);
  const finished = !next;

  return (
    <div className="fade-in flex flex-col">
      <div className="relative flex flex-col gap-3.5 pb-2 pt-3">
        <span className="label">Apologetics, evangelism and discipleship</span>
        <h1>The Gita and the Gospel</h1>
        <p className="lede">A walk through the Bhagavad Gita and the Bible, side by side, for readers of every background.</p>

        <ul className="m-0 my-1 flex list-none flex-col gap-2 p-0" aria-label="The questions this guide explores">
          {["Who is God?", "Does He love us?", "What are we here for?"].map((q, i) => (
            <li
              key={q}
              style={{ ["--i" as string]: i }}
              className="rise flex items-center gap-3 border-l-[3px] border-amber py-1 pl-4 font-display text-[1.55rem] leading-tight text-ink"
            >
              {q}
            </li>
          ))}
        </ul>

        <p className="note">Honest about the hard questions, warm toward every reader, and centered on Jesus Christ.</p>

        <div className="flex flex-wrap items-center gap-x-[18px] gap-y-4 rounded-[28px] border border-line bg-surface p-5 shadow-lift">
          <svg className="h-[72px] w-[72px] flex-none" viewBox="0 0 84 84" aria-hidden="true">
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
            <span className="label">{finished ? "Journey complete" : count ? "Keep going" : "Your journey"}</span>
            <p className="leading-snug">
              {finished
                ? "You have walked the whole journey. Now go and make disciples."
                : count
                  ? `Next up: ${next.title}.`
                  : "Start with the question beneath both texts: what are we here for?"}
            </p>
          </div>
          <Link
            href={`/journey/${finished ? "method" : next.id}`}
            className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-gospel bg-gospel px-6 py-3 text-center font-label text-[.95rem] font-semibold text-surface no-underline shadow-soft transition hover:-translate-y-0.5 hover:bg-gospel-deep active:scale-[.98]"
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

      <div id="steps" className="flex scroll-mt-24 flex-col gap-3 pt-10">
        <span className="label">The whole guide</span>
        <h2 className="text-[1.7rem]">{NUMBERED} steps, in order</h2>
        <p className="text-[.95rem] text-muted">Each step takes a few minutes. Take them in order, or jump to any question that matters to you. Look for these two colors throughout:</p>
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
          <div className="relative flex flex-col gap-2.5 before:absolute before:bottom-6 before:left-[34px] before:top-6 before:w-0.5 before:bg-line">
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
                    <span className="text-[.84rem] text-muted">{s.desc}</span>
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
    </div>
  );
}
