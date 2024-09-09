import type { AxiosPromise } from 'axios'
import type { NodeConfigForm, NodeConfigQuery, NodeConfigVO } from '@/api/workflow/nodeConfig/types'
import request from '@/service/request'

/**
 * 查询节点配置列表
 * @param query
 * @returns {*}
 */

export function listNodeConfig(query?: NodeConfigQuery): AxiosPromise<NodeConfigVO[]> {
  return request({
    url: '/workflow/nodeConfig/list',
    method: 'get',
    params: query,
  })
}

/**
 * 查询节点配置详细
 * @param id
 */
export function getNodeConfig(id: string | number): AxiosPromise<NodeConfigVO> {
  return request({
    url: `/workflow/nodeConfig/${id}`,
    method: 'get',
  })
}

/**
 * 新增节点配置
 * @param data
 */
export function addNodeConfig(data: NodeConfigForm) {
  return request({
    url: '/workflow/nodeConfig',
    method: 'post',
    data,
  })
}

/**
 * 修改节点配置
 * @param data
 */
export function updateNodeConfig(data: NodeConfigForm) {
  return request({
    url: '/workflow/nodeConfig',
    method: 'put',
    data,
  })
}

/**
 * 删除节点配置
 * @param id
 */
export function delNodeConfig(id: string | number | Array<string | number>) {
  return request({
    url: `/workflow/nodeConfig/${id}`,
    method: 'delete',
  })
}
