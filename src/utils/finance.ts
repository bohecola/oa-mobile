import type { CurrencyObjectOptions } from '@automattic/format-currency'
import { formatCurrency } from '@automattic/format-currency'
import nzh from 'nzh'

// 金额格式化
export function formatCurrencyUtil(amount: number, options: CurrencyObjectOptions = {}) {
  const defaultOptions: CurrencyObjectOptions = { precision: 2 }
  return formatCurrency(amount, 'CNY', { ...defaultOptions, ...options }).replace('¥', '')
}

// 金额转中文大写
export function toCnMoney(amount: number | string) {
  return nzh.cn.toMoney(amount, { outSymbol: false })
}
