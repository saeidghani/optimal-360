const plugin = require('tailwindcss/plugin');

module.exports = {
  purge: { enabled: false, content: ['./src/**/*.js'] },
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        heading: '#131627',
        body: '#303854',
        primary: {
          200: '#F5F8FC',
          400: '#DDF4F9',
          500: '#1BB7D9',
          900: '#1F2A44',
        },
        antgray: {
          100: '#8D98BA',
          200: '#B8B8B8',
          300: '#D9D9D9',
          400: '#F5F5F5',
          500: '#C4C4C4', // all input borders
        },
      },
      spacing: {
        '6p': '6px',
        '10p': '10px',
      },
      opacity: {
        45: '0.45',
      },
    },
  },
  variants: {},
  plugins: [
    plugin(({ addUtilities }) => {
      const newUtilities = {
        '.blue-green': {
          'background-image': 'linear-gradient(to right , #ff0 , #00FFFF)',
        },
      };

      addUtilities(newUtilities);
    }),
  ],
};
