import type { AxiosPromise } from 'axios'
import request from '@/service/request'
import type { UserPreEmploymentForm, UserPreEmploymentQuery, UserPreEmploymentVO } from '@/api/oa/personnel/userPreEmployment/types'
import type { CheckUserNameAndPhoneUnique } from '@/api/system/user/types'

/**
 * 查询预入职员工列表
 * @param query
 * @returns {*}
 */

export function listUserPreEmployment(query?: UserPreEmploymentQuery): AxiosPromise<UserPreEmploymentVO[]> {
  return request({
    url: '/oa/personnel/userPreEmployment/list',
    method: 'get',
    params: query,
  })
}

/**
 * 查询预入职员工详细
 * @param id
 */
export function getUserPreEmployment(id: string | number): AxiosPromise<UserPreEmploymentVO> {
  return request({
    url: `/oa/personnel/userPreEmployment/${id}`,
    method: 'get',
  })
}

/**
 * 新增预入职员工
 * @param data
 */
export function addUserPreEmployment(data: UserPreEmploymentForm) {
  return request({
    url: '/oa/personnel/userPreEmployment',
    method: 'post',
    data,
  })
}

/**
 * 修改预入职员工
 * @param data
 */
export function updateUserPreEmployment(data: UserPreEmploymentForm) {
  return request({
    url: '/oa/personnel/userPreEmployment',
    method: 'put',
    data,
  })
}

/**
 * 删除预入职员工
 * @param id
 */
export function delUserPreEmployment(id: string | number | Array<string | number>) {
  return request({
    url: `/oa/personnel/userPreEmployment/${id}`,
    method: 'delete',
  })
}

/**
 * 校验手机号唯一（未走完流程的预入职员工手机号）
 * @param id
 */
export function checkPrePhoneUnique(query?: CheckUserNameAndPhoneUnique) {
  return request({
    url: '/oa/personnel/userPreEmployment/checkPhoneUnique',
    method: 'post',
    params: query,
  })
}
