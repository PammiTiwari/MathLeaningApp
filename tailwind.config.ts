import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0B0A12",
        surface: "#15131F",
        surface2: "#1E1B2E",
        line: "#2C2840",
        primary: "#7C5CFF",
        primaryDim: "#5B3FD6",
        saffron: "#FFB020",
        mint: "#22D3A5",
        rose: "#FF5470",
        sky: "#38BDF8",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        hand: ["var(--font-hand)", "cursive"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      keyframes: {
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-8px)" } },
        pop: { "0%": { transform: "scale(.85)", opacity: "0" }, "100%": { transform: "scale(1)", opacity: "1" } },
        shimmer: { "100%": { transform: "translateX(100%)" } },
      },
      animation: {
        float: "float 4s ease-in-out infinite",
        pop: "pop .25s cubic-bezier(.2,.9,.3,1.4)",
      },
    },
  },
  plugins: [],
};
export default config;
