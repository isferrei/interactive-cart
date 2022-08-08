/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'primary': '#F97C22',
      'white': '#ffffff',
    },
    spacing: {
      '10': '10px',
      '15': '15px',
      '20': '20px',
      'xl': '20px',
      '50': '50px',
      '100': '100px'
    }
  },
  plugins: [],
}
