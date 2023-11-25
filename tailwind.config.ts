import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        "fade-rotate-in": {
          "0%": { opacity: "0", transform: "rotate(3deg) translateY(1.75rem)" },
          "100%": {
            opacity: "1",
            transform: "rotate(0) translateY(0)",
          },
        },
        "fade-slide-in": {
          "0%": { opacity: "0", transform: "translateY(1.25rem)" },
          "100%": {
            opacity: "1",
            transform: "rotate(0) translateY(0)",
          },
        },
        "fade-rotate-in-lg": {
          "0%": { opacity: "0", transform: "rotate(2deg) translateY(1.25rem)" },
          "100%": {
            opacity: "1",
            transform: "rotate(0) translateY(0)",
          },
        },
      },
      animation: {
        "fade-rotate-in": "fade-rotate-in 0.5s ease-in-out forwards",
        "fade-rotate-in-lg": "fade-rotate-in-lg 0.5s ease-in-out forwards",
        "fade-slide-in": "fade-slide-in 0.5s ease-in-out forwards",
      },
      colors: {
        bright: "#fff7ed",
        dark: "#2C3333",
        black: "#292524",
        gray: "#78716c",
        primary: "#eff6ff",
        highlight: "#7dd3fc",
        secondary: "#fff7ed",
      },
    },
  },
  plugins: [],
};
export default config;
