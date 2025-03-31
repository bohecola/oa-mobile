<template>
  <div>
    <van-uploader
      ref="uploadFileRef"
      v-model="fileList"
      :multiple="isMultiple"
      :max-count="limit"
      :max-size="maxSizeByte"
      :deletable="!readonly"
      :preview-size="cardSize"
      :accept="accept"
      :readonly="readonly"
      :before-read="beferRead"
      :after-read="afterRead"
      :preview-options="{
        images: imageFileList as string[],
      }"
      @oversize="onOverSize"
      @delete="onDelete"
    >
      <!-- 文件上传按钮 -->
      <div
        v-if="!readonly"
        class="flex items-center justify-center border bg-[--bg-color]"
        :style="{
          width: `${cardSize}px`,
          height: `${cardSize}px`,
        }"
      >
        <van-icon name="plus" size="20" />
      </div>

      <!-- 预览区上方 -->
      <template #preview-cover="item: UploaderFileListItem">
        <div class="w-full h-full">
          <template v-for="(fileActionEnum, index) in fileActionEnums" :key="index">
            <template v-if="fileActionEnum.extensions.includes(getFilenameExt(item.name ?? item.file!.name) as any)">
              <!-- 视频 -->
              <div
                v-if="isVideoType(getFilenameExt(item.name ?? item.file!.name))"
                class="relative w-full h-full bg-[--bg-color]"
                @click="() => { fileActionEnum?.handler?.(item) }"
              >
                <video :src="item.url" class="w-full h-full" preload="metadata" />
                <van-icon class="!absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]" name="play-circle" />

                <div class="p-1 absolute bottom-0 w-full overflow-hidden text-white/80 text-center text-xs text-nowrap text-ellipsis bg-black/30">
                  {{ item.name }}
                </div>
              </div>

              <!-- 其他 -->
              <div
                v-else-if="!isImageType(getFilenameExt(item.name ?? item.file!.name))"
                class="relative w-full h-full flex items-center justify-center bg-[--bg-color]"
                @click="() => { fileActionEnum?.handler?.(item) }"
              >
                <img :src="fileActionEnum.icon" class="w-8 h-8 object-contain" :alt="item.name">

                <div class="p-1 absolute bottom-0 w-full overflow-hidden text-white/80 text-center text-xs text-nowrap text-ellipsis bg-black/30">
                  {{ item.name }}
                </div>
              </div>
            </template>
          </template>
        </div>
      </template>
    </van-uploader>

    <!-- 文件预览 -->
    <viewer ref="viewerRef" />
  </div>
</template>

<script setup lang='ts'>
import type { UploaderAfterRead, UploaderInstance, UploaderFileListItem as _UploaderFileListItem } from 'vant'
import type { Numeric } from 'vant/lib/utils'
import { isArray, isEmpty } from 'lodash-es'
import { useCustomFieldValue } from '@vant/use'
import type { FileActionEnum, FileType } from './helper'
import { excelTypeEnum, fileTypeEnum, imageTypeEnum, isImageType, isVideoType, otherTypeEnum, pdfTypeEnum, pptTypeEnum, txtTypeEnum, videoTypeEnum, wordTypeEnum } from './helper'
import viewer from './viewer.vue'
import { getFilenameExt } from '@/utils'
import { service } from '@/service'
import txt from '@/assets/images/txt.png'
import pdf from '@/assets/images/pdf.png'
import word from '@/assets/images/word.png'
import excel from '@/assets/images/excel.png'
import ppt from '@/assets/images/ppt.png'
import other from '@/assets/images/other.png'

type UploaderFileListItem = _UploaderFileListItem & {
  name?: string
  url?: string
  ossId?: string | number
}

const props = withDefaults(
  defineProps<{
    modelValue?: string | string[]
    // 数量限制
    limit?: number
    // 大小限制(MB)
    fileSize?: number
    // 文件类型
    fileType?: FileType
    // 只读
    readonly?: boolean
    // 是否支持多选文件
    isMultiple?: boolean
    // 卡片大小
    cardSize?: number
    // 值类型
    valueType?: 'string' | 'array'
  }>(),
  {
    limit: 10,
    fileSize: 500,
    fileType: () => fileTypeEnum,
    readonly: false,
    isMultiple: false,
    cardSize: 60,
    valueType: 'string',
  },
)

const emit = defineEmits(['update:modelValue'])

const { proxy } = getCurrentInstance() as ComponentInternalInstance

const uploadFileRef = ref<UploaderInstance>()
const viewerRef = ref<InstanceType<typeof viewer>>()

// 文件列表
const fileList = ref<UploaderFileListItem[]>([])

// 文件大小限制（字节）
const maxSizeByte = computed(() => props.fileSize * 1024 * 1024)

// 接受上传的文件类型
const accept = computed(() => props.fileType.map(e => `.${e}`).join(','))

