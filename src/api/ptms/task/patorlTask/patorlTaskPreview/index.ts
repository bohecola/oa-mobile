import type { PatorlPlanPreviewVo } from './types'
import request from '@/service/request'

/**
 * 根据计划id查询工作任务方案
 * @returns
 */
export function getByPsIdAndPlanId(psId: string, planSchemeId: string) {
  return request({
    url: `/ptms/scheme/patorlScheme/getByPsIdAndPlanId/${psId}/${planSchemeId}`,
    method: 'get',
  })
}
/**
 * 生产工作任务预览 - 第一步
 * @returns
 */
export function getPreviewFirst(query: any) {
  return request({
    url: '/ptms/task/patorlTask/previewFirst',
    method: 'get',
    params: query,
  })
}

/**
 * 巡检工作任务预览 - 第二步
 * @returns
 */
export function previewSubmit(data: PatorlPlanPreviewVo) {
  return request({
    url: '/ptms/task/patorlTask/previewSubmit',
    method: 'post',
    data,
  })
}
