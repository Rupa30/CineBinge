/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      fontSize: {
        '6.4vw' : '6.4vw'
      },
      screens: {
        'max-1000' : {'max' : '1000px'},
      },
    },
  },
  plugins: [],
}

