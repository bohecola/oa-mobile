import type { App } from 'vue'
import { createPinia } from 'pinia'
import { useUserStore } from './user'
import { useAppStore } from './app'
import { useDictStore } from './dict'
import { useMenuStore } from './menu'

export const pinia = createPinia()

export function setupStore(app: App<Element>) {
  app.use(pinia)
}

export function useStore() {
  const app = useAppStore()
  const user = useUserStore()
  const menu = useMenuStore()
  const dict = useDictStore()

  return {
    app,
    user,
    menu,
    dict,
  }
}
