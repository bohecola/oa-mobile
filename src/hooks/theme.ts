import type { SystemColorMode } from '@/settings/designSettings'

export function useSystemColorMode() {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: light)')
  const mode: SystemColorMode = mediaQuery.matches ? 'light' : 'dark'

  return {
    mode,
    mediaQuery,
  }
}
