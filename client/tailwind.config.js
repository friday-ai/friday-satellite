const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  mode: 'jit',
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    safeList: [],
    content: [
      './src/index.html',
      './src/**/*.tsx',
      './src/**/*.ts',
    ],
  },
  theme: {
    screens: {},
    extend: {
      colors: {},
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {},
  plugins: [
    require('daisyui')
  ],
  daisyui: {
    themes: [
      {
        'light': {
          'primary': '#14255b',
          'primary-focus': '#1B2963',
          'primary-content': '#ffffff',
          'secondary': '#2509B3',
          'secondary-focus': '#2E0BDD',
          'secondary-content': '#ffffff',
          'accent': '#2509B3',
          'accent-focus': '#2E0BDD',
          'accent-content': '#ffffff',
          'neutral': '#121C42',
          'neutral-focus': '#1B2963',
          'neutral-content': '#ffffff',
          'base-100': '#ffffff',
          'base-200': '#f3f5fc',
          'base-300': '#d1d5db',
          'base-content': '#121C42',
          'info': '#1546AF',
          'success': '#2F9316',
          'warning': '#ED9E00',
          'error': '#dc2626',
          '--rounded-btn': '.75rem',
          '*:where(.checkbox)': {
            'border-radius': '.5rem!important',
          },
          '*:where(.tooltip:before)': {
            'border-radius': '0!important',
          }
        },
        'black': {
          'primary': '#ffffff',
          'primary-focus': '#ffffff',
          'primary-content': '#000000',
          'secondary': '#ffffff',
          'secondary-focus': '#ffffff',
          'secondary-content': '000000',
          'accent': 'ffffff',
          'accent-focus': '#ffffff',
          'accent-content': '#000000',
          'base-100': '#000000',
          'base-200': '#333333',
          'base-300': '#4d4d4d',
          'base-content': '#ffffff',
          'neutral': '#333333',
          'neutral-focus': '#4d4d4d',
          'neutral-content': '#ffffff',
          'info': '#0000ff',
          'success': '#008000',
          'warning': '#ffff00',
          'error': '#ff0000',
          '--border-color': 'var(--b3)',
          '--rounded-box': '1rem',
          '--rounded-btn': '.75rem',
          '--rounded-badge': '1.9rem',
          '--animation-btn': '0',
          '--animation-input': '0',
          '--btn-text-case': 'lowercase',
          '--btn-focus-scale': '1',
          '--navbar-padding': '.5rem',
          '--border-btn': '1px',
          '--tab-border': '1px',
          '--tab-radius': '0',
          '*:where(.checkbox)': {
            'border-radius': '.5rem!important',
          },
          '*:where(.tooltip:before)': {
            'border-radius': '.5rem!important',
          }
        },
      },
    ],
  },
}
