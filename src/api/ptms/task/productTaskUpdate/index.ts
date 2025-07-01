import type { ProductTaskVo } from './types'
import request from '@/service/request'

/**
 * 根据id查询工作任务详情
 * @param id
 * @returns
 */
export function getProductTaskItem(id: string | number) {
  return request({
    url: `/ptms/task/productTask/${id}`,
    method: 'get',
  })
}

/**
 * 修改工作任务
 * @param data
 * @returns
 */
export function updateProductTaskItem(data: ProductTaskVo) {
  return request({
    url: '/ptms/task/productTask/edit',
    method: 'put',
    data,
  })
}
