import axios from 'axios'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import type { RequestOptions, Result } from './types'
import { useGlobSetting } from '@/hooks/settings'
import { ContentTypeEnum } from '@/enums/httpEnum'
import { useMixedEncrypt } from '@/utils/security'
import { useStore } from '@/store'

const globSetting = useGlobSetting()

const axiosInstance = axios.create({
  baseURL: `${globSetting.apiUrl}${globSetting.apiUrlPrefix}`,
  headers: {
    'Content-Type': ContentTypeEnum.JSON,
    'Clientid': globSetting.appClientId,
  },
  timeout: 5 * 1000,
})

axiosInstance.interceptors.request.use(
  (config) => {
    const { user } = useStore()

    if (user.token) {
      config.headers.Authorization = `Bearer ${user.token}`
    }

    return config
  },

  (error) => {
    return Promise.reject(error)
  },
)

axiosInstance.interceptors.response.use(
  (res: AxiosResponse<Result>) => {
    if (!res.data) {
      return res
    }

    const { code, data, msg } = res.data

    switch (code) {
      case 200:
        return data
      default:
        return Promise.reject(new Error(`${code} ${msg || 'axios response onfullfilled, but code is not 200.'}`))
    }
  },

  (error) => {
    return Promise.reject(error)
  },
)

export default function<T>(config: AxiosRequestConfig, requestOptions?: RequestOptions) {
  if (requestOptions) {
    const { isEncrypt } = requestOptions

    if (isEncrypt && (config.method === 'post' || config.method === 'put')) {
      // 加密数据
      const { encryptedAesKey, AES } = useMixedEncrypt()
      // 请求头中携带经过 RSA 加密的 AES 密钥
      config.headers = config.headers || {}
      Object.assign(config.headers, {
        'encrypt-key': encryptedAesKey,
      })

      config.data = typeof config.data === 'object' ? AES(JSON.stringify(config.data)) : AES(config.data)
    }
  }

  return axiosInstance.request<any, T>(config)
}
