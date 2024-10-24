import axios from 'axios'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import { showConfirmDialog, showDialog, showFailToast } from 'vant'
import type { RequestOptions } from './types'
import { checkStatus, useRequstCanceller } from './hepler'
import { useGlobSettings } from '@/hooks'
import { ContentTypeEnum, ResultCodeEnum } from '@/enums/httpEnum'
import { useMixedEncrypt } from '@/utils/security'
import { useStore } from '@/store'

const globSettings = useGlobSettings()

// 请求实例
const axiosInstance = axios.create({
  baseURL: `${globSettings.apiUrl}${globSettings.apiUrlPrefix}`,
  headers: {
    'Content-Type': ContentTypeEnum.JSON,
    'Clientid': globSettings.appClientId,
  },
  timeout: 5 * 1000,
})

// 请求取消器
const { addRequestCancel, removeRequestCancel } = useRequstCanceller()

// 请求拦截器
axiosInstance.interceptors.request.use(
  (config) => {
    const { user } = useStore()

    if (user.token) {
      config.headers.Authorization = `Bearer ${user.token}`
    }

    // 文件上传
    if (config.data instanceof FormData) {
      config.headers['Content-Type'] = ContentTypeEnum.FORM_DATA
    }

    return config
  },

  (error) => {
    return Promise.reject(error)
  },
)

// 响应拦截器
axiosInstance.interceptors.response.use(
  (res: AxiosResponse) => {
    if (res) {
      // 移除已响应请求的 cancel
      removeRequestCancel(res.config)
    }

    if (!res.data) {
      // 数据不存在，返回 Axios 响应
      return res
    }

    const { code, msg } = res.data

    const { user } = useStore()

    switch (code) {
      // 请求成功，直接返回结果
      case ResultCodeEnum.SUCCESS:
        return res.data
      // Token 过期
      case ResultCodeEnum.TOKEN_EXPIRED:
        showConfirmDialog({
          title: '提示',
          message: '登录身份已失效，请重新登录!',
        })
          .then(() => {
            user.logout()
          })
          .catch(() => {
            // on cancel
          })
        return Promise.reject(new Error('登录超时'))
      // 系统内部错误
      case ResultCodeEnum.ERROR:
        showFailToast(msg)
        return Promise.reject(new Error(msg))
      // 系统警告消息
      case ResultCodeEnum.WARN:
        showFailToast(msg)
        return Promise.reject(new Error(msg))
      default:
        return Promise.reject(new Error(msg))
    }
  },

  (error) => {
    const { response, code, message } = error || {}
    // TODO 此处要根据后端接口返回格式修改
    const msg: string = response && response.data && response.data.message ? response.data.message : ''
    const err: string = error.toString()
    try {
      if (code === 'ECONNABORTED' && message.includes('timeout')) {
        showFailToast('接口请求超时，请刷新页面重试!')
        return
      }
      if (err && err.includes('Network Error')) {
        showDialog({
          title: '网络异常',
          message: '请检查您的网络连接是否正常',
        })
          .then(() => {})
          .catch(() => {})
        return Promise.reject(error)
      }
    }
    catch (error) {
      throw new Error(error as any)
    }

    // 请求是否被取消
    const isCancel = axios.isCancel(error)
    if (isCancel) {
      console.warn(error, '请求被取消！')
    }
    else {
      checkStatus(response && response.status, msg)
    }
    return Promise.reject(error)
  },
)

// 请求方法
export default function<T>(config: AxiosRequestConfig, requestOptions: RequestOptions = {}) {
  // 配置项
  const { isEncrypt, withCancel = true } = requestOptions

  // 默认取消重复请求
  if (withCancel) {
    addRequestCancel(config)
  }

  // 加密配置
  if (isEncrypt && (config.method === 'post' || config.method === 'put')) {
    // 混合加密
    const { encryptedAesKey, AES } = useMixedEncrypt()
    // 加密密钥
    Object.assign(config.headers ??= {}, {
      'encrypt-key': encryptedAesKey,
    })
    // 加密数据
    config.data = typeof config.data === 'object' ? AES(JSON.stringify(config.data)) : AES(config.data)
  }

  return axiosInstance.request<any, T>(config)
}
