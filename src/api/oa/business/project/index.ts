import type { AxiosPromise } from 'axios'
import type { ProjectForm, ProjectQuery, ProjectVO } from '@/api/oa/business/project/types'
import request from '@/service/request'

/**
 * 查询项目列表
 * @param query
 * @returns {*}
 */

export function listProject(query?: ProjectQuery): AxiosPromise<ProjectVO[]> {
  return request({
    url: '/oa/business/project/list',
    method: 'get',
    params: query,
  })
}

/**
 * 查询项目详细
 * @param id
 */
export function getProject(id: string | number): AxiosPromise<ProjectVO> {
  return request({
    url: `/oa/business/project/${id}`,
    method: 'get',
  })
}

/**
 * 新增项目
 * @param data
 */
export function addProject(data: ProjectForm) {
  return request({
    url: '/oa/business/project',
    method: 'post',
    data,
  })
}

/**
 * 修改项目
 * @param data
 */
export function updateProject(data: ProjectForm) {
  return request({
    url: '/oa/business/project',
    method: 'put',
    data,
  })
}

/**
 * 删除项目
 * @param id
 */
export function delProject(id: string | number | Array<string | number>) {
  return request({
    url: `/oa/business/project/${id}`,
    method: 'delete',
  })
}
