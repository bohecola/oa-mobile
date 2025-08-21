import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { useStore } from '@/store'
import { setupDingTalk } from '@/plugins/dingTalk'

export const whitePathList = ['/login', '/404', '/social-callback', '/external-exam', '/internal-exam', '/wechat-exam-entry', '/qrcode-expired']

export function createRouterGuards(router: Router) {
  // 全局前置路由守卫
  router.beforeEach(async (to) => {
    NProgress.start()

    // 获取用户数据
    const { user } = useStore()

    // 查找路由信息
    const { isReg, route } = await router.find(to.path)

    // 如果路由不存在
    if (!route) {
      return user.token ? '/404' : '/login'
    }

    // 如果路由未注册
    if (!isReg) {
      router.append(route) // 注册路由
      return to.fullPath // 重定向到原路径
    }

    // 白名单中
    if (whitePathList.includes(to.path)) {
      return true
    }

    // 如果用户已登录
    if (user.token) {
      // 钉钉鉴权
      await setupDingTalk()

      return true
    }

    return '/login'
  })

  // 全局后置路由钩子
  router.afterEach(() => {
    NProgress.done()
  })
}
