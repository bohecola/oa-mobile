import type { AxiosPromise } from 'axios'
import type { CarInfoForm, CarInfoQuery, CarInfoVO } from '@/api/oa/car/carInfo/types'
import request from '@/service/request'

/**
 * 查询车辆信息列表
 * @param query
 * @returns {*}
 */
export function listCarInfo(query?: CarInfoQuery): AxiosPromise<CarInfoVO[]> {
  return request({
    url: '/oa/car/carInfo/list',
    method: 'get',
    params: query,
  })
}

/**
 * 查询车辆信息详细
 * @param id
 */
export function getCarInfo(id: string): AxiosPromise<CarInfoVO> {
  return request({
    url: `/oa/car/carInfo/${id}`,
    method: 'get',
  })
}

/**
 * 新增车辆信息
 * @param data
 */
export function addCarInfo(data: CarInfoForm) {
  return request({
    url: '/oa/car/carInfo',
    method: 'post',
    data,
  })
}

/**
 * 修改车辆信息
 * @param data
 */
export function updateCarInfo(data: CarInfoForm) {
  return request({
    url: '/oa/car/carInfo',
    method: 'put',
    data,
  })
}

/**
 * 删除车辆信息
 * @param id
 */
export function delCarInfo(id: string | Array<string>) {
  return request({
    url: `/oa/car/carInfo/${id}`,
    method: 'delete',
  })
}
