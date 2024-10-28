import storage from './storage'

// 获取文件扩展名
export function getFilenameExt(filename: string) {
  const ext = filename.split('.').pop()
  return ext?.toLowerCase() ?? ''
}

// 键名提取
export function filterTruthyKeys<T extends Record<string, any>>(obj: Partial<Record<keyof T, boolean>>) {
  return Object.keys(obj).filter(key => obj[key]) as (keyof T)[]
}

export * from './tree'

export { storage }
