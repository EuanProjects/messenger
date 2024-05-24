/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
   "./src/**/*.{js,ts,jsx,tsx}",
  ],  
  theme: {
    extend: {
      colors: {
        'deep-purple': '#aa00ff',
        'dark-grey': '#191919',
        'grey': '#242424',
        'highlighted-grey': '#3c3c3c',
        'light-grey': '#b0b3b8',
      },
    },
  },
  plugins: [],
}

