import autoprefixer from 'autoprefixer'
import tailwindcss from 'tailwindcss'
import mobile from 'postcss-mobile-forever'

export default {
  plugins: [
    autoprefixer(),
    tailwindcss(),
    mobile({
      appSelector: '#app',
      viewportWidth: 375,
      unitPrecision: 3,
      maxDisplayWidth: 600,
      propList: [
        '*',
        // '!font-size'
      ],
      selectorBlackList: ['.ignore', 'keep-px'],
      valueBlackList: ['1px solid'],
      mobileUnit: 'vw',
      rootContainingBlockSelectorList: ['van-popup--bottom'],
    }),
  ],
}
