import type { App } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'
import { createRouterGuards } from './guards'

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

// 创建路由器
const router = createRouter({
  history: createWebHashHistory(''),
  routes: constantRoutes.concat(otherRoutes),
  // strict: true,
})

// 创建路由守卫
createRouterGuards(router)

// 装载路由器
export function setupRouter(app: App) {
  app.use(router)
}

export default router
