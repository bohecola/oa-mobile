<script setup lang='ts'>
const route = useRoute()
const router = useRouter()

const navTitle = computed(() => route.meta.title as string)
</script>

<template>
  <van-nav-bar @click-left="router.back">
    <template #title>
      {{ navTitle }}
    </template>
    <template #left>
      <i class="i-material-symbols-arrow-back-ios-new text-xl" />
    </template>

    <template #right>
      <slot name="right" />
    </template>
  </van-nav-bar>
</template>
