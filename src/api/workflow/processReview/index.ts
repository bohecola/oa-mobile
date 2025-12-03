import type { AxiosPromise } from 'axios'
import type { ProcessReviewForm, ProcessReviewQuery, ProcessReviewVO } from '@/api/workflow/processReview/types'
import request from '@/service/request'

/**
 * 查询流程评论列表
 * @param query
 * @returns {*}
 */

export function listProcessReview(query?: ProcessReviewQuery): AxiosPromise<ProcessReviewVO[]> {
  return request({
    url: '/workflow/processReview/list',
    method: 'get',
    params: query,
  })
}

/**
 * 查询流程评论详细
 * @param id
 */
export function getProcessReview(id: string | number): AxiosPromise<ProcessReviewVO> {
  return request({
    url: `/workflow/processReview/${id}`,
    method: 'get',
  })
}

/**
 * 新增流程评论
 * @param data
 */
export function addProcessReview(data: ProcessReviewForm) {
  return request({
    url: '/workflow/processReview',
    method: 'post',
    data,
  })
}

/**
 * 修改流程评论
 * @param data
 */
export function updateProcessReview(data: ProcessReviewForm) {
  return request({
    url: '/workflow/processReview',
    method: 'put',
    data,
  })
}

/**
 * 删除流程评论
 * @param id
 */
export function delProcessReview(id: string | number | Array<string | number>) {
  return request({
    url: `/workflow/processReview/${id}`,
    method: 'delete',
  })
}

export default {
  listProcessReview,
  getProcessReview,
  addProcessReview,
  updateProcessReview,
  delProcessReview,
}
