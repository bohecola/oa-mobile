import type { App } from 'vue'
import { createPinia } from 'pinia'
import { useUserStore } from './user'

export const pinia = createPinia()

export function setupStore(app: App<Element>) {
  app.use(pinia)
}

export function useStore() {
  const user = useUserStore()

  return {
    user,
  }
}
