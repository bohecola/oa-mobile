import type { AxiosPromise } from 'axios'
import type { CarDeptConfigForm, CarDeptConfigQuery, CarDeptConfigVO } from '@/api/oa/car/carDeptConfig/types'
import request from '@/service/request'

/**
 * 查询部门车辆配置列表
 * @param query
 * @returns {*}
 */

export function listCarDeptConfig(query?: CarDeptConfigQuery): AxiosPromise<CarDeptConfigVO[]> {
  return request({
    url: '/oa/car/carDeptConfig/list',
    method: 'get',
    params: query,
  })
}

/**
 * 查询部门车辆配置详细
 * @param id
 */
export function getCarDeptConfig(id: string): AxiosPromise<CarDeptConfigVO> {
  return request({
    url: `/oa/car/carDeptConfig/${id}`,
    method: 'get',
  })
}

/**
 * 新增部门车辆配置
 * @param data
 */
export function addCarDeptConfig(data: CarDeptConfigForm) {
  return request({
    url: '/oa/car/carDeptConfig',
    method: 'post',
    data,
  })
}

/**
 * 修改部门车辆配置
 * @param data
 */
export function updateCarDeptConfig(data: CarDeptConfigForm) {
  return request({
    url: '/oa/car/carDeptConfig',
    method: 'put',
    data,
  })
}

/**
 * 删除部门车辆配置
 * @param id
 */
export function delCarDeptConfig(id: string | Array<string>) {
  return request({
    url: `/oa/car/carDeptConfig/${id}`,
    method: 'delete',
  })
}
