<script setup lang='ts'>
import type { UploaderFileListItem } from 'vant'
import { showFailToast, showLoadingToast, showSuccessToast, showToast } from 'vant'
import { uploadAvatar } from '@/api/system/user'
import { useStore } from '@/store'

const { user } = useStore()

// 文件读取前
function beferReadHandler(file: File | File[]) {
  if (['image/jpeg', 'image/png', 'image/jpg'].includes((file as File).type)) {
    return true
  }

  showFailToast('请上传正确格式的图片')
  return false
}

// 文件读取完成
function afterReadHandler(file: UploaderFileListItem | UploaderFileListItem[]) {
  file = file as UploaderFileListItem

  // 加载中
  const loadingToast = showLoadingToast({
    duration: 0,
    message: '图片上传中...',
    overlay: true,
    forbidClick: true,
  })

  // 数据
  const formData = new FormData()
  formData.append('avatarfile', file.file!, file.file!.name)

  // 上传头像
  uploadAvatar(formData).then((_) => {
    file.status = 'done'
    loadingToast.close()
    showSuccessToast('上传成功')
    user.get()
  }).catch((error) => {
    loadingToast.close()
    showToast((error as Error).message)
  })
}
</script>

<template>
  <van-uploader
    :max-size="700 * 1024"
    :max-count="1"
    :before-read="beferReadHandler"
    :after-read="afterReadHandler"
    reupload
  >
    <template #default>
      <slot name="default" />
    </template>
  </van-uploader>
</template>
