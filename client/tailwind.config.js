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
      'accent': '#F1A7B1',
      'primary': '#826EBF',
      'bgDark': '#121212',
      'lightGray': '#D4D2D2',
      'darkGray': '#292929',
      'grayLine': '#5C5C5C',
    },
    extend: {

    },
  },
  plugins: [
    flowbite.plugin(),
  ],
}

