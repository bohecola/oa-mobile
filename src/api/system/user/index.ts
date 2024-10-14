import type { AxiosPromise } from 'axios'
import type { DeptVO } from './../dept/types'
import type { CheckUserNameAndPhoneUnique, SysUserMobileVO, UserForm, UserInfoVO, UserMobileListQuery, UserQuery, UserVO } from './types'
import type { RoleVO } from '@/api/system/role/types'
import { parseStrEmpty } from '@/utils/base'
import request from '@/service/request'

/**
 * 查询用户列表
 * @param query
 */
export function listUser(query?: UserQuery): AxiosPromise<UserVO[]> {
  return request({
    url: '/system/user/list',
    method: 'get',
    params: query,
  })
}

/**
 * 通过用户ids查询用户
 * @param userIds
 */
export function optionSelect(userIds: (number | string)[]): AxiosPromise<UserVO[]> {
  return request({
    url: `/system/user/optionselect?userIds=${userIds}`,
    method: 'get',
  })
}

/**
 * 获取用户详情
 * @param userId
 */
export function getUser(userId?: string | number): AxiosPromise<UserInfoVO> {
  return request({
    url: `/system/user/${parseStrEmpty(userId)}`,
    method: 'get',
  })
}

/**
 * 新增用户
 */
export function addUser(data: UserForm) {
  return request({
    url: '/system/user',
    method: 'post',
    data,
  })
}

/**
 * 修改用户
 */
export function updateUser(data: UserForm) {
  return request({
    url: '/system/user',
    method: 'put',
    data,
  })
}

/**
 * 删除用户
 * @param userId 用户ID
 */
export function delUser(userId: Array<string | number> | string | number) {
  return request({
    url: `/system/user/${userId}`,
    method: 'delete',
  })
}

/**
 * 用户密码重置
 * @param userId 用户ID
 * @param password 密码
 */
export function resetUserPwd(userId: string | number) {
  const data = {
    userId,
  }
  return request({
    url: '/system/user/resetPwd',
    method: 'put',
    headers: {
      isEncrypt: true,
      repeatSubmit: false,
    },
    data,
  })
}

/**
 * 用户状态修改
 * @param userId 用户ID
 * @param status 用户状态
 */
export function changeUserStatus(userId: number | string, status: string) {
  const data = {
    userId,
    status,
  }
  return request({
    url: '/system/user/changeStatus',
    method: 'put',
    data,
  })
}

/**
 * 查询用户个人信息
 */
export function getUserProfile(): AxiosPromise<UserInfoVO> {
  return request({
    url: '/system/user/profile',
    method: 'get',
  })
}

/**
 * 修改用户个人信息
 * @param data 用户信息
 */
export function updateUserProfile(data: UserForm) {
  return request({
    url: '/system/user/profile',
    method: 'put',
    data,
  })
}

/**
 * 用户密码重置
 * @param oldPassword 旧密码
 * @param newPassword 新密码
 */
export function updateUserPwd(oldPassword: string, newPassword: string) {
  const data = {
    oldPassword,
    newPassword,
  }
  return request({
    url: '/system/user/profile/updatePwd',
    method: 'put',
    headers: {
      isEncrypt: true,
      repeatSubmit: false,
    },
    data,
  })
}

/**
 * 用户头像上传
 * @param data 头像文件
 */
export function uploadAvatar(data: FormData) {
  return request({
    url: '/system/user/profile/avatar',
    method: 'post',
    data,
  })
}

/**
 * 查询授权角色
 * @param userId 用户ID
 */
export function getAuthRole(userId: string | number): AxiosPromise<{ user: UserVO, roles: RoleVO[] }> {
  return request({
    url: `/system/user/authRole/${userId}`,
    method: 'get',
  })
}

/**
 * 保存授权角色
 * @param data 用户ID
 */
export function updateAuthRole(data: { userId: string, roleIds: string }) {
  return request({
    url: '/system/user/authRole',
    method: 'put',
    params: data,
  })
}

/**
 * 用户名校验唯一
 */
export function checkUserNameUnique(query: CheckUserNameAndPhoneUnique) {
  return request({
    url: '/system/user/checkUserNameUnique',
    method: 'post',
    params: query,
  })
}

/**
 * 手机号校验唯一
 */
export function checkPhoneUnique(query: CheckUserNameAndPhoneUnique) {
  return request({
    url: '/system/user/checkPhoneUnique',
    method: 'post',
    params: query,
  })
}

/**
 * 查询当前部门的所有用户信息
 * @param deptId
 */
export function listUserByDeptId(deptId: string | number): AxiosPromise<UserVO[]> {
  return request({
    url: `/system/user/list/dept/${deptId}`,
    method: 'get',
  })
}

/**
 * 查询部门下拉树结构
 */
export function deptTreeSelect(): AxiosPromise<DeptVO[]> {
  return request({
    url: '/system/user/deptTree',
    method: 'get',
  })
}

/**
 * 查询当前部门的所有用户信息
 * @param deptId
 */
export function getUserMessageAll(userId: string | number) {
  return request({
    url: `/oa/personnel/userInfo/getUserMessageAll/${userId}`,
    method: 'get',
  })
}

/**
 * 查询当前部门的所有用户信息
 * @param deptId
 */
export function getUserMobileList(params?: UserMobileListQuery): AxiosPromise<Record<string, SysUserMobileVO[]>> {
  return request({
    url: `/system/user/userMobileList`,
    method: 'get',
    params,
  })
}

export default {
  listUser,
  getUser,
  optionSelect,
  addUser,
  updateUser,
  delUser,
  resetUserPwd,
  changeUserStatus,
  getUserProfile,
  updateUserProfile,
  updateUserPwd,
  uploadAvatar,
  getAuthRole,
  updateAuthRole,
  deptTreeSelect,
  listUserByDeptId,
}
