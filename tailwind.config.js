/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{html,js,ts,jsx,tsx}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#f8302e',
        secondary: '#ff6b35',
      },
      fontFamily: {
        mono: ['Space Mono', 'monospace'],
      }
    },
  },
  plugins: [],
}