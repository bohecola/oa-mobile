<script setup lang='ts'>
import { type FormInstance, showFailToast, showLoadingToast } from 'vant'
import NavBar from './components/NavBar.vue'
import { useStore } from '@/store'
import { updateUserProfile } from '@/api/system/user'

// 类型
interface EditPhoneNumberForm {
  phonenumber: string | undefined
}

// 路由器
const router = useRouter()

// 用户状态
const { user } = useStore()

// 引用
const formRef = ref<FormInstance>()

// 表单
const form = reactive<EditPhoneNumberForm>({
  phonenumber: user.info?.phonenumber,
})

// 修改手机号
async function handlePhone(values: EditPhoneNumberForm) {
  // 提示加载
  const loadingToast = showLoadingToast({ duration: 0, message: '加载中' })

  try {
    // 更新手机号
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

  <van-form ref="formRef" @submit="handlePhone">
    <van-field
      v-model="form.phonenumber"
      class="mt-4"
      name="phonenumber"
      placeholder="请输入手机号"
      :rules="[{ required: true, message: '请输入手机号' }]"
    />
  </van-form>
</template>
