import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StationView } from "@/components/StationView";
import { annotate } from "@/lib/annotate";
import { getStationHtml } from "@/lib/content";
import { GLOSSARY } from "@/lib/glossary";
import { STATIONS, findStation } from "@/lib/stations";

type Params = { params: Promise<{ id: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return STATIONS.map((s) => ({ id: s.id }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const s = findStation(id);
  return s ? { title: s.title, description: s.desc } : {};
}

export default async function StationPage({ params }: Params) {
  const { id } = await params;
  if (!findStation(id)) notFound();
  const { html, used } = annotate(getStationHtml(id));
  const terms = GLOSSARY.filter((t) => used.includes(t.id)).map(({ id, term, say, plain }) => ({ id, term, say, plain }));
  return <StationView id={id} html={html} terms={terms} />;
}
