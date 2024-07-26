import type { AxiosRequestConfig, Canceler } from 'axios'
import axios from 'axios'
import qs from 'qs'

// 生产请求 hash
function hash(config: AxiosRequestConfig) {
  const meta = [
    config.method,
    config.url,
    qs.stringify(config.data),
    qs.stringify(config.params),
  ]
  return meta.join('&')
}

// 配置 Axios cancelToken
export function useCanceler() {
  const pendingMap = new Map<string, Canceler>()

  function addPending(config: AxiosRequestConfig) {
    // 取消上次重复的请求
    removePending(config)
    // 生成 hash
    const reqHash = hash(config)
    // 配置 cancelToken，并存储 cancel 方法
    config.cancelToken
      ??= new axios.CancelToken((cancel) => {
        if (!pendingMap.has(reqHash)) {
          // 加入 pendingMap
          pendingMap.set(reqHash, cancel)
        }
      })
  }

  function removePending(config: AxiosRequestConfig) {
    const reqHash = hash(config)

    if (pendingMap.has(reqHash)) {
      pendingMap.get(reqHash)?.()
      pendingMap.delete(reqHash)
    }
  }

  return {
    pendingMap,
    addPending,
    removePending,
  }
}
