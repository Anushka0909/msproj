/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FFB6C1', // Light pink
        secondary: '#E6B8E6', // Soft lavender
        accent: '#FF69B4', // Hot pink for CTAs
        dark: '#4A4A4A', // Dark gray for text
        'pink-light': '#FFF5F7', // Very light pink background
        'pink-border': '#FFE4E9', // Pink tinted border
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
