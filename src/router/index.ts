import type { App } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'

const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/dashboard',
    meta: {
      title: 'Root',
    },
  },
  {
    path: '/login',
    component: () => import('@/views/login/Login.vue'),
    meta: {
      title: '登录',
    },
  },
]

const otherRoutes: RouteRecordRaw[] = [
  {
    path: '/dashboard',
    meta: {
      title: '主控台',
    },
    component: () => import('@/views/dashboard/index.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(''),
  routes: constantRoutes.concat(otherRoutes),
  strict: true,
})

export function setupRouter(app: App) {
  app.use(router)
}

export default router
