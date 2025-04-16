import type { App } from 'vue'
import { setToastDefaultOptions } from 'vant'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { plugin as vueTransitionsPlugin } from '@morev/vue-transitions'
import { setupStore } from '@/store'
import { setupRouter } from '@/router'
import { setupDirective } from '@/directive'
import plugins from '@/plugins'

import 'vant/es/toast/style'
import 'vant/es/dialog/style'
import 'vant/es/image-preview/style'
import '@vant/touch-emulator'

import '@morev/vue-transitions/styles'

import '@he-tree/vue/style/default.css'
import '@he-tree/vue/style/material-design.css'

import '@/assets/iconfont/iconfont.css'

export async function bootstrap(app: App) {
  // 配置状态管理
  setupStore(app)

  // 配置路由
  setupRouter(app)

  // 配置指令
  setupDirective(app)

  // vue-query
  app.use(VueQueryPlugin)

  // 插件
  app.use(plugins)

  // 设置 Toast 默认配置
  setToastDefaultOptions({
    // 换行时截断单词
    wordBreak: 'break-all',
  })

  app.use(vueTransitionsPlugin())

  // 挂载应用实例
  app.mount('#app')
}
