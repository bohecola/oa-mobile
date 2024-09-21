<template>
  <van-divider>
    {{ content ?? '已经到底部了' }}
  </van-divider>
</template>

<script setup lang="ts">
defineProps<{
  content?: string
}>()
</script>
