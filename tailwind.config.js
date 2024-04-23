import {nextui} from "@nextui-org/react";
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  safelist: ["dark"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      backgroundImage: {
        'bgImage': "var(--background)",
      }
    },
  },
  plugins: [require("tailwindcss-animate"),nextui({
    themes: {
      light: {
        colors: {
          primary: {
            DEFAULT: "#4361EE",
            foreground: "#000000",
          },
          focus: "#4361EE",
        },
        
      },
      dark: {
        colors: {
          primary: {
            DEFAULT: "#4CC9F0",
            foreground: "#000000",
          },
          focus: "#4895EF",
        },
      },
    },
  }),],
}