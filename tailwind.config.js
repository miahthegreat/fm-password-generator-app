/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        check: "url('/public/check.svg')",
      },
      colors: {
        primary: {
          100: "#E6E5EA",
          300: "#817D92",
          700: "#24232C",
          900: "#18171F",
        },
        accent: {
          300: "#A4FFAF",
          400: "#F8CD65",
          500: "#FB7C58",
          600: "#F64A4A",
        },
      },
      fontFamily: {
        jetbrains: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/forms"),
    require("prettier-plugin-tailwindcss"),
  ],
};
