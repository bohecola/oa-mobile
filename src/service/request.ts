import axios from 'axios'

const {
  VITE_GLOB_API_URL,
  VITE_GLOB_API_URL_PREFIX,
} = import.meta.env

const axiosInstance = axios.create({
  baseURL: VITE_GLOB_API_URL + VITE_GLOB_API_URL_PREFIX,
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
