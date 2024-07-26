import { defineStore } from 'pinia'
import { showToast } from 'vant'
import { storage } from '@/utils'
import { person, userLogout } from '@/api/comm'
import type { UserVO } from '@/api/system/user'
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
  const info = ref<UserVO | null>(data.userInfo)

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
  async function logout() {
    await userLogout()
    await router.push('/login')
    clear()
    showToast('退出成功')
  }

  // 获取用户信息
  async function get() {
    return person().then((res) => {
      set(res.user)
      return res.user
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
