// 解析环境变量为对应的 JS 数据类型
export function parseEnv(env: Recordable): ViteEnv {
  const ret: any = {}

  for (const key of Object.keys(env)) {
    let value = env[key]
    value = value === 'true' ? true : value === 'false' ? false : value

    if (key === 'VITE_PORT') {
      value = Number(value)
    }

    if (key === 'VITE_PROXY') {
      try {
        value = JSON.parse(value)
      }
      catch {}
    }
    ret[key] = value
  }

  return ret
}
