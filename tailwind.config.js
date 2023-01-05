/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        font: "#f1faee",
        main: "#1d3557",
        secondary: "#457b9d",
        warn: "#e63946",
      },
      spacing: {
        nav: "var(--navHeight)",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
