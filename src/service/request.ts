import axios from 'axios'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import type { Result } from './types'
import { useGlobSetting } from '@/hooks/settings'

const globSetting = useGlobSetting()

const axiosInstance = axios.create({
  baseURL: `${globSetting.apiUrl}${globSetting.apiUrlPrefix}`,
  timeout: 5 * 1000,
})

axiosInstance.interceptors.request.use(
  (config) => {
    config.headers.Clientid = globSetting.appClientId

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

export default function<T>(config: AxiosRequestConfig) {
  return axiosInstance.request<any, T>(config)
}
