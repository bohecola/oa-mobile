import type { AxiosPromise } from 'axios'
import type { OssQuery, OssVO } from './types'
import request from '@/service/request'

// 查询OSS对象存储列表
export function listOss(query: OssQuery): AxiosPromise<OssVO[]> {
  return request({
    url: '/resource/oss/list',
    method: 'get',
    params: query,
  })
}

// 查询OSS对象基于id串
export function listByIds(ossId: string | number): AxiosPromise<OssVO[]> {
  return request({
    url: `/resource/oss/listByIds/${ossId}`,
    method: 'get',
  })
}

// 删除OSS对象存储
export function delOss(ossId: string | number | Array<string | number>) {
  return request({
    url: `/resource/oss/${ossId}`,
    method: 'delete',
  })
}

// 查询电站附件
export function listByPsIdAndIds(psId: string | number, ossId: string | number): AxiosPromise<OssVO[]> {
  const query = {
    psId,
    ossId,
  }
  return request({
    url: '/ptms/base/psLocation/getFileListByPsIdAndossIds',
    method: 'get',
    params: query,
  })
}

// 查询电站附件
export function listByPsIdAndIdsNew(psId: string | number, contentId: string | number, patrolType: string | number, objectId: string | number, ossId: string | number): AxiosPromise<OssVO[]> {
  const query = {
    psId,
    contentId,
    patrolType,
    objectId,
    ossId,
  }
  return request({
    url: '/ptms/base/psLocation/getFileListByPsIdAndossIdsNew',
    method: 'get',
    params: query,
  })
}
