import type { AxiosPromise } from 'axios'
import type { SupplierCustomerForm, SupplierCustomerQuery, SupplierCustomerVO } from '@/api/oa/business/supplierCustomer/types'
import request from '@/service/request'

/**
 * 查询供应商/客户列表
 * @param query
 * @returns {*}
 */

export function listSupplierCustomer(query?: Partial<SupplierCustomerQuery>): AxiosPromise<SupplierCustomerVO[]> {
  return request({
    url: '/oa/business/supplierCustomer/list',
    method: 'get',
    params: query,
  })
}

/**
 * 查询供应商/客户详细
 * @param id
 */
export function getSupplierCustomer(id: string | number): AxiosPromise<SupplierCustomerVO> {
  return request({
    url: `/oa/business/supplierCustomer/${id}`,
    method: 'get',
  })
}

/**
 * 新增供应商/客户
 * @param data
 */
export function addSupplierCustomer(data: SupplierCustomerForm) {
  return request({
    url: '/oa/business/supplierCustomer',
    method: 'post',
    data,
  })
}

/**
 * 修改供应商/客户
 * @param data
 */
export function updateSupplierCustomer(data: SupplierCustomerForm) {
  return request({
    url: '/oa/business/supplierCustomer',
    method: 'put',
    data,
  })
}

/**
 * 删除供应商/客户
 * @param id
 */
export function delSupplierCustomer(id: string | number | Array<string | number>) {
  return request({
    url: `/oa/business/supplierCustomer/${id}`,
    method: 'delete',
  })
}
