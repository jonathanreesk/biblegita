// Receives a reader's question and forwards it to the guide's inbox.
// Configure one of these in the hosting environment:
//   QUESTIONS_FORMSPREE_ID      a Formspree form id (Formspree emails each submission)
//   RESEND_API_KEY + QUESTIONS_EMAIL_TO (+ optional QUESTIONS_EMAIL_FROM)
import { NextResponse } from "next/server";
import { askConfigured } from "@/lib/ask";

const clip = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(req: Request) {
  if (!askConfigured()) return NextResponse.json({ ok: false, error: "not-configured" }, { status: 503 });

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad-request" }, { status: 400 });
  }
  // Bots fill in the hidden field; people never see it
  if (clip(body.website, 200)) return NextResponse.json({ ok: true });

  const q = {
    question: clip(body.question, 2000),
    name: clip(body.name, 100),
    contact: clip(body.contact, 200),
    step: clip(body.step, 200),
    page: clip(body.page, 300),
    reader: clip(body.reader, 40),
  };
  if (q.question.length < 3) return NextResponse.json({ ok: false, error: "empty" }, { status: 400 });

  const subject = `Question on "${q.step || "the guide"}"`;
  const text = [
    `Question: ${q.question}`,
    "",
    `Step: ${q.step || "(general)"}`,
    `Page: ${q.page || "(none)"}`,
    `Reading as: ${q.reader || "(not chosen)"}`,
    `Name: ${q.name || "(not given)"}`,
    `Contact: ${q.contact || "(not given)"}`,
  ].join("\n");

  try {
    const formspree = process.env.QUESTIONS_FORMSPREE_ID;
    const res = formspree
      ? await fetch(`https://formspree.io/f/${encodeURIComponent(formspree)}`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ _subject: subject, ...q, email: q.contact.includes("@") ? q.contact : undefined }),
        })
      : await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${process.env.RESEND_API_KEY}` },
          body: JSON.stringify({
            from: process.env.QUESTIONS_EMAIL_FROM || "The Gita and the Gospel <onboarding@resend.dev>",
            to: process.env.QUESTIONS_EMAIL_TO,
            subject,
            text,
            reply_to: q.contact.includes("@") ? q.contact : undefined,
          }),
        });
    if (!res.ok) throw new Error(String(res.status));
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "send-failed" }, { status: 502 });
  }
}
