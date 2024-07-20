import request from '@/service/request'

export function login(data: any) {
  return request({
    url: '/auth/login',
    method: 'post',
    data,
  }, { isEncrypt: true })
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
