import type { AxiosPromise } from 'axios'
import type { SubjectForm, SubjectQuery, SubjectVO } from '@/api/oa/finance/subject/types'
import request from '@/service/request'

/**
 * 查询科目列表
 * @param query
 * @returns {*}
 */

export function listSubject(query?: SubjectQuery): AxiosPromise<SubjectVO[]> {
  return request({
    url: '/oa/finance/subject/list',
    method: 'get',
    params: query,
  })
}

/**
 * 查询科目详细
 * @param id
 */
export function getSubject(id: string | number): AxiosPromise<SubjectVO> {
  return request({
    url: `/oa/finance/subject/${id}`,
    method: 'get',
  })
}

/**
 * 新增科目
 * @param data
 */
export function addSubject(data: SubjectForm) {
  return request({
    url: '/oa/finance/subject',
    method: 'post',
    data,
  })
}

/**
 * 修改科目
 * @param data
 */
export function updateSubject(data: SubjectForm) {
  return request({
    url: '/oa/finance/subject',
    method: 'put',
    data,
  })
}

/**
 * 删除科目
 * @param id
 */
export function delSubject(id: string | number | Array<string | number>) {
  return request({
    url: `/oa/finance/subject/${id}`,
    method: 'delete',
  })
}
