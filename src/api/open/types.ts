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

export interface LoginResult {
  access_token: string
  client_id: string
  expire_in: number
}

export interface CaptchaResult {
  captchaEnabled: boolean
  uuid?: string
  img?: string
}
