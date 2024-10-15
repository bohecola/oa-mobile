export type ThemeMode = 'light' | 'dark'

export interface Theme {
  name: string
  light: string
  dark: string
  zh?: string
}

export const themes: Theme[] = [
  {
    name: 'blue',
    light: '#2563eb',
    dark: '#3b82f6',
    zh: '海蓝',
  },
  {
    name: 'green',
    light: '#16a34a',
    dark: '#22c55e',
    zh: '奶绿',
  },
  {
    name: 'violet',
    light: '#d0378d',
    dark: '#d0378d',
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
