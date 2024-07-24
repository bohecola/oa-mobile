<script setup lang='ts'>
import { type FormInstance, showFailToast, showLoadingToast } from 'vant'
import NavBar from './components/NavBar.vue'
import { useStore } from '@/store'
import { updateUserProfile } from '@/api/system/user'

// 类型
interface EditEmaileForm {
  email: string | undefined
}

// 路由器
const router = useRouter()

// 用户状态
const { user } = useStore()

// 引用
const formRef = ref<FormInstance>()

// 表单
const form = reactive<EditEmaileForm>({
  email: user.info?.email,
})

// 修改邮箱
async function handleNickname(values: EditEmaileForm) {
  // 提示加载
  const loadingToast = showLoadingToast({ duration: 0, message: '加载中' })

  try {
    // 更新邮箱
    await updateUserProfile({ ...user.info, ...values })
    // 刷新用户信息
    await user.get()
    // 关闭加载
    loadingToast.close()
    // 返回
    router.back()
  }
  catch (error) {
    // 关闭加载
    loadingToast.close()
    // 提示错误
    showFailToast((error as Error).message)
  }
}
</script>

<template>
  <NavBar>
    <template #right>
      <span @click="formRef?.submit">保存</span>
    </template>
  </NavBar>

  <van-form ref="formRef" @submit="handleNickname">
    <van-field
      v-model="form.email"
      class="mt-4"
      name="email"
      placeholder="请输入邮箱"
      :rules="[{ required: true, message: '请输入邮箱' }]"
    />
  </van-form>
</template>
