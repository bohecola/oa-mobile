import type { UserInfoVO } from './system/user'
import request from '@/service/request'

// 获取用户信息
export function person() {
  return request<UserInfoVO>({
    url: '/system/user/getInfo',
    method: 'get',
  })
}

// 注销
export function userLogout() {
  return request({
    url: '/auth/logout',
    method: 'post',
  })
}
