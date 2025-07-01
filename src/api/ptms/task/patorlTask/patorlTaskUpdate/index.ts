import type { PatorlTaskVo } from './types'
import request from '@/service/request'

/**
 * 获取巡检工作任务详细信息--修改第一步
 */
export function updatePatorlTaskFirst(id: string) {
  return request({
    url: `/ptms/task/patorlTask/${id}`,
    method: 'get',
  })
}

/**
 * 修改巡检工作任务--确定最后一步
 * @returns
 */
export function updatePatorlTask(data: PatorlTaskVo) {
  return request({
    url: '/ptms/task/patorlTask/edit',
    method: 'put',
    data,
  })
}
