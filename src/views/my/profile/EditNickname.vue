<script setup lang='ts'>
import { showLoadingToast } from 'vant'
import EditField from '../components/EditField.vue'
import { useStore } from '@/store'
import { updateUserProfile } from '@/api/system/user'

// 用户状态
const { user } = useStore()

// 路由器
const router = useRouter()

// 提交表单
async function handleEmail(values: any) {
  // 提示加载
  const loadingToast = showLoadingToast({ duration: 0, message: '加载中' })

  // 更新字段
  await updateUserProfile({ ...user.info, ...values })
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
        name: 'nickName',
        label: '昵称',
        initialFieldValue: user.info?.nickName,
      },
    ]"
    @submit="handleEmail"
  />
</template>
