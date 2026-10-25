# The Gita and the Gospel

An app-style study guide for apologetics, evangelism and discipleship. It walks through the Bhagavad Gita and the Bible as a 13-step journey: how each scripture is built, four philosophical challenges with the replies to expect, the cross, the living hope of Christ, and the call to make disciples (Matthew 28:19-20).

## Stack

- [Next.js 15](https://nextjs.org) (App Router, fully static output)
- React 19 and TypeScript
- Tailwind CSS 3 for the app shell
- Hand-drawn inline SVG diagrams, no chart libraries
- Progress and settings saved in the browser (localStorage), no database or accounts

## Run locally

Requires Node.js 18.18 or newer.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

To check a production build:

```bash
npm run build
npm start
```

## Project layout

```
app/
  layout.tsx            Root layout, fonts, theme script
  page.tsx              Home screen
  journey/[id]/page.tsx One page per step of the journey (statically generated)
  scripture/page.tsx    Scripture index
  settings/page.tsx     Theme, text size, reset progress
  manifest.ts           Add-to-home-screen support
  globals.css           Design tokens (light and dark) and station content styles
components/             Shell (sidebar, top bar, tab bar), Home, StationView, ScriptureIndex, SettingsView
content/stations/       The written content and diagrams for each step, as HTML
lib/stations.ts         Journey order, titles and parts
lib/content.ts          Reads station content and builds the Scripture index at build time
```

## Editing content

- **Change a step's text or diagram:** edit `content/stations/<id>.html`. The class names (`block claim`, `block arg`, `ref g`, `diagram`, and so on) are styled in `app/globals.css`.
- **Add a step:** create `content/stations/<new-id>.html` and add an entry to `STATIONS` in `lib/stations.ts`. It will appear on the home screen, in the sidebar and in the Scripture index automatically.
- **Plain-English glossary:** definitions live in `lib/glossary.ts`. At build time the first mention of each term on a page becomes a tap-to-define button (`lib/annotate.ts`), and every term is listed on the Glossary page. To add a word, add an entry with the exact spellings to match.
- **Scripture references** tagged `<span class="ref g">` (Bible) or `<span class="ref d">` (Gita and Vedas) are collected into the Scripture index.

## Deploy to Vercel

1. Push this folder to a new GitHub repository.
2. In Vercel, choose **Add New Project** and import the repository. The Next.js preset is detected automatically; no settings need to change.
3. Every push to `main` redeploys.

The site is open to search engines (see `app/robots.ts` and `app/sitemap.ts`). The canonical domain is set in `app/layout.tsx`, `app/robots.ts` and `app/sitemap.ts`; update it if the domain changes. After launch, submit `https://<your domain>/sitemap.xml` in Google Search Console.
