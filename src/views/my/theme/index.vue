<template>
  <NavBar />
  <van-divider>主题模式</van-divider>
  <van-cell-group inset>
    <van-cell center title="暗黑模式">
      <template #right-icon>
        <van-switch v-model="isDark" size="22" />
      </template>
    </van-cell>
  </van-cell-group>

  <van-divider>系统主题色</van-divider>
  <div class="mx-6 grid grid-cols-4 gap-2 justify-items-center">
    <div
      v-for="(theme, index) in app.themeList"
      :key="index"
      class="text-center"
      @click="toggleTheme(theme)"
    >
      <span
        :style="{
          backgroundColor: theme[app.themeMode],
        }"
        class="
          flex justify-center items-center
          w-16 h-16 border-2 rounded-lg
        "
      >
        <i
          v-show="theme.name === app.theme.name"
          class="i-carbon-checkmark text-lg text-white"
        />
        <br>
      </span>
      <span class="text-sm">{{ theme.zh }}</span>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { useStore } from '@/store'

const { app } = useStore()
const isDark = ref(app.themeMode === 'dark')

// 明暗切换
watch(isDark, (val) => {
  app.setThemeMode(val ? 'dark' : 'light')
}, { immediate: true })

// 主题切换
function toggleTheme(theme: any) {
  app.setTheme(theme)
}
</script>
