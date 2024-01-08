/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
    // container: {
    //   center: true,
    // },
    screens: {
      '2xl': {'max': '1535px'},
      'xl': {'max': '1279px'},
      'lg': {'max': '1023px'},
      'md': {'max': '767px'},
      'sm': {'max': '639px'},
      'xs': {'max': '399px'},
    },
    colors: {
      'green': {
        DEFAULT: '#87C23E',
      },
      'red': {
        DEFAULT: '#E31E24',
        'light': '#FDF3F4',
      },
      'gray': {
        '100': '#2C2D2F',
        '80': '#848484',
        '60': '#A1A4AD',
        '40': '#F5F5F5',
      },
      'white': '#FFFFFF',
      'black': {
        DEFAULT: '#080808',
        'true': '#000000',
      }
    },
  },
  plugins: []
}
