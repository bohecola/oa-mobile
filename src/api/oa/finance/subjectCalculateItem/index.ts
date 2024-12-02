import type { AxiosPromise } from 'axios'
import type { ProjectSubjectItemTreeVO } from '../projectSubject/types'
import type {
  GetItemTreeListBySubjectIdsParams,
  SubjectCalculateItemAddForm,
  SubjectCalculateItemForm,
  SubjectCalculateItemQuery,
  SubjectCalculateItemVO,
} from '@/api/oa/finance/subjectCalculateItem/types'
import type { DictDataVO } from '@/api/system/dict/data/types'
import request from '@/service/request'

/**
 * 根据项目业务类型查询可用费用类型(数据字典)
 */
export function getUseFeeTypeBybusinessType(businessType: string): AxiosPromise<DictDataVO[]> {
  return request({
    url: `/oa/finance/subjectCalculateItem/getUseFeeTypeBybusinessType/${businessType}`,
    method: 'get',
  })
}

/**
 *  根据业务类型-费用类型-会计科目id查询组装会计核算项目
 */
export function getItemTreeListBySubjectIds(params: GetItemTreeListBySubjectIdsParams): AxiosPromise {
  return request({
    url: `/oa/finance/subjectCalculateItem/getItemTreeListBySubjectIds`,
    method: 'get',
    params,
  })
}

/**
 * 根据项目业务类型查询科目核算项目
 * @param businessType
 * @returns {*}
 */

export function getTreeByBusinessType(businessType: string): AxiosPromise<ProjectSubjectItemTreeVO[]> {
  return request({
    url: `/oa/finance/subjectCalculateItem/getTreeByBusinessType/${businessType}`,
    method: 'get',
  })
}

/**
 * 根据项目业务类型查询科目ids
 * @param businessType
 * @returns {*}
 */
export function getSubjectIdsByBusinessType(businessType: string, subjectFeeType: string): AxiosPromise<string[]> {
  return request({
    url: `/oa/finance/subjectCalculateItem/getSubjectIdsByBusinessType/${businessType}/${subjectFeeType}`,
    method: 'get',
  })
}

// 新增科目核算项目
export function getTreeByBatch(params: SubjectCalculateItemAddForm): AxiosPromise<SubjectCalculateItemVO[]> {
  return request({
    url: `/oa/finance/subjectCalculateItem/getTreeByBatch`,
    method: 'get',
    params,
  })
}
/**
 * 查询科目核算项目列表
 * @param query
 * @returns {*}
 */

export function listSubjectCalculateItem(query?: SubjectCalculateItemQuery): AxiosPromise<SubjectCalculateItemVO[]> {
  return request({
    url: '/oa/finance/subjectCalculateItem/list',
    method: 'get',
    params: query,
  })
}

/**
 * 查询科目核算项目详细
 * @param id
 */
export function getSubjectCalculateItem(id: string | number): AxiosPromise<SubjectCalculateItemVO> {
  return request({
    url: `/oa/finance/subjectCalculateItem/${id}`,
    method: 'get',
  })
}

/**
 * 新增科目核算项目
 * @param data
 */
export function addSubjectCalculateItem(data: SubjectCalculateItemForm) {
  return request({
    url: '/oa/finance/subjectCalculateItem',
    method: 'post',
    data,
  })
}

/**
 * 修改科目核算项目
 * @param data
 */
export function updateSubjectCalculateItem(data: SubjectCalculateItemForm) {
  return request({
    url: '/oa/finance/subjectCalculateItem',
    method: 'put',
    data,
  })
}

/**
 * 删除科目核算项目
 * @param id
 */
export function delSubjectCalculateItem(id: string | number | Array<string | number>) {
  return request({
    url: `/oa/finance/subjectCalculateItem/${id}`,
    method: 'delete',
  })
}
