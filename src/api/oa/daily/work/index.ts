import type { AxiosPromise } from 'axios'
import type { DailyWorkForm, DailyWorkQuery, DailyWorkVO } from '@/api/oa/daily/work/types'
import request from '@/service/request'

/**
 * 查询日常事务记录列表
 * @param query
 * @returns {*}
 */

export function listDailyWork(query?: DailyWorkQuery): AxiosPromise<DailyWorkVO[]> {
  return request({
    url: '/oa/daily/dailyWork/list',
    method: 'get',
    params: query,
  })
}

/**
 * 查询日常事务记录详细
 * @param id
 */
export function getDailyWork(id: string | number): AxiosPromise<DailyWorkVO> {
  return request({
    url: `/oa/daily/dailyWorkType/${id}`,
    method: 'get',
  })
}

/**
 * 新增日常事务记录
 * @param data
 */
export function addDailyWork(data: DailyWorkForm) {
  return request({
    url: '/oa/daily/dailyWork',
    method: 'post',
    data,
  })
}

/**
 * 修改日常事务记录
 * @param data
 */
export function updateDailyWork(data: DailyWorkForm) {
  return request({
    url: '/oa/daily/dailyWork',
    method: 'put',
    data,
  })
}

/**
 * 删除日常事务记录
 * @param id
 */
export function delDailyWork(id: string | number | Array<string | number>) {
  return request({
    url: `/oa/daily/dailyWorkType/${id}`,
    method: 'delete',
  })
}
