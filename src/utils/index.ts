import storage from './storage'

// 键名提取
export function filterTruthyKeys<T extends Record<string, any>>(obj: Partial<Record<keyof T, boolean>>) {
  return Object.keys(obj).filter(key => obj[key]) as (keyof T)[]
}

export { storage }
