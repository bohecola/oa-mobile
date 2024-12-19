import type { AxiosPromise } from 'axios'
import request from '@/service/request'
import type { UserTrainForm, UserTrainQuery, UserTrainVO } from '@/api/oa/personnel/userTrain/types'

/**
 * 查询员工培训列表
 * @param query
 * @returns {*}
 */

export function listUserTrain(query?: UserTrainQuery): AxiosPromise<UserTrainVO[]> {
  return request({
    url: '/oa/personnel/userTrain/list',
    method: 'get',
    params: query,
  })
}

/**
 * 查询员工培训详细
 * @param id
 */
export function getUserTrain(id: string | number): AxiosPromise<UserTrainVO> {
  return request({
    url: `/oa/personnel/userTrain/${id}`,
    method: 'get',
  })
}

/**
 * 新增员工培训
 * @param data
 */
export function addUserTrain(data: UserTrainForm) {
  return request({
    url: '/oa/personnel/userTrain',
    method: 'post',
    data,
  })
}

/**
 * 修改员工培训
 * @param data
 */
export function updateUserTrain(data: UserTrainForm) {
  return request({
    url: '/oa/personnel/userTrain',
    method: 'put',
    data,
  })
}

/**
 * 删除员工培训
 * @param ids
 */
export function delUserTrain(ids: string | number | Array<string | number>) {
  return request({
    url: `/oa/personnel/userTrain/${ids}`,
    method: 'delete',
  })
}
