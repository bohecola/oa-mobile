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

// 模块路由
export const clientModuleRoutes: RouteRecordRaw[] = [
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
  // 审批中心
  {
    path: '/approval',
    meta: {
      title: '审批中心',
      innerPage: true,
    },
    component: () => import('@/views/dashboard/approval/index.vue'),
  },
  // 审批查询
  {
    path: '/approval-search',
    meta: {
      title: '搜索',
      innerPage: true,
    },
    component: () => import('@/views/dashboard/approval/search.vue'),
  },
  // {
  //   path: '/example',
  //   component: Layout,
  //   meta: {
  //     title: '示例',
  //     icon: 'i-carbon-logo-wechat',
  //   },
  //   children: [
  //     {
  //       path: '',
  //       component: () => import('@/views/example/index.vue'),
  //     },
  //   ],
  // },
  {
    path: '/exam',
    component: Layout,
    meta: {
      title: '模拟考试',
      icon: 'i-mdi-document',
    },
    children: [
      {
        path: '',
        component: () => import('@/views/mockExam/index.vue'),
      },
    ],
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
  // 个人信息
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
  // 账户与安全
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
  // 主题设置
  {
    path: '/theme-settings',
    meta: {
      title: '主题设置',
      innerPage: true,
    },
    component: () => import('@/views/my/theme/index.vue'),
  },
]

export const clientRoutes = [...clientBaseRoutes, ...clientModuleRoutes]
