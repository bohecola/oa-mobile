import type { AxiosPromise } from 'axios'
import type { DeptForm, DeptQuery, DeptVO } from './types'
import request from '@/service/request'

// 查询部门列表
export function listDept(query?: DeptQuery): AxiosPromise<DeptVO[]> {
  return request({
    url: '/system/dept/list',
    method: 'get',
    params: query,
  })
}

// 查询部门列表（排除节点）
export function listDeptExcludeChild(deptId: string | number): AxiosPromise<DeptVO[]> {
  return request({
    url: `/system/dept/list/exclude/${deptId}`,
    method: 'get',
  })
}

// 查询部门详细
export function getDept(deptId: string | number): AxiosPromise<DeptVO> {
  return request({
    url: `/system/dept/${deptId}`,
    method: 'get',
  })
}

// 查询部门下拉树结构
export function treeselect(): AxiosPromise<DeptVO[]> {
  return request({
    url: '/system/dept/treeselect',
    method: 'get',
  })
}

// 新增部门
export function addDept(data: DeptForm) {
  return request({
    url: '/system/dept',
    method: 'post',
    data,
  })
}

// 修改部门
export function updateDept(data: DeptForm) {
  return request({
    url: '/system/dept',
    method: 'put',
    data,
  })
}

// 删除部门
export function delDept(deptId: number | string) {
  return request({
    url: `/system/dept/${deptId}`,
    method: 'delete',
  })
}

export function getUserDept(userId: number | string): AxiosPromise<DeptVO[]> {
  return request({
    url: `system/dept/selectUserDept/${userId}`,
    method: 'get',
  })
}
