import type { AxiosPromise } from 'axios'
import type { CarAnnualInspectionForm, CarAnnualInspectionQuery, CarAnnualInspectionVO } from '@/api/oa/car/carAnnualInspection/types'
import request from '@/service/request'

/**
 * 查询车辆年审列表
 * @param query
 * @returns {*}
 */
export function listCarAnnualInspection(query?: CarAnnualInspectionQuery): AxiosPromise<CarAnnualInspectionVO[]> {
  return request({
    url: '/oa/car/carAnnualInspection/list',
    method: 'get',
    params: query,
  })
}

/**
 * 查询车辆年审详细
 * @param id
 */
export function getCarAnnualInspection(id: string): AxiosPromise<CarAnnualInspectionVO> {
  return request({
    url: `/oa/car/carAnnualInspection/${id}`,
    method: 'get',
  })
}

/**
 * 新增车辆年审
 * @param data
 */
export function addCarAnnualInspection(data: CarAnnualInspectionForm) {
  return request({
    url: '/oa/car/carAnnualInspection',
    method: 'post',
    data,
  })
}

/**
 * 修改车辆年审
 * @param data
 */
export function updateCarAnnualInspection(data: CarAnnualInspectionForm) {
  return request({
    url: '/oa/car/carAnnualInspection',
    method: 'put',
    data,
  })
}

/**
 * 删除车辆年审
 * @param id
 */
export function delCarAnnualInspection(id: string | Array<string>) {
  return request({
    url: `/oa/car/carAnnualInspection/${id}`,
    method: 'delete',
  })
}

/**
 * 根据车牌号查询最后一次 年审
 * @param carNumber
 */
export function getLastAnnualInspectionByCarNumber(carNumber: string): AxiosPromise<CarAnnualInspectionVO> {
  return request({
    url: `/oa/car/carAnnualInspection/getLastByCarNumber/${carNumber}`,
    method: 'get',
  })
}
