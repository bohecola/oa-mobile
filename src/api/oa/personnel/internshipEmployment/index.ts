import type { InternshipEmploymentForm } from './types'
import request from '@/service/request'

/**
 * 新增见习员工入职
 * @param data
 */
export function addInternshipEmployment(data: InternshipEmploymentForm) {
  return request({
    url: '/oa/userInfoHandle',
    method: 'post',
    data,
  })
}

/**
 * 修改见习员工入职
 * @param data
 */
export function updateInternshipEmployment(data: InternshipEmploymentForm) {
  return request({
    url: '/oa/userInfoHandle',
    method: 'put',
    data,
  })
}

/**
 * 修改见习员工入职
 */
export function getInternshipEmployment(id: string) {
  return request({
    url: `/oa/userInfoHandle/${id}`,
    method: 'get',
  })
}

/**
 * 根据userId获取面试评价数据
 */
export function getPreUserEmployment(userId: string) {
  return request({
    url: `/oa/personnel/userPreEmployment/getPreUserEmployment/${userId}`,
    method: 'get',
  })
}
