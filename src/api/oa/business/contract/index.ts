import type { AxiosPromise } from 'axios'
import type { ContractForm, ContractQuery, ContractVO } from '@/api/oa/business/contract/types'
import request from '@/service/request'

/**
 * 查询合同列表
 * @param query
 * @returns {*}
 */

export function listContract(query?: Partial<ContractQuery>): AxiosPromise<ContractVO[]> {
  return request({
    url: '/oa/business/contract/list',
    method: 'get',
    params: query,
  })
}

/**
 * 查询合同详细
 * @param id
 */
export function getContract(id: string | number): AxiosPromise<ContractVO> {
  return request({
    url: `/oa/business/contract/${id}`,
    method: 'get',
  })
}

/**
 * 新增合同
 * @param data
 */
export function addContract(data: ContractForm): AxiosPromise<ContractVO['id']> {
  return request({
    url: '/oa/business/contract',
    method: 'post',
    data,
  })
}

/**
 * 修改合同
 * @param data
 */
export function updateContract(data: ContractForm): AxiosPromise<ContractVO['id']> {
  return request({
    url: '/oa/business/contract',
    method: 'put',
    data,
  })
}

/**
 * 删除合同
 * @param id
 */
export function delContract(id: string | number | Array<string | number>) {
  return request({
    url: `/oa/business/contract/${id}`,
    method: 'delete',
  })
}
