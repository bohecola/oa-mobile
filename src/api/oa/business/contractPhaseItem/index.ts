import type { AxiosPromise } from 'axios'
import type { ContractPhaseItemForm, ContractPhaseItemQuery, ContractPhaseItemVO } from '@/api/oa/business/contractPhaseItem/types'
import request from '@/service/request'

/**
 * 查询合同执行阶段项列表
 * @param query
 * @returns {*}
 */
export function listContractPhaseItem(query?: ContractPhaseItemQuery): AxiosPromise<ContractPhaseItemVO[]> {
  return request({
    url: '/oa/business/contractPhaseItem/list',
    method: 'get',
    params: query,
  })
}

/**
 * 查询合同执行阶段项详细
 * @param id
 */
export function getContractPhaseItem(id: string): AxiosPromise<ContractPhaseItemVO> {
  return request({
    url: `/oa/business/contractPhaseItem/${id}`,
    method: 'get',
  })
}

/**
 * 新增合同执行阶段项
 * @param data
 */
export function addContractPhaseItem(data: ContractPhaseItemForm) {
  return request({
    url: '/oa/business/contractPhaseItem',
    method: 'post',
    data,
  })
}

/**
 * 修改合同执行阶段项
 * @param data
 */
export function updateContractPhaseItem(data: ContractPhaseItemForm) {
  return request({
    url: '/oa/business/contractPhaseItem',
    method: 'put',
    data,
  })
}

/**
 * 删除合同执行阶段项
 * @param id
 */
export function delContractPhaseItem(id: string | string[]) {
  return request({
    url: `/oa/business/contractPhaseItem/${id}`,
    method: 'delete',
  })
}
