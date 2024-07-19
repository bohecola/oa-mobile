import type { ProxyOptions } from 'vite'

type ProxyEnvItem = [string, string]

type ProxyEnvList = ProxyEnvItem[]

const httpsRE = /^https:\/\//

export function createProxy(list: ProxyEnvList) {
  const proxy: Record<string, ProxyOptions> = {}
  for (const [prefix, target] of list) {
    const isHttps = httpsRE.test(target)

    proxy[prefix] = {
      target,
      changeOrigin: true,
      rewrite: path => path.replace(new RegExp(`^${prefix}`), ''),
      // https is require secure=false
      // 如果您secure="true"只允许来自 HTTPS 的请求，则secure="false"意味着允许来自 HTTP 和 HTTPS 的请求。
      ...(isHttps ? { secure: false } : {}),
    }
  }

  return proxy
}
