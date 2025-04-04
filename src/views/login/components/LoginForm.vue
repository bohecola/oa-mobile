<template>
  <van-form
    v-if="initFinished"
    ref="formRef"
    :disabled="loading"
    @submit="handleSubmit"
  >
    <van-field
      v-show="false"
      v-model="form.tenantId"
      name="tenantId"
      placeholder="租户编号"
    >
      <template #left-icon>
        <i class="i-carbon-order-details mr-1 h-full" />
      </template>
    </van-field>

    <van-field
      v-model="form.username"
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
      v-model="form.password"
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
      v-model="form.code"
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

    <div class="mt-4 mb-6 px-1 flex justify-between">
      <div class="flex items-center">
        <van-switch v-model="form.remenberMe" size="14px" class="mr-2" :disabled="loading" />
        <span class="text-sm">记住我</span>
      </div>

      <!-- <a>忘记密码?</a> -->
    </div>

    <van-button
      type="primary"
      native-type="submit"
      block
      :disabled="loading"
    >
      登 录
    </van-button>

    <van-divider>其他登录方式</van-divider>

    <div class="flex justify-center gap-2">
      <span
        class="
          i-ant-design-dingtalk-circle-filled
          w-6 h-6 rounded-full
          active:bg-[--van-primary-color]
        "
        title="钉钉登录"
        @click="doSocialLogin('dingtalk')"
      />
    </div>
  </van-form>
</template>

<script setup lang='ts'>
import { type FormInstance, showFailToast, showLoadingToast, showSuccessToast } from 'vant'
import { debounce } from 'lodash-es'
import type { LoginData } from '@/api/open/types'
import { service } from '@/service'
import { useGlobSettings } from '@/hooks'
import { useStore } from '@/store'
import { storage } from '@/utils'
import { ResultCodeEnum } from '@/enums/httpEnum'

// 路由器
const router = useRouter()
// 用户状态
const { user, menu } = useStore()
// 是否初始化完成
const initFinished = ref(false)
// 验证码是否启用
const captchaEnabled = ref(false)
// 应用客户端ID
const { appClientId } = useGlobSettings()

// 加载
const loading = ref(false)
// 表单
const formRef = ref<FormInstance>()
// 数据
const form = ref({
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
  const { data } = await service.open.captcha()
  base64.value = `data:image/gif;base64,${data.img}`
  captchaEnabled.value = data.captchaEnabled
  form.value.uuid = data.uuid ?? ''
}

// 防抖点击验证码
const handleCaptchaClick = debounce(getCaptcha, 300)

// 提交表单
async function handleSubmit(_: LoginData) {
  try {
    loading.value = true
    showLoadingToast('登录中...')
    // 登录
    const { data } = await service.open.login({
      ...form.value,
      clientId: appClientId,
      grantType: 'password',
    })
    showSuccessToast('登录成功，即将进入系统')
    // 是否记住用户
    memoMe()
    // 持久化 token
    user.setToken({ token: data.access_token })
    // 用户信息
    user.get()
    // 菜单信息
    menu.get()
    // 跳转首页
    await router.push('/')
  }
  catch (error) {
    // 刷新验证码
    getCaptcha()
    // 提示
    showFailToast((error as Error).message)
  }
  finally {
    loading.value = false
  }
}

// 记住我
function memoMe() {
  if (form.value.remenberMe) {
    storage.set('me', JSON.stringify({ ...form.value, code: '', uuid: '' }))
  }
  else {
    storage.remove('me')
  }
}

// use memo data
function getMe() {
  const me = JSON.parse(storage.get('me') ?? null)
  if (me) {
    form.value = me
  }
}

// 第三方登录
function doSocialLogin(type: string) {
  service.social.authBinding(type, form.value.tenantId).then((res: any) => {
    if (res.code === ResultCodeEnum.SUCCESS) {
      // 获取授权地址跳转
      window.location.href = res.data
    }
    else {
      showFailToast(res.msg)
    }
  })
}

// 挂载
onMounted(async () => {
  // 上次记住信息
  getMe()
  // 加载验证码
  await getCaptcha()
  // 初始化完毕
  initFinished.value = true
})
</script>
