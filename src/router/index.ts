import type { App } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'
import { isArray } from 'lodash-es'
import { createRouterGuards } from './guards'
import { otherRoutes } from './others'
import { useStore } from '@/store'

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

// 创建路由器
const router = createRouter({
  history: createWebHashHistory(''),
  routes: constantRoutes.concat(otherRoutes),
  // strict: true,
}) as Router

// 扫描文件
const files = {
  ...import.meta.glob('@/views/modules/**/workflow/*.vue'),
}

// 找路由
router.find = function (path: string) {
  return router.getRoutes().find(e => e.path === path)
}

// 添加视图，页面路由
router.append = function (data) {
  const list = isArray(data) ? data : [data]

  list.forEach((d) => {
    if (!d.meta) {
      d.meta = {}
    }

    // 组件路径
    if (!d.component) {
      const url = d.viewPath

      if (url) {
        if (url.indexOf('http') === 0) {
          if (d.meta) {
            d.meta.iframeUrl = url
          }

          d.component = () => import('@/views/frame.vue')
        }
        else {
          d.component = files[`/src/views/modules/${url}.vue`]
        }
      }
      else {
        d.redirect = '/404'
      }
    }

    // 是否动态添加
    d.meta.dynamic = true

    router.addRoute(d as any)
  })
}

// 清空路由
router.clear = function () {
  const rs = router.getRoutes()

  rs.forEach((e) => {
    if (e.name && e.meta?.dynamic) {
      router.removeRoute(e.name)
    }
  })
}

// 注册
router.register = async function (path: string) {
  const isReg = Boolean(router.find(path))

  if (!isReg) {
    const { user, menu } = useStore()

    // 待注册列表
    const list: any[] = []

    // TODO 待优化，刷新后重新请求配置数据
    if (user.info === null) {
      await user.get()
      await menu.get()
    }

    menu.routes.forEach((e) => {
      list.push({ ...e })
    })

    // 需要注册的路由
    const r = list.find(e => e.path === path)

    if (r) {
      router.append(r)
    }
  }

  return { route: router.find(path), isReg }
}

// 装载路由器
export function setupRouter(app: App) {
  app.use(router)
}

// 创建路由守卫
createRouterGuards(router)

export * from './others'
export default router
