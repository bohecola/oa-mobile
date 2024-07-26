export interface RequestOptions {
  isEncrypt?: boolean
  ignoreCancelToken?: boolean
}

export interface Result<T = any> {
  code: number
  data?: T
  msg: string
}
