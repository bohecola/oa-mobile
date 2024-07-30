import type { App } from 'vue'
import { createPinia } from 'pinia'
import { useUserStore } from './user'
import { useAppStore } from './app'

export const pinia = createPinia()

export function setupStore(app: App<Element>) {
  app.use(pinia)
}

export function useStore() {
  const user = useUserStore()
  const app = useAppStore()

  return {
    user,
    app,
  }
}
