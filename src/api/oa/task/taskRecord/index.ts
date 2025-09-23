import type { AxiosPromise } from 'axios'
import type { TaskRecordForm, TaskRecordQuery, TaskRecordVO } from '@/api/oa/task/taskRecord/types'
import request from '@/service/request'

/**
 * 查询任务执行记录列表
 * @param query
 * @returns {*}
 */
export function listTaskRecord(query?: TaskRecordQuery): AxiosPromise<TaskRecordVO[]> {
  return request({
    url: '/oa/task/taskRecord/list',
    method: 'get',
    params: query,
  })
}

/**
 * 查询任务执行记录详细
 * @param id
 */
export function getTaskRecord(id: string): AxiosPromise<TaskRecordVO> {
  return request({
    url: `/oa/task/taskRecord/${id}`,
    method: 'get',
  })
}

/**
 * 新增任务执行记录
 * @param data
 */
export function addTaskRecord(data: TaskRecordForm) {
  return request({
    url: '/oa/task/taskRecord',
    method: 'post',
    data,
  })
}

/**
 * 修改任务执行记录
 * @param data
 */
export function updateTaskRecord(data: TaskRecordForm) {
  return request({
    url: '/oa/task/taskRecord',
    method: 'put',
    data,
  })
}

/**
 * 删除任务执行记录
 * @param id
 */
export function delTaskRecord(id: string | Array<string>) {
  return request({
    url: `/oa/task/taskRecord/${id}`,
    method: 'delete',
  })
}
