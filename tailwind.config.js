/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'uhcl': '#dc2626',
        'nexon': '#dc2626',
        'velocity': '#15803d'
      },
      gridTemplateColumns: {
        '14': 'repeat(14, minmax(0, 1fr))',
      }
    },
  },
  plugins: [],
}

