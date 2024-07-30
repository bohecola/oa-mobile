<template>
  <van-config-provider :theme="app.themeMode">
    <slot />
  </van-config-provider>
</template>

<script setup lang='ts'>
import { useStore } from '@/store'

const { app } = useStore()

// 明暗模式
watch(
  () => app.themeMode,
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
</script>
