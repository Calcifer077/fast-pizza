/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      // You can add your own fonts here to override tailwind default fonts.
      // Here, you can give any name to it. When using it use 'font-pizza'.
      // pizza: 'Roboto Mono, monospace',
      // 'sans' is the default font used by tailwind which is overridden by us.
      sans: 'Roboto Mono, monospace',
    },
    // You can even add your own colors to it.
    // If you want to add your own color entirely without using any of provided by tailwind, you can write them outside 'extend'
    // colors:{
    //   pizza: '#123456',
    // }

    // If you write in 'extend' it will be added to already existing colors of tailwind.
    extend: {
      colors: {
        pizza: '#123456',
      },
      height: {
        screen: '100dvh',
      },
    },
  },
  plugins: [],
};
