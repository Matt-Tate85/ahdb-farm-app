/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ahdb: {
          blue: "#0090d4",
          green: "#6da32f",
          text: "#575756",
          credible: "#1f4350",
          neutral: "#dfd5b4",
          balance: "#9db7c2",
          solid: "#7b3010",
          confident: "#ed7013"
        },
        sector: {
          cereals: {
            main: "#ed7013",
            light: "#fdf0e6",
            text: "#b65610"
          },
          dairy: {
            main: "#0090d4",
            light: "#e6f4fc",
            text: "#0078b0"
          },
          beef: {
            main: "#7b3010",
            light: "#f9ede7",
            text: "#632710"
          },
          pork: {
            main: "#d4619d",
            light: "#faedf5",
            text: "#b04e81"
          }
        }
      },
      minWidth: {
        '16': '4rem',
      }
    },
  },
  plugins: [],
}
