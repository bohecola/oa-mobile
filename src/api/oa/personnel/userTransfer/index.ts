import type { AxiosPromise } from 'axios'
import request from '@/service/request'
import type { UserTransferForm, UserTransferQuery, UserTransferVO } from '@/api/oa/personnel/userTransfer/types'
import type { DeptVO } from '@/api/system/dept/types'

/**
 * 查询员工调动列表
 * @param query
 * @returns {*}
 */

export function listUserTransfer(query?: UserTransferQuery): AxiosPromise<UserTransferVO[]> {
  return request({
    url: '/oa/personnel/userTransfer/list',
    method: 'get',
    params: query,
  })
}

/**
 * 查询员工调动详细
 * @param id
 */
export function getUserTransfer(id: string | number): AxiosPromise<UserTransferVO> {
  return request({
    url: `/oa/personnel/userTransfer/${id}`,
    method: 'get',
  })
}

/**
 * 新增员工调动
 * @param data
 */
export function addUserTransfer(data: UserTransferForm) {
  return request({
    url: '/oa/personnel/userTransfer',
    method: 'post',
    data,
  })
}

/**
 * 修改员工调动
 * @param data
 */
export function updateUserTransfer(data: UserTransferForm) {
  return request({
    url: '/oa/personnel/userTransfer',
    method: 'put',
    data,
  })
}

/**
 * 删除员工调动
 * @param id
 */
export function delUserTransfer(ids: string | number | Array<string | number>) {
  return request({
    url: `/oa/personnel/userTransfer/${ids}`,
    method: 'delete',
  })
}

/**
 * 根据用户id获取公司、部门、岗位
 */
export function getUserInfoAll(userId: string | number) {
  return request({
    url: `/system/user/queryUserInfo/${userId}`,
    method: 'get',
  })
}

// 根据公司id获取对应的部门
export function getCompanyDept(deptId: string | number): AxiosPromise<DeptVO[]> {
  return request({
    url: `/system/dept/getCompanyDept/${deptId}`,
    method: 'get',
  })
}
