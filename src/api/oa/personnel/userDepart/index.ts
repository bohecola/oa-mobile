import type { AxiosPromise } from 'axios'
import request from '@/service/request'
import type { UserDepartForm, UserDepartQuery, UserDepartVO } from '@/api/oa/personnel/userDepart/types'

/**
 * 查询员工离职列表
 * @param query
 * @returns {*}
 */

export function listUserDepart(query?: UserDepartQuery): AxiosPromise<UserDepartVO[]> {
  return request({
    url: '/oa/personnel/userDepart/list',
    method: 'get',
    params: query,
  })
}

/**
 * 查询员工离职详细
 * @param id
 */
export function getUserDepart(id: string | number): AxiosPromise<UserDepartVO> {
  return request({
    url: `/oa/personnel/userDepart/${id}`,
    method: 'get',
  })
}

/**
 * 新增员工离职
 * @param data
 */
export function addUserDepart(data: UserDepartForm) {
  return request({
    url: '/oa/personnel/userDepart',
    method: 'post',
    data,
  })
}

/**
 * 修改员工离职
 * @param data
 */
export function updateUserDepart(data: UserDepartForm) {
  return request({
    url: '/oa/personnel/userDepart',
    method: 'put',
    data,
  })
}

/**
 * 删除员工离职
 * @param id
 */
export function delUserDepart(ids: string | number | Array<string | number>) {
  return request({
    url: `/oa/personnel/userDepart/${ids}`,
    method: 'delete',
  })
}
