import type { Config } from "tailwindcss";

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
      animation: {
        grow: 'grow 1.0s ease-in-out infinite',
        fadeinbounceleft: 'fade-in-bounce-left 1s ease-in-out 0.25s 1',
      },
      keyframes: {
        grow: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.5)' },
          '100%': { transform: 'scale(1)' },
        },
        "fade-in-bounce-left": {
          "0%": {
              opacity: "0",
              transform: "translate3d(-100%, 0%, 0)",
          },
          "33%": {
              opacity: "0.5",
              transform: "translate3d(0%, 0%, 0)",
          },
          "66%": {
              opacity: "0.7",
              transform: "translate3d(-20%, 0%, 0)",
          },
          "100%": {
              opacity: "1",
              transform: "translate3d(0, 0, 0)",
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;
