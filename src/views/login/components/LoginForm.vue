<script setup lang='ts'>
import type { FormInstance } from 'vant'
import Captcha from './Captcha.vue'

const formRef = ref<FormInstance>()
const formData = reactive({
  username: 'admin',
  password: 'admin123',
  code: '',
})

const passwordVisible = ref(false)

function handleSubmit(values: object) {

}
</script>

<template>
  <van-form ref="formRef" @submit="handleSubmit">
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
      v-model="formData.code"
      name="password"
      placeholder="验证码"
      class="mb-4"
    >
      <template #left-icon>
        <i class="i-carbon-security mr-1 h-full" />
      </template>

      <template #button>
        <Captcha />
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
