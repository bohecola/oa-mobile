import type { Router } from 'vue-router'
import NProgress from 'nprogress'
import { useUserStore } from '@/store/user'
import 'nprogress/nprogress.css'

const whitePathList = ['/login']

export function createRouterGuards(router: Router) {
  // 全局前置路由守卫
  router.beforeEach((to, from) => {
    const user = useUserStore()

    NProgress.start()

    if (whitePathList.includes(to.path)) {
      return true
    }

    if (user.token) {
      return true
    }

    return { path: '/login' }
  })

  // 全局后置路由钩子
  router.afterEach((to, from) => {
    NProgress.done()
  })
}
