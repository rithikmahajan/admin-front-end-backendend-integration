/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
      },
      colors: {
        primary: {
          black: '#000000',
          500: '#808080',
        },
        gray: {
          600: '#767676',
        },
      },
      lineHeight: {
        '16.9': '16.9px',
      },
      letterSpacing: {
        '-0.375': '-0.375px',
        '-0.14': '-0.14px',
        '-0.4': '-0.4px',
      },
    },
  },
  plugins: [],
}
