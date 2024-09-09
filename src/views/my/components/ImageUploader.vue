<script setup lang='ts'>
import type { UploaderFileListItem } from 'vant'
import { showFailToast, showLoadingToast } from 'vant'
import { service } from '@/service'
import { useStore } from '@/store'

// 用户状态
const { user } = useStore()

// 文件读取前
function beferReadHandler(file: File | File[]) {
  if (['image/jpeg', 'image/png', 'image/jpg'].includes((file as File).type)) {
    return true
  }
  // 提示错误
  showFailToast('请上传正确格式的图片')
  return false
}

// 文件读取完成
async function afterReadHandler(file: UploaderFileListItem | UploaderFileListItem[]) {
  file = file as UploaderFileListItem

  // 加载中
  const loadingToast = showLoadingToast({
    duration: 0,
    message: '图片上传中...',
    loadingType: 'spinner',
    wordBreak: 'break-word',
  })

  // 构建 FormData
  const formData = new FormData()
  // 文件对象
  formData.append('avatarfile', file.file!, file.file!.name)

  try {
    // 上传头像
    await service.system.user.uploadAvatar(formData)
    // 更新用户信息
    user.get()
    // 关闭加载中
    loadingToast.close()
  }
  catch (error) {
    // Toast 默认是单例模式，需先关闭加载中的 Toast 提示才可展示后续的 Toast 提示
    loadingToast.close()
    // Toast 默认是单例模式，在接口响应的 Code 为 500 错误时，响应拦截器中已有的 Toast 不会再进行重复提示、而是会结束然后直接执行下面的提示
    // 在 Code 不为 500 时这里的错误提示就是有意义的，例如 401
    showFailToast((error as Error).message)
  }
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
