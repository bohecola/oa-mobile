import type { AxiosPromise } from 'axios'
import type { ContractPhaseForm, ContractPhaseListVO, ContractPhaseQuery, ContractSumAmountVO } from '@/api/oa/business/contractPhase/types'
import request from '@/service/request'

/**
 * 查询合同执行阶段列表
 * @param query
 * @returns {*}
 */
export function listContractPhase(query?: ContractPhaseQuery): AxiosPromise<ContractPhaseListVO[]> {
  return request({
    url: '/oa/business/contractPhase/list',
    method: 'get',
    params: query,
  })
}

/**
 * 查询合同执行阶段详细
 * @param id
 */
export function getContractPhase(id: string): AxiosPromise<ContractPhaseListVO> {
  return request({
    url: `/oa/business/contractPhase/${id}`,
    method: 'get',
  })
}

/**
 * 新增合同执行阶段
 * @param data
 */
export function addContractPhase(data: ContractPhaseForm) {
  return request({
    url: '/oa/business/contractPhase',
    method: 'post',
    data,
  })
}

/**
 * 修改合同执行阶段
 * @param data
 */
export function updateContractPhase(data: ContractPhaseForm) {
  return request({
    url: '/oa/business/contractPhase',
    method: 'put',
    data,
  })
}

/**
 * 删除合同执行阶段
 * @param id
 */
export function delContractPhase(id: string | string[]) {
  return request({
    url: `/oa/business/contractPhase/${id}`,
    method: 'delete',
  })
}

/**
 * 合同执行阶段子表数据
 * @param contractId
 */
export function getPashItem(contractId: string) {
  return request({
    url: `/oa/business/contractPhase/getPashItem/${contractId}`,
    method: 'get',
  })
}

/**
 * 合同总金额统计
 * @param query
 */
export function getSumAmount(query: ContractPhaseQuery): AxiosPromise<ContractSumAmountVO> {
  return request({
    url: '/oa/business/contractPhase/getSumAmount',
    method: 'get',
    params: query,
  })
}
