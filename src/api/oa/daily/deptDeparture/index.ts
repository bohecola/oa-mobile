import type { AxiosPromise } from 'axios'
import type { DeptDepartureForm, DeptDepartureQuery, DeptDepartureVO } from '@/api/oa/daily/deptDeparture/types'
import request from '@/service/request'

/**
 * 查询项目部撤场列表
 * @param query
 * @returns {*}
 */
export function listDeptDeparture(query?: DeptDepartureQuery): AxiosPromise<DeptDepartureVO[]> {
  return request({
    url: '/oa/daily/deptDeparture/list',
    method: 'get',
    params: query,
  })
}

/**
 * 查询项目部撤场详细
 * @param id
 */
export function getDeptDeparture(id: string): AxiosPromise<DeptDepartureVO> {
  return request({
    url: `/oa/daily/deptDeparture/${id}`,
    method: 'get',
  })
}

/**
 * 新增项目部撤场
 * @param data
 */
export function addDeptDeparture(data: DeptDepartureForm) {
  return request({
    url: '/oa/daily/deptDeparture',
    method: 'post',
    data,
  })
}

/**
 * 修改项目部撤场
 * @param data
 */
export function updateDeptDeparture(data: DeptDepartureForm) {
  return request({
    url: '/oa/daily/deptDeparture',
    method: 'put',
    data,
  })
}

/**
 * 删除项目部撤场
 * @param id
 */
export function delDeptDeparture(id: string | Array<string>) {
  return request({
    url: `/oa/daily/deptDeparture/${id}`,
    method: 'delete',
  })
}
