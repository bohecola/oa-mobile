import type { AxiosPromise } from 'axios'
import request from '@/service/request'
import type { DeptVO } from '@/api/system/dept/types'

/**
 * 劳动合同归属公司下拉框的数据
 * @param type
 */
export function getCompany(type: string | number): AxiosPromise<DeptVO[]> {
  return request({
    url: `/system/dept/queryByParentDept/${type}`,
    method: 'get',
  })
}
