import type { Config } from "tailwindcss";

// Colors and fonts come from CSS variables in app/globals.css,
// so light and dark themes switch without any Tailwind dark: variants.
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        page: "var(--bg)",
        surface: "var(--surface)",
        ink: "var(--ink)",
        muted: "var(--muted)",
        line: "var(--line)",
        gospel: "var(--gospel)",
        "gospel-soft": "var(--gospel-soft)",
        dharma: "var(--dharma)",
        "dharma-soft": "var(--dharma-soft)",
        warn: "var(--warn)",
      },
      fontFamily: {
        display: ["var(--f-display)"],
        body: ["var(--f-body)"],
        label: ["var(--f-label)"],
      },
    },
  },
  plugins: [],
};

export default config;
