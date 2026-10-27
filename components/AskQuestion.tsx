"use client";

import { useId, useState } from "react";
import { useProgress } from "./Providers";

type Status = "idle" | "open" | "sending" | "sent" | "error";

// "Have a question?" card. Sends the question with the step it was asked on.
export function AskQuestion({
  step,
  path,
  startOpen = false,
  onClose,
  card = true,
}: {
  step?: string;
  path?: string;
  startOpen?: boolean;
  onClose?: () => void;
  card?: boolean;
}) {
  const { prefs } = useProgress();
  const uid = useId().replace(/:/g, "");
  const [status, setStatus] = useState<Status>(startOpen ? "open" : "idle");
  const [question, setQuestion] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [problem, setProblem] = useState("");
  const [website, setWebsite] = useState("");

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim().length < 3) return;
    if (!email.trim() && !phone.trim()) return setProblem("Please give an email or a phone number, so we can reply.");
    if (email.trim() && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim())) return setProblem("That email address does not look right.");
    if (phone.trim() && phone.replace(/\D/g, "").length < 7) return setProblem("That phone number looks too short.");
    setProblem("");
    setStatus("sending");
    try {
      const res = await fetch("/api/question", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question,
          name,
          email,
          phone,
          website,
          step: step ?? "General question",
          page: typeof window !== "undefined" ? window.location.origin + (path ?? window.location.pathname) : path,
          reader: prefs.reader === "believer" ? "Follower of Jesus" : prefs.reader === "seeker" ? "Hindu or exploring" : "",
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      setQuestion("");
    } catch {
      setStatus("error");
    }
  };

  const input = "w-full rounded-2xl border border-line bg-page px-4 py-3 text-base text-ink placeholder:text-muted";

  return (
    <section id={card ? "ask-card" : undefined} aria-labelledby={`ask-q-${uid}`} className={card ? "mt-6 flex flex-col gap-3 rounded-[24px] border border-line bg-surface p-5 shadow-soft" : "flex flex-col gap-3"}>
      <span id={`ask-q-${uid}`} className="label">Have a question?</span>
      {status === "sent" ? (
        <>
          <p className="leading-relaxed">Thank you{name.trim() ? `, ${name.trim().split(" ")[0]}` : ""}. Your question has been sent, and we will reply to you.</p>
          <div className="flex flex-wrap gap-4">
            <button type="button" onClick={() => setStatus("open")} className="font-label font-semibold text-gospel">
              Ask another question
            </button>
            {onClose && (
              <button type="button" onClick={onClose} className="font-label font-semibold text-muted">
                Close
              </button>
            )}
          </div>
        </>
      ) : status === "idle" ? (
        <>
          <p className="leading-relaxed text-muted">
            {step ? "Something here unclear, or worth talking about? Ask, and a real person will read it." : "Ask anything about the guide, and a real person will read it."}
            {prefs.reader !== "believer" && " No question is too simple, and none will offend us."}
          </p>
          <button
            type="button"
            onClick={() => setStatus("open")}
            className="min-h-12 self-start rounded-full border border-gospel bg-gospel px-6 py-3 font-label font-semibold text-surface shadow-soft active:scale-[.98]"
          >
            Ask a question
          </button>
        </>
      ) : (
        <form onSubmit={send} className="flex flex-col gap-3">
          {step && <p className="text-[.9rem] text-muted">About: <b className="font-semibold text-ink">{step}</b></p>}
          <label className="sr-only" htmlFor={`ask-text-${uid}`}>Your question</label>
          <textarea
            id={`ask-text-${uid}`}
            required
            minLength={3}
            maxLength={2000}
            rows={4}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Your question"
            className={input}
          />
          <label className="sr-only" htmlFor={`ask-name-${uid}`}>Your name</label>
          <input id={`ask-name-${uid}`} required maxLength={100} value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" autoComplete="name" className={input} />
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="sr-only" htmlFor={`ask-email-${uid}`}>Email</label>
            <input id={`ask-email-${uid}`} type="email" maxLength={200} value={email} onChange={(e) => { setEmail(e.target.value); setProblem(""); }} placeholder="Email" autoComplete="email" className={input} />
            <label className="sr-only" htmlFor={`ask-phone-${uid}`}>Phone or WhatsApp</label>
            <input id={`ask-phone-${uid}`} type="tel" maxLength={40} value={phone} onChange={(e) => { setPhone(e.target.value); setProblem(""); }} placeholder="Phone or WhatsApp" autoComplete="tel" className={input} />
          </div>
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="absolute -left-[9999px] h-0 w-0 opacity-0"
            name="website"
          />
          <p className="text-[.82rem] leading-snug text-muted">{prefs.reader !== "believer" && "No question is too simple, and none will offend us. "}Give an email or a phone number (or both) so we can reply. We only use your details to answer you.</p>
          {problem && <p className="text-[.9rem] text-warn">{problem}</p>}
          {status === "error" && <p className="text-[.9rem] text-warn">Sorry, that did not send. Please try again in a moment.</p>}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="submit"
              disabled={status === "sending"}
              className="min-h-12 rounded-full border border-gospel bg-gospel px-6 py-3 font-label font-semibold text-surface shadow-soft disabled:opacity-60"
            >
              {status === "sending" ? "Sending…" : "Send question"}
            </button>
            <button type="button" onClick={() => (onClose ? onClose() : setStatus("idle"))} className="min-h-12 rounded-full px-4 py-3 font-label font-semibold text-muted">
              Cancel
            </button>
          </div>
        </form>
      )}
    </section>
  );
}
