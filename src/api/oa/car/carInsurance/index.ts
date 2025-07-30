import type { AxiosPromise } from 'axios'
import type { CarInsuranceForm, CarInsuranceQuery, CarInsuranceVO } from '@/api/oa/car/carInsurance/types'
import request from '@/service/request'

/**
 * 查询车辆保险列表
 * @param query
 * @returns {*}
 */
export function listCarInsurance(query?: CarInsuranceQuery): AxiosPromise<CarInsuranceVO[]> {
  return request({
    url: '/oa/car/carInsurance/list',
    method: 'get',
    params: query,
  })
}

/**
 * 查询车辆保险详细
 * @param id
 */
export function getCarInsurance(id: string): AxiosPromise<CarInsuranceVO> {
  return request({
    url: `/oa/car/carInsurance/${id}`,
    method: 'get',
  })
}

/**
 * 新增车辆保险
 * @param data
 */
export function addCarInsurance(data: CarInsuranceForm) {
  return request({
    url: '/oa/car/carInsurance',
    method: 'post',
    data,
  })
}

/**
 * 修改车辆保险
 * @param data
 */
export function updateCarInsurance(data: CarInsuranceForm) {
  return request({
    url: '/oa/car/carInsurance',
    method: 'put',
    data,
  })
}

/**
 * 删除车辆保险
 * @param id
 */
export function delCarInsurance(id: string | Array<string>) {
  return request({
    url: `/oa/car/carInsurance/${id}`,
    method: 'delete',
  })
}

/**
 * 根据车牌号查询最后一次 车辆保险
 * @param carNumber
 */
export function getLastInsuranceByCarNumber(carNumber: string): AxiosPromise<CarInsuranceVO> {
  return request({
    url: `/oa/car/carInsurance/getLastByCarNumber/${carNumber}`,
    method: 'get',
  })
}
