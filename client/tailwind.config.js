/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        moveFromLeft: {
          "0%": {
            transform: "translateX(-10%)",
            opacity: "0%",
          },
          "100%": {
            transform: "translateX(0)",
            opacity: "100%",
          },
        },
        movefromRight: {
          "0%": {
            transform: "translateX(10%)",
            opacity: "0%",
          },
          "100%": {
            transform: "translateX(0)",
            opacity: "100%",
          },
        },
        movefromBottom: {
          "0%": {
            transform: "translateY(30%)",
            opacity: "0%",
          },
          "100%": {
            transform: "translateY(0)",
            opacity: "100%",
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
