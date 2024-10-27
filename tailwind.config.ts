import type { Config } from "tailwindcss";
import tailwindcssFilters from "tailwindcss-filters";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      backdropBlur: {
        md: "10px",
      },
    },
  },
  plugins: [tailwindcssFilters],
};

export default config;
