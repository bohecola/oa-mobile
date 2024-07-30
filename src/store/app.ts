import { storage } from '@/utils'

interface Theme {
  name: string
  light: string
  dark: string
  zh?: string
}

const themes: Theme[] = [
  {
    name: 'green',
    light: '#16a34a',
    dark: '#22c55e',
    zh: '奶绿',
  },
  {
    name: 'violet',
    light: '#7c3aed',
    dark: '#6d28d9',
    zh: '酱紫',
  },
  {
    name: 'rose',
    light: '#e11d48',
    dark: '#e11d48',
    zh: '玫红',
  },
  {
    name: 'yellow',
    light: '#facc15',
    dark: '#facc15',
    zh: '柠黄',
  },
  {
    name: 'blue',
    light: '#2563eb',
    dark: '#3b82f6',
    zh: '海蓝',
  },
  {
    name: 'orange',
    light: '#f97316',
    dark: '#ea580c',
    zh: '橙黄',
  },
  {
    name: 'emerald',
    light: '#78dec7',
    dark: '#78dec7',
    zh: '翠绿',
  },
  {
    name: 'teal',
    light: '#00c1d4',
    dark: '#00c1d4',
    zh: '靛青',
  },
]

type ThemeMode = 'light' | 'dark'

// 数据
const data = storage.info()
// 初始主题模式
const initThemeMode = data.themeMode ?? (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark')
// 初始主题
const [initTheme] = themes
export const useAppStore = defineStore('app', () => {
  // 主题模式
  const themeMode = ref<ThemeMode>(data.themeMode ?? initThemeMode)
  // 设置主题模式
  function setThemeMode(val: ThemeMode) {
    themeMode.value = val
    storage.set('themeMode', val)
  }

  // 主题色彩
  const theme = ref<Theme>(data.theme ?? initTheme)
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
