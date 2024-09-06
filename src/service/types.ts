export interface RequestOptions {
  isEncrypt?: boolean
  isCancel?: boolean
}

export interface Result<T = any> {
  code: number
  data?: T
  msg: string
}
