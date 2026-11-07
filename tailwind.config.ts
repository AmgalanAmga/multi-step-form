import type { Config } from "tailwindcss";

const config = {
  theme: {
    extend: {
      colors: {
        background: "#f8f9f6",
        foreground: "#25392e",
        card: "#ffffff",
        "card-foreground": "#25392e",
        popover: "#ffffff",
        "popover-foreground": "#25392e",
        primary: "#477b5e",
        "primary-foreground": "#ffffff",
        secondary: "#edf1e8",
        "secondary-foreground": "#25392e",
        muted: "#f1f3ef",
        "muted-foreground": "#858d84",
        accent: "#eef3eb",
        "accent-foreground": "#25392e",
        destructive: "#bd4545",
        border: "#e7ebe3",
        input: "#dfe5dc",
        ring: "#477b5e",
      },
      fontFamily: { sans: ["Arial", "Helvetica", "sans-serif"] },
    },
  },
} satisfies Config;

export default config;
