import type { AxiosPromise } from 'axios'
import type { CarClaimForm, CarClaimQuery, CarClaimVO } from '@/api/oa/car/carClaim/types'
import request from '@/service/request'

/**
 * 查询车辆出险记录列表
 * @param query
 * @returns {*}
 */
export function listCarClaim(query?: CarClaimQuery): AxiosPromise<CarClaimVO[]> {
  return request({
    url: '/oa/car/carClaim/list',
    method: 'get',
    params: query,
  })
}

/**
 * 查询车辆出险记录详细
 * @param id
 */
export function getCarClaim(id: string): AxiosPromise<CarClaimVO> {
  return request({
    url: `/oa/car/carClaim/${id}`,
    method: 'get',
  })
}

/**
 * 新增车辆出险记录
 * @param data
 */
export function addCarClaim(data: CarClaimForm) {
  return request({
    url: '/oa/car/carClaim',
    method: 'post',
    data,
  })
}

/**
 * 修改车辆出险记录
 * @param data
 */
export function updateCarClaim(data: CarClaimForm) {
  return request({
    url: '/oa/car/carClaim',
    method: 'put',
    data,
  })
}

/**
 * 删除车辆出险记录
 * @param id
 */
export function delCarClaim(id: string | Array<string>) {
  return request({
    url: `/oa/car/carClaim/${id}`,
    method: 'delete',
  })
}
