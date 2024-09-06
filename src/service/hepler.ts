import type { AxiosRequestConfig, Canceler } from 'axios'
import { showFailToast } from 'vant'
import axios from 'axios'
import qs from 'qs'

// 生成请求 hash
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
export function useRequstCanceller() {
  const requestCancelMap = new Map<string, Canceler>()

  function addRequestCancel(config: AxiosRequestConfig) {
    // 取消上次重复的请求
    removeRequestCancel(config)
    // 生成 hash
    const reqHash = hash(config)
    // 配置 cancelToken，并存储 cancel 方法
    config.cancelToken
      ??= new axios.CancelToken((cancel) => {
        if (!requestCancelMap.has(reqHash)) {
          // 加入 requestCancelMap
          requestCancelMap.set(reqHash, cancel)
        }
      })
  }

  function removeRequestCancel(config: AxiosRequestConfig) {
    const reqHash = hash(config)

    if (requestCancelMap.has(reqHash)) {
      requestCancelMap.get(reqHash)?.()
      requestCancelMap.delete(reqHash)
    }
  }

  return {
    requestCancelMap,
    addRequestCancel,
    removeRequestCancel,
  }
}

// HTTP 响应状态码检查
export function checkStatus(status: number, msg: string): void {
  switch (status) {
    case 400:
      showFailToast(msg)
      break
    // 401: 未登录
    // 未登录则跳转登录页面，并携带当前页面的路径
    // 在登录成功后返回当前页面，这一步需要在登录页操作。
    case 401:
      showFailToast('用户没有权限（令牌、用户名、密码错误）!')
      break
    case 403:
      showFailToast('用户得到授权，但是访问是被禁止的。!')
      break
    // 404请求不存在
    case 404:
      showFailToast('网络请求错误，未找到该资源!')
      break
    case 405:
      showFailToast('网络请求错误，请求方法未允许!')
      break
    case 408:
      showFailToast('网络请求超时')
      break
    case 500:
      showFailToast('服务器错误,请联系管理员!')
      break
    case 501:
      showFailToast('网络未实现')
      break
    case 502:
      showFailToast('网络错误')
      break
    case 503:
      showFailToast('服务不可用，服务器暂时过载或维护!')
      break
    case 504:
      showFailToast('网络超时')
      break
    case 505:
      showFailToast('http版本不支持该请求!')
      break
    default:
      showFailToast(msg)
  }
}