// 图片列表
const imageFileList = computed(() => {
  if (fileList.value.every(e => Boolean(e.name))) {
    return fileList.value.filter(e => isImageType(getFilenameExt(e.name!))).map(e => e.url)
  }

  return []
})

// 文件读取前
function beferRead(file: File | File[]) {
  const files = isArray(file) ? file : [file]

  const nums = (fileList.value?.length ?? 0) + files.length

  // 文件数量校验
  if (nums > props.limit) {
    proxy?.$modal.msgError(`上传文件数量不能超过 ${props.limit} 个，请重新选择`)
    return false
  }

  // 文件类型校验
  const isTypeError = files.some((e) => {
    const ext = getFilenameExt(e.name)

    return !props.fileType.includes(ext as any)
  })

  if (isTypeError) {
    proxy?.$modal.msgError('请上传正确格式的文件')
    return false
  }

  return true
}

// 文件读取后
const afterRead: UploaderAfterRead = async (items: UploaderFileListItem | UploaderFileListItem[], detail: { name: Numeric, index: number }) => {
  const list = isArray(items) ? items : [items]

  for (const item of list) {
    item.status = 'uploading'
    item.message = '上传中...'

    const formData = new FormData()

    formData.append('file', item.file!)

    try {
      // 上传请求
      const { data } = await service.comm.upload(formData)

      Reflect.set(item, 'url', data.url)
      Reflect.set(item, 'name', data.fileName)
      Reflect.set(item, 'ossId', data.ossId)

      item.status = 'done'
    }
    catch {
      // 上传请求失败时，前端 fileList -> item 删除
      item.status = 'failed'
      item.message = '上传失败'
      proxy?.$modal.msgError('文件上传失败，请您重新上传')
      fileList.value.splice(detail.index, 1)
    }
  }

  const ids = getOssIds(fileList.value)
  const payload = props.valueType === 'string' ? ids.join(',') : ids
  emit('update:modelValue', payload)
}

// 文件大小超出
function onOverSize() {
  proxy?.$modal.msgError(`上传文件大小不能超过 ${props.fileSize} MB!`)
}

// 预览删除
async function onDelete(item: UploaderFileListItem, detail: { name: Numeric, index: number }) {
  if (item.ossId) {
    try {
      // 删除请求
      await service.system.oss.delOss(item.ossId)
      proxy?.$modal.msgSuccess('删除成功')
    }
    catch {
      // 删除请求失败时，前端 fileList -> item 不删除
      fileList.value.splice(detail.index, 0, item)
    }
  }

  const ids = getOssIds(fileList.value)
  const payload = props.valueType === 'string' ? ids.join(',') : ids
  emit('update:modelValue', payload)
}

// 获取 ossId 数组
function getOssIds(list: UploaderFileListItem[]) {
  return list.map(e => e.ossId).filter(Boolean)
}

// 视频预览
function handleVideoView(item: UploaderFileListItem) {
  const obj = { file: item, ext: getFilenameExt(item.name ?? item.file!.name) }

  viewerRef.value?.open(obj)
}

// 文档预览
function handleDocView(item: UploaderFileListItem) {
  const obj = { file: item, ext: getFilenameExt(item.name ?? item.file!.name) }

  viewerRef.value?.open(obj)
}

// 文件类型行为枚举
const fileActionEnums: FileActionEnum[] = [
  {
    extensions: [...imageTypeEnum],
  },
  {
    extensions: [...videoTypeEnum],
    handler: handleVideoView,
  },
  {
    extensions: [...wordTypeEnum],
    icon: word,
    handler: handleDocView,
  },
  {
    extensions: [...excelTypeEnum],
    icon: excel,
    handler: handleDocView,
  },
  {
    extensions: [...pptTypeEnum],
    icon: ppt,
    handler: handleDocView,
  },
  {
    extensions: [...pdfTypeEnum],
    icon: pdf,
    handler: handleDocView,
  },
  {
    extensions: [...txtTypeEnum],
    icon: txt,
    handler: handleDocView,
  },
  {
    extensions: [...otherTypeEnum],
    icon: other,
  },
]

// 自定义表单项的值
useCustomFieldValue(() => {
  const ids = getOssIds(fileList.value)
  const value = props.valueType === 'string'
    ? !isEmpty(ids)
        ? ids.join(',')
        : undefined
    : ids
  return value
})

// 文件列表回显
watch(
  () => props.modelValue,
  async (val) => {
    if (!isEmpty(val)) {
      const idsStr = Array.isArray(val) ? val.toString() : val!

      const { data } = await service.system.oss.listByIds(idsStr)

      fileList.value = data.map((e) => {
        return {
          name: e.originalName,
          url: e.url,
          ossId: e.ossId,
        }
      })
    }
    else {
      fileList.value = []
    }
  },
  {
    immediate: true,
  },
)

defineExpose({
  fileSize: props.fileSize,
  fileType: props.fileType,
})
</script>
