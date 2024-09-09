import type { AxiosPromise } from 'axios'
import type { UserInfoVO } from '../system/user/types'
import request from '@/service/request'

// 获取用户信息
export function person(): AxiosPromise<UserInfoVO> {
  return request({
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
