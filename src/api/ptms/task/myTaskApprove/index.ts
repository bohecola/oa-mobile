import request from '@/service/request'

/**
 * 查询列表
 */
export function listMyTask(query?: any) {
  return request({
    url: '/ptms/base/myProcess/list',
    method: 'get',
    params: query,
  })
}
