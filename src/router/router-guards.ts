import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { useStore } from '@/store'

export const whitePathList = ['/login', '/404', '/social-callback', '/external-exam', '/internal-exam', '/wechat-exam-entry']

export function createRouterGuards(router: Router) {
  // 全局前置路由守卫
  router.beforeEach(async (to) => {
    NProgress.start()
    // 数据缓存
    const { user } = useStore()
    // 预先注册路由
    const { isReg, route } = await router.register(to.path)

    if (!route?.components) {
      return user.token ? '/404' : '/login'
    }
    else {
      if (!isReg) {
        return to.fullPath
      }
      else {
        if (whitePathList.includes(to.path)) {
          return true
        }

        if (user.token) {
          return true
        }
        return '/login'
      }
    }
  })

  // 全局后置路由钩子
  router.afterEach(() => {
    NProgress.done()
  })
}
