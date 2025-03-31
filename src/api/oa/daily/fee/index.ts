import type { AxiosPromise } from 'axios'
import type { DailyByRelateConditionsQuery, DailyFeeForm, DailyFeeQuery, DailyFeeVO } from '@/api/oa/daily/fee/types'
import request from '@/service/request'

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
export function getDailyFee(id: string): AxiosPromise<DailyFeeVO> {
  return request({
    url: `/oa/daily/dailyFee/${id}`,
    method: 'get',
  })
}

/**
 * 新增日常费用管理
 * @param data
 */
export function addDailyFee(data: DailyFeeForm): AxiosPromise {
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
export function updateDailyFee(data: DailyFeeForm): AxiosPromise {
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
export function delDailyFee(id: string | Array<string>) {
  return request({
    url: `/oa/daily/dailyFee/${id}`,
    method: 'delete',
  })
}

/**
 * 日常费用类型——项目部特殊商业保险购买申请——选择日常事务中<项目部特殊商业保险购买申请>流程审批通过的数据
 * 日常事务类型——员工考取证书补贴申请——选择日常事务中<公司人员资格证书注册申请>流程审批通过的数据 no:编码、userId、statsh:'2'已完成
 * @param query
 */
export function getDailyWorkByRelateConditionsBo(query?: DailyByRelateConditionsQuery) {
  return request({
    url: '/oa/daily/dailyWork/getDailyWorkByRelateConditionsBo',
    method: 'get',
    params: query,
  })
}
