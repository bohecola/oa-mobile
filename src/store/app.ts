import type { ColorMode, SystemColorMode, Theme } from '@/settings/designSettings'
import { themes } from '@/settings/designSettings'
import { storage } from '@/utils'
import { useSystemColorMode } from '@/hooks'

// 数据
const data = storage.info()

// 默认色彩模式
const { mode } = useSystemColorMode()
const defaultColorMode: ColorMode = data.colorMode ?? 'light'
if (!data.colorMode) {
  storage.set('colorMode', defaultColorMode)
}

// 默认主题
const defaultTheme = data.theme ?? themes[4]
if (!data.theme) {
  storage.set('theme', defaultTheme)
}

export const useAppStore = defineStore('app', () => {
  // 是否在 iframe 中
  const isInIframe = computed(() => window.self !== window.top)

  // 主题列表
  const themeList = ref(themes)

  // 应用主题
  const theme = ref<Theme>(data.theme ?? defaultTheme)
  // 设置应用主题
  function setTheme(val: Theme) {
    theme.value = val
    storage.set('theme', val)
  }

  // 应用色彩模式
  const colorMode = ref<ColorMode>(data.colorMode ?? defaultColorMode)
  // 设置应用色彩模式
  function setColorMode(val: ColorMode) {
    colorMode.value = val
    storage.set('colorMode', val)
  }

  // 系统色彩模式
  const systemColorMode = ref<SystemColorMode>(mode)
  // 设置系统色彩模式
  function setSystemColorMode(val: SystemColorMode) {
    systemColorMode.value = val
  }

  // 当前应用色彩模式
  const currentColorMode = computed(() => {
    return colorMode.value === 'auto' ? systemColorMode.value : colorMode.value
  })

  return {
    isInIframe,
    theme,
    themeList,
    colorMode,
    systemColorMode,
    currentColorMode,
    setTheme,
    setColorMode,
    setSystemColorMode,
  }
})
