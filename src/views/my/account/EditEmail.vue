<script setup lang='ts'>
import { showLoadingToast } from 'vant'
import { useStore } from '@/store'
import { service } from '@/service'

// 用户状态
const { user } = useStore()

// 路由器
const router = useRouter()

// 提交表单
async function handleSubmit(values: any) {
  // 提示加载
  const loadingToast = showLoadingToast({ duration: 0, message: '加载中' })
  // 更新字段
  await service.system.user.updateUserProfile({ ...user.info, ...values })
  // 关闭加载
  loadingToast.close()
  // 返回
  router.back()
}
</script>

<template>
  <EditField
    :items="[
      {
        name: 'email',
        label: '邮箱',
        initialFieldValue: user.info?.email,
      },
    ]"
    @submit="handleSubmit"
  />
</template>
