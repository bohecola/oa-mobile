import { defineStore } from 'pinia'
import { storage } from '@/utils'

// 本地缓存
const data = storage.info()

export const useUserStore = defineStore('user', () => {
  const token = ref<string>(data.token)

  function setToken(data: {
    token: string
  }) {
    token.value = data.token
    storage.set('token', data.token)
  }

  return {
    token,
    setToken,
  }
})
