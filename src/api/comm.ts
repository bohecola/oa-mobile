import type { UserInfoVO } from './system/user'
import request from '@/service/request'

export function person() {
  return request<UserInfoVO>({
    url: '/system/user/getInfo',
    method: 'get',
  })
}
