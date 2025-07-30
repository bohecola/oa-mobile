import type { AxiosPromise } from 'axios'
import type { CarRepairMaintenanceForm, CarRepairMaintenanceQuery, CarRepairMaintenanceVO } from '@/api/oa/car/carRepairMaintenance/types'
import request from '@/service/request'

/**
 * 查询车辆维修保养列表
 * @param query
 * @returns {*}
 */
export function listCarRepairMaintenance(query?: CarRepairMaintenanceQuery): AxiosPromise<CarRepairMaintenanceVO[]> {
  return request({
    url: '/oa/car/carRepairMaintenance/list',
    method: 'get',
    params: query,
  })
}

/**
 * 查询车辆维修保养详细
 * @param id
 */
export function getCarRepairMaintenance(id: string): AxiosPromise<CarRepairMaintenanceVO> {
  return request({
    url: `/oa/car/carRepairMaintenance/${id}`,
    method: 'get',
  })
}

/**
 * 新增车辆维修保养
 * @param data
 */
export function addCarRepairMaintenance(data: CarRepairMaintenanceForm) {
  return request({
    url: '/oa/car/carRepairMaintenance',
    method: 'post',
    data,
  })
}

/**
 * 修改车辆维修保养
 * @param data
 */
export function updateCarRepairMaintenance(data: CarRepairMaintenanceForm) {
  return request({
    url: '/oa/car/carRepairMaintenance',
    method: 'put',
    data,
  })
}

/**
 * 删除车辆维修保养
 * @param id
 */
export function delCarRepairMaintenance(id: string | Array<string>) {
  return request({
    url: `/oa/car/carRepairMaintenance/${id}`,
    method: 'delete',
  })
}

/**
 * 根据车牌号查询最后一次 保养维修
 * @param carNumber
 */
export function getLastRepairMaintenanceByCarNumber(carNumber: string): AxiosPromise<CarRepairMaintenanceVO> {
  return request({
    url: `/oa/car/carRepairMaintenance/getLastByCarNumber/${carNumber}`,
    method: 'get',
  })
}
