import 'vant/es/toast/style'
import 'vant/es/dialog/style'
import 'vant/es/image-preview/style'
import '@vant/touch-emulator'
import '@he-tree/vue/style/default.css'
import '@he-tree/vue/style/material-design.css'

import { createApp } from 'vue'
import { bootstrap } from './bootstrap'
import App from './App.vue'

const app = createApp(App)

bootstrap(app)
  .then(() => {

  })
  .catch(() => {

  })
