import type { DeptVO } from './dept'
import type { PostVO } from './post'
import type { RoleVO } from './role'
import request from '@/service/request'

export interface UserVO extends BaseEntity {
  userId: string | number
  deptId: number
  userName: string
  nickName: string
  userType: string
  email: string
  phonenumber: string
  sex: string
  avatar: string
  status: string
  loginIp: string
  loginDate: string
  remark: string
  dept: DeptVO
  roles: RoleVO[]
  roleIds: any
  postIds: any
  roleId: any
  tenantId: number
  [key: string]: any
}

export interface UserInfoVO {
  user: UserVO
  roles: RoleVO[]
  roleIds: string[]
  posts: PostVO[]
  postIds: string[]
  roleGroup: string
  postGroup: string
}

export interface UpdatePasswordForm {
  oldPassword: string
  newPassword: string
}

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
