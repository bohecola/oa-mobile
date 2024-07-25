import type { RouteRecordRaw } from 'vue-router'

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
        meta: {
          hiddenTopbar: true,
        },
        component: () => import('@/views/my/index.vue'),
      },
    ],
  },
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
    path: '/edit-phone-number',
    meta: {
      title: '修改手机号码',
      innerPage: true,
    },
    component: () => import('@/views/my/profile/EditPhoneNumber.vue'),
  },
  {
    path: '/edit-email',
    meta: {
      title: '修改邮箱',
      innerPage: true,
    },
    component: () => import('@/views/my/profile/EditEmail.vue'),
  },
]
