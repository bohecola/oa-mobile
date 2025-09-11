import type { RouteRecordRaw } from 'vue-router'
import { approvalRoutes, carRoutes, contractRoutes, examRoutes, menuRoutes, myInfoRoutes, projectRoutes } from './baseRoutes'

// 基础路由
export const clientBaseRoutes: RouteRecordRaw[] = [
  {
    path: '/404',
    component: () => import('@/views/exception/404.vue'),
  },
]

// 模块路由
export const clientModuleRoutes: RouteRecordRaw[] = [
  ...menuRoutes,
  ...myInfoRoutes,
  ...approvalRoutes,
  ...examRoutes,
  ...projectRoutes,
  ...carRoutes,
  ...contractRoutes,
]

export const clientRoutes = [...clientBaseRoutes, ...clientModuleRoutes]
