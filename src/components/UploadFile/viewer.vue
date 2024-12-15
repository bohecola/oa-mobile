<template>
  <!-- 视频 -->
  <van-image-preview v-model:show="video.visible" :images="[video.url]" :close-on-click-image="false" teleport="body" @close="onImagePreviewClose">
    <template #image>
      <video id="video" :key="video.url" controls :volume="0.6" class="w-full">
        <source :src="video.url" type="video/mp4">
        <source :src="video.url" type="video/ogg">
        <source :src="video.url" type="video/webm">
      </video>
    </template>
  </van-image-preview>

  <!-- 文档 -->
  <van-popup
    v-model:show="doc.visible"
    position="bottom"
    class="h-full w-full"
    teleport="body"
    safe-area-inset-bottom
  >
    <NavBar
      :title="doc.name"
      :is-left-click-back="false"
      @click-left="doc.visible = false"
    >
      <template #right>
        <div class="flex gap-3">
          <i class="i-material-symbols-download text-xl" @click="proxy?.$download.oss(doc.ossId)" />
        </div>
      </template>
    </NavBar>

    <div v-loading="doc.loading" class="w-full h-[calc(100vh-var(--van-nav-bar-height))] overflow-y-auto">
      <iframe ref="docIframe" :src="doc.url" class="border-none w-full h-full" />
    </div>
  </van-popup>
</template>

<script setup lang='ts'>
import CryptoJS from 'crypto-js'
import { isDocType, isTxtType, isVideoType } from './helper'
import { encryptBase64 } from '@/utils/security'
import { useGlobSettings } from '@/hooks'

const { previewUrl } = useGlobSettings()

const { proxy } = getCurrentInstance() as ComponentInternalInstance
const docIframe = ref<HTMLIFrameElement | null>()

// 视频预览
const video = reactive({
  visible: false,
  name: '',
  url: '',
})

// 文档预览
const doc = reactive({
  visible: false,
  loading: false,
  fullscreen: false,
  ossId: '',
  name: '',
  url: '',
})

// 视频预览关闭监听
function onImagePreviewClose() {
  const video = document.getElementById('video') as HTMLVideoElement
  video.pause()
}

// 打开
function open(options: { file: any, ext: string }) {
  const { file, ext } = options
  const url = file.url || ''
  const name = file.name || 'DocViewer'
  const ossId = file.ossId || ''

  // 视频预览
  if (isVideoType(ext)) {
    video.visible = true
    video.name = name
    video.url = url

    return true
  }

  // 文档预览
  if (isDocType(ext) || isTxtType(ext)) {
    // if (doc.ossId === ossId) {
    //   doc.visible = true
    //   return true
    // }

    doc.visible = true
    doc.loading = true
    doc.name = name
    doc.ossId = ossId
    doc.url = isTxtType(ext)
      ? `${url}?t=${Date.now()}`
      : `${previewUrl}?url=${encodeURIComponent(encryptBase64(CryptoJS.enc.Utf8.parse(url)))}&t=${Date.now()}`

    nextTick(() => {
      docIframe.value.onload = () => {
        doc.loading = false
      }
    })

    return true
  }

  window.open(url)
}

defineExpose({
  open,
})
</script>
