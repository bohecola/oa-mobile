import 'vant/es/toast/style'
import 'vant/es/dialog/style'
import 'vant/es/image-preview/style'
import '@vant/touch-emulator'
import 'large-small-dynamic-viewport-units-polyfill'

import { createApp } from 'vue'
import { bootstrap } from './bootstrap'
import App from './App.vue'

const app = createApp(App)

bootstrap(app)
  .then(() => {

  })
  .catch(() => {

  })
