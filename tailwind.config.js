const plugin = require('tailwindcss/plugin');

module.exports = {
  purge: { enabled: false, content: ['./src/**/*.js'] },
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  theme: {
    fontFamily: {
      sans: [
        '"Noto Sans"',
        'Roboto',
        '"Segoe UI"',
        'system-ui',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"',
      ],
    },
    container: {
      center: true,
    },
    extend: {
      colors: {
        heading: '#131627',
        body: '#303854',
        antgreen: '#48D2A1', // used for steps
        antteal: '#00d6a2', // used for primary Progress
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
        28: '7rem',
        36: '9rem',
        '6p': '6px',
        '10p': '10px',
      },
      opacity: {
        45: '0.45',
      },
      fontSize: {
        '12px': '.857rem',
        '14px': '1rem',
        '16px': '1.142rem',
        '18px': '1.285rem',
        '20px': '1.428rem',
        '22px': '1.571rem',
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
