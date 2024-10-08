import type { AxiosPromise } from 'axios'
import type { ProjectSubjectItemTreeVO } from '../../finance/projectSubject/types'
import type { PurchaseForm, PurchaseQuery, PurchaseVO } from '@/api/oa/business/purchase/types'
import request from '@/service/request'

/**
 * 预算类别列表
 */

export function getItemTreeByProjectIdAndDeptId(projectId: string | number, deptId: string | number): AxiosPromise<ProjectSubjectItemTreeVO[]> {
  return request({
    url: `/oa/finance/projectSubject/getItemTreeByProjectIdAndDeptId/${projectId}/${deptId}`,
    method: 'get',
  })
}

/**
 * 查询采购管理列表
 * @param query
 * @returns {*}
 */

export function listPurchase(query?: PurchaseQuery): AxiosPromise<PurchaseVO[]> {
  return request({
    url: '/oa/business/purchase/list',
    method: 'get',
    params: query,
  })
}

/**
 * 查询采购管理详细
 * @param id
 */
export function getPurchase(id: string | number): AxiosPromise<PurchaseVO> {
  return request({
    url: `/oa/business/purchase/${id}`,
    method: 'get',
  })
}

/**
 * 新增采购管理
 * @param data
 */
export function addPurchase(data: PurchaseForm) {
  return request({
    url: '/oa/business/purchase',
    method: 'post',
    data,
  })
}

/**
 * 修改采购管理
 * @param data
 */
export function updatePurchase(data: PurchaseForm) {
  return request({
    url: '/oa/business/purchase',
    method: 'put',
    data,
  })
}

/**
 * 删除采购管理
 * @param id
 */
export function delPurchase(id: string | number | Array<string | number>) {
  return request({
    url: `/oa/business/purchase/${id}`,
    method: 'delete',
  })
}
