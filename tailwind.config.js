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
        heading: '#131621',
        body: '#303854',
        antgreen: '#48D2A1', // used for steps
        antteal: '#00d6a2', // used for primary Progress
        secondary: '#3D3D3D',
        'gray-8': ' #595959',
        template: 'rgba(196, 196, 196, 0.2)',
        primary: {
          100: 'rgba(27, 183, 217, 0.1)',
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
          600: '#FAFAFA', // menu background color
        },
      },
      spacing: {
        2.5: '0.688rem',
        5.5: '1.375rem',
        6.5: '1.625rem',
        7: '1.75rem',
        9.5: '2.875rem',
        14: '3.5rem',
        15: '3.75rem',
        18: '4.5rem',
        19: '4.875rem',
        22: '5.5rem',
        23.5: '6.375rem',
        24.5: '6.75rem',
        28: '7rem',
        30: '7.5rem',
        33: '8.5rem',
        36: '9rem',
        94: '33.5rem',
        '6p': '6px',
        '10p': '10px',
      },
      opacity: {
        8: '0.08',
        10: '0.1',
        45: '0.45',
      },
      fontSize: {
        // base on 16 px
        '12px': '.75rem',
        '14px': '0.875rem',
        '16px': '1rem',
        '18px': '1.125rem',
        '20px': '1.25rem',
        '22px': '1.375rem',
        '24px': '1.5rem',
      },
      borderRadius: {
        '2px': '2px',
        '7px': '7px',
        '9px': '9px',
        '12px': '12px',
        '18px': '18px',
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
