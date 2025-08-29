import type { AxiosPromise } from 'axios'
import type { CaptchaResult, LoginData, LoginResult } from './types'
import request from '@/service/request'

// 登录
export function login(data: LoginData): AxiosPromise<LoginResult> {
  return request({
    url: '/auth/login',
    method: 'post',
    data,
  }, { isEncrypt: true })
}

// 验证码
export function captcha(): AxiosPromise<CaptchaResult> {
  return request({
    url: '/auth/code',
    method: 'get',
  })
}

// 第三方登录
export function callback(data: LoginData): AxiosPromise {
  return request({
    url: '/auth/social/callback',
    method: 'post',
    data,
  })
}
