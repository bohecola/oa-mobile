import type { AxiosPromise } from 'axios'
import type { PurchaseChangeForm, PurchaseChangeQuery, PurchaseChangeVO } from '@/api/oa/business/purchaseChange/types'
import request from '@/service/request'

/**
 * 查询采购变更列表
 * @param query
 * @returns {*}
 */
export function listPurchaseChange(query?: PurchaseChangeQuery): AxiosPromise<PurchaseChangeVO[]> {
  return request({
    url: '/oa/business/purchaseChange/list',
    method: 'get',
    params: query,
  })
}

/**
 * 查询采购变更详细
 * @param id
 */
export function getPurchaseChange(id: string): AxiosPromise<PurchaseChangeVO> {
  return request({
    url: `/oa/business/purchaseChange/${id}`,
    method: 'get',
  })
}

/**
 * 新增采购变更
 * @param data
 */
export function addPurchaseChange(data: PurchaseChangeForm) {
  return request({
    url: '/oa/business/purchaseChange',
    method: 'post',
    data,
  })
}

/**
 * 修改采购变更
 * @param data
 */
export function updatePurchaseChange(data: PurchaseChangeForm) {
  return request({
    url: '/oa/business/purchaseChange',
    method: 'put',
    data,
  })
}

/**
 * 删除采购变更
 * @param id
 */
export function delPurchaseChange(id: string | Array<string>) {
  return request({
    url: `/oa/business/purchaseChange/${id}`,
    method: 'delete',
  })
}

/**
 * 根据采购 id 查询采购变更
 * @param purchaseId
 */
export function queryByPurchaseId(purchaseId: string): AxiosPromise<PurchaseChangeVO> {
  return request({
    url: `/oa/business/purchaseChange/queryByPurchaseId/${purchaseId}`,
    method: 'get',
  })
}
