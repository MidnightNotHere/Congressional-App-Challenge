/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./Quantum4Colorado.jsx",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Unbounded"', "sans-serif"],
        sans: ['"Archivo"', "sans-serif"],
        mono: ['"Martian Mono"', "monospace"],
      },
      boxShadow: {
        hard: "6px 6px 0 0 #0A0A0A",
        "hard-sm": "3px 3px 0 0 #0A0A0A",
      },
    },
  },
  plugins: [],
};
