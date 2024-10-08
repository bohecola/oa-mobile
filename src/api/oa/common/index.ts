import request from '@/service/request'

export function getGenerateCode(businessCode: string, tableName: string) {
  return request({
    url: `/oa/common/getGenerateCode/${businessCode}/${tableName}`,
    method: 'get',
  })
}
