import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        strand: {
          bg: "#0c0a09",
          surface: "#141210",
          card: "#181614",
          cardHover: "#211e1b",
          border: "#292524",
          borderLight: "rgba(255, 255, 255, 0.09)",
          borderGlow: "rgba(99, 102, 241, 0.3)",
          textPrimary: "#fafaf9",
          textSecondary: "#a6a09b",
          textMuted: "#78716c",
        },
        nexio: {
          violet: "#8b5cf6",
          indigo: "#6366f1",
          blue: "#3b82f6",
          cyan: "#06b6d4",
          emerald: "#10b981",
          amber: "#f59e0b",
          rose: "#f43f5e",
        },
      },
      fontFamily: {
        sans: [
          "Geist",
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        mono: [
          "Geist Mono",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "monospace",
        ],
      },
      maxWidth: {
        strand: "1400px",
        limit: "1280px",
      },
      boxShadow: {
        glow: "0 0 50px -10px rgba(99, 102, 241, 0.25)",
        glowCyan: "0 0 50px -10px rgba(6, 182, 212, 0.25)",
        card: "0 4px 20px -2px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05)",
        cardHover: "0 10px 30px -4px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.12)",
        mockup: "0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.08)",
      },
      animation: {
        "pulse-slow": "pulseSlow 4s ease-in-out infinite",
        "flow-line": "flowLine 3s linear infinite",
        "marquee": "marquee 35s linear infinite",
        "marquee-reverse": "marqueeReverse 35s linear infinite",
      },
      keyframes: {
        pulseSlow: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.02)" },
        },
        flowLine: {
          "0%": { strokeDashoffset: "20" },
          "100%": { strokeDashoffset: "0" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        marqueeReverse: {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
