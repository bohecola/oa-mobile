import request from '@/service/request'

export function login(data: any) {
  return request({
    url: '/auth/login',
    method: 'post',
    data,
  })
}

export function captcha() {
  return request<{
    captchaEnabled: boolean
    uuid?: string
    img?: string
  }>({
    url: '/auth/code',
    method: 'get',
  })
}
