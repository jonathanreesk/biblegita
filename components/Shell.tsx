"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PARTS, STATIONS, findStation } from "@/lib/stations";
import { useProgress } from "./Providers";
import { BackIcon, BookIcon, HomeIcon, SlidersIcon } from "./Icons";

function useHeader(pathname: string) {
  if (pathname.startsWith("/journey/")) {
    const s = findStation(pathname.split("/")[2] ?? "");
    if (s) return { eyebrow: s.n === 0 ? "Start here" : `${PARTS[s.part].title} · ${s.n} of 12`, title: s.title, back: true };
  }
  if (pathname === "/scripture") return { eyebrow: "Reference", title: "Scripture index", back: false };
  if (pathname === "/settings") return { eyebrow: "Preferences", title: "Settings", back: false };
  return { eyebrow: "Your journey", title: "The Gita and the Gospel", back: false };
}

export function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "/";
  const { done } = useProgress();
  const header = useHeader(pathname);
  const count = STATIONS.filter((s) => done[s.id]).length;
  const pct = (count / STATIONS.length) * 100;

  const tabs = [
    { href: "/", label: "Home", icon: <HomeIcon className="h-[22px] w-[22px]" />, active: pathname === "/" || pathname.startsWith("/journey/") },
    { href: "/scripture", label: "Scripture", icon: <BookIcon className="h-[22px] w-[22px]" />, active: pathname === "/scripture" },
    { href: "/settings", label: "Settings", icon: <SlidersIcon className="h-[22px] w-[22px]" />, active: pathname === "/settings" },
  ];

  return (
    <div className="lg:grid lg:grid-cols-[280px_minmax(0,1fr)]">
      {/* Desktop sidebar */}
      <aside
        aria-label="Journey"
        className="sticky top-0 hidden h-screen flex-col gap-1 overflow-y-auto border-r border-line bg-surface px-3.5 py-5 lg:flex"
      >
        <Link href="/" className="px-2.5 pb-3 font-display text-[1.35rem] leading-tight text-ink no-underline">
          The Gita and the Gospel
        </Link>
        {PARTS.map((p, pi) => (
          <div key={p.title} className="flex flex-col gap-0.5">
            <h5 className="mx-2.5 mb-1 mt-3.5 font-label text-[.72rem] font-semibold uppercase tracking-[.09em] text-muted">{p.title}</h5>
            {STATIONS.filter((s) => s.part === pi).map((s) => {
              const current = pathname === `/journey/${s.id}`;
              const isDone = !!done[s.id];
              return (
                <Link
                  key={s.id}
                  href={`/journey/${s.id}`}
                  aria-current={current ? "page" : undefined}
                  className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[.92rem] leading-snug no-underline transition-colors ${
                    current ? "bg-gospel-soft text-gospel" : "text-ink hover:bg-page"
                  }`}
                >
                  <span
                    className={`grid h-6 w-6 flex-none place-items-center rounded-full border font-label text-[.75rem] font-semibold ${
                      isDone ? "border-gospel bg-gospel text-surface" : "border-line text-muted"
                    }`}
                  >
                    {isDone ? "✓" : s.n === 0 ? "★" : s.n}
                  </span>
                  <span>{s.title}</span>
                </Link>
              );
            })}
          </div>
        ))}
        <div className="mt-auto flex flex-col gap-0.5 border-t border-line pt-3.5">
          {tabs.slice(1).map((t) => (
            <Link
              key={t.href}
              href={t.href}
              aria-current={pathname === t.href ? "page" : undefined}
              className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[.92rem] no-underline ${
                pathname === t.href ? "bg-gospel-soft text-gospel" : "text-ink hover:bg-page"
              }`}
            >
              {t.icon}
              {t.label === "Scripture" ? "Scripture index" : t.label}
            </Link>
          ))}
        </div>
      </aside>

      <div className="min-w-0">
        {/* Top bar */}
        <header className="sticky z-20 border-b border-line bg-page" style={{ top: "env(safe-area-inset-top, 0px)" }}>
          <div
            className="mx-auto flex min-h-14 max-w-[860px] items-center gap-2.5"
            style={{
              paddingLeft: "max(16px, env(safe-area-inset-left, 0px))",
              paddingRight: "max(16px, env(safe-area-inset-right, 0px))",
            }}
          >
            {header.back && (
              <Link
                href="/"
                aria-label="Back to home"
                className="grid h-10 w-10 flex-none place-items-center rounded-[10px] border border-line bg-surface text-ink"
              >
                <BackIcon />
              </Link>
            )}
            <div className="flex min-w-0 flex-1 flex-col">
              <small className="font-label text-[.72rem] font-semibold uppercase tracking-[.08em] text-muted">{header.eyebrow}</small>
              <strong className="truncate font-display text-[1.15rem] font-normal">{header.title}</strong>
            </div>
          </div>
          <div className="h-[2px] bg-line" aria-hidden="true">
            <i className="block h-full bg-gospel transition-[width] duration-500" style={{ width: `${pct}%` }} />
          </div>
        </header>

        <main
          className="mx-auto max-w-[860px] pb-32 pt-5 lg:pb-16 lg:pt-7"
          style={{
            paddingLeft: "max(16px, env(safe-area-inset-left, 0px))",
            paddingRight: "max(16px, env(safe-area-inset-right, 0px))",
          }}
        >
          {children}
        </main>
      </div>

      {/* Mobile bottom tab bar */}
      <nav
        aria-label="Main"
        className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-3 border-t border-line bg-surface lg:hidden"
        style={{
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
          paddingLeft: "max(8px, env(safe-area-inset-left, 0px))",
          paddingRight: "max(8px, env(safe-area-inset-right, 0px))",
        }}
      >
        {tabs.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            aria-current={t.active ? "page" : undefined}
            className={`flex flex-col items-center gap-[3px] pb-2.5 pt-2 font-label text-[.74rem] font-semibold no-underline ${
              t.active ? "text-gospel" : "text-muted"
            }`}
          >
            {t.icon}
            {t.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
