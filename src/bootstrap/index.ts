import type { App } from 'vue'
import { setToastDefaultOptions } from 'vant'
import { setupStore } from '@/store'
import { setupRouter } from '@/router'

export async function bootstrap(app: App) {
  // 配置状态管理
  setupStore(app)

  // 配置路由
  setupRouter(app)

  // 设置 Toast 默认配置
  setToastDefaultOptions({
    // 换行时截断单词
    wordBreak: 'break-all',
  })

  // 挂载应用实例
  app.mount('#app')
}
