import request from '@/service/request'

export interface LoginData {
  tenantId?: string
  username?: string
  password?: string
  rememberMe?: boolean
  socialCode?: string
  socialState?: string
  source?: string
  code?: string
  uuid?: string
  clientId: string
  grantType: string
}

// 登录
export function login(data: LoginData) {
  return request<{
    access_token: string
    client_id: string
    expire_in: number
  }>({
    url: '/auth/login',
    method: 'post',
    data,
  }, { isEncrypt: true })
}

// 验证码
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
