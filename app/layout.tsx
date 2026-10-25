import type { Metadata, Viewport } from "next";
import { Providers } from "@/components/Providers";
import { Shell } from "@/components/Shell";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "The Gita and the Gospel",
    template: "%s | The Gita and the Gospel",
  },
  description:
    "A study guide for apologetics, evangelism and discipleship: the Bhagavad Gita and the Bible, the hard questions, and the hope of Christ.",
  robots: { index: false, follow: false },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f7f4" },
    { media: "(prefers-color-scheme: dark)", color: "#141517" },
  ],
};

// Applies saved theme and text size before first paint to avoid a flash.
const prefsScript = `try{var p=JSON.parse(localStorage.getItem('gg-prefs')||'null');if(p){var r=document.documentElement;if(p.theme&&p.theme!=='system')r.setAttribute('data-theme',p.theme);if(p.size==='large')r.setAttribute('data-size','large')}}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: prefsScript }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Libre+Caslon+Display&family=Literata:ital,opsz,wght@0,7..72,400;0,7..72,600;1,7..72,400&family=IBM+Plex+Sans+Condensed:wght@500;600&display=swap"
        />
      </head>
      <body>
        <Providers>
          <Shell>{children}</Shell>
        </Providers>
      </body>
    </html>
  );
}
