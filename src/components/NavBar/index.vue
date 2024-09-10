<template>
  <van-nav-bar :fixed="fixed" :placeholder="placeholder" @click-left="router.back">
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

<script setup lang='ts'>
withDefaults(defineProps<{
  title?: string
  fixed?: boolean
  placeholder?: boolean
}>(), {
  title: () => {
    const route = useRoute()
    return route.meta.title as string ?? ''
  },
  fixed: false,
  placeholder: true,
})

const router = useRouter()
</script>
