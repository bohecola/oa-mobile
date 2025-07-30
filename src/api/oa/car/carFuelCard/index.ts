import type { AxiosPromise } from 'axios'
import type { CarFuelCardForm, CarFuelCardQuery, CarFuelCardVO } from '@/api/oa/car/carFuelCard/types'
import request from '@/service/request'

/**
 * 查询车辆油卡列表
 * @param query
 * @returns {*}
 */
export function listCarFuelCard(query?: CarFuelCardQuery): AxiosPromise<CarFuelCardVO[]> {
  return request({
    url: '/oa/car/carFuelCard/list',
    method: 'get',
    params: query,
  })
}

/**
 * 查询车辆油卡详细
 * @param id
 */
export function getCarFuelCard(id: string | number): AxiosPromise<CarFuelCardVO> {
  return request({
    url: `/oa/car/carFuelCard/${id}`,
    method: 'get',
  })
}

/**
 * 新增车辆油卡
 * @param data
 */
export function addCarFuelCard(data: CarFuelCardForm) {
  return request({
    url: '/oa/car/carFuelCard',
    method: 'post',
    data,
  })
}

/**
 * 修改车辆油卡
 * @param data
 */
export function updateCarFuelCard(data: CarFuelCardForm) {
  return request({
    url: '/oa/car/carFuelCard',
    method: 'put',
    data,
  })
}

/**
 * 删除车辆油卡
 * @param id
 */
export function delCarFuelCard(id: string | number | Array<string | number>) {
  return request({
    url: `/oa/car/carFuelCard/${id}`,
    method: 'delete',
  })
}
