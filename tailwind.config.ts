import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // surfaces
        page: "#FAF9F6",       // page background — warm paper white
        card: "#FFFFFF",       // card background
        sunk: "#F3F1EC",       // recessed / input background
        line: "#E3E0D8",       // borders
        line2: "#CFCBC0",      // stronger borders

        // text
        head: "#16161D",       // headings
        body: "#3A3A47",       // body copy
        muted: "#6B6B7B",      // secondary
        faint: "#9A9AA8",      // tertiary / captions

        // accents (all AA-contrast on white)
        primary: "#5B3FD6",
        primaryDim: "#4A31B8",
        primarySoft: "#F1EDFF",
        saffron: "#B26A00",
        saffronSoft: "#FFF4E0",
        mint: "#0B8A64",
        mintSoft: "#E4F6EF",
        rose: "#C8304F",
        roseSoft: "#FDECEF",
        sky: "#0A72AB",
        skySoft: "#E6F3FB",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        hand: ["var(--font-hand)", "cursive"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 1px 2px rgba(22,22,29,.04), 0 2px 8px rgba(22,22,29,.04)",
        lift: "0 2px 4px rgba(22,22,29,.05), 0 8px 24px rgba(22,22,29,.07)",
      },
      keyframes: {
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-6px)" } },
      },
      animation: { float: "float 4s ease-in-out infinite" },
    },
  },
  plugins: [],
};
export default config;
