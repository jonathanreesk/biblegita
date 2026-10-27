import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StationView } from "@/components/StationView";
import { annotate } from "@/lib/annotate";
import { getStationHtml } from "@/lib/content";
import { SCRIPTURE } from "@/lib/scripture";
import { askConfigured } from "@/lib/ask";
import { STATIONS, findStation } from "@/lib/stations";

type Params = { params: Promise<{ id: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return STATIONS.map((s) => ({ id: s.id }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const s = findStation(id);
  return s ? { title: s.title, description: s.desc, alternates: { canonical: `/journey/${s.id}` } } : {};
}

export default async function StationPage({ params }: Params) {
  const { id } = await params;
  if (!findStation(id)) notFound();
  const { html, refs } = annotate(getStationHtml(id));
  const verses = Object.fromEntries(refs.map((k) => [k, SCRIPTURE[k]]));
  return <StationView id={id} html={html} verses={verses} ask={askConfigured()} />;
}
