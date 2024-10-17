import type { TrainCertificateForm } from './types'
import request from '@/service/request'

/**
 * 查询员工持证列表
 * @param query
 * @returns {*}
 */

export function listUserCertificate(query?: any) {
  return request({
    url: '/oa/personnel/userTrainCertificate/list',
    method: 'get',
    params: query,
  })
}

/**
 * 查询员工持证详细
 * @param id
 */
export function getUserCertificate(batchId: string | number) {
  return request({
    url: `/oa/personnel/userTrainCertificate/${batchId}`,
    method: 'get',
  })
}

/**
 * 新增员工持证
 * @param data
 */
export function addUserCertificate(data: TrainCertificateForm) {
  return request({
    url: '/oa/personnel/userTrainCertificate',
    method: 'post',
    data,
  })
}

/**
 * 修改员工持证
 * @param data
 */
export function updateUserCertificate(data: TrainCertificateForm) {
  return request({
    url: '/oa/personnel/userTrainCertificate',
    method: 'put',
    data,
  })
}

/**
 * 删除员工持证
 * @param id
 */
export function delUserCertificate(Ids: string | number | Array<string | number>) {
  return request({
    url: `/oa/personnel/userTrainCertificate/${Ids}`,
    method: 'delete',
  })
}
