/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1100px",
      xl: "1200px",
      "2xl": "1440px",
    },
    extend: {},
  },
  plugins: [],
};
