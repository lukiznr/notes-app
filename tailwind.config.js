/** @type {import('tailwindcss').Config} */
import { withMaterialColors } from 'tailwind-material-colors'
export default withMaterialColors({
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
},{
  primary:"#000ff0"
})
