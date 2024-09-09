import type { AxiosPromise } from 'axios'
import type { ProcessInstanceQuery, ProcessInstanceVO } from '@/api/workflow/processInstance/types'
import request from '@/service/request'

/**
 * 查询运行中实例列表
 * @param query
 * @returns {*}
 */
export function getPageByRunning(query: ProcessInstanceQuery): AxiosPromise<ProcessInstanceVO[]> {
  return request({
    url: '/workflow/processInstance/getPageByRunning',
    method: 'get',
    params: query,
  })
}

/**
 * 查询已完成实例列表
 * @param query
 * @returns {*}
 */
export function getPageByFinish(query: ProcessInstanceQuery): AxiosPromise<ProcessInstanceVO[]> {
  return request({
    url: '/workflow/processInstance/getPageByFinish',
    method: 'get',
    params: query,
  })
}

/**
 * 通过业务id获取历史流程图
 */
export function getHistoryImage(businessKey: string) {
  return request({
    url: `/workflow/processInstance/getHistoryImage/${businessKey}` + `?t${Math.random()}`,
    method: 'get',
  })
}

/**
 * 通过业务id获取历史流程图运行中，历史等节点
 */
export function getHistoryList(businessKey: string): AxiosPromise<Record<string, any>> {
  return request({
    url: `/workflow/processInstance/getHistoryList/${businessKey}` + `?t${Math.random()}`,
    method: 'get',
  })
}

/**
 * 获取审批记录
 * @param businessKey 业务id
 * @returns
 */
export function getHistoryRecord(businessKey: string | number) {
  return request({
    url: `/workflow/processInstance/getHistoryRecord/${businessKey}`,
    method: 'get',
  })
}

/**
 * 作废
 * @param data 参数
 * @returns
 */
export function deleteRunInstance(data: object) {
  return request({
    url: `/workflow/processInstance/deleteRunInstance`,
    method: 'post',
    data,
  })
}

/**
 * 运行中的实例 删除程实例，删除历史记录，删除业务与流程关联信息
 * @param businessKey 业务id
 * @returns
 */
export function deleteRunAndHisInstance(businessKey: string | string[]) {
  return request({
    url: `/workflow/processInstance/deleteRunAndHisInstance/${businessKey}`,
    method: 'delete',
  })
}

/**
 * 已完成的实例 删除程实例，删除历史记录，删除业务与流程关联信息
 * @param businessKey 业务id
 * @returns
 */
export function deleteFinishAndHisInstance(businessKey: string | string[]) {
  return request({
    url: `/workflow/processInstance/deleteFinishAndHisInstance/${businessKey}`,
    method: 'delete',
  })
}

/**
 * 分页查询当前登录人单据
 * @param query
 * @returns {*}
 */
export function getPageByCurrent(query: ProcessInstanceQuery): AxiosPromise<ProcessInstanceVO[]> {
  return request({
    url: '/workflow/processInstance/getPageByCurrent',
    method: 'get',
    params: query,
  })
}

/**
 * 撤销流程
 * @param businessKey 业务id
 * @returns
 */
export function cancelProcessApply(businessKey: string) {
  return request({
    url: `/workflow/processInstance/cancelProcessApply/${businessKey}`,
    method: 'post',
  })
}

export default {
  getPageByRunning,
  getPageByFinish,
  getHistoryImage,
  getHistoryList,
  getHistoryRecord,
  deleteRunInstance,
  deleteRunAndHisInstance,
  deleteFinishAndHisInstance,
  getPageByCurrent,
  cancelProcessApply,
}
