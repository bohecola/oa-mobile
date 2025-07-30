import type { AxiosPromise } from 'axios'
import type { CarDeptFuelRecordForm, CarDeptFuelRecordQuery, CarDeptFuelRecordVO } from '@/api/oa/car/carDeptFuelRecord/types'
import request from '@/service/request'

/**
 * 查询部门车辆油费列表
 * @param query
 * @returns {*}
 */
export function listCarDeptFuelRecord(query?: CarDeptFuelRecordQuery): AxiosPromise<CarDeptFuelRecordVO[]> {
  return request({
    url: '/oa/car/carDeptFuelRecord/list',
    method: 'get',
    params: query,
  })
}

/**
 * 查询部门车辆油费详细
 * @param id
 */
export function getCarDeptFuelRecord(id: string): AxiosPromise<CarDeptFuelRecordVO> {
  return request({
    url: `/oa/car/carDeptFuelRecord/${id}`,
    method: 'get',
  })
}

/**
 * 新增部门车辆油费
 * @param data
 */
export function addCarDeptFuelRecord(data: CarDeptFuelRecordForm) {
  return request({
    url: '/oa/car/carDeptFuelRecord',
    method: 'post',
    data,
  })
}

/**
 * 修改部门车辆油费
 * @param data
 */
export function updateCarDeptFuelRecord(data: CarDeptFuelRecordForm) {
  return request({
    url: '/oa/car/carDeptFuelRecord',
    method: 'put',
    data,
  })
}

/**
 * 删除部门车辆油费
 * @param id
 */
export function delCarDeptFuelRecord(id: string | Array<string>) {
  return request({
    url: `/oa/car/carDeptFuelRecord/${id}`,
    method: 'delete',
  })
}
