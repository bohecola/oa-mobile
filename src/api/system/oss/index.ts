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
export function listByIds(ossIds: string): AxiosPromise<OssVO[]> {
  return request({
    url: `/resource/oss/listByIds/${ossIds}`,
    method: 'get',
  })
}

// 查询OSS对象基于id串（不鉴权）
export function listByIdsNoAuth(ossIds: string): AxiosPromise<OssVO[]> {
  return request({
    url: `/resource/oss/ignore/listByIds/${ossIds}`,
    method: 'get',
  })
}

// 删除OSS对象存储
export function delOss(ossId: string) {
  return request({
    url: `/resource/oss/${ossId}`,
    method: 'delete',
  })
}

// 查询电站附件
export function listByPsIdAndIds(psId: string, ossId: string): AxiosPromise<OssVO[]> {
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
export function listByPsIdAndIdsNew(psId: string, contentId: string, patrolType: string, objectId: string, ossId: string): AxiosPromise<OssVO[]> {
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
