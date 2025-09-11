import type { App } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createRouterMatcher, createWebHistory } from 'vue-router'
import { isArray } from 'lodash-es'
import { createRouterGuards, whitePathList } from './routerGuards'
import { clientRoutes } from './modules'
import { useStore } from '@/store'
import { useGlobSettings } from '@/hooks'

const { publicPath } = useGlobSettings()

// 默认路由
const routes: RouteRecordRaw[] = [
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
  {
    path: '/social-callback',
    meta: {
      title: '第三方登录授权回调页面',
      innerPage: true,
    },
    component: () => import('@/views/login/components/SocialCallback.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: () => import('@/views/exception/404.vue'),
  },
]

// 创建路由器
const router = createRouter({
  history: createWebHistory(publicPath),
  routes,
  // strict: true,
}) as Router

// 扫描文件
const files = {
  ...import.meta.glob('@/views/modules/**/workflow/*.vue'),
}

// 添加视图，页面路由
router.append = function (routeData) {
  if (!routeData) {
    return false
  }

  // 确保 routeData 是数组
  const routeList = isArray(routeData) ? routeData : [routeData]

  routeList.forEach((route) => {
    if (!route.meta) {
      route.meta = {} // 初始化 meta 对象
    }

    // 如果没有指定组件路径
    if (!route.component) {
      const viewPath = route.viewPath

      if (viewPath) {
        if (viewPath.startsWith('http')) {
          // 如果是外部链接，使用 iframe 组件
          route.meta.iframeUrl = viewPath
          route.component = () => import('@/views/frame.vue')
        }
        else {
          // 从文件系统中动态导入组件
          route.component = files[`/src/views/modules/${viewPath}.vue`]
        }
      }
      else {
        route.redirect = '/404'
      }
    }

    // 是否动态添加
    route.meta.dynamic = true

    router.addRoute(route as any)
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

// 找路由
router.find = async function (path: string) {
  const { user, menu } = useStore()

  // TODO 待优化，刷新后重新请求配置数据
  if (user.info === null && user.token && !whitePathList.includes(path)) {
    await user.get()
    await menu.get()
  }

  // 获取已注册的路由
  const registeredRoutes = router.getRoutes()

  // 构建路由列表，包括已注册的路由、菜单配置和模块自定义路由
  const routeList: any[] = [
    ...registeredRoutes.map(route => ({
      ...route,
      isReg: true,
    })),
    ...menu.routes,
    ...clientRoutes,
  ]

  let isRegistered = false
  let matchedRoute: (typeof routeList)[number] | undefined

  // 创建路由匹配器
  const matcher = createRouterMatcher(routeList, {})

  // 查找匹配的路由
  matcher.getRoutes().find((route) => {
    const routeRegex = new RegExp(route.re)

    if (routeRegex.test(path)) {
      // 否则查找路径匹配的路由
      matchedRoute = routeList.find(
        r => r.path === route.record.path,
      )

      if (matchedRoute) {
        isRegistered = !!matchedRoute.isReg // 检查路由是否已注册
      }

      return true
    }

    return false
  })

  return {
    route: matchedRoute,
    isReg: isRegistered,
  }
}

// 装载路由器
export function setupRouter(app: App) {
  app.use(router)
}

// 创建路由守卫
createRouterGuards(router)

export * from './modules'

export default router
