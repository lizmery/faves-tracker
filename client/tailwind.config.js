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
      'accent': '#724CF9',
      'primary': '#BFFF70',
      'secondary': '#F5AAFD',
      'secondaryDark': '#BB02CF',
      'bgDark': '#170F2B',
      'bgDarkSecondary': '#221A36',
      'bgDarkTertiary' : '#321F6A',
      'bgLightSecondary': '#F7F7F7',
      'darkGray': '#292929',
      'textLight': '',
      'textDark': '#B8B8B8' ,
    },
    extend: {

    },
  },
  plugins: [
    flowbite.plugin(),
  ],
}

