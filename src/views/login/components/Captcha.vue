<script setup lang="ts">
import { debounce } from 'lodash-es'
import { captcha } from '@/api/open'

const base64 = ref('')

const getCaptcha = debounce(() => {
  captcha()
    .then(({ img }) => {
      base64.value = `data:image/gif;base64,${img}`
    })
}, 300)

onMounted(() => {
  getCaptcha()
})
</script>

<template>
  <img
    class="w-24 cursor-pointer rounded"
    :src="base64"
    alt="captcha"
    @click="getCaptcha"
  >
</template>
