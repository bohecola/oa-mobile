import type { AxiosPromise } from 'axios'
import type { ContractInvoiceForm, ContractInvoiceQuery, ContractInvoiceVO } from '@/api/oa/business/contractInvoice/types'
import request from '@/service/request'

/**
 * 查询合同开票信息列表
 * @param query
 * @returns {*}
 */
export function listContractInvoice(query?: Partial<ContractInvoiceQuery>): AxiosPromise<ContractInvoiceVO[]> {
  return request({
    url: '/oa/business/contractInvoice/list',
    method: 'get',
    params: query,
  })
}

/**
 * 查询合同开票信息详细
 * @param id
 */
export function getContractInvoice(id: string): AxiosPromise<ContractInvoiceVO> {
  return request({
    url: `/oa/business/contractInvoice/${id}`,
    method: 'get',
  })
}

/**
 * 新增合同开票信息
 * @param data
 */
export function addContractInvoice(data: ContractInvoiceForm) {
  return request({
    url: '/oa/business/contractInvoice',
    method: 'post',
    data,
  })
}

/**
 * 修改合同开票信息
 * @param data
 */
export function updateContractInvoice(data: ContractInvoiceForm) {
  return request({
    url: '/oa/business/contractInvoice',
    method: 'put',
    data,
  })
}

/**
 * 删除合同开票信息
 * @param id
 */
export function delContractInvoice(id: string | string[]) {
  return request({
    url: `/oa/business/contractInvoice/${id}`,
    method: 'delete',
  })
}
