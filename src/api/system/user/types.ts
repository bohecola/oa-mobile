import type { DeptVO } from '../dept/types'
import type { PostVO } from '../post/types'
import type { RoleVO } from '../role/types'

export interface UserVO extends BaseEntity {
  userId: string | number
  deptId: number
  userName: string
  nickName: string
  deptName: string
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
