import type { App } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'

const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('@/views/login/Login.vue'),
    meta: {
      title: '登录',
    },
  },
]

const router = createRouter({
  history: createWebHashHistory(''),
  routes: constantRoutes,
  strict: true,
})

export function setupRouter(app: App) {
  app.use(router)
}

export default router
