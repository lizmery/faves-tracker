const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  safelist: [
    {
      pattern: /bg-(grayLine|accent|primary|lightGreen|lightPurple|lightGray|lightestGreen|lightestPurple|cardColorDark|cardColorLight|darkGreen|darkPurple)/,
      variants: ['hover', 'dark', 'dark:hover'],
    }
  ],
  theme: {
    colors: {
      'accent': '#63BB95',
      'primary': '#826EBF',
      'bgDark': '#121212',
      'lightGray': '#D4D2D2',
      'darkGray': '#292929',
      'grayLine': '#5C5C5C',
      'darkPurple': '#5A449C',
      'lightPurple': '#AA9CD3',
      'lightestPurple': '#CEC6E6',
      'darkGreen': '#327156',
      'lightGreen': '#9CD3BB',
      'lightestGreen': '#B8E0CF',
      'darkPink': '#D62246',
      'pink': '#EC8398',
      'lightPink': '#F4B8C4',
      'lightestPink': '#F7CAD3',
      'cardColorDark': '#5C5C5C',
      'cardColorLight': '#ADADAD'
    },
  },
  plugins: [
    flowbite.plugin(),
    require('tailwind-scrollbar')
  ],
}

