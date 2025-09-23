import type { RouteRecordRaw } from 'vue-router'
import { approvalRoutes, carRoutes, contractRoutes, examRoutes, menuRoutes, myInfoRoutes, projectRoutes, taskRoutes } from './baseRoutes'

// 基础路由
export const clientBaseRoutes: RouteRecordRaw[] = [
  {
    path: '/404',
    component: () => import('@/views/exception/404.vue'),
  },
]

// 模块路由
export const clientModuleRoutes: RouteRecordRaw[] = [
  // 菜单
  ...menuRoutes,
  // 我的信息
  ...myInfoRoutes,
  // 审批
  ...approvalRoutes,
  // 考试
  ...examRoutes,
  // 项目
  ...projectRoutes,
  // 车辆
  ...carRoutes,
  // 合同
  ...contractRoutes,
  // 任务
  ...taskRoutes,
]

export const clientRoutes = [...clientBaseRoutes, ...clientModuleRoutes]
