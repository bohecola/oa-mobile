import type { ComponentInternalInstance as ComponentInstance } from 'vue'

export {}

declare global {
  /** vue Instance */
  declare type ComponentInternalInstance = ComponentInstance

  type Recordable<T = any> = Record<string, T>
  type Override<P, S> = Omit<P, keyof S> & S

  type WithRequiredProperty<T, K extends keyof T> = T & {
    [P in K]-?: T[P]
  }

  interface ImportMetaEnv extends ViteEnv {
    __: unknown
  }

  interface ViteEnv {
    VITE_PORT: number
    VITE_PROXY: [string, string][]
    VITE_PUBLIC_PATH: string
    VITE_DROP_CONSOLE: boolean
    VITE_GLOB_APP_TITLE: string
    VITE_GLOB_APP_CLIENT_ID: string
    VITE_GLOB_APP_RSA_PUBLIC_KEY: string
    VITE_GLOB_API_URL: string
    VITE_GLOB_API_URL_PREFIX: string
  }
}
