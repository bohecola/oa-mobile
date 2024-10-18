<script setup lang="ts">
import { TransitionSlide } from '@morev/vue-transitions'
</script>

<template>
  <ThemeProvider>
    <router-view v-slot="{ Component }">
      <transition-slide :offset="[16, 0]">
        <component :is="Component" class="h-dvh overflow-y-auto" />
      </transition-slide>
    </router-view>
  </ThemeProvider>
</template>

<style lang="scss">
  @import './assets/styles/index.scss';
</style>
