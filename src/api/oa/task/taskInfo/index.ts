import type { AxiosPromise } from 'axios'
import type { TaskInfoForm, TaskInfoQuery, TaskInfoVO } from '@/api/oa/task/taskInfo/types'
import request from '@/service/request'

/**
 * 查询工作任务列表
 * @param query
 * @returns {*}
 */
export function listTaskInfo(query?: TaskInfoQuery): AxiosPromise<TaskInfoVO[]> {
  return request({
    url: '/oa/task/taskInfo/list',
    method: 'get',
    params: query,
  })
}

/**
 * 查询工作任务详细
 * @param id
 */
export function getTaskInfo(id: string): AxiosPromise<TaskInfoVO> {
  return request({
    url: `/oa/task/taskInfo/${id}`,
    method: 'get',
  })
}

/**
 * 查询工作任务详细和执行记录列表
 * @param id
 */
export function getTaskAndRecordById(id: string): AxiosPromise<TaskInfoVO> {
  return request({
    url: `/oa/task/taskInfo/getTaskAndRecordById/${id}`,
    method: 'get',
  })
}

/**
 * 新增工作任务
 * @param data
 */
export function addTaskInfo(data: TaskInfoForm) {
  return request({
    url: '/oa/task/taskInfo',
    method: 'post',
    data,
  })
}

/**
 * 修改工作任务
 * @param data
 */
export function updateTaskInfo(data: TaskInfoForm) {
  return request({
    url: '/oa/task/taskInfo',
    method: 'put',
    data,
  })
}

/**
 * 删除工作任务
 * @param id
 */
export function delTaskInfo(id: string | Array<string>) {
  return request({
    url: `/oa/task/taskInfo/${id}`,
    method: 'delete',
  })
}

/**
 * 修改状态
 */
export function editStatus(id: string, status: string) {
  return request({
    url: `/oa/task/taskInfo/editStatus/${id}/${status}`,
    method: 'put',
  })
}

/**
 * 事项审批
 */
export function approvalTask(data: TaskInfoForm) {
  return request({
    url: '/oa/task/taskInfo/approvalTask',
    method: 'put',
    data,
  })
}
