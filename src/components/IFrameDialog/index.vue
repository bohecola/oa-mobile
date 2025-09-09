<template>
  <van-popup
    v-model:show="visible"
    position="bottom"
    class="h-full"
    destroy-on-close
    safe-area-inset-bottom
  >
    <NavBar :title="title" :is-left-click-back="false" @click-left="closePopup" />

    <div v-loading="loading" class="w-full h-[calc(100vh-var(--van-nav-bar-height))]">
      <iframe
        ref="IFrameRef"
        :key="iframeUrl"
        :src="iframeUrl"
        class="border-none w-full h-full"
      />
    </div>
  </van-popup>
</template>

<script setup lang="ts">
import { usePopup } from '@/hooks'

interface OpenOptions {
  title?: string
  url: string
}

const IFrameRef = ref<HTMLIFrameElement>()

const iframeUrl = ref('')

const loading = ref(false)

const { title, visible, openPopup, closePopup } = usePopup()

function open(options: OpenOptions) {
  loading.value = true

  const { title: popupTitle, url } = options

  title.value = popupTitle

  iframeUrl.value = url

  openPopup()

  nextTick(() => {
    IFrameRef.value.onload = () => {
      loading.value = false
    }
  })
}

defineExpose({
  open,
})
</script>
