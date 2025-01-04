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

// 是否为负数
export function isNegative(value?: number | string): boolean {
  if (value === undefined || value === null) {
    // 如果是 null 或 undefined，直接返回 false
    return false
  }

  const number = typeof value === 'number' ? value : Number.parseFloat(value)

  // 确保转换后的值是有效数字
  return !Number.isNaN(number) && number < 0
}

export * from './tree'

export { storage }
