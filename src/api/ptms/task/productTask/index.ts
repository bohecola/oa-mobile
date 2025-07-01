import type { AxiosPromise } from 'axios'
import type { ProductTaskForm, ProductTaskQuery, ProductTaskVO } from '@/api/ptms/task/productTask/types'
import type { ProductTaskRecordVo, ProductTaskVo } from '@/api/ptms/task/productTaskUpdate/types'
import request from '@/service/request'

/**
 * 查询生产工作任务列表
 * @param query
 * @returns {*}
 */
export function listProductTask(query?: ProductTaskQuery): AxiosPromise<ProductTaskVO[]> {
  return request({
    url: '/ptms/task/productTask/psDeptlist',
    method: 'get',
    params: query,
  })
}

/**
 * 查询生产工作任务详细
 * @param id
 */
export function getProductTask(id: string | number): AxiosPromise<ProductTaskVO> {
  return request({
    url: `/ptms/task/productTask/${id}`,
    method: 'get',
  })
}

/**
 * 新增生产工作任务
 * @param data
 */
export function addTaskNew(data: ProductTaskVo) {
  return request({
    url: '/ptms/task/productTask/add',
    method: 'post',
    data,
  })
}

/**
 * 第二步预览新增生产工作任务
 * @param data
 */
export function addProductTask(data: ProductTaskForm) {
  return request({
    url: '/ptms/task/productTask/previewSubmit',
    method: 'post',
    data,
  })
}

/**
 * 修改生产工作任务
 * @param data
 */
export function updateProductTask(data: ProductTaskForm) {
  return request({
    url: '/ptms/task/productTask',
    method: 'put',
    data,
  })
}

/**
 * 删除生产工作任务
 * @param ids
 */
export function delProductTask(ids: string | number | Array<string | number>) {
  return request({
    url: `/ptms/task/productTask/${ids}`,
    method: 'delete',
  })
}

/**
 * 删除生产工作任务(维护)
 * @param ids
 */
export function delProductTaskWh(ids: string | number | Array<string | number>) {
  return request({
    url: `/ptms/task/productTask/delWh/${ids}`,
    method: 'delete',
  })
}

/**
 * 根据计划类型查询计划方案接口
 * @param type string
 * @returns
 */
export function getproductPlanByType(type: string) {
  return request({
    url: `/ptms/scheme/productPlanScheme/getByType/${type}`,
    method: 'get',
  })
}

/**
 * 根据计划id查询工作任务方案
 * @param planSchemeId
 * @returns
 */
export function getByPlanSchemeList(planSchemeId: string) {
  return request({
    url: `/ptms/scheme/productPlanTaskScheme/getByPlanSchemeId/${planSchemeId}`,
    method: 'get',
  })
}

/**
 * 查询巡检任务的顶部生产计划的模糊查询的接口
 */
export function getProductPlanList(params: any) {
  return request({
    url: `/ptms/task/productPlan/list`,
    method: 'get',
    params,
  })
}

/**
 * 查询巡检任务的顶部生产计划的模糊查询的接口
 * @param type string
 * @returns
 */
export function getProductPlanByType(type: string) {
  return request({
    url: `/ptms/task/productPlan/getByType/${type}`,
    method: 'get',
  })
}

/**
 * 根据计划id 查询工作任务
 * @param planId string
 * @returns
 */
export function getProductTaskByPlanId(planId: string) {
  return request({
    url: `/ptms/task/productTask/queryByPlanId/${planId}`,
    method: 'get',
  })
}

/**
 * 获取生产任务-任务类别
 * @param params
 */
export function getTaskTypeList(params: any) {
  return request({
    url: `/ptms/task/productTask/getTaskType`,
    method: 'get',
    params,
  })
}

/**
 * 生产工作任务预览 - 第一步
 */
export function getPreviewFirst(query: any) {
  return request({
    url: '/ptms/task/productTask/previewFirst',
    method: 'get',
    params: query,
  })
}

/**
 * 查询生产工作任务处理列表
 * @param query
 */

export function productTaskDealList(query?: ProductTaskQuery): AxiosPromise<ProductTaskVO[]> {
  return request({
    url: '/ptms/task/productTask/dealList',
    method: 'get',
    params: query,
  })
}

/**
 * 根据任务id查询记录
 * @param taskId
 */
export function getRecordByTaskId(taskId: string) {
  return request({
    url: `/ptms/task/productTask/queryRecordByTaskId/${taskId}`,
    method: 'get',
  })
}

/**
 * 生产工作任务处理
 * @param data
 */
export function productTaskDeal(data: ProductTaskRecordVo) {
  return request({
    url: '/ptms/task/productTask/dealTask',
    method: 'post',
    data,
  })
}

/**
 * 生产工作任务执行处理完成
 * @param taskId
 */
export function productTaskDealDone(taskId: string) {
  return request({
    url: `/ptms/task/productTask/dealDoneTask/${taskId}`,
    method: 'post',
  })
}

/**
 * 获取工程管理中心-工程日报任务
 */
export function getProjectDayTaskList(params: { isEdit: string }): AxiosPromise<ProductTaskRecordVo[]> {
  return request({
    url: '/ptms/task/productTask/getProjectDayTaskList',
    method: 'get',
    params,
  })
}

/**
 * 是否可以查看工程日报
 */
export function isProjectDayTask(): AxiosPromise<boolean> {
  return request({
    url: `/ptms/task/productTask/isProjectDayTask`,
    method: 'get',
  })
}

/**
 * 是否可以新增工程日报
 */
export function isAddProjectDayTask(): AxiosPromise<boolean> {
  return request({
    url: '/ptms/task/productTask/isAddProjectDayTask',
    method: 'get',
  })
}

/**
 * 任务执行记录详情
 */
export function getTaskRecordByRecordId(recordId: string): AxiosPromise<ProductTaskRecordVo> {
  return request({
    url: `/ptms/task/productTask/getTaskRecordByRecordId/${recordId}`,
    method: 'get',
  })
}

/**
 * 查询生工程管理中心 => 生产任务执行记录列表
 */
export function getProjectRecordList(query?: Partial<PageQuery>): AxiosPromise<ProductTaskRecordVo[]> {
  return request({
    url: `/ptms/task/productTask/getProjectRecordList`,
    method: 'get',
    params: query,
  })
}
