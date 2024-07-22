import type { DeptVO } from './dept'
import type { PostVO } from './post'
import type { RoleVO } from './role'

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
  delFlag: string
  loginIp: string
  loginDate: string
  remark: string
  dept: DeptVO
  roles: RoleVO[]
  roleIds: any
  postIds: any
  roleId: any
  admin: boolean
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
