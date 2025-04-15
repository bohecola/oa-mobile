import type { AxiosPromise } from 'axios'
import type { PaperForm, PaperQuery, PaperVO } from './types'
import request from '@/service/request'

// 获取试卷详细信息
export function getExamPaper(id: string): AxiosPromise<PaperVO> {
  return request({
    url: `/exam/examPaper/ignore/${id}`,
    method: 'get',
  })
}

/**
 * 查询题库列表（不分页）
 * @param query
 * @returns {*}
 */
export function listPaperNoPage(query?: Partial<PaperQuery>): AxiosPromise<PaperVO[]> {
  return request({
    url: '/exam/examPaper/examPaperList',
    method: 'get',
    params: query,
  })
}

/**
 * 查询题库列表
 * @param query
 * @returns {*}
 */
export function listPaper(query?: PaperQuery): AxiosPromise<PaperVO[]> {
  return request({
    url: '/exam/examPaper/list',
    method: 'get',
    params: query,
  })
}

/**
 * 查询题库详细
 * @param id
 */
export function getPaper(id: string | number): AxiosPromise<PaperVO> {
  return request({
    url: `/exam/examPaper/${id}`,
    method: 'get',
  })
}

/**
 * 新增题库
 * @param data
 */
export function addPaper(data: PaperForm) {
  return request({
    url: '/exam/examPaper',
    method: 'post',
    data,
  })
}

/**
 * 修改题库
 * @param data
 */
export function updatePaper(data: PaperForm) {
  return request({
    url: '/exam/examPaper',
    method: 'put',
    data,
  })
}

/**
 * 删除题库
 * @param id
 */
export function delPaper(id: string | number | Array<string | number>) {
  return request({
    url: `/exam/examPaper/${id}`,
    method: 'delete',
  })
}
