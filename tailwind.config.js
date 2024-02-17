/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    screens: {
      extraSm: "400px",
      sm: "640px",
      md: "768px",
      smallLg: "900px",
      lg: "1100px",
      xl: "1250px",
      "2xl": "1440px",
    },
    extend: {},
  },
  plugins: [],
};
