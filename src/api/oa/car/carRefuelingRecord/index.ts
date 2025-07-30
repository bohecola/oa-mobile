import type { AxiosPromise } from 'axios'
import type { CarRefuelingRecordForm, CarRefuelingRecordQuery, CarRefuelingRecordVO } from '@/api/oa/car/carRefuelingRecord/types'
import request from '@/service/request'

/**
 * 查询车辆加油记录列表
 * @param query
 * @returns {*}
 */
export function listCarRefuelingRecord(query?: CarRefuelingRecordQuery): AxiosPromise<CarRefuelingRecordVO[]> {
  return request({
    url: '/oa/car/carRefuelingRecord/list',
    method: 'get',
    params: query,
  })
}

/**
 * 查询车辆加油记录详细
 * @param id
 */
export function getCarRefuelingRecord(id: string): AxiosPromise<CarRefuelingRecordVO> {
  return request({
    url: `/oa/car/carRefuelingRecord/${id}`,
    method: 'get',
  })
}

/**
 * 新增车辆加油记录
 * @param data
 */
export function addCarRefuelingRecord(data: CarRefuelingRecordForm) {
  return request({
    url: '/oa/car/carRefuelingRecord',
    method: 'post',
    data,
  })
}

/**
 * 修改车辆加油记录
 * @param data
 */
export function updateCarRefuelingRecord(data: CarRefuelingRecordForm) {
  return request({
    url: '/oa/car/carRefuelingRecord',
    method: 'put',
    data,
  })
}

/**
 * 删除车辆加油记录
 * @param id
 */
export function delCarRefuelingRecord(id: string | Array<string>) {
  return request({
    url: `/oa/car/carRefuelingRecord/${id}`,
    method: 'delete',
  })
}
