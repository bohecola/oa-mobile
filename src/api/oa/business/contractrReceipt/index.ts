import type { AxiosPromise } from 'axios'
import type { ContractReceiptForm, ContractReceiptQuery, ContractReceiptVO } from '@/api/oa/business/contractrReceipt/types'
import request from '@/service/request'

/**
 * 查询合同收款单列表
 * @param query
 * @returns {*}
 */
export function listContractReceipt(query?: Partial<ContractReceiptQuery>): AxiosPromise<ContractReceiptVO[]> {
  return request({
    url: '/oa/business/contractReceipt/list',
    method: 'get',
    params: query,
  })
}

/**
 * 查询合同收款单详细
 * @param id
 */
export function getContractReceipt(id: string): AxiosPromise<ContractReceiptVO> {
  return request({
    url: `/oa/business/contractReceipt/${id}`,
    method: 'get',
  })
}

/**
 * 新增合同收款单
 * @param data
 */
export function addContractReceipt(data: ContractReceiptForm) {
  return request({
    url: '/oa/business/contractReceipt',
    method: 'post',
    data,
  })
}

/**
 * 修改合同收款单
 * @param data
 */
export function updateContractReceipt(data: ContractReceiptForm) {
  return request({
    url: '/oa/business/contractReceipt',
    method: 'put',
    data,
  })
}

/**
 * 删除合同收款单
 * @param id
 */
export function delContractReceipt(id: string | string[]) {
  return request({
    url: `/oa/business/contractReceipt/${id}`,
    method: 'delete',
  })
}
