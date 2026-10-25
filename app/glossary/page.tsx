import type { Metadata } from "next";
import { GlossaryView } from "@/components/GlossaryView";
import { getTermStations } from "@/lib/content";

export const metadata: Metadata = { title: "Glossary", description: "Plain-English meanings of Sanskrit, philosophy and Christian terms such as Advaita, karma, moksha and the Trinity.", alternates: { canonical: "/glossary" } };

export default function GlossaryPage() {
  return <GlossaryView appears={getTermStations()} />;
}
