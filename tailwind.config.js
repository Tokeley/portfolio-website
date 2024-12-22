module.exports = {
  darkMode: 'selector',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserratExtraLight: ['MontserratExtraLight', 'sans-serif'],
        montserratMedium: ['MontserratMedium', 'sans-serif'],
        montserratLight: ['MontserratLight', 'sans-serif'],
        interRegular: ['InterRegular', 'sans-serif'],
      },
      colors: {
        offwhite: '#f5f5f5',
        lavendar: '#fbeeff',
        appleGrey: '#2b2c2a'
      },
    },
  },
  plugins: [],
}
