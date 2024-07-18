export {}

declare global {
  type Recordable<T = any> = Record<string, T>

  interface ImportMetaEnv extends ViteEnv {
    __: unknown
  }

  interface ViteEnv {
    VITE_PORT: number
    VITE_PROXY: [string, string][]
    VITE_PUBLIC_PATH: string
    VITE_DROP_CONSOLE: boolean
    VITE_GLOB_APP_TITLE: string
    VITE_GLOB_API_URL: string
    VITE_GLOB_API_URL_PREFIX: string
  }
}
