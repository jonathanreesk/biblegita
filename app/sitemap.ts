import type { MetadataRoute } from "next";
import { STATIONS } from "@/lib/stations";

const BASE = "https://gitatogospel.org";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/scripture", "/glossary"].map((p) => ({ url: `${BASE}${p}`, priority: p === "" ? 1 : 0.6 }));
  const steps = STATIONS.map((s) => ({ url: `${BASE}/journey/${s.id}`, priority: 0.8 }));
  return [...pages, ...steps];
}
