import type { AxiosPromise } from 'axios'
import request from '@/service/request'
import type { DailyFeeForm, DailyFeeQuery, DailyFeeVO } from '@/api/oa/daily/fee/types'

/**
 * 查询日常费用管理列表
 * @param query
 * @returns {*}
 */

export function listDailyFee(query?: DailyFeeQuery): AxiosPromise<DailyFeeVO[]> {
  return request({
    url: '/oa/daily/dailyFee/list',
    method: 'get',
    params: query,
  })
}

/**
 * 查询日常费用管理详细
 * @param id
 */
export function getDailyFee(id: string | number): AxiosPromise<DailyFeeVO> {
  return request({
    url: `/oa/daily/dailyFee/${id}`,
    method: 'get',
  })
}

/**
 * 新增日常费用管理
 * @param data
 */
export function addDailyFee(data: DailyFeeForm) {
  return request({
    url: '/oa/daily/dailyFee',
    method: 'post',
    data,
  })
}

/**
 * 修改日常费用管理
 * @param data
 */
export function updateDailyFee(data: DailyFeeForm) {
  return request({
    url: '/oa/daily/dailyFee',
    method: 'put',
    data,
  })
}

/**
 * 删除日常费用管理
 * @param id
 */
export function delDailyFee(id: string | number | Array<string | number>) {
  return request({
    url: `/oa/daily/dailyFee/${id}`,
    method: 'delete',
  })
}
