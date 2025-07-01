import type { AxiosPromise } from 'axios'
import type { PatorlTaskQuery, PatorlTaskVO } from '@/api/ptms/task/patorlTask/types'
import request from '@/service/request'

/**
 * 查询巡检工作任务列表
 * @param query
 * @returns {*}
 */
export function listPatorlTask(query?: PatorlTaskQuery): AxiosPromise<PatorlTaskVO[]> {
  return request({
    url: '/ptms/task/patorlTask/list',
    method: 'get',
    params: query,
  })
}

export function listPatorlTaskYear(query?: PatorlTaskQuery): AxiosPromise<PatorlTaskVO[]> {
  return request({
    url: '/ptms/task/patorlTask/yearList',
    method: 'get',
    params: query,
  })
}

/**
 * 查询巡检任务详细
 * @param id
 */
export function getPatorlTaskInfo(id: string | number): AxiosPromise<PatorlTaskVO> {
  return request({
    url: `/ptms/task/patorlTask/${id}`,
    method: 'get',
  })
}

/**
 * 删除巡检工作任务
 * @param id
 */
export function delPatorlTask(id: string | number | Array<string | number>) {
  return request({
    url: `/ptms/task/patorlTask/${id}`,
    method: 'delete',
  })
}

/**
 * 删除巡检工作任务
 * @param id
 */
export function delPatorlTaskWh(id: string | number | Array<string | number>) {
  return request({
    url: `/ptms/task/patorlTask/delWh/${id}`,
    method: 'delete',
  })
}

/**
 * 根据巡检标准名称查询巡检内容（巡检标准）
 */
export function getContentByContentName(data: any) {
  return request({
    url: '/ptms/task/patorlTask/getContentByContentName',
    method: 'post',
    data,
  })
}

/**
 * 根据内容id查询执行结果
 */
export function getRecordByContentId(contentId: string | number) {
  return request({
    url: `/ptms/task/patorlTask/getRecordByContentId/${contentId}`,
    method: 'get',
  })
}

/**
 * 巡检任务下达（巡检方案 直接 下达）
 * @returns
 */
export function taskIssueSubmit(data: any) {
  return request({
    url: '/ptms/scheme/patorlScheme/taskIssueSubmit',
    method: 'post',
    data,
  })
}

/**
 * 根据巡检任务id查询轨迹数据
 * @param id
 */
export function getTaskMapLocus(id: string | number) {
  return request({
    url: `/ptms/task/patorlTask/getTaskMapLocus/${id}`,
    method: 'get',
  })
}
/**
 * 巡检任务-巡检标准-巡检对象按日期分组
 * @param id
 */
export function getTaskStep(id: any) {
  return request({
    url: `/ptms/task/patorlTask/getTaskStepNew/${id}`,
    method: 'get',
  })
}
/**
 * 获取巡检任务某天轨迹信息
 * @param param
 */
export function getTaskLocus(param: any) {
  return request({
    url: '/ptms/task/patorlTask/getTaskLocus',
    method: 'get',
    params: param,
  })
}
