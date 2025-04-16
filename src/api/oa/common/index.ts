import type { EditOaWfFileVO } from './types'
import request from '@/service/request'

/**
 * 查询招聘申请列表
 */
export function getGenerateCode(businessCode: string, tableName: string) {
  return request({
    url: `/oa/common/getGenerateCode/${businessCode}/${tableName}`,
    method: 'get',
  })
}

/**
 * 补充流程附件
 */
export function editOaWfFile(data: EditOaWfFileVO) {
  return request({
    url: `/oa/common/editOaWfFile`,
    method: 'put',
    data,
  })
}
