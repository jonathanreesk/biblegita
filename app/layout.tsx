import type { Metadata, Viewport } from "next";
import { Providers } from "@/components/Providers";
import { Shell } from "@/components/Shell";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://gitatogospel.org"),
  title: {
    default: "The Gita and the Gospel",
    template: "%s | The Gita and the Gospel",
  },
  description:
    "A study guide for apologetics, evangelism and discipleship: the Bhagavad Gita and the Bible, the hard questions, and the hope of Christ.",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: "The Gita and the Gospel",
    title: "The Gita and the Gospel",
    description: "A 13-step journey through the Bhagavad Gita and the Bible, the hard questions, and the hope of Christ.",
    url: "/",
  },
  twitter: { card: "summary_large_image", title: "The Gita and the Gospel", description: "A 13-step journey through the Bhagavad Gita and the Bible, the hard questions, and the hope of Christ." },
  appleWebApp: { capable: true, title: "Gita and Gospel", statusBarStyle: "default" },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbf7f0" },
    { media: "(prefers-color-scheme: dark)", color: "#121b1c" },
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
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Hanken+Grotesk:wght@400;500;600;700&display=swap"
        />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "The Gita and the Gospel",
              url: "https://gitatogospel.org",
              description: "A study guide for apologetics, evangelism and discipleship: the Bhagavad Gita and the Bible, the hard questions, and the hope of Christ.",
            }),
          }}
        />
        <Providers>
          <Shell>{children}</Shell>
        </Providers>
      </body>
    </html>
  );
}
