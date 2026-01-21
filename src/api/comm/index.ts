import type { AxiosPromise } from 'axios'
import type { UserInfoVO } from '../system/user/types'
import type { UploadResult } from './types'
import request from '@/service/request'

// 获取用户信息
export function person(): AxiosPromise<UserInfoVO> {
  return request({
    url: '/system/user/getInfo',
    method: 'get',
  })
}

// 注销
export function userLogout() {
  return request({
    url: '/auth/logout',
    method: 'post',
  })
}

// 文件上传
export function upload(data: FormData): AxiosPromise<UploadResult> {
  return request({
    url: '/resource/oss/upload',
    method: 'post',
    data,
  })
}

export function uploadNoAuth(data: FormData): AxiosPromise<UploadResult> {
  return request({
    url: '/resource/oss/ignore/upload',
    method: 'post',
    data,
  })
}

interface DingTalkSignParams {
  nonceStr?: string
  timeStamp?: string
  url: string
}

export function dingTalkSign(params: DingTalkSignParams) {
  return request({
    url: '/auth/dingtalk/sign',
    method: 'get',
    params,
  })
}
