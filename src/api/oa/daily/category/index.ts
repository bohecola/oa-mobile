import type { AxiosPromise } from 'axios'
import request from '@/service/request'
import type { DailyWorkTypeForm, DailyWorkTypeQuery, DailyWorkTypeVO } from '@/api/oa/daily/category/types'

/**
 * 查询日常事务申请类型列表
 * @param query
 * @returns {*}
 */

export function listDailyWorkType(query?: DailyWorkTypeQuery): AxiosPromise<DailyWorkTypeVO[]> {
  return request({
    url: '/oa/daily/dailyWorkType/list',
    method: 'get',
    params: query,
  })
}

/**
 * 查询日常事务申请类型详细
 * @param id
 */
export function getDailyWorkType(id: string | number): AxiosPromise<DailyWorkTypeVO> {
  return request({
    url: `/oa/daily/dailyWorkType/${id}`,
    method: 'get',
  })
}

/**
 * 新增日常事务申请类型
 * @param data
 */
export function addDailyWorkType(data: DailyWorkTypeForm) {
  return request({
    url: '/oa/daily/dailyWorkType',
    method: 'post',
    data,
  })
}

/**
 * 修改日常事务申请类型
 * @param data
 */
export function updateDailyWorkType(data: DailyWorkTypeForm) {
  return request({
    url: '/oa/daily/dailyWorkType',
    method: 'put',
    data,
  })
}

/**
 * 删除日常事务申请类型
 * @param id
 */
export function delDailyWorkType(id: string | number | Array<string | number>) {
  return request({
    url: `/oa/daily/dailyWorkType/${id}`,
    method: 'delete',
  })
}

/**
 * 根据事务类型查询部门列表
 */
export function queryByParentDaily(type: string) {
  return request({
    url: `/oa/daily/dailyWorkType/queryByParentDaily/${type}`,
    method: 'get',
  })
}
