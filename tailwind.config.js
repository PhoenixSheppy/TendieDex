/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,ts}"],
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