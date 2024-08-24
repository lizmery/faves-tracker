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
      'accent': '#CBFF8C',
      'primary': '#717198',
      'secondary': '#323245',
      'darkPurple': '141127',
    },
    extend: {},
  },
  plugins: [
    flowbite.plugin(),
  ],
}

