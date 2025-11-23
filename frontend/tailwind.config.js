/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#6f42c1",
        "background-light": "#F8F9FA",
        "background-dark": "#181611",
        "card-light": "#ffffff",
        "card-dark": "#221e10",
        "text-light": "#1c1917",
        "text-dark": "#e7e5e4",
        "subtle-text-light": "#78716c",
        "subtle-text-dark": "#bab29c",
        "border-light": "#e7e5e4",
        "border-dark": "#544e3b",
        "input-light": "#ffffff",
        "input-dark": "#27241b"
      },
      fontFamily: {
        "display": ["Spline Sans", "sans-serif"]
      },
      borderRadius: {
        "DEFAULT": "1rem",
        "lg": "1.5rem",
        "xl": "2rem",
        "full": "9999px"
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries'),
  ],
}

