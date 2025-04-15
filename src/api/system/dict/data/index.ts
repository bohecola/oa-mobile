import type { AxiosPromise } from 'axios'
import type { DictDataForm, DictDataQuery, DictDataVO } from './types'
import request from '@/service/request'

// 根据字典类型查询字典数据信息
export function getDicts(dictType: string): AxiosPromise<DictDataVO[]> {
  return request({
    url: `/system/dict/data/type/${dictType}`,
    method: 'get',
  })
}

// 根据字典类型查询字典数据信息（不鉴权）
export function getDictsNoAuth(dictType: string): AxiosPromise<DictDataVO[]> {
  return request({
    url: `/system/ignore/dict/data/type/${dictType}`,
    method: 'get',
  })
}

// 查询字典数据列表
export function listData(query: DictDataQuery): AxiosPromise<DictDataVO[]> {
  return request({
    url: '/system/dict/data/list',
    method: 'get',
    params: query,
  })
}

// 查询字典数据详细
export function getData(dictCode: string | number): AxiosPromise<DictDataVO> {
  return request({
    url: `/system/dict/data/${dictCode}`,
    method: 'get',
  })
}

// 新增字典数据
export function addData(data: DictDataForm) {
  return request({
    url: '/system/dict/data',
    method: 'post',
    data,
  })
}

// 修改字典数据
export function updateData(data: DictDataForm) {
  return request({
    url: '/system/dict/data',
    method: 'put',
    data,
  })
}

// 删除字典数据
export function delData(dictCode: string | number | Array<string | number>) {
  return request({
    url: `/system/dict/data/${dictCode}`,
    method: 'delete',
  })
}
