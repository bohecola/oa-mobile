import request from '@/service/request'

/**
 * 生产任务列表
 * @returns
 */
export function productApproveTaskList(query: any) {
  return request({
    url: '/ptms/task/productTask/listProcess',
    method: 'get',
    params: query,
  })
}

/**
 * 生产任务 —— 审核
 * @returns
 */
export function productProcess(data: any) {
  return request({
    url: '/ptms/task/productTask/approveTask',
    method: 'post',
    data,
  })
}

/**
 * 巡检任务列表
 * @returns
 */
export function patorlApproveTaskList(query: any) {
  return request({
    url: '/ptms/task/patorlTask/listProcess',
    method: 'get',
    params: query,
  })
}

/**
 * 巡检任务--审核
 * @returns
 */
export function patorlProcess(data: any) {
  return request({
    url: `/ptms/task/patorlTask/approveTask`,
    method: 'put',
    data,
  })
}
