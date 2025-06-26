import type { AxiosPromise } from 'axios'
import type {
  ProductPlanTaskItemSchemeForm,
  ProductPlanTaskSchemeForm,
  ProductPlanTaskSchemeQuery,
  ProductPlanTaskSchemeVO,
} from '@/api/ptms/scheme/productPlanTaskScheme/types'
import request from '@/service/request'

/**
 * 查询生产工作计划任务项方案列表(分页)
 * @param query
 * @returns {*}
 */

export function listProductPlanTaskScheme(query?: ProductPlanTaskSchemeQuery): AxiosPromise<ProductPlanTaskSchemeVO[]> {
  return request({
    url: '/ptms/scheme/productPlanTaskScheme/list',
    method: 'get',
    params: query,
  })
}

/**
 * 查询生产工作计划任务项方案详细
 * @param id
 */
export function getProductPlanTaskScheme(id: string | number): AxiosPromise<ProductPlanTaskSchemeVO> {
  return request({
    url: `/ptms/scheme/productPlanTaskScheme/${id}`,
    method: 'get',
  })
}

/**
 * 新增生产工作计划任务项方案
 * @param data
 */
export function addProductPlanTaskScheme(data: ProductPlanTaskSchemeForm) {
  return request({
    url: '/ptms/scheme/productPlanTaskScheme',
    method: 'post',
    data,
  })
}

/**
 * 修改生产工作计划任务项方案
 * @param data
 */
export function updateProductPlanTaskScheme(data: ProductPlanTaskSchemeForm) {
  return request({
    url: '/ptms/scheme/productPlanTaskScheme',
    method: 'put',
    data,
  })
}

/**
 * 删除生产工作计划任务项方案
 * @param id
 */
export function delProductPlanTaskScheme(id: string | number | Array<string | number>) {
  return request({
    url: `/ptms/scheme/productPlanTaskScheme/${id}`,
    method: 'delete',
  })
}

/**
 * 根据工作计划任务id查询相对应的任务执行项方案表
 * @param taskSchemeId
 * @returns
 */
export function getByTaskSchemeId(taskSchemeId: string) {
  return request({
    url: `/ptms/scheme/productPlanTaskItemScheme/getByTaskSchemeId/${taskSchemeId}`,
    method: 'get',
  })
}

/**
 * 新增生产工作计划任务项方案
 * @param data
 * @returns
 */
export function addproductPlanTaskItemScheme(data: ProductPlanTaskItemSchemeForm) {
  return request({
    url: '/ptms/scheme/productPlanTaskItemScheme',
    method: 'post',
    data,
  })
}
/**
 * 删除生产工作计划任务项方案
 * @param id
 */
export function delProductPlanTaskItemScheme(id: string | number | Array<string | number>) {
  return request({
    url: `/ptms/scheme/productPlanTaskItemScheme/${id}`,
    method: 'delete',
  })
}

/**
 * 修改生产工作计划任务项方案
 * @param data
 */
export function updateProductPlanTaskSchemeItem(data: ProductPlanTaskItemSchemeForm) {
  return request({
    url: '/ptms/scheme/productPlanTaskItemScheme',
    method: 'put',
    data,
  })
}
/**
 * 查询任务项方案详细
 * @param id
 */
export function getProductPlanTaskSchemeItem(id: string | number): AxiosPromise<ProductPlanTaskSchemeVO> {
  return request({
    url: `/ptms/scheme/productPlanTaskItemScheme/${id}`,
    method: 'get',
  })
}
