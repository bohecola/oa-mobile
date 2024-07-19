import request from '@/service/request'

export function login(data: any) {
  return request({
    url: '/auth/login',
    method: 'post',
    data,
  })
}

export function captcha(): Promise<{
  captchaEnabled: boolean
  uuid?: string
  img?: string
}> {
  return request({
    url: '/auth/code',
    method: 'get',
  })
}
