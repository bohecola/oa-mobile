import type { Theme, ThemeMode } from '@/settings/designSettings'
import { themes } from '@/settings/designSettings'
import { storage } from '@/utils'

// 数据
const data = storage.info()
// 初始主题模式
const initThemeMode = data.themeMode ?? (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark')
// 初始主题
const [defaultTheme] = themes

export const useAppStore = defineStore('app', () => {
  // 主题模式
  const themeMode = ref<ThemeMode>(data.themeMode ?? initThemeMode)
  // 设置主题模式
  function setThemeMode(val: ThemeMode) {
    themeMode.value = val
    storage.set('themeMode', val)
  }

  // 主题色彩
  const theme = ref<Theme>(data.theme ?? defaultTheme)
  // 设置主题色彩
  function setTheme(val: Theme) {
    theme.value = val
    storage.set('theme', val)
  }

  // 主题列表
  const themeList = ref(themes)
  // 设置主题列表
  function setThemeList(val: Theme[]) {
    themeList.value = val
  }

  return {
    themeMode,
    theme,
    themeList,
    setThemeMode,
    setTheme,
    setThemeList,
  }
})
