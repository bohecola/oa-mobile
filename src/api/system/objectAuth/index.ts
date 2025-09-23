import type { AxiosPromise } from 'axios'
import type { ObjectAuthForm, ObjectAuthQuery, ObjectAuthVO } from '@/api/system/objectAuth/types'
import request from '@/service/request'

/**
 * 查询业务授权列表
 * @param query
 * @returns {*}
 */
export function listObjectAuth(query?: ObjectAuthQuery): AxiosPromise<ObjectAuthVO[]> {
  return request({
    url: '/system/objectAuth/list',
    method: 'get',
    params: query,
  })
}

/**
 * 查询业务授权详细
 * @param id
 */
export function getObjectAuth(id: string): AxiosPromise<ObjectAuthVO> {
  return request({
    url: `/system/objectAuth/${id}`,
    method: 'get',
  })
}

/**
 * 新增业务授权
 * @param data
 */
export function addObjectAuth(data: ObjectAuthForm) {
  return request({
    url: '/system/objectAuth',
    method: 'post',
    data,
  })
}

/**
 * 修改业务授权
 * @param data
 */
export function updateObjectAuth(data: ObjectAuthForm) {
  return request({
    url: '/system/objectAuth',
    method: 'put',
    data,
  })
}

/**
 * 删除业务授权
 * @param id
 */
export function delObjectAuth(id: string | Array<string>) {
  return request({
    url: `/system/objectAuth/${id}`,
    method: 'delete',
  })
}
