import type { Config } from "tailwindcss";

// ═══════════════════════════════════════════════════════════════════
//  NOMARA DESIGN TOKENS — edit here to retheme the whole app
// ═══════════════════════════════════════════════════════════════════

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── Backgrounds ──────────────────────────────────────────
        cream:     "#FFFCF5",   // page base — warm white
        parchment: "#F5EDE0",   // raised sections, sidebar
        surface:   "#EAE0D0",   // inputs, dividers, borders

        // ── Text ─────────────────────────────────────────────────
        ink:       "#0F0D0A",   // primary text
        "ink-muted":"#5A5048",  // secondary text
        stone:     "#9A8E84",   // muted, captions

        // ── Accent ───────────────────────────────────────────────
        // The whole hero is this colour — change it to repaint everything
        accent:        "#FF4D00",  // blazing orange — Lagos heat
        "accent-2":    "#FFB300",  // amber — secondary highlights
        "accent-light":"#FFF0E8",  // soft orange tint — callout blocks
      },

      backgroundImage: {
        // Hero warm glow (subtle, inside the orange section)
        "glow-warm":   "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,255,255,0.12) 0%, transparent 70%)",
        // Below-fold glows
        "glow-amber":  "radial-gradient(ellipse 70% 50% at 90% 50%, rgb(255 179 0 / 0.08) 0%, transparent 65%)",
      },

      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans:  ["var(--font-sans)", "system-ui", "sans-serif"],
      },

      letterSpacing: {
        widest2: "0.3em",
      },
    },
  },
  plugins: [],
};

export default config;
