import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        darkModeNeutral: {
          900: '#101214',
          800: '#161A1D',
          700: '#1D2125',
          600: '#22272B',
          500: '#282E33',
          400: '#2C333A',
          300: '#38414A',
          200: '#454F59',
          100: '#596773',
          50: '#738496',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
export default config
