<template>
  <NavBar />
  <van-divider>色彩模式</van-divider>

  <van-radio-group v-model="app.colorMode" @change="onColorModeChange">
    <van-cell-group inset>
      <van-cell title="跟随系统" clickable @click="app.setColorMode('auto')">
        <template #right-icon>
          <van-radio name="auto" />
        </template>
      </van-cell>
      <van-cell title="深色" clickable @click="app.setColorMode('dark')">
        <template #right-icon>
          <van-radio name="dark" />
        </template>
      </van-cell>
      <van-cell title="浅色" clickable @click="app.setColorMode('light')">
        <template #right-icon>
          <van-radio name="light" />
        </template>
      </van-cell>
    </van-cell-group>
  </van-radio-group>

  <van-divider>系统主题色</van-divider>
  <div class="mx-6 grid grid-cols-4 gap-2 justify-items-center">
    <div
      v-for="(theme, index) in app.themeList"
      :key="index"
      class="text-center"
      @click="toggleTheme(theme)"
    >
      <span
        :style="{ backgroundColor: theme[app.currentColorMode] }"
        class="flex justify-center items-center w-16 h-16 border-2 rounded-lg"
      >
        <i
          v-show="theme.name === app.theme.name"
          class="i-carbon-checkmark text-lg text-white"
        />

      </span>
      <span class="text-sm">{{ theme.zh }}</span>
    </div>
  </div>
</template>

<script setup lang='ts'>
import type { ColorMode } from '@/settings/designSettings'
import { useStore } from '@/store'

const { app } = useStore()

// 色彩模式切换
function onColorModeChange(val: ColorMode) {
  app.setColorMode(val)
}

// 主题切换
function toggleTheme(theme: any) {
  app.setTheme(theme)
}
</script>
