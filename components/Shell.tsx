"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NUMBERED, PARTS, STATIONS, findStation, neighbors } from "@/lib/stations";
import { useEffect, useRef, useState } from "react";
import { OutlineDrawer, OutlineList } from "./Outline";
import { useProgress } from "./Providers";
import { BackIcon, BookIcon, ChevronIcon, GlossaryIcon, HomeIcon, ListIcon, SlidersIcon } from "./Icons";

function useHeader(pathname: string) {
  if (pathname.startsWith("/journey/")) {
    const s = findStation(pathname.split("/")[2] ?? "");
    if (s) return { eyebrow: `${PARTS[s.part].title} · ${s.n} of ${NUMBERED}`, title: s.title, back: true };
  }
  if (pathname === "/scripture") return { eyebrow: "Reference", title: "Verse index", back: false };
  if (pathname === "/glossary") return { eyebrow: "Reference", title: "Glossary", back: false };
  if (pathname === "/settings") return { eyebrow: "Preferences", title: "Settings", back: false };
  return { eyebrow: "Your journey", title: "The Gita and the Gospel", back: false };
}

export function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "/";
  const { done } = useProgress();
  const header = useHeader(pathname);
  const here = pathname.startsWith("/journey/") ? findStation(pathname.split("/")[2] ?? "") : undefined;
  const nextStep = here ? neighbors(here.id).next : undefined;
  const count = STATIONS.filter((s) => done[s.id]).length;
  const pct = (count / STATIONS.length) * 100;
  const [outline, setOutline] = useState(false);
  const aside = useRef<HTMLElement>(null);

  // The outline closes when you move to another page, and the sidebar keeps the current step in view
  useEffect(() => {
    setOutline(false);
    aside.current?.querySelector('[aria-current="page"]')?.scrollIntoView({ block: "nearest" });
  }, [pathname]);

  const tabs = [
    { href: "/", label: "Home", icon: <HomeIcon className="h-[22px] w-[22px]" />, active: pathname === "/" || pathname.startsWith("/journey/") },
    { href: "/scripture", label: "Verses", icon: <BookIcon className="h-[22px] w-[22px]" />, active: pathname === "/scripture" },
    { href: "/glossary", label: "Glossary", icon: <GlossaryIcon className="h-[22px] w-[22px]" />, active: pathname === "/glossary" },
    { href: "/settings", label: "Settings", icon: <SlidersIcon className="h-[22px] w-[22px]" />, active: pathname === "/settings" },
  ];

  return (
    <div className="lg:grid lg:grid-cols-[280px_minmax(0,1fr)]">
      {/* Desktop sidebar */}
      <aside
        ref={aside}
        aria-label="Journey"
        className="sticky top-0 hidden h-screen flex-col gap-1 overflow-y-auto border-r border-line bg-surface px-3.5 py-5 lg:flex"
      >
        <Link href="/" className="px-2.5 pb-3 font-display text-[1.35rem] leading-tight text-ink no-underline">
          The Gita and the Gospel
        </Link>
        <OutlineList pathname={pathname} done={done} />
        <div className="mt-auto flex flex-col gap-0.5 border-t border-line pt-3.5">
          {tabs.slice(1).map((t) => (
            <Link
              key={t.href}
              href={t.href}
              aria-current={pathname === t.href ? "page" : undefined}
              className={`flex items-center gap-2.5 rounded-xl px-3 py-2 text-[.92rem] no-underline ${
                pathname === t.href ? "bg-gospel-soft text-gospel" : "text-ink hover:bg-page"
              }`}
            >
              {t.icon}
              {t.label === "Verses" ? "Verse index" : t.label}
            </Link>
          ))}
        </div>
      </aside>

      <div className="min-w-0">
        {/* Top bar */}
        <header className="frost sticky z-20 border-b border-line" style={{ top: "env(safe-area-inset-top, 0px)" }}>
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
                className="grid h-10 w-10 flex-none place-items-center rounded-full border border-line bg-surface text-ink shadow-soft"
              >
                <BackIcon />
              </Link>
            )}
            <div className="flex min-w-0 flex-1 flex-col">
              <small className="truncate font-label text-[.72rem] font-semibold uppercase tracking-[.08em] text-muted">{header.eyebrow}</small>
              <strong className="truncate font-display text-[1.15rem] font-normal">{header.title}</strong>
            </div>
            <button
              type="button"
              onClick={() => setOutline(true)}
              aria-label="Open the journey outline"
              aria-haspopup="dialog"
              className="grid h-10 w-10 flex-none place-items-center rounded-full border border-line bg-surface text-ink shadow-soft lg:hidden"
            >
              <ListIcon />
            </button>
            {nextStep && (
              <Link
                href={`/journey/${nextStep.id}`}
                aria-label={`Next step: ${nextStep.title}`}
                className="inline-flex h-10 flex-none items-center gap-1 rounded-full border border-gospel bg-gospel pl-4 pr-3 font-label text-[.88rem] font-semibold text-surface no-underline shadow-soft"
              >
                Next
                <ChevronIcon />
              </Link>
            )}
          </div>
          <div className="h-[3px] bg-line" aria-hidden="true">
            <i className="block h-full bg-gradient-to-r from-gospel to-amber transition-[width] duration-500" style={{ width: `${pct}%` }} />
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

      <OutlineDrawer open={outline} onClose={() => setOutline(false)} pathname={pathname} done={done} />

      {/* Mobile bottom tab bar */}
      <nav
        aria-label="Main"
        className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-4 frost border-t border-line lg:hidden"
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
