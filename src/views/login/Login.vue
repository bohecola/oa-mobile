<script setup lang='ts'>
import LoginForm from './components/LoginForm.vue'
import Logo from '@/components/Logo.vue'
import { useGlobSettings } from '@/hooks'

const { appTitle } = useGlobSettings()
</script>

<template>
  <div class="h-screen flex justify-center p-8">
    <div class="w-full flex flex-col">
      <div class="flex flex-col items-center justify-center">
        <Logo class="mb-8 mt-8" />
        <div class="text-2xl mb-12 font-black">
          {{ appTitle }}
        </div>

        <LoginForm />
      </div>
    </div>
  </div>
</template>
