import type { RoleVO } from '@/api/system/role/types'
import type { PostVO } from '@/api/system/post/types'

/**
 * 用户信息
 */
export interface UserInfo {
  user: UserVO
  roles: string[]
  permissions: string[]
}

/**
 * 用户查询对象类型
 */
export interface UserQuery extends PageQuery {
  nickName?: string
  userName?: string
  phonenumber?: string
  status?: string
  deptId?: string | number
  roleId?: string | number
}

/**
 * 用户返回对象
 */
export interface UserVO extends BaseEntity {
  userId: string | number
  tenantId: string
  deptId: number
  userName: string
  nickName: string
  userType: string
  password: string
  email: string
  phonenumber: string
  sex: string
  avatar: string
  status: string
  delFlag: string
  loginIp: string
  loginDate: string
  remark: string
  deptName: string
  roles: RoleVO[]
  roleIds: any
  postIds: any
  roleId: any
  admin: boolean
  [key: string]: any
}

/**
 * 用户表单类型
 */
export interface UserForm {
  id?: string
  userId?: string
  deptId?: number
  avatar?: string
  userName: string
  nickName?: string
  password?: string
  phonenumber?: string
  email?: string
  sex?: string
  status: string
  remark?: string
  postIds: string[]
  roleIds: string[]
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

export interface ResetPwdForm {
  oldPassword: string
  newPassword: string
  confirmPassword: string
}

export interface CheckUserNameAndPhoneUnique {
  userName?: string
  phonenumber?: string
}

/**
 * SysUserMobileVo，用户信息视图对象 sys_user
 */
export interface SysUserMobileVO {
  /**
   * 部门ID
   */
  deptId?: number
  /**
   * 部门名
   */
  deptName?: string
  /**
   * 用户邮箱
   */
  email?: string
  /**
   * 用户昵称
   */
  nickName?: string
  /**
   * 手机号码
   */
  phonenumber?: string
  /**
   * 昵称拼音
   */
  pinyin?: string
  /**
   * 帐号状态（0正常 1停用）
   */
  status?: string
  /**
   * 租户ID
   */
  tenantId?: string
  /**
   * 用户ID
   */
  userId?: string | number
  /**
   * 用户账号
   */
  userName?: string
  [property: string]: any
}
