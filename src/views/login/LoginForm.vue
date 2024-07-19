<script setup lang='ts'>
import type { FormInstance } from 'vant'
import { captcha } from '@/api/system/user'

const formRef = ref<FormInstance>()
const formData = reactive({
  username: 'admin',
  password: 'admin123',
  code: '',
})

const base64 = ref('')

function handleSubmit(values: object) {

}

onMounted(() => {
  captcha()
    .then(({ img }) => {
      base64.value = `data:image/gif;base64,${img}`
    })
})
</script>

<template>
  <van-form ref="formRef" @submit="handleSubmit">
    <van-field
      v-model="formData.username"
      name="username"
      placeholder="用户名"
    >
      <template #left-icon>
        <i class="i-carbon-user h-full" />
      </template>
    </van-field>

    <van-field
      v-model="formData.password"
      name="password"
      placeholder="密码"
      type="password"
    >
      <template #left-icon>
        <i class="i-carbon-password h-full" />
      </template>
    </van-field>

    <van-field
      v-model="formData.code"
      name="password"
      placeholder="验证码"
      class="mb-4"
    >
      <template #left-icon>
        <i class="i-carbon-security h-full" />
      </template>

      <template #button>
        <img
          class="w-24"
          :src="base64"
          alt="captcha"
        >
      </template>
    </van-field>

    <van-button
      type="primary"
      native-type="submit"
      block
    >
      登 录
    </van-button>
  </van-form>
</template>
