import type { RouteRecordRaw } from 'vue-router'

// 布局组件
const Layout = () => import('@/layouts/index.vue')

// 基础路由
export const clientBaseRoutes: RouteRecordRaw[] = [
  {
    path: '/404',
    component: () => import('@/views/exception/404.vue'),
  },
]

// 底部菜单
export const menuRoutes: RouteRecordRaw[] = [
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
    path: '/apps',
    meta: {
      title: '更多',
      icon: 'i-ant-design-appstore-filled',
    },
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/apps/index.vue'),
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
        meta: {
          hiddenTopbar: true,
        },
        component: () => import('@/views/my/index.vue'),
      },
    ],
  },
]

// 审批中心
export const approvalRoutes: RouteRecordRaw[] = [
  {
    path: '/approval',
    meta: {
      title: '审批中心',
      innerPage: true,
    },
    component: () => import('@/views/dashboard/approval/index.vue'),
  },
  {
    path: '/approval-search',
    meta: {
      title: '搜索',
      innerPage: true,
    },
    component: () => import('@/views/dashboard/approval/search.vue'),
  },
]

// 考试管理
export const examRoutes: RouteRecordRaw[] = [
  {
    path: '/exam',
    meta: {
      title: '模拟考试',
      innerPage: true,
    },
    component: () => import('@/views/modules/mockExam/index.vue'),
  },
  {
    path: '/qrcode-expired',
    meta: {
      title: '二维码过期',
      innerPage: true,
    },
    component: () => import('@/views/modules/exam/qrcode-expired-page.vue'),
  },
  {
    path: '/external-exam',
    meta: {
      title: '外部考试',
      innerPage: true,
    },
    component: () => import('@/views/modules/exam/index.vue'),
  },
  {
    path: '/internal-exam',
    meta: {
      title: '内部考试',
      innerPage: true,
    },
    component: () => import('@/views/modules/exam/index.vue'),
  },
  {
    path: '/mock-exam',
    meta: {
      title: '模拟考试',
      innerPage: true,
    },
    component: () => import('@/views/modules/exam/index.vue'),
  },
  {
    path: '/wechat-exam-entry',
    meta: {
      title: '微信公众号考试入口',
      innerPage: true,
    },
    component: () => import('@/views/modules/exam/wechat-entry.vue'),
  },
]

// 工程管理
const projectRoutes: RouteRecordRaw[] = [
  {
    path: '/daily-report',
    meta: {
      title: '每日一报',
      innerPage: true,
    },
    component: () => import('@/views/modules/dailyReport/index.vue'),
  },
  {
    path: '/daily-report/new',
    meta: {
      title: '每日一报（新增）',
      innerPage: true,
    },
    component: () => import('@/views/modules/dailyReport/upsert.vue'),
  },
  {
    path: '/daily-report/:id/edit',
    meta: {
      title: '每日一报（编辑）',
      innerPage: true,
    },
    component: () => import('@/views/modules/dailyReport/upsert.vue'),
  },
  {
    path: '/daily-report/:id',
    meta: {
      title: '每日一报（查看）',
      innerPage: true,
    },
    component: () => import('@/views/modules/dailyReport/detail.vue'),
  },
]

// 车辆管理
const carRoutes: RouteRecordRaw[] = [
  {
    path: '/car-refueling-record',
    meta: {
      title: '车辆加油',
      innerPage: true,
    },
    component: () => import('@/views/modules/car/carRefuelingRecord/index.vue'),
  },
  {
    path: '/car-refueling-record/new',
    meta: {
      title: '车辆加油（新增）',
      innerPage: true,
    },
    component: () => import('@/views/modules/car/carRefuelingRecord/upsert.vue'),
  },
  {
    path: '/car-refueling-record/:id/edit',
    meta: {
      title: '车辆加油（编辑）',
      innerPage: true,
    },
    component: () => import('@/views/modules/car/carRefuelingRecord/upsert.vue'),
  },
  {
    path: '/car-refueling-record/:id',
    meta: {
      title: '车辆加油（查看）',
      innerPage: true,
    },
    component: () => import('@/views/modules/car/carRefuelingRecord/detail.vue'),
  },
  {
    path: '/misc-refuel',
    meta: {
      title: '零星加油',
      innerPage: true,
    },
    component: () => import('@/views/modules/car/carRefuelingRecord/index.vue'),
  },
  {
    path: '/misc-refuel/new',
    meta: {
      title: '零星加油（新增）',
      innerPage: true,
    },
    component: () => import('@/views/modules/car/carRefuelingRecord/upsert.vue'),
  },
  {
    path: '/misc-refuel/:id/edit',
    meta: {
      title: '零星加油（编辑）',
      innerPage: true,
    },
    component: () => import('@/views/modules/car/carRefuelingRecord/upsert.vue'),
  },
  {
    path: '/misc-refuel/:id',
    meta: {
      title: '零星加油（查看）',
      innerPage: true,
    },
    component: () => import('@/views/modules/car/carRefuelingRecord/detail.vue'),
  },
]

// 个人中心
export const myInfoRoutes: RouteRecordRaw[] = [
  {
    path: '/profile',
    meta: {
      title: '编辑个人信息',
      innerPage: true,
    },
    component: () => import('@/views/my/profile/index.vue'),
  },
  {
    path: '/edit-nickname',
    meta: {
      title: '修改昵称',
      innerPage: true,
    },
    component: () => import('@/views/my/profile/EditNickname.vue'),
  },
  {
    path: '/account-settings',
    meta: {
      title: '账号与安全',
      innerPage: true,
    },
    component: () => import('@/views/my/account/index.vue'),
  },
  {
    path: '/edit-phone-number',
    meta: {
      title: '修改手机号码',
      innerPage: true,
    },
    component: () => import('@/views/my/account/EditPhoneNumber.vue'),
  },
  {
    path: '/edit-email',
    meta: {
      title: '修改邮箱',
      innerPage: true,
    },
    component: () => import('@/views/my/account/EditEmail.vue'),
  },
  {
    path: '/change-password',
    meta: {
      title: '修改登录密码',
      innerPage: true,
    },
    component: () => import('@/views/my/account/EditPassword.vue'),
  },
  {
    path: '/theme-settings',
    meta: {
      title: '主题设置',
      innerPage: true,
    },
    component: () => import('@/views/my/theme/index.vue'),
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
]

export const clientRoutes = [...clientBaseRoutes, ...clientModuleRoutes]
