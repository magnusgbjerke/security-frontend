import type { Config } from "tailwindcss";

export default {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "#ab7b6e",
          50: "#f6f0ef",
          100: "#e3d3cf",
          200: "#d0b6ae",
          300: "#bd988e",
          400: "#ab7b6e",
          500: "#916254",
          600: "#714c42",
          700: "#51362f",
          800: "#30211c",
          900: "#100b09",
        },
        secondary: "#CBB0AA",
      },
    },
  },
  plugins: [],
} satisfies Config;
