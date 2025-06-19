import type { AxiosPromise } from 'axios'
import type { ContractPhaseQuery } from '../contractPhase/types'
import type { ContractSettlementDoneVO, ContractSettlementForm, ContractSettlementQuery, ContractSettlementVO, ContractSettlementWaitingVO } from '@/api/oa/business/contractSettlement/types'
import request from '@/service/request'

/**
 * 查询合同结算列表
 * @param query
 * @returns {*}
 */
export function listContractSettlement(query?: ContractSettlementQuery): AxiosPromise<ContractSettlementVO[]> {
  return request({
    url: '/oa/business/contractSettlement/list',
    method: 'get',
    params: query,
  })
}

/**
 * 查询合同结算详细
 * @param id
 */
export function getContractSettlement(id: string): AxiosPromise<ContractSettlementVO> {
  return request({
    url: `/oa/business/contractSettlement/${id}`,
    method: 'get',
  })
}

/**
 * 新增合同结算
 * @param data
 */
export function addContractSettlement(data: ContractSettlementForm) {
  return request({
    url: '/oa/business/contractSettlement',
    method: 'post',
    data,
  })
}

/**
 * 修改合同结算
 * @param data
 */
export function updateContractSettlement(data: ContractSettlementForm) {
  return request({
    url: '/oa/business/contractSettlement',
    method: 'put',
    data,
  })
}

/**
 * 删除合同结算
 * @param id
 */
export function delContractSettlement(id: string | Array<string>) {
  return request({
    url: `/oa/business/contractSettlement/${id}`,
    method: 'delete',
  })
}

/**
 * 获取合同结算资料类型字典
 * @param contractId
 */
export function getSettlementFileType(contractId: string) {
  return request({
    url: `/oa/business/contractSettlement/getSettlementFileType/${contractId}`,
    method: 'get',
  })
}

/**
 * 获取待结算合同
 */
export function getWaitingList(query: ContractPhaseQuery): AxiosPromise<ContractSettlementWaitingVO> {
  return request({
    url: '/oa/business/contractSettlement/getWaitingList',
    method: 'get',
    params: query,
  })
}

/**
 * 获取已发起结算合同
 */
export function getDoneList(query: ContractPhaseQuery): AxiosPromise<ContractSettlementDoneVO> {
  return request({
    url: '/oa/business/contractSettlement/getDoneList',
    method: 'get',
    params: query,
  })
}
