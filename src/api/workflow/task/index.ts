import type { AxiosPromise } from 'axios'
import type { TaskNum, TaskQuery, TaskVO } from '@/api/workflow/task/types'
import request from '@/service/request'

// 流程待办数量
export function getTaskNum(): AxiosPromise<TaskNum> {
  return request({
    url: '/workflow/task/getTaskNum',
    method: 'get',
  })
}

/**
 * 查询待办列表
 * @param query
 * @returns {*}
 */
export function getPageByTaskWait(query: TaskQuery): AxiosPromise<TaskVO[]> {
  return request({
    url: '/workflow/task/getPageByTaskWait',
    method: 'get',
    params: query,
  })
}

/**
 * 查询已办列表
 * @param query
 * @returns {*}
 */
export function getPageByTaskFinish(query: TaskQuery): AxiosPromise<TaskVO[]> {
  return request({
    url: '/workflow/task/getPageByTaskFinish',
    method: 'get',
    params: query,
  })
}

/**
 * 查询当前用户的抄送列表
 * @param query
 * @returns {*}
 */
export function getPageByTaskCopy(query: TaskQuery): AxiosPromise<TaskVO[]> {
  return request({
    url: '/workflow/task/getPageByTaskCopy',
    method: 'get',
    params: query,
  })
}

/**
 * 当前租户所有待办任务
 * @param query
 * @returns {*}
 */
export function getPageByAllTaskWait(query: TaskQuery): AxiosPromise<TaskVO[]> {
  return request({
    url: '/workflow/task/getPageByAllTaskWait',
    method: 'get',
    params: query,
  })
}

/**
 * 当前租户所有已办任务
 * @param query
 * @returns {*}
 */
export function getPageByAllTaskFinish(query: TaskQuery): AxiosPromise<TaskVO[]> {
  return request({
    url: '/workflow/task/getPageByAllTaskFinish',
    method: 'get',
    params: query,
  })
}

/**
 * 启动流程
 * @param data
 * @returns {*}
 */
export function startWorkFlow(data: object): any {
  return request({
    url: '/workflow/task/startWorkFlow',
    method: 'post',
    data,
  })
}

/**
 * 办理流程
 * @param data
 * @returns {*}
 */
export function completeTask(data: object) {
  return request({
    url: '/workflow/task/completeTask',
    method: 'post',
    data,
  })
}

/**
 * 认领任务
 * @param taskId
 * @returns {*}
 */
export function claim(taskId: string): any {
  return request({
    url: `/workflow/task/claim/${taskId}`,
    method: 'post',
  })
}

/**
 * 归还任务
 * @param taskId
 * @returns {*}
 */
export function returnTask(taskId: string): any {
  return request({
    url: `/workflow/task/returnTask/${taskId}`,
    method: 'post',
  })
}

/**
 * 任务驳回
 * @param data
 * @returns {*}
 */
export function backProcess(data: any): any {
  return request({
    url: '/workflow/task/backProcess',
    method: 'post',
    data,
  })
}

/**
 * 获取当前任务
 * @param taskId
 * @returns
 */
export function getTaskById(taskId: string) {
  return request({
    url: `/workflow/task/getTaskById/${taskId}`,
    method: 'get',
  })
}

/**
 * 加签
 * @param data
 * @returns
 */
export function addMultiInstanceExecution(data: any) {
  return request({
    url: '/workflow/task/addMultiInstanceExecution',
    method: 'post',
    data,
  })
}

/**
 * 减签
 * @param data
 * @returns
 */
export function deleteMultiInstanceExecution(data: any) {
  return request({
    url: '/workflow/task/deleteMultiInstanceExecution',
    method: 'post',
    data,
  })
}

/**
 * 修改任务办理人
 * @param taskIds
 * @param userId
 * @returns
 */
export function updateAssignee(taskIds: Array<string>, userId: string) {
  return request({
    url: `/workflow/task/updateAssignee/${taskIds}/${userId}`,
    method: 'put',
  })
}

/**
 * 转办任务
 * @returns
 */
export function transferTask(data: any) {
  return request({
    url: `/workflow/task/transferTask`,
    method: 'post',
    data,
  })
}

/**
 * 终止任务
 * @returns
 */
export function terminationTask(data: any) {
  return request({
    url: `/workflow/task/terminationTask`,
    method: 'post',
    data,
  })
}

/**
 * 查询流程变量
 * @returns
 */
export function getInstanceVariable(taskId: string) {
  return request({
    url: `/workflow/task/getInstanceVariable/${taskId}`,
    method: 'get',
  })
}

/**
 * 查询全局变量 - 任务id
 * @returns
 */
export function getTaskVariables(taskId: string) {
  return request({
    url: `/workflow/task/getTaskVariables/${taskId}`,
    method: 'get',
  }, { withCancel: false })
}

/**
 * 查询全局变量 - 流程实例id
 * @returns
 */
export function getVariablesByProcessInstanceId(processInstanceId: string) {
  return request({
    url: `/workflow/task/getVariablesByProcessInstanceId/${processInstanceId}`,
    method: 'get',
  }, { withCancel: false })
}

/**
 * 获取可驳回得任务节点
 * @returns
 */
export function getTaskNodeList(processInstanceId: string) {
  return request({
    url: `/workflow/task/getTaskNodeList/${processInstanceId}`,
    method: 'get',
  })
}

/**
 * 委托任务
 * @returns
 */
export function delegateTask(data: any) {
  return request({
    url: `/workflow/task/delegateTask`,
    method: 'post',
    data,
  })
}

/**
 * 查询工作流任务用户选择加签人员
 * @param taskId
 * @returns {*}
 */
export function getTaskUserIdsByAddMultiInstance(taskId: string) {
  return request({
    url: `/workflow/task/getTaskUserIdsByAddMultiInstance/${taskId}`,
    method: 'get',
  })
}

/**
 * 查询工作流选择减签人员
 * @param taskId
 * @returns {*}
 */
export function getListByDeleteMultiInstance(taskId: string) {
  return request({
    url: `/workflow/task/getListByDeleteMultiInstance/${taskId}`,
    method: 'get',
  })
}

/**
 * 查询流程定义
 * @returns {*}
 */
export function getUseMap() {
  return request({
    url: '/workflow/definitionConfig/getUseMap',
    method: 'get',
  })
}
