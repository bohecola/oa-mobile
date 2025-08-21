import type { ClassValue } from 'clsx'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { isNumber } from 'lodash-es'
import storage from './storage'
import model from '@/plugins/modal'

export type ObjectValues<T> = T[keyof T]

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

// 是否为数值
export function isNumeric(value?: any) {
  if (value === '' || value === null || value === undefined) {
    return false
  }

  return isNumber(value) || (!Number.isNaN(Number(value)) && Number.isFinite(Number(value)))
}

//  是否是为 JSON 字符串
export function isJSON(str: string) {
  if (typeof str !== 'string')
    return false
  try {
    const parsed = JSON.parse(str)
    return typeof parsed === 'object' && parsed !== null
  }

  // eslint-disable-next-line unused-imports/no-unused-vars
  catch (err: any) {
    console.warn(`${str} 不是有效JSON字符串`)

    return false
  }
}

export * from './tree'

export function transformYnToBoolean(value: string) {
  return value === 'Y'
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// 重试
export async function retry<T>(fn: () => Promise<T>, maxRetries: number, delay: number = 1000) {
  let lastError: any

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn()
    }
    catch (error: any) {
      lastError = error
      // 提示
      model.loading(`正在重新尝试，剩余 ${maxRetries - i} 次，请稍后...`)
      // 延时后执行重试
      await new Promise(resolve => setTimeout(resolve, delay))
    }
  }

  throw lastError
}

export { storage }
