<template>
  <van-nav-bar
    :placeholder="true"
    z-index="10"
    safe-area-inset-top
    v-bind="attrs"
    @click-left="handleLeftClick"
  >
    <template #title>
      <span :class="cn('w-full text-ellipsis overflow-hidden', titleClass)">{{ title }}</span>
    </template>

    <template #left>
      <i class="i-material-symbols-arrow-back-ios-new text-xl" />
    </template>

    <template v-for="(_, name) in slots" #[name]="scope" :key="name">
      <slot v-bind="scope" :key="name" :name="name" />
    </template>
  </van-nav-bar>
</template>

<script setup lang='ts'>
import { cn } from '@/utils'

const props = withDefaults(
  defineProps<{
    title?: string
    titleClass?: string
    isLeftClickBack?: boolean

  }>(),
  {
    title: () => {
      const route = useRoute()
      return route.meta.title as string ?? ''
    },
    isLeftClickBack: true,
  },
)

const emit = defineEmits(['click-left'])

const router = useRouter()

const attrs = useAttrs()
const slots = useSlots()

// 左侧按钮点击
function handleLeftClick() {
  if (props.isLeftClickBack) {
    if (window.history.state.back) {
      return router.back()
    }
    else {
      return router.push('/')
    }
  }
  emit('click-left')
}
</script>
