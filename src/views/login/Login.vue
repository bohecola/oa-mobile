<script setup lang='ts'>
import LoginForm from './components/LoginForm.vue'
import Logo from '@/components/Logo.vue'
import { useGlobSettings } from '@/hooks'

const { appTitle } = useGlobSettings()
</script>

<template>
  <div class="h-screen flex flex-col justify-between p-safe-offset-8">
    <div class="flex flex-col items-center">
      <Logo class="mt-2 mb-8" />
      <div class="text-2xl mb-8 font-black">
        {{ appTitle }}
      </div>

      <LoginForm />
    </div>

    <a
      href="https://beian.miit.gov.cn/#/Integrated/index"
      target="_blank"
      class="mt-3 text-xs text-center text-gray-500"
    >
      备案号：陕ICP备2024032973号
    </a>
  </div>
</template>
