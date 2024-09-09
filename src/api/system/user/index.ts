import type { UpdatePasswordForm, UserVO } from './types'
import request from '@/service/request'

// 修改密码
export function updatePassword(data: UpdatePasswordForm) {
  return request({
    url: '/system/user/profile/updatePwd',
    method: 'put',
    params: data,
  }, { isEncrypt: true })
}

// 修改头像
export function uploadAvatar(data: FormData) {
  return request({
    url: '/system/user/profile/avatar',
    method: 'post',
    data,
  })
};

// 修改个人信息
export function updateUserProfile(data: Partial<UserVO>) {
  return request({
    url: '/system/user/profile',
    method: 'put',
    data,
  })
}
