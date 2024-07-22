import type { App } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'
import { createRouterGuards } from './guards'

// 基础路由
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

// 布局组件
const Layout = () => import('@/layouts/index.vue')

// 其他路由
export const otherRoutes: RouteRecordRaw[] = [
  {
    path: '/dashboard',
    meta: {
      title: '主控台',
      icon: 'i-mdi-atlassian',
    },
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/dashboard/index.vue'),
      },
    ],
  },
  {
    path: '/example',
    component: Layout,
    meta: {
      title: '示例',
      icon: 'i-carbon-logo-wechat',
    },
    children: [
      {
        path: '',
        component: () => import('@/views/example/index.vue'),
      },
    ],
  },
  {
    path: '/moments',
    component: Layout,
    meta: {
      title: '动态',
      icon: 'i-carbon-aperture',
    },
    children: [
      {
        path: '',
        component: () => import('@/views/moments/index.vue'),
      },
    ],
  },
  {
    path: '/my',
    component: Layout,
    meta: {
      title: '我的',
      icon: 'i-simple-icons-docsify',
    },
    children: [
      {
        path: '',
        component: () => import('@/views/my/index.vue'),
      },
    ],
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
