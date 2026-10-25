import type { Metadata } from "next";
import { ScriptureIndex } from "@/components/ScriptureIndex";
import { getAllRefs } from "@/lib/content";

export const metadata: Metadata = { title: "Scripture index", description: "Every Bible and Gita reference used in the guide, searchable, with links to where each is discussed.", alternates: { canonical: "/scripture" } };

export default function ScripturePage() {
  return <ScriptureIndex groups={getAllRefs()} />;
}
