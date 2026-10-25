import type { Metadata } from "next";
import { ScriptureIndex } from "@/components/ScriptureIndex";
import { getAllRefs } from "@/lib/content";

export const metadata: Metadata = { title: "Scripture index" };

export default function ScripturePage() {
  return <ScriptureIndex groups={getAllRefs()} />;
}
