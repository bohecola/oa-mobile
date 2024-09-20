<template>
  <van-nav-bar :fixed="fixed" :placeholder="placeholder" z-index="10" @click-left="handleLeftClick">
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
const props = withDefaults(defineProps<{
  title?: string
  fixed?: boolean
  placeholder?: boolean
  isLeftClickBack?: boolean
}>(), {
  title: () => {
    const route = useRoute()
    return route.meta.title as string ?? ''
  },
  fixed: false,
  placeholder: true,
  isLeftClickBack: true,
})

const emit = defineEmits(['click-left'])

const router = useRouter()

// 左侧按钮点击
function handleLeftClick() {
  if (props.isLeftClickBack) {
    router.back()
  }
  emit('click-left')
}
</script>
