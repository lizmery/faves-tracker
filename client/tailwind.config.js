const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    colors: {
      'accent': '#A1E091',
      'primary': '#826EBF',
      'bgDark': '#121212',
      'lightGray': '#D4D2D2',
      'darkGray': '#292929',
      'grayLine': '#5C5C5C',
      'darkPurple': '#5E48A3',
      'lightPurple': '#DAD4EC',
      'lightestPurple': '#EDEAF6',
      'darkGreen': '#337357',
      'lightGreen': '#CAE9C5',
      'lightestGreen': '#DEF1DC'
    },
    extend: {

    },
  },
  plugins: [
    flowbite.plugin(),
    require('tailwind-scrollbar')
  ],
}

