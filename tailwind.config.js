/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,md,njk}',
  ],
  theme: {
    extend: {
      colors: {
        "color-light-cream": "#FCFBF7",
        "color-cream": "#F6F5F1",
        "color-tinted-cream": "#E6E3E1",
        "color-black": "#353534",
        "color-gray-800": "#4A4A46",
        "color-gray-600": "#73706D",
        "color-gray-500": "#8E8F94",
        "color-gray-400": "#AFB0B6",
        "color-gray-300": "#D3D3D1",
        "color-gray-100": "#E9E9E7",
        "color-bright-crimson": "#960462",
      },
    },
    fontFamily: {
      sans: ['Lato', 'sans-serif'],
      serif: ['Canela Deck', 'serif'],
      body:['Canela Text', 'serif']
    },
  },
  plugins: [],
};
