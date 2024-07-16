import type { App } from 'vue'
import { setupStore } from '@/store'
import { setupRouter } from '@/router'

export async function bootstrap(app: App) {
  // 配置状态管理
  setupStore(app)

  // 配置路由
  setupRouter(app)

  // 挂载应用实例
  app.mount('#app')
}
