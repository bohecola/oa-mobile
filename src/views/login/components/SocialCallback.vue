<template>
  <div class="pt-safe h-sreen bg-[--bg-card]">
    <div v-loading="loading" class="social-callback h-full" />
  </div>
</template>

<script setup lang="ts">
import { showFailToast, showSuccessToast } from 'vant'
import type { LoginData } from '@/api/open/types'
import { useGlobSettings } from '@/hooks'
import { service } from '@/service'
import { storage } from '@/utils'

const route = useRoute()
const loading = ref(true)

const code = (route.query.code as string) ?? (route.query.authCode as string)
const state = route.query.state as string
const source = route.query.source as string
const stateJson = JSON.parse(atob(state))
const tenantId = (stateJson.tenantId as string) ? (stateJson.tenantId as string) : '000000'
const domain = stateJson.domain as string

const { publicPath, appClientId } = useGlobSettings()

async function processResponse(res: any) {
  if (res.code !== 200) {
    throw new Error(res.msg)
  }
  if (res.data !== null) {
    storage.set('token', res.data.access_token)
  }
  showSuccessToast(res.msg)
  setTimeout(() => {
    location.href = `${publicPath}`
  }, 2000)
}

function handleError(error: any) {
  showFailToast(error.message)
  setTimeout(() => {
    location.href = `${publicPath}`
  }, 2000)
}

async function callbackByCode(data: LoginData) {
  try {
    const res = await service.open.callback(data)
    await processResponse(res)
    loading.value = false
  }
  catch (error) {
    handleError(error)
  }
}

async function loginByCode(data: LoginData) {
  try {
    const res = await service.open.login(data)
    await processResponse(res)
    loading.value = false
  }
  catch (error) {
    handleError(error)
  }
}

async function init() {
  // 如果域名不相等 则重定向处理
  const host = window.location.host

  if (domain !== host) {
    const urlFull = new URL(window.location.href)
    urlFull.host = domain

    window.location.href = urlFull.toString()
    return
  }

  const data: LoginData = {
    socialCode: code,
    socialState: state,
    tenantId,
    source,
    clientId: appClientId,
    grantType: 'social',
  }

  if (!storage.get('token')) {
    await loginByCode(data)
  }
  else {
    await callbackByCode(data)
  }
}

onMounted(() => {
  nextTick(() => {
    init()
  })
})
</script>
