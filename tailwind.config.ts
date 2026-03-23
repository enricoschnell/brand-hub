import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // CSS variable-based colors (shadcn pattern)
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        destructive: "var(--destructive)",
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        sidebar: {
          DEFAULT: "var(--sidebar)",
          foreground: "var(--sidebar-foreground)",
          primary: "var(--sidebar-primary)",
          "primary-foreground": "var(--sidebar-primary-foreground)",
          accent: "var(--sidebar-accent)",
          "accent-foreground": "var(--sidebar-accent-foreground)",
          border: "var(--sidebar-border)",
          ring: "var(--sidebar-ring)",
        },
        // Hub-specific token colors (direct hex values)
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
        // Brand colors (for content pages)
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
