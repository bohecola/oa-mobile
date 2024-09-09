import type { AxiosPromise } from 'axios'
import type { FormManageForm, FormManageQuery, FormManageVO } from '@/api/workflow/formManage/types'
import request from '@/service/request'

/**
 * 查询表单管理列表
 * @param query
 * @returns {*}
 */

export function listFormManage(query?: FormManageQuery): AxiosPromise<FormManageVO[]> {
  return request({
    url: '/workflow/formManage/list',
    method: 'get',
    params: query,
  })
}

/**
 * 查询表单管理列表
 * @param query
 * @returns {*}
 */

export function selectListFormManage(): AxiosPromise<FormManageVO[]> {
  return request({
    url: '/workflow/formManage/list/selectList',
    method: 'get',
  })
}

/**
 * 查询表单管理详细
 * @param id
 */
export function getFormManage(id: string | number): AxiosPromise<FormManageVO> {
  return request({
    url: `/workflow/formManage/${id}`,
    method: 'get',
  })
}

/**
 * 新增表单管理
 * @param data
 */
export function addFormManage(data: FormManageForm) {
  return request({
    url: '/workflow/formManage',
    method: 'post',
    data,
  })
}

/**
 * 修改表单管理
 * @param data
 */
export function updateFormManage(data: FormManageForm) {
  return request({
    url: '/workflow/formManage',
    method: 'put',
    data,
  })
}

/**
 * 删除表单管理
 * @param id
 */
export function delFormManage(id: string | number | Array<string | number>) {
  return request({
    url: `/workflow/formManage/${id}`,
    method: 'delete',
  })
}
