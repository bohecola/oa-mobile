<script setup lang='ts'>
import { type FormInstance, showFailToast, showLoadingToast } from 'vant'
import NavBar from './components/NavBar.vue'
import { useStore } from '@/store'
import { updateUserProfile } from '@/api/system/user'

// 类型
interface EditNicknameForm {
  nickname: string | undefined
}

// 路由器
const router = useRouter()

// 用户状态
const { user } = useStore()

// 引用
const formRef = ref<FormInstance>()

// 表单
const form = reactive<EditNicknameForm>({
  nickname: user.info?.nickName,
})

// 修改昵称
async function handleNickname(_: EditNicknameForm) {
  // 提示加载
  const loadingToast = showLoadingToast({ duration: 0, message: '加载中' })

  try {
    // 更新昵称
    await updateUserProfile({ nickName: _.nickname })
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
      v-model="form.nickname"
      class="mt-4"
      name="nickname"
      placeholder="请输入昵称"
      :rules="[{ required: true, message: '请输入昵称' }]"
    />
  </van-form>
</template>
