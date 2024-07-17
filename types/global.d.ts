export {}

declare global {
  type Recordable<T = any> = Record<string, T>

  interface ViteEnv {
    VITE_PORT: number
    VITE_PROXY: [string, string][]
    VITE_PUBLIC_PATH: string
    VITE_DROP_CONSOLE: boolean
  }
}
