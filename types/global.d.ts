import type { ComponentInternalInstance as ComponentInstance } from 'vue'
import type { RouteRecordRaw, Router as VueRouter } from 'vue-router'

export {}

declare global {
  /** vue Instance */
  declare type ComponentInternalInstance = ComponentInstance

  type Recordable<T = any> = Record<string, T>

  type Override<P, S> = Omit<P, keyof S> & S

  type WithRequiredProperty<T, K extends keyof T> = T & {
    [P in K]-?: T[P]
  }

  type PartialBooleanRecord<T> = Partial<Record<keyof T, boolean>>

  interface Router extends VueRouter {
    find: (path: string) => RouteRecordRaw | undefined
    append: (
      data: {
        name?: string
        path: string
        component?: any
        viewPath?: string
        isPage?: boolean
        [key: string]: any
      }[]
    ) => void
    register: (path: string) => Promise<{ route: RouteRecordRaw | undefined, isReg: boolean }>
    [key: string]: any
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
