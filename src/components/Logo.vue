<template>
  <div class="w-24 h-24 flex items-center justify-center rounded bg-[var(--bg-color)]">
    <img :src="logo" class="object-contain" alt="Logo">
  </div>
</template>

<script setup lang="ts">
import logo from '@/assets/images/logo.png'
</script>
