import type { AxiosPromise } from 'axios'
import type { CarFuelCardRecordForm, CarFuelCardRecordQuery, CarFuelCardRecordVO } from '@/api/oa/car/carFuelCardRecord/types'
import request from '@/service/request'

/**
 * 查询油卡明细列表
 * @param query
 * @returns {*}
 */
export function listCarFuelCardRecord(query?: CarFuelCardRecordQuery): AxiosPromise<CarFuelCardRecordVO[]> {
  return request({
    url: '/oa/car/carFuelCardRecord/list',
    method: 'get',
    params: query,
  })
}

/**
 * 查询油卡明细详细
 * @param id
 */
export function getCarFuelCardRecord(id: string | number): AxiosPromise<CarFuelCardRecordVO> {
  return request({
    url: `/oa/car/carFuelCardRecord/${id}`,
    method: 'get',
  })
}

/**
 * 新增油卡明细
 * @param data
 */
export function addCarFuelCardRecord(data: CarFuelCardRecordForm) {
  return request({
    url: '/oa/car/carFuelCardRecord',
    method: 'post',
    data,
  })
}

/**
 * 修改油卡明细
 * @param data
 */
export function updateCarFuelCardRecord(data: CarFuelCardRecordForm) {
  return request({
    url: '/oa/car/carFuelCardRecord',
    method: 'put',
    data,
  })
}

/**
 * 删除油卡明细
 * @param id
 */
export function delCarFuelCardRecord(id: string | Array<string>) {
  return request({
    url: `/oa/car/carFuelCardRecord/${id}`,
    method: 'delete',
  })
}
