<template>
  <div>
    <van-uploader
      ref="uploadFileRef"
      v-model="fileList"
      :multiple="isMultiple"
      :max-count="limit"
      :before-read="beferRead"
      :after-read="afterRead"
      :max-size="maxSizeByte"
      @oversize="onOverSize"
      @delete="onDelete"
    >
      <div
        class="flex items-center justify-center border bg-[--bg-secondary-color]" :style="{
          width: `${cardSize}px`,
          height: `${cardSize}px`,
        }"
      >
        <van-icon name="plus" size="20" />
      </div>
    </van-uploader>
  </div>
</template>

<script setup lang='ts'>
import type { UploaderAfterRead, UploaderInstance, UploaderFileListItem as _UploaderFileListItem } from 'vant'
import { isArray } from 'lodash-es'
import type { Numeric } from 'vant/lib/utils'
import { fileTypeEnum } from './helper'
import { getFilenameExt } from '@/utils'
import { service } from '@/service'

type UploaderFileListItem = _UploaderFileListItem & {
  name?: string
  url?: string
  ossId?: string
}

const props = withDefaults(
  defineProps<{
    modelValue?: string | string[] | object
    // 数量限制
    limit?: number
    // 大小限制(MB)
    fileSize?: number
    // 文件类型
    fileType?: string[]
    // 提示
    isShowTip?: boolean
    // 只读
    readonly?: boolean
    // 是否支持多选文件
    isMultiple?: boolean
    // 卡片大小
    cardSize?: number
  }>(),
  {
    limit: 10,
    fileSize: 500,
    fileType: () => fileTypeEnum,
    isShowTip: false,
    readonly: false,
    isMultiple: false,
    cardSize: 80,
  },
)

const emit = defineEmits(['update:modelValue'])

const { proxy } = getCurrentInstance() as ComponentInternalInstance

const uploadFileRef = ref<UploaderInstance>()
const fileList = ref<UploaderFileListItem[]>([])

// 文件大小字节
const maxSizeByte = computed(() => props.fileSize * 1024 * 1024)

// 文件读取前
function beferRead(file: File | File[]) {
  const files = isArray(file) ? file : [file]

  const nums = (fileList.value?.length ?? 0) + files.length

  if (nums > props.limit) {
    proxy?.$modal.msgError(`上传文件数量不能超过 ${props.limit} 个，请重新选择`)
    return false
  }

  const isTypeError = files.some((e) => {
    const ext = getFilenameExt(e.name)
    return !props.fileType.includes(ext)
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
    const formData = new FormData()

    formData.append('file', item.file!)

    try {
      const { data } = await service.comm.upload(formData)

      Reflect.set(item, 'url', data.url)
      Reflect.set(item, 'name', data.fileName)
      Reflect.set(item, 'ossId', data.ossId)
    }
    catch (err) {
      proxy?.$modal.msgError('文件上传失败，请您重新上传')
      fileList.value.splice(detail.index, 1)
    }
  }
  const idsStr = getOssIdsStr(fileList.value)
  emit('update:modelValue', idsStr)
}

// 获取 ossId 字符串
function getOssIdsStr(list: UploaderFileListItem[], separator: string = ',') {
  return list.map(e => e.ossId).filter(Boolean).join(separator)
}

// 文件大小超出
function onOverSize() {
  proxy?.$modal.msgError(`上传文件大小不能超过 ${props.fileSize} MB!`)
}

// 预览删除
async function onDelete(item: UploaderFileListItem) {
  if (item.ossId) {
    await service.system.oss.delOss(item.ossId)
    const idsStr = getOssIdsStr(fileList.value)
    emit('update:modelValue', idsStr)
  }
}
</script>
