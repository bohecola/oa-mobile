<script setup lang='ts'>
import { type FormInstance, showFailToast, showLoadingToast, showSuccessToast } from 'vant'
import { debounce } from 'lodash-es'
import type { LoginData } from '@/api/open'
import { captcha, login } from '@/api/open'
import { useGlobSetting } from '@/hooks/settings'
import { useStore } from '@/store'

// 路由器
const router = useRouter()
// 用户状态
const { user } = useStore()
// 加载
const loading = ref(false)

// 是否初始化完成
const initFinished = ref(false)
// 租户是否启用
const tenantEnabled = ref(false)
// 验证码是否启用
const captchaEnabled = ref(false)
// 应用客户端ID
const { appClientId } = useGlobSetting()

// 表单
const formRef = ref<FormInstance>()
// 数据
const formData = reactive({
  tenantId: '000000',
  username: 'admin',
  password: 'admin123',
  code: '',
  uuid: '',
})

// 密码可见
const passwordVisible = ref(false)
// 记住我
const remenberMe = ref(false)
// 验证码
const base64 = ref('')

// 获取验证码
async function getCaptcha() {
  const res = await captcha()
  base64.value = `data:image/gif;base64,${res.img}`
  captchaEnabled.value = res.captchaEnabled
  formData.uuid = res.uuid || ''
}
// 防抖点击验证码
const handleCaptchaClick = debounce(getCaptcha, 300)

// 提交表单
async function handleSubmit(_: LoginData) {
  try {
    // 加载
    loading.value = true

    // 提示
    showLoadingToast('登录中...')

    // 登录
    const { access_token } = await login({
      ...formData,
      clientId: appClientId,
      grantType: 'password',
    })

    // 提示
    showSuccessToast('登录成功，即将进入系统')

    // 持久化 token
    user.setToken({
      token: access_token,
    })

    // 用户信息
    user.get()

    // 跳转首页
    router.push('/')
  }
  catch (error) {
    // 刷新验证码
    getCaptcha()

    // 提示
    showFailToast((error as Error).message)
  }
  finally {
    // 关闭加载
    loading.value = false
  }
}

// 挂载
onMounted(async () => {
  // 加载验证码
  await getCaptcha()
  // 初始化完毕
  initFinished.value = true
})
</script>

<template>
  <van-form v-if="initFinished" ref="formRef" @submit="handleSubmit">
    <van-field
      v-show="false"
      v-model="formData.tenantId"
      name="tenantId"
      placeholder="租户编号"
    >
      <template #left-icon>
        <i class="i-carbon-order-details mr-1 h-full" />
      </template>
    </van-field>

    <van-field
      v-model="formData.username"
      name="username"
      placeholder="用户名"
    >
      <template #left-icon>
        <i class="i-carbon-user mr-1 h-full" />
      </template>
    </van-field>

    <van-field
      v-model="formData.password"
      name="password"
      placeholder="密码"
      :type="`${passwordVisible ? 'text' : 'password'}`"
      @click-right-icon="passwordVisible = !passwordVisible"
    >
      <template #left-icon>
        <i class="i-carbon-password mr-1 h-full" />
      </template>

      <template #right-icon>
        <i :class="`${passwordVisible ? 'i-carbon-view' : 'i-carbon-view-off'} align-middle`" />
      </template>
    </van-field>

    <van-field
      v-if="captchaEnabled"
      v-model="formData.code"
      name="code"
      placeholder="验证码"
    >
      <template #left-icon>
        <i class="i-carbon-security mr-1 h-full" />
      </template>

      <template #button>
        <img
          class="w-24 cursor-pointer rounded"
          :src="base64"
          alt="captcha"
          @click="handleCaptchaClick"
        >
      </template>
    </van-field>

    <div class="mt-4 mb-10 px-1 flex justify-between">
      <div class="flex items-center">
        <van-switch v-model="remenberMe" size="18px" class="mr-2" />
        <span>记住我</span>
      </div>

      <a>忘记密码?</a>
    </div>

    <van-button
      type="primary"
      native-type="submit"
      block
    >
      登 录
    </van-button>
  </van-form>
</template>
