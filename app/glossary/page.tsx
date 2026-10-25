import type { Metadata } from "next";
import { GlossaryView } from "@/components/GlossaryView";
import { getTermStations } from "@/lib/content";

export const metadata: Metadata = { title: "Glossary" };

export default function GlossaryPage() {
  return <GlossaryView appears={getTermStations()} />;
}
