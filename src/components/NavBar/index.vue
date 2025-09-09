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
import dd from 'dingtalk-jsapi'
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

const { proxy } = getCurrentInstance() as ComponentInternalInstance

const router = useRouter()

const attrs = useAttrs()
const slots = useSlots()

function handleGoBackPage() {
  window.history.state.back ? router.back() : router.push('/')
}

// 左侧按钮点击
function handleLeftClick() {
  if (props.isLeftClickBack) {
    if (dd.env.platform === 'notInDingTalk') {
      return handleGoBackPage()
    }

    dd.goBackPage({
      onFail: (error: any) => {
        proxy?.$modal.msgError(error?.errorMessage)
        handleGoBackPage()
      },
    })
  }

  emit('click-left')
}
</script>
