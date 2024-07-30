<script setup lang="ts">
import ThemeProvider from './components/ThemeProvider.vue'
</script>

<template>
  <ThemeProvider>
    <router-view />
  </ThemeProvider>
</template>

<style lang="scss">
  @import './styles/index.scss';
</style>
