import type { AxiosPromise } from 'axios'
import request from '@/service/request'
import type { UserEmploymentForm, UserEmploymentQuery, UserEmploymentVO } from '@/api/oa/personnel/userEmployment/types'

/**
 * 查询员工入职申请列表
 * @param query
 * @returns {*}
 */

export function listUserEmployment(query?: UserEmploymentQuery): AxiosPromise<UserEmploymentVO[]> {
  return request({
    url: '/oa/personnel/userEmployment/list',
    method: 'get',
    params: query,
  })
}

/**
 * 查询员工入职申请详细
 * @param id
 */
export function getUserEmployment(id: string | number): AxiosPromise<UserEmploymentVO> {
  return request({
    url: `/oa/personnel/userEmployment/${id}`,
    method: 'get',
  })
}

/**
 * 新增员工入职申请
 * @param data
 */
export function addUserEmployment(data: UserEmploymentForm) {
  return request({
    url: '/oa/personnel/userEmployment',
    method: 'post',
    data,
  })
}

/**
 * 修改员工入职申请
 * @param data
 */
export function updateUserEmployment(data: UserEmploymentForm) {
  return request({
    url: '/oa/personnel/userEmployment',
    method: 'put',
    data,
  })
}

/**
 * 删除员工入职申请
 * @param ids
 */
export function delUserEmployment(ids: string | number | Array<string | number>) {
  return request({
    url: `/oa/personnel/userEmployment/${ids}`,
    method: 'delete',
  })
}

/**
 * 新增修改(主值班员岗位及以下)员工入职申请
 * @param data
 */
export function addAndUpdateUserPreEmploymentAndEmployment(data: UserEmploymentForm) {
  return request({
    url: '/oa/personnel/userEmployment/addAndUpdateUserPreEmploymentAndEmployment',
    method: 'post',
    data,
  })
}
