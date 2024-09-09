<script setup lang='ts'>
withDefaults(defineProps<{
  title?: string
}>(), {
  title: () => {
    const route = useRoute()
    return route.meta.title as string ?? ''
  },
})

const router = useRouter()
</script>

<template>
  <van-nav-bar @click-left="router.back">
    <template #title>
      {{ title }}
    </template>
    <template #left>
      <i class="i-material-symbols-arrow-back-ios-new text-xl" />
    </template>

    <template #right>
      <slot name="right" />
    </template>
  </van-nav-bar>
</template>
