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
 * 查询当前登录用户 预算项
 */
export function getProjectSubjectByLoginUser(psId: string | number): AxiosPromise<ProjectSubjectForm> {
  return request({
    url: `/oa/finance/projectSubject/queryByLoginUser/${psId}`,
    method: 'get',
  })
}

/**
 * 预算填报接口
 */
export function updateBatchFill(data: ProjectSubjectForm['itemList']) {
  return request({
    url: `/oa/finance/projectSubject/updateBatchFill`,
    method: 'put',
    data,
  })
}

/**
 * 预算详情接口
 */
export function getSelfInfo(id: string | number): AxiosPromise<ProjectSubjectForm> {
  return request({
    url: `/oa/finance/projectSubject/getSelfInfo/${id}`,
    method: 'get',
  })
}

/**
 * 修改项目预算项金额
 */
export function updateItemAmount(data: ProjectSubjectItemTreeVO) {
  return request({
    url: `/oa/finance/projectSubject/updateItemAmount`,
    method: 'put',
    data,
  })
}

/**
 * 根据项目业务类型查询科目核算项目（tree）
 */
export function getItemTree(businessType: string): AxiosPromise<ProjectSubjectItemTreeVO[]> {
  return request({
    url: `/oa/finance/projectSubject/getItemTree/${businessType}`,
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
