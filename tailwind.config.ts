import type { Config } from "tailwindcss";

const config = {
  theme: {
    extend: {
      fontFamily: { sans: ["Arial", "Helvetica", "sans-serif"] },
    },
  },
} satisfies Config;

export default config;
