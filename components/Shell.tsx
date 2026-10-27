"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { NUMBERED, PARTS, STATIONS, findStation, neighbors } from "@/lib/stations";
import { useCallback, useEffect, useRef, useState } from "react";
import { OutlineDrawer, OutlineList } from "./Outline";
import { ThemeToggle } from "./ThemeToggle";
import { AskSheet } from "./AskSheet";
import { useProgress } from "./Providers";
import { AskIcon, BackIcon, BookIcon, ChevronIcon, GlossaryIcon, HomeIcon, ListIcon, SlidersIcon } from "./Icons";

function useHeader(pathname: string) {
  if (pathname.startsWith("/journey/")) {
    const s = findStation(pathname.split("/")[2] ?? "");
    if (s) return { eyebrow: `${PARTS[s.part].title} · ${s.n} of ${NUMBERED}`, title: s.title, back: true };
  }
  if (pathname === "/scripture") return { eyebrow: "Reference", title: "Verse index", back: true };
  if (pathname === "/glossary") return { eyebrow: "Reference", title: "Glossary", back: true };
  if (pathname === "/settings") return { eyebrow: "Preferences", title: "Settings", back: true };
  return { eyebrow: "Your journey", title: "The Gita and the Gospel", back: false };
}

type Place = { path: string; y: number; title: string };
const PLACE = "gg-place";
const RESTORE = "gg-restore";

