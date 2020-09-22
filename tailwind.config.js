const plugin = require('tailwindcss/plugin');

module.exports = {
  purge: { enabled: false, content: ['./src/**/*.tsx'] },
  theme: {
    container: {
      center: true,
    },
    extend: {
      color: {
        antgray: '#B8B8B8',
        primary: '#1BB7D9',
        primarylight: '#DDF4F9',
      },
      spacing: {
        '6p': '6px',
        '10p': '10px',
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
