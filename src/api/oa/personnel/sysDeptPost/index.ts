import type { AxiosPromise } from 'axios'
import request from '@/service/request'
import type { SysDeptPostForm, SysDeptPostQuery, SysDeptPostVO } from '@/api/oa/personnel/sysDeptPost/types'

/**
 * 查询部门岗位配置列表
 * @param query
 * @returns {*}
 */

export function listSysDeptPost(query?: SysDeptPostQuery): AxiosPromise<SysDeptPostVO[]> {
  return request({
    url: '/oa/personnel/sysDeptPost/list',
    method: 'get',
    params: query,
  })
}

/**
 * 查询部门岗位配置详细
 * @param id
 */
export function getSysDeptPost(id: string | number): AxiosPromise<SysDeptPostVO> {
  return request({
    url: `/oa/personnel/sysDeptPost/${id}`,
    method: 'get',
  })
}

/**
 * 新增部门岗位配置
 * @param data
 */
export function addSysDeptPost(data: SysDeptPostForm) {
  return request({
    url: '/oa/personnel/sysDeptPost',
    method: 'post',
    data,
  })
}

/**
 * 修改部门岗位配置
 * @param data
 */
export function updateSysDeptPost(data: SysDeptPostForm) {
  return request({
    url: '/oa/personnel/sysDeptPost',
    method: 'put',
    data,
  })
}

/**
 * 删除部门岗位配置
 * @param id
 */
export function delSysDeptPost(id: string | number | Array<string | number>) {
  return request({
    url: `/oa/personnel/sysDeptPost/${id}`,
    method: 'delete',
  })
}
