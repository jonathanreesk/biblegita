import type { MetadataRoute } from "next";

// Lets people add the guide to their phone home screen like an app.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "The Gita and the Gospel",
    short_name: "Gita and Gospel",
    description: "A study guide for apologetics, evangelism and discipleship.",
    start_url: "/",
    display: "standalone",
    background_color: "#f6f7f4",
    theme_color: "#23466e",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
