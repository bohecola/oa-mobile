import { defineStore } from 'pinia'
import { showToast } from 'vant'
import { storage } from '@/utils'
import { service } from '@/service'
import type { UserVO } from '@/api/system/user/types'
import router from '@/router'

// 本地缓存
const data = storage.info()

export const useUserStore = defineStore('user', () => {
  // 标识
  const token = ref<string>(data.token)

  // 设置标识
  function setToken(data: {
    token: string
  }) {
    token.value = data.token
    storage.set('token', data.token)
  }

  // 用户信息
  const info = ref<UserVO | null>(null)

  // 设置用户信息
  function set(value: UserVO) {
    info.value = value
    storage.set('userInfo', value)
  }

  // 清除用户
  function clear() {
    storage.remove('token')
    storage.remove('userInfo')
    token.value = ''
    info.value = null
  }

  // 退出登录
  async function logout(options?: { quiet?: boolean }) {
    clear()
    router.clear()
    await service.comm.userLogout()
    await router.push('/login')

    if (!options?.quiet) {
      showToast('退出成功')
    }
  }

  // 获取用户信息
  async function get() {
    return service.comm.person().then(({ data }) => {
      set(data.user)
      return data.user
    })
  }

  return {
    token,
    info,
    get,
    set,
    logout,
    clear,
    setToken,
  }
})
