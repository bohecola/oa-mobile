import { getIconCollections, iconsPlugin } from '@egoist/tailwindcss-icons'
import remToPx from 'tailwindcss-rem-to-px'

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['selector', '[data-theme-mode=dark]'],
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    iconsPlugin({
      collections: getIconCollections([
        'carbon',
        'mdi',
        'simple-icons',
        'mingcute',
        'solar',
        'material-symbols',
      ]),
    }),
    remToPx(),
  ],
}
