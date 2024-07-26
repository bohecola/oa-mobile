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
      :rules="[{ required: true, message: '请输入用户名', trigger: 'onChange' }]"
      clearable
    >
      <template #left-icon>
        <i class="i-carbon-user text-base mt-1 mr-2" />
      </template>
    </van-field>

    <van-field
      v-model="formData.password"
      name="password"
      placeholder="密码"
      :type="`${passwordVisible ? 'text' : 'password'}`"
      :rules="[{ required: true, message: '请输入密码', trigger: 'onChange' }]"
      clearable
      @click-right-icon="passwordVisible = !passwordVisible"
    >
      <template #left-icon>
        <i class="i-carbon-password text-base mt-1 mr-2" />
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
      :rules="[{ required: true, message: '请输入验证码', trigger: 'onChange' }]"
      clearable
    >
      <template #left-icon>
        <i class="i-carbon-security text-base mt-2 mr-2" />
      </template>

      <template #button>
        <img
          class="w-20 cursor-pointer rounded"
          :src="base64"
          alt="captcha"
          @click="handleCaptchaClick"
        >
      </template>
    </van-field>

    <div class="mt-4 mb-10 px-1 flex justify-between">
      <div class="flex items-center">
        <van-switch v-model="formData.remenberMe" size="18px" class="mr-2" />
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

<script setup lang='ts'>
import { type FormInstance, showFailToast, showLoadingToast, showSuccessToast } from 'vant'
import { debounce } from 'lodash-es'
import type { LoginData } from '@/api/open'
import { captcha, login } from '@/api/open'
import { useGlobSetting } from '@/hooks/settings'
import { useStore } from '@/store'
import { storage } from '@/utils'

// 路由器
const router = useRouter()
// 用户状态
const { user } = useStore()
// 是否初始化完成
const initFinished = ref(false)
// 验证码是否启用
const captchaEnabled = ref(false)
// 应用客户端ID
const { appClientId } = useGlobSetting()

// 表单
const formRef = ref<FormInstance>()
// 数据
const formData = ref({
  tenantId: '000000',
  username: '',
  password: '',
  code: '',
  uuid: '',
  remenberMe: false,
})

// 密码可见
const passwordVisible = ref(false)

// 验证码
const base64 = ref('')

// 获取验证码
async function getCaptcha() {
  const res = await captcha()
  base64.value = `data:image/gif;base64,${res.img}`
  captchaEnabled.value = res.captchaEnabled
  formData.value.uuid = res.uuid || ''
}
// 防抖点击验证码
const handleCaptchaClick = debounce(getCaptcha, 300)

// 提交表单
async function handleSubmit(_: LoginData) {
  try {
    showLoadingToast('登录中...')
    // 登录
    const { access_token } = await login({
      ...formData.value,
      clientId: appClientId,
      grantType: 'password',
    })
    showSuccessToast('登录成功，即将进入系统')
    // 是否记住用户
    memoMe()
    // 持久化 token
    user.setToken({ token: access_token })
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
}

function memoMe() {
  if (formData.value.remenberMe) {
    storage.set('me', JSON.stringify({ ...formData.value, code: '', uuid: '' }))
  }
  else {
    storage.remove('me')
  }
}

function getMe() {
  const me = JSON.parse(storage.get('me') ?? null)
  if (me) {
    formData.value = me
  }
}

// 挂载
onMounted(async () => {
  // 加载验证码
  await getCaptcha()
  // 上次记住信息
  getMe()
  // 初始化完毕
  initFinished.value = true
})
</script>