export function Shell({ children, ask = false, minutes }: { children: React.ReactNode; ask?: boolean; minutes?: Record<string, number> }) {
  const pathname = usePathname() || "/";
  const router = useRouter();
  // Pages visited in this tab, so Back can return to the page the reader came from
  const visited = useRef(0);
  useEffect(() => {
    visited.current += 1;
  }, [pathname]);
  // Where the reader was in the journey, so a tap on Glossary, Verses or Settings never loses their place
  const [place, setPlace] = useState<Place | null>(null);
  const backToPlace = (p: Place) => {
    try {
      sessionStorage.setItem(RESTORE, JSON.stringify(p));
    } catch {}
    router.push(p.path);
  };
  const goBack = () => {
    if (!pathname.startsWith("/journey/") && place) return backToPlace(place);
    if (visited.current > 1) return router.back();
    // Opened straight from a link: step back through the journey instead
    const prev = neighbors(pathname.replace("/journey/", "")).prev;
    router.push(prev ? `/journey/${prev.id}` : "/");
  };
  const { done, complete } = useProgress();
  const header = useHeader(pathname);
  const here = pathname.startsWith("/journey/") ? findStation(pathname.split("/")[2] ?? "") : undefined;
  const nextStep = here ? neighbors(here.id).next : undefined;
  const count = STATIONS.filter((s) => done[s.id]).length;
  const pct = (count / STATIONS.length) * 100;
  const [outline, setOutline] = useState(false);
  const [asking, setAsking] = useState(false);
  // On phones the top bar compacts once the reader scrolls, so the whole title fits
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  // The desktop Ask button steps aside while a step's own question card is on screen
  const [cardVisible, setCardVisible] = useState(false);
  useEffect(() => {
    setAsking(false);
    setCardVisible(false);
    const card = document.getElementById("ask-card");
    if (!card) return;
    const io = new IntersectionObserver(([e]) => setCardVisible(e.isIntersecting), { threshold: 0.1 });
    io.observe(card);
    return () => io.disconnect();
  }, [pathname]);
  const askStep = here ? `${here.n}. ${here.title}` : undefined;
  const closeAsk = useCallback(() => setAsking(false), []);
  useEffect(() => {
    if (here) {
      // Returning to a step: put the reader back where they were
      try {
        const r = JSON.parse(sessionStorage.getItem(RESTORE) || "null") as Place | null;
        if (r?.path === pathname) {
          sessionStorage.removeItem(RESTORE);
          setTimeout(() => window.scrollTo({ top: r.y }), 80);
        }
      } catch {}
      let t: ReturnType<typeof setTimeout>;
      const save = () => {
        clearTimeout(t);
        t = setTimeout(() => {
          try {
            sessionStorage.setItem(PLACE, JSON.stringify({ path: pathname, y: Math.round(window.scrollY), title: `${here.n}. ${here.title}` }));
          } catch {}
        }, 200);
      };
      save();
      window.addEventListener("scroll", save, { passive: true });
      return () => {
        clearTimeout(t);
        window.removeEventListener("scroll", save);
      };
    }
    try {
      setPlace(JSON.parse(sessionStorage.getItem(PLACE) || "null"));
    } catch {}
  }, [pathname, here]);
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
        <OutlineList pathname={pathname} done={done} minutes={minutes} />
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
        <header className={`frost sticky z-20 border-b border-line ${pathname === "/" ? "hidden" : ""}`} style={{ top: "env(safe-area-inset-top, 0px)" }}>
          <div
            className="mx-auto flex min-h-14 max-w-[860px] items-center gap-2.5"
            style={{
              paddingLeft: "max(16px, env(safe-area-inset-left, 0px))",
              paddingRight: "max(16px, env(safe-area-inset-right, 0px))",
            }}
          >
            {header.back && (
              <button
                type="button"
                onClick={goBack}
                aria-label="Back to the previous page"
                className="grid h-10 w-10 flex-none place-items-center rounded-full border border-line bg-surface text-ink shadow-soft"
              >
                <BackIcon />
              </button>
            )}
            <div className={`flex min-w-0 flex-1 flex-col ${pathname === "/" ? "lg:invisible" : ""}`}>
              <small className={`truncate font-label text-[.72rem] font-semibold uppercase tracking-[.08em] text-muted ${scrolled ? "max-lg:hidden" : ""}`}>{header.eyebrow}</small>
              <strong className={`font-display font-normal ${scrolled ? "line-clamp-2 text-[1.15rem] leading-tight max-lg:text-[1rem]" : "truncate text-[1.15rem]"}`}>{header.title}</strong>
            </div>
            <div className="hidden lg:block">
              <ThemeToggle />
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
                onClick={() => here && complete(here.id)}
                aria-label={`Next step: ${nextStep.title}`}
                className="inline-flex h-10 flex-none items-center gap-1 rounded-full border border-gospel bg-gospel pl-4 pr-3 font-label text-[.88rem] font-semibold text-surface no-underline shadow-soft max-sm:w-10 max-sm:justify-center max-sm:px-0"
              >
                <span className="max-sm:hidden">Next</span>
                <ChevronIcon />
              </Link>
            )}
          </div>
          <div className="h-[3px] bg-line" aria-hidden="true">
            <i className="block h-full bg-gradient-to-r from-gospel to-amber transition-[width] duration-500" style={{ width: `${pct}%` }} />
          </div>
        </header>

        <main
          className={`mx-auto max-w-[860px] pb-32 pt-5 lg:pb-16 lg:pt-7 ${pathname === "/" ? "pt-[max(1.25rem,env(safe-area-inset-top))] lg:max-w-[1120px] lg:pt-12" : ""}`}
          style={{
            paddingLeft: "max(16px, env(safe-area-inset-left, 0px))",
            paddingRight: "max(16px, env(safe-area-inset-right, 0px))",
          }}
        >
          {place && header.back && !here && (
            <button
              type="button"
              onClick={() => backToPlace(place)}
              className="mb-5 flex w-full items-center gap-2.5 rounded-[18px] border border-gospel bg-gospel-soft px-4 py-3 text-left font-label text-[.92rem] font-semibold text-gospel shadow-soft"
            >
              <BackIcon />
              <span className="min-w-0 flex-1">
                <small className="block text-[.72rem] font-semibold uppercase tracking-[.08em] opacity-80">Back to where you were</small>
                <span className="block truncate text-ink">{place.title}</span>
              </span>
            </button>
          )}
          {children}
        </main>
      </div>

      <OutlineDrawer open={outline} onClose={() => setOutline(false)} pathname={pathname} done={done} minutes={minutes} />

      {/* Mobile bottom tab bar */}
      <nav
        aria-label="Main"
        className={`fixed inset-x-0 bottom-0 z-30 grid ${ask ? "grid-cols-5" : "grid-cols-4"} frost border-t border-line lg:hidden`}
        style={{
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
          paddingLeft: "max(8px, env(safe-area-inset-left, 0px))",
          paddingRight: "max(8px, env(safe-area-inset-right, 0px))",
        }}
      >
        {tabs.map((t, i) => [
          ask && i === 2 && (
            <button
              key="ask"
              type="button"
              onClick={() => setAsking(true)}
              aria-haspopup="dialog"
              className="flex flex-col items-center gap-[3px] pb-2.5 pt-2 font-label text-[.74rem] font-semibold text-muted"
            >
              <AskIcon className="h-[22px] w-[22px] text-gospel" />
              Ask
            </button>
          ),
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
          </Link>,
        ])}
      </nav>

      {/* Desktop: a floating Ask button on every page */}
      {ask && (
        <button
          type="button"
          onClick={() => setAsking(true)}
          aria-haspopup="dialog"
          aria-label={askStep ? "Ask a question about this step" : "Ask a question"}
          className={`fixed bottom-6 right-8 z-30 hidden h-12 items-center gap-2 rounded-full border border-gospel bg-gospel px-5 font-label text-[.92rem] font-semibold text-surface shadow-lift transition-[opacity,transform] duration-300 lg:inline-flex ${
            cardVisible || asking ? "pointer-events-none translate-y-3 opacity-0" : "opacity-100"
          }`}
        >
          <AskIcon />
          Ask
        </button>
      )}
      {asking && <AskSheet step={askStep} path={pathname} onClose={closeAsk} />}
    </div>
  );
}
