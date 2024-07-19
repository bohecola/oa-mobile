import axios from 'axios'
import { useGlobSetting } from '@/hooks/settings'

const globSetting = useGlobSetting()

const axiosInstance = axios.create({
  baseURL: `${globSetting.apiUrl}${globSetting.apiUrlPrefix}`,
  timeout: 5 * 1000,
})

axiosInstance.interceptors.request.use(
  (config) => {
    return config
  },

  (error) => {
    return Promise.reject(error)
  },
)

axiosInstance.interceptors.response.use(
  (res) => {
    return res
  },

  (error) => {
    return Promise.reject(error)
  },
)

export default axiosInstance
