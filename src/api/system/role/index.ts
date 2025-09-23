import type { AxiosPromise } from 'axios'
import type { RoleDeptTree, RoleQuery, RoleVO } from './types'
import type { UserQuery, UserVO } from '@/api/system/user/types'
import request from '@/service/request'

export function listRole(query?: Partial<RoleQuery>): AxiosPromise<RoleVO[]> {
  return request({
    url: '/system/role/list',
    method: 'get',
    params: query,
  })
}

/**
 * 通过roleIds查询角色
 * @param roleIds
 */
export function optionSelect(roleIds: (number | string)[]): AxiosPromise<RoleVO[]> {
  return request({
    url: `/system/role/optionselect?roleIds=${roleIds}`,
    method: 'get',
  })
}

/**
 * 查询角色详细
 */
export function getRole(roleId: string | number): AxiosPromise<RoleVO> {
  return request({
    url: `/system/role/${roleId}`,
    method: 'get',
  })
}

/**
 * 新增角色
 */
export function addRole(data: any) {
  return request({
    url: '/system/role',
    method: 'post',
    data,
  })
}

/**
 * 修改角色
 * @param data
 */
export function updateRole(data: any) {
  return request({
    url: '/system/role',
    method: 'put',
    data,
  })
}

/**
 * 角色数据权限
 */
export function dataScope(data: any) {
  return request({
    url: '/system/role/dataScope',
    method: 'put',
    data,
  })
}

/**
 * 角色状态修改
 */
export function changeRoleStatus(roleId: string | number, status: string) {
  const data = {
    roleId,
    status,
  }
  return request({
    url: '/system/role/changeStatus',
    method: 'put',
    data,
  })
}

/**
 * 删除角色
 */
export function delRole(roleId: Array<string | number> | string | number) {
  return request({
    url: `/system/role/${roleId}`,
    method: 'delete',
  })
}

/**
 * 查询角色已授权用户列表
 */
export function allocatedUserList(query: UserQuery): AxiosPromise<UserVO[]> {
  return request({
    url: '/system/role/authUser/allocatedList',
    method: 'get',
    params: query,
  })
}

/**
 * 查询角色未授权用户列表
 */
export function unallocatedUserList(query: UserQuery): AxiosPromise<UserVO[]> {
  return request({
    url: '/system/role/authUser/unallocatedList',
    method: 'get',
    params: query,
  })
}

/**
 * 取消用户授权角色
 */
export function authUserCancel(data: any) {
  return request({
    url: '/system/role/authUser/cancel',
    method: 'put',
    data,
  })
}

/**
 * 批量取消用户授权角色
 */
export function authUserCancelAll(data: any) {
  return request({
    url: '/system/role/authUser/cancelAll',
    method: 'put',
    params: data,
  })
}

/**
 * 授权用户选择
 */
export function authUserSelectAll(data: any) {
  return request({
    url: '/system/role/authUser/selectAll',
    method: 'put',
    params: data,
  })
}
// 根据角色ID查询部门树结构
export function deptTreeSelect(roleId: string | number): AxiosPromise<RoleDeptTree> {
  return request({
    url: `/system/role/deptTree/${roleId}`,
    method: 'get',
  })
}

export default {
  optionSelect,
  listRole,
}
