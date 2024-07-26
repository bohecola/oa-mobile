import axios from 'axios'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import { showConfirmDialog, showFailToast } from 'vant'
import type { RequestOptions, Result } from './types'
import { useCanceler } from './canceler'
import { useGlobSetting } from '@/hooks/settings'
import { ContentTypeEnum, ResultCodeEnum } from '@/enums/httpEnum'
import { useMixedEncrypt } from '@/utils/security'
import { useStore } from '@/store'

const globSetting = useGlobSetting()

// 请求实例
const axiosInstance = axios.create({
  baseURL: `${globSetting.apiUrl}${globSetting.apiUrlPrefix}`,
  headers: {
    'Content-Type': ContentTypeEnum.JSON,
    'Clientid': globSetting.appClientId,
  },
  timeout: 5 * 1000,
})

// 配置取消请求
const { addPending, removePending } = useCanceler()

// 请求拦截器
axiosInstance.interceptors.request.use(
  (config) => {
    const { user } = useStore()

    if (user.token) {
      config.headers.Authorization = `Bearer ${user.token}`
    }

    // 文件上传请求头配置
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
  (res: AxiosResponse<Result>) => {
    // Map 中移除已完成请求的 cancel 方法
    if (res)
      removePending(res.config)

    // 数据不存在，返回 Axios 响应
    if (!res.data) {
      return res
    }

    const { code, data, msg } = res.data
    const { user } = useStore()

    switch (code) {
      // 接口请求成功，直接返回结果
      case ResultCodeEnum.SUCCESS:
        return data
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
      // 接口请求错误，提示错误信息
      case ResultCodeEnum.ERROR:
        showFailToast(msg)
        return Promise.reject(new Error(msg))
      default:
        return Promise.reject(new Error(msg))
    }
  },

  (error) => {
    return Promise.reject(error)
  },
)

// 请求方法
export default function<T>(config: AxiosRequestConfig, requestOptions: RequestOptions = {}) {
  // 配置项
  const { isEncrypt, ignoreCancelToken } = requestOptions

  // 默认取消重复请求
  if (!ignoreCancelToken) {
    addPending(config)
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
