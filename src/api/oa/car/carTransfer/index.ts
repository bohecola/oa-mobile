import type { AxiosPromise } from 'axios'
import type { CarTransferForm, CarTransferQuery, CarTransferVO } from '@/api/oa/car/carTransfer/types'
import request from '@/service/request'

/**
 * 查询车辆移交列表
 * @param query
 * @returns {*}
 */
export function listCarTransfer(query?: CarTransferQuery): AxiosPromise<CarTransferVO[]> {
  return request({
    url: '/oa/car/carTransfer/list',
    method: 'get',
    params: query,
  })
}

/**
 * 查询车辆移交详细
 * @param id
 */
export function getCarTransfer(id: string): AxiosPromise<CarTransferVO> {
  return request({
    url: `/oa/car/carTransfer/${id}`,
    method: 'get',
  })
}

/**
 * 新增车辆移交
 * @param data
 */
export function addCarTransfer(data: CarTransferForm) {
  return request({
    url: '/oa/car/carTransfer',
    method: 'post',
    data,
  })
}

/**
 * 修改车辆移交
 * @param data
 */
export function updateCarTransfer(data: CarTransferForm) {
  return request({
    url: '/oa/car/carTransfer',
    method: 'put',
    data,
  })
}

/**
 * 删除车辆移交
 * @param id
 */
export function delCarTransfer(id: string | Array<string>) {
  return request({
    url: `/oa/car/carTransfer/${id}`,
    method: 'delete',
  })
}
