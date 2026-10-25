import type { MetadataRoute } from "next";

// Lets people add the guide to their phone home screen like an app.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "The Gita and the Gospel",
    short_name: "Gita and Gospel",
    description: "A study guide for any reader: the Gita and the Bible side by side.",
    start_url: "/",
    display: "standalone",
    background_color: "#fbf7f0",
    theme_color: "#1f5c5a",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/pwa-icon/192", sizes: "192x192", type: "image/png" },
      { src: "/pwa-icon/512", sizes: "512x512", type: "image/png", purpose: "any" },
    ],
  };
}
