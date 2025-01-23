import type { UserPendingEmploymentForm } from './types'
import request from '@/service/request'

/**
 * 新增待入职员工
 * @param data
 */
export function addUserEmploymentHandle(data: UserPendingEmploymentForm) {
  return request({
    url: '/oa/userEmploymentHandle',
    method: 'post',
    data,
  })
}

/**
 * 修改预入职员工
 * @param data
 */
export function updateUserEmploymentHandle(data: UserPendingEmploymentForm) {
  return request({
    url: '/oa/userEmploymentHandle',
    method: 'put',
    data,
  })
}

/**
 * 查看详情
 */
export function queryByIdUserPreEmploymentAndEmployment(id: string) {
  return request({
    url: `/oa/personnel/userEmployment/queryByIdUserPreEmploymentAndEmployment/${id}`,
    method: 'get',
  })
}
