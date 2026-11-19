import type { Config } from "tailwindcss";

const config = {
  theme: {
    extend: {
      colors: {
        background: "#f0f8f1",
        foreground: "#153a2b",
        card: "#ffffff",
        "card-foreground": "#153a2b",
        popover: "#ffffff",
        "popover-foreground": "#153a2b",
        primary: "#167148",
        "primary-foreground": "#ffffff",
        secondary: "#e4f3e7",
        "secondary-foreground": "#153a2b",
        muted: "#eff5ef",
        "muted-foreground": "#506757",
        accent: "#d6efdb",
        "accent-foreground": "#153a2b",
        destructive: "#b02749",
        border: "#d2e2d5",
        input: "#788f7e",
        ring: "#167148",
      },
      fontFamily: { sans: ["Arial", "Helvetica", "sans-serif"] },
    },
  },
} satisfies Config;

export default config;
