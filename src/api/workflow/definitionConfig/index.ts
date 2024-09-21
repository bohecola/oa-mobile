import type { AxiosPromise } from 'axios'
import type { DefinitionConfigForm, DefinitionConfigVO } from '@/api/workflow/definitionConfig/types'
import request from '@/service/request'

/**
 * 查询表单配置详细
 * @param definitionId
 */
export function getByDefId(definitionId: string | number): AxiosPromise<DefinitionConfigVO> {
  return request({
    url: `/workflow/definitionConfig/getByDefId/${definitionId}`,
    method: 'get',
  })
}

/**
 * 新增表单配置
 * @param data
 */
export function saveOrUpdate(data: DefinitionConfigForm) {
  return request({
    url: '/workflow/definitionConfig/saveOrUpdate',
    method: 'post',
    data,
  })
}

/**
 * 删除表单配置
 * @param id
 */
export function deldefinitionConfig(id: string | number | Array<string | number>) {
  return request({
    url: `/workflow/definitionConfig/${id}`,
    method: 'delete',
  })
}

/**
 * 查询流程定义配置排除当前查询的流程定义
 * @param tableName
 * @param definitionId
 */
export function getByTableNameNotDefId(tableName: string, definitionId: string | number) {
  return request({
    url: `/workflow/definitionConfig/getByTableNameNotDefId/${tableName}/${definitionId}`,
    method: 'get',
  })
}
