export type ColorMode = 'light' | 'dark' | 'auto'
export type SystemColorMode = 'light' | 'dark'

export interface Theme {
  name: string
  light: string
  dark: string
  zh?: string
}

export const themes: Theme[] = [
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
    name: 'rose',
    light: '#e11d48',
    dark: '#e11d48',
    zh: '玫红',
  },
  {
    name: 'violet',
    light: '#d0378d',
    dark: '#d0378d',
    zh: '樱桃',
  },
  {
    name: 'blue',
    light: '#2563eb',
    dark: '#3b82f6',
    zh: '默认',
  },
  {
    name: 'teal',
    light: '#00c1d4',
    dark: '#00c1d4',
    zh: '靛青',
  },
  {
    name: 'emerald',
    light: '#3EB489',
    dark: '#3EB489',
    zh: '薄荷',
  },
  {
    name: 'green',
    light: '#16a34a',
    dark: '#22c55e',
    zh: '果绿',
  },
]
