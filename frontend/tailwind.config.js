 /** @type {import('tailwindcss').Config} */
 export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    // "./src/**/*.css"
  ],
  theme: {
    extend: {
      colors: {
        primaryColor: '#3b82f6',
        darkColor: '#0F172A',
      }
    },
  },
  plugins: [],
}