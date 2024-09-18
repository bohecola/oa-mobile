import type { App } from 'vue'
import { setToastDefaultOptions } from 'vant'
import { VueQueryPlugin } from '@tanstack/vue-query'
import '@xuanmo/dl-ui/dist/index.css'
import DLUI from '@xuanmo/dl-ui'
import { setupStore } from '@/store'
import { setupRouter } from '@/router'
import plugins from '@/plugins'
import { setupDirective } from '@/directive'

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

  // 挂载应用实例
  app.mount('#app')

  // DLUI
  app.use(DLUI)
}
