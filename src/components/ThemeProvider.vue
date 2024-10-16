<template>
  <van-config-provider :theme="app.currentColorMode">
    <slot />
  </van-config-provider>
</template>

<script setup lang='ts'>
import { useSystemColorMode } from '@/hooks'
import { useStore } from '@/store'

// 应用状态
const { app } = useStore()

// 色彩模式
watch(
  () => app.currentColorMode,
  (val) => {
    document.documentElement.setAttribute('data-theme-mode', val)
  },
  { immediate: true },
)

// 主题色彩
watch(
  () => app.theme,
  (val, oldVal) => {
    if (oldVal && val.name !== oldVal.name) {
      document.documentElement.classList.remove(`theme-${oldVal.name}`)
    }
    document.documentElement.classList.add(`theme-${val.name}`)
  },
  { immediate: true },
)

// 同步系统色彩模式状态
function updateSystemColorMode(e: MediaQueryListEvent) {
  app.setSystemColorMode(e.matches ? 'light' : 'dark')
}

// 监听系统色彩模式状态
const { mediaQuery } = useSystemColorMode()
mediaQuery.addEventListener('change', updateSystemColorMode)

// 移除监听
onUnmounted(() => {
  mediaQuery.removeEventListener('change', updateSystemColorMode)
})
</script>
