import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Nomara palette — cream base, dark text, subtle warm accents
        cream: "#F7F4EF",
        parchment: "#EDE8DF",
        ink: "#1A1A18",
        "ink-muted": "#4A4A44",
        stone: "#8C8880",
        accent: "#C4A882", // warm sand — the only accent allowed
      },
      fontFamily: {
        // Display serif (Cormorant Garamond) + refined sans (DM Sans)
        // Load via next/font in layout.tsx
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
