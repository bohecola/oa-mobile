<script setup lang="ts">
import { TransitionSlide } from '@morev/vue-transitions'

const isIOS = computed(() => /iPhone|iPad|iPod/i.test(navigator.userAgent))
</script>

<template>
  <ThemeProvider>
    <router-view v-slot="{ Component }">
      <component :is="Component" v-if="isIOS" class="h-[var(--fdvh,100vh)] overflow-y-auto" />
      <transition-slide v-else :offset="[16, 0]">
        <component :is="Component" class="h-[var(--fdvh,100vh)] overflow-y-auto" />
      </transition-slide>
    </router-view>
  </ThemeProvider>
</template>

<style lang="scss">
  @import './assets/styles/index.scss';
</style>
