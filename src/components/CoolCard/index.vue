<template>
  <div
    class="w-full border bg-[--bg-card]"
    :class="[
      { 'shadow-sm': shadow },
      { rounded: round },
    ]"
  >
    <!-- 头部 -->
    <div class="px-2 py-1 h-8 flex items-center" :class="{ 'border-b': active }" @click="toggle">
      <!-- 标题 -->
      <div class="flex-auto">
        <slot v-if="slots.title" name="title" />
        <span v-else>{{ title }}</span>
      </div>

      <!-- 箭头 -->
      <van-icon :name="active ? 'arrow-down' : 'arrow'" />
    </div>

    <!-- 内容 -->
    <div v-show="active" class="p-2">
      <van-empty
        v-if="isEmpty"
        :image="customEmptyImage"
        image-size="60"
        description="数据为空"
      />
      <slot v-else name="default" />
    </div>

    <!-- 底部 -->
    <div v-if="slots.footer" class="px-2 py-1 border-t">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang='ts'>
import { isNil } from 'lodash-es'

import customEmptyImage from '@/assets/images/custom-empty-image.png'

interface CoolCardSlots {
  title?: () => any
  default?: () => any
  footer?: () => any
}

withDefaults(
  defineProps<{
    title?: string | number
    round?: boolean
    shadow?: boolean
    isEmpty?: boolean
  }>(),
  {
    shadow: true,
  },
)

const slots = defineSlots<CoolCardSlots>()

const isActive = inject<(index: number) => boolean>('card-list-wrap:isActive')
const toggleTo = inject<(index: number) => void>('card-list-wrap:toggleTo')
const register = inject<() => number>('card-list-wrap:register')
const unregister = inject<(index: number) => void>('card-list-wrap:unregister')

// 索引
const index = ref<number>(undefined)
// 是否活跃索引
const active = computed(() => isActive(index.value))

// 切换
function toggle() {
  if (isNil(index.value))
    return

  toggleTo(index.value)
}

// 挂载
onMounted(() => {
  // 注册
  index.value = register()
})

// 卸载
onUnmounted(() => {
  // 注销
  unregister(index.value)
})

defineExpose({
  index,
})
</script>
