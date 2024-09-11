import type { AxiosPromise } from 'axios'
import type {
  ProjectSubjectForm,
  ProjectSubjectItemTreeVO,
  ProjectSubjectNoBindFeeTypeVO,
  ProjectSubjectQuery,
  ProjectSubjectVO,
  getNoBindItemsParams,
  getNoBindSubjectFeeTypesParams,
} from '@/api/oa/finance/projectSubject/types'
import request from '@/service/request'

/**
 * 根据项目业务类型查询科目核算项目（tree）
 */
export function getItemTreeByProjectId(projectId: string | number): AxiosPromise<ProjectSubjectItemTreeVO[]> {
  return request({
    url: `/oa/finance/projectSubject/getItemTreeByProjectId/${projectId}`,
    method: 'get',
  })
}

/**
 * 查询科目下可添加(未绑定)核算项目
 */
export function getNoBindItems(params: getNoBindItemsParams): AxiosPromise<ProjectSubjectItemTreeVO[]> {
  return request({
    url: `/oa/finance/projectSubject/getNoBindItems`,
    method: 'get',
    params,
  })
}

/**
 * 获取可以选择的费用类型
 */
export function getNoBindSubjectFeeTypes(params: getNoBindSubjectFeeTypesParams): AxiosPromise<ProjectSubjectNoBindFeeTypeVO[]> {
  return request({
    url: `/oa/finance/projectSubject/getNoBindSubjectFeeTypes`,
    method: 'get',
    params,
  })
}

/**
 * 查询项目预算列表
 * @param query
 * @returns {*}
 */
export function listProjectSubject(query?: ProjectSubjectQuery): AxiosPromise<ProjectSubjectVO[]> {
  return request({
    url: '/oa/finance/projectSubject/list',
    method: 'get',
    params: query,
  })
}

/**
 * 查询项目预算详细
 * @param id
 */
export function getProjectSubject(id: string | number): AxiosPromise<ProjectSubjectVO> {
  return request({
    url: `/oa/finance/projectSubject/${id}`,
    method: 'get',
  })
}

/**
 * 新增项目预算
 * @param data
 */
export function addProjectSubject(data: ProjectSubjectForm) {
  return request({
    url: '/oa/finance/projectSubject',
    method: 'post',
    data,
  })
}

/**
 * 修改项目预算
 * @param data
 */
export function updateProjectSubject(data: ProjectSubjectForm) {
  return request({
    url: '/oa/finance/projectSubject',
    method: 'put',
    data,
  })
}

/**
 * 删除项目预算
 * @param id
 */
export function delProjectSubject(id: string | number | Array<string | number>) {
  return request({
    url: `/oa/finance/projectSubject/${id}`,
    method: 'delete',
  })
}
