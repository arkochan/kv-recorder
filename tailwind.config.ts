import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          1: "#295f48", // Color 1
          2: "#204c39", // Color 2
          3: "#18392b", // Color 3
        },
        light: {
          1: "#dbf0e6", // Light Color 1
          2: "#b7e1cd", // Light Color 2
        },
        grey: "#eeeeee", // Grey
        white: "#f8fcfa", // White

      },
    },
  },
  plugins: [],
} satisfies Config;
