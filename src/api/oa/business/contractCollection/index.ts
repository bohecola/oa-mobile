import type { AxiosPromise } from 'axios'
import type { ContractCollectionForm, ContractCollectionQuery, ContractCollectionVO } from '@/api/oa/business/contractCollection/types'
import request from '@/service/request'

/**
 * 查询合同回款信息列表
 * @param query
 * @returns {*}
 */
export function listContractCollection(query?: ContractCollectionQuery): AxiosPromise<ContractCollectionVO[]> {
  return request({
    url: '/oa/business/contractCollection/list',
    method: 'get',
    params: query,
  })
}

/**
 * 查询合同回款信息详细
 * @param id
 */
export function getContractCollection(id: string): AxiosPromise<ContractCollectionVO> {
  return request({
    url: `/oa/business/contractCollection/${id}`,
    method: 'get',
  })
}

/**
 * 新增合同回款信息
 * @param data
 */
export function addContractCollection(data: ContractCollectionForm) {
  return request({
    url: '/oa/business/contractCollection',
    method: 'post',
    data,
  })
}

/**
 * 修改合同回款信息
 * @param data
 */
export function updateContractCollection(data: ContractCollectionForm) {
  return request({
    url: '/oa/business/contractCollection',
    method: 'put',
    data,
  })
}

/**
 * 删除合同回款信息
 * @param id
 */
export function delContractCollection(id: string | Array<string>) {
  return request({
    url: `/oa/business/contractCollection/${id}`,
    method: 'delete',
  })
}
