import type { AxiosPromise } from 'axios'
import type { PurchaseChangeItemForm, PurchaseChangeItemQuery, PurchaseChangeItemVO } from '@/api/oa/business/purchaseChangeItem/types'
import request from '@/service/request'

/**
 * 查询采购变更明细列表
 * @param query
 * @returns {*}
 */
export function listPurchaseChangeItem(query?: PurchaseChangeItemQuery): AxiosPromise<PurchaseChangeItemVO[]> {
  return request({
    url: '/oa/business/purchaseChangeItem/list',
    method: 'get',
    params: query,
  })
}

/**
 * 查询采购变更明细详细
 * @param id
 */
export function getPurchaseChangeItem(id: string): AxiosPromise<PurchaseChangeItemVO> {
  return request({
    url: `/oa/business/purchaseChangeItem/${id}`,
    method: 'get',
  })
}

/**
 * 新增采购变更明细
 * @param data
 */
export function addPurchaseChangeItem(data: PurchaseChangeItemForm) {
  return request({
    url: '/oa/business/purchaseChangeItem',
    method: 'post',
    data,
  })
}

/**
 * 修改采购变更明细
 * @param data
 */
export function updatePurchaseChangeItem(data: PurchaseChangeItemForm) {
  return request({
    url: '/oa/business/purchaseChangeItem',
    method: 'put',
    data,
  })
}

/**
 * 删除采购变更明细
 * @param id
 */
export function delPurchaseChangeItem(id: string | Array<string>) {
  return request({
    url: `/oa/business/purchaseChangeItem/${id}`,
    method: 'delete',
  })
}
