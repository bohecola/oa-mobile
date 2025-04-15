import type { AxiosPromise } from 'axios'
import type { QuestionForm, QuestionQuery, QuestionVO } from './types'
import request from '@/service/request'

/**
 * 查询题库列表
 * @param query
 * @returns {*}
 */
export function listQuestion(query?: QuestionQuery): AxiosPromise<QuestionVO[]> {
  return request({
    url: '/exam/question/list',
    method: 'get',
    params: query,
  })
}

/**
 * 查询题库详细
 * @param id
 */
export function getQuestion(id: string | number): AxiosPromise<QuestionVO> {
  return request({
    url: `/exam/question/${id}`,
    method: 'get',
  })
}

/**
 * 新增题库
 * @param data
 */
export function addQuestion(data: QuestionForm) {
  return request({
    url: '/exam/question',
    method: 'post',
    data,
  })
}

/**
 * 修改题库
 * @param data
 */
export function updateQuestion(data: QuestionForm) {
  return request({
    url: '/exam/question',
    method: 'put',
    data,
  })
}

/**
 * 删除题库
 * @param id
 */
export function delQuestion(id: string | number | Array<string | number>) {
  return request({
    url: `/exam/question/${id}`,
    method: 'delete',
  })
}
