import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        hub: {
          bg: "#0a0a0b",
          surface: "#141416",
          border: "rgba(255,255,255,0.06)",
          "border-active": "rgba(255,255,255,0.2)",
          hover: "rgba(255,255,255,0.04)",
          active: "rgba(255,255,255,0.08)",
          t1: "#eeeff1",
          t2: "#8b8d94",
          t3: "#4b4d55",
        },
        brand: {
          bg: "#f8f8f7",
          surface: "#ffffff",
          dark: "#20252b",
          "page-dark": "#050c11",
          "text-primary": "#353b43",
          "text-secondary": "#868c95",
          "text-muted": "#cdcdcd",
          "text-on-dark": "#f8f8f7",
          "text-on-dark-muted": "#bfc3ca",
          cyan: "#59eded",
          "dark-teal": "#0b3434",
          "ui-border": "#e5e5e5",
          "ui-active": "#353b43",
          "ui-inactive": "#cac7c6",
          "cta-bg": "#ffffff",
          "cta-text": "#141414",
          "outline-border": "#353b43",
        },
      },
      fontFamily: {
        hub: [
          "'TikTok Sans Variable'",
          "'TikTok Sans'",
          "system-ui",
          "sans-serif",
        ],
        brand: ["'Aeonik Pro'", "Helvetica", "Arial", "sans-serif"],
        mono: ["ui-monospace", "'SF Mono'", "Monaco", "monospace"],
      },
      borderRadius: {
        card: "12px",
        button: "10px",
        swatch: "8px",
        input: "8px",
      },
    },
  },
  plugins: [],
} satisfies Config;
