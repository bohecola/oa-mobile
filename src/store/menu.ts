import { service } from '@/service'

export const useMenuStore = defineStore('menu', () => {
  // 视图路由
  const routes = ref<any[]>([])

  // 设置视图
  function setRoutes(list: any[]) {
    routes.value = list
  }

  // 获取菜单
  async function get() {
    try {
      // 动态菜单
      const { rows } = await service.workflow.formManage.listFormManage()

      const list = rows.map((e) => {
        const viewPath = e.appComponent
        const path = e.router
        const name = e.router.split('/').pop()
        const title = e.formName

        return {
          viewPath,
          path,
          meta: {
            innerPage: true,
            title,
          },
          name: `${name}-${e.id}`,
        }
      })

      // 设置视图路由
      setRoutes(list)
    }
    catch (err) {
      console.error(err)
    }
  }

  return {
    routes,
    get,
    setRoutes,
  }
})
