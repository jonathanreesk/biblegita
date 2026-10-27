import type { Metadata } from "next";
import { SettingsView } from "@/components/SettingsView";
import { askConfigured } from "@/lib/ask";

export const metadata: Metadata = { title: "Settings", robots: { index: false, follow: true }, alternates: { canonical: "/settings" } };

export default function SettingsPage() {
  return <SettingsView ask={askConfigured()} />;
}
