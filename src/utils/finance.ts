import type { CurrencyObjectOptions } from '@automattic/format-currency'
import { formatCurrency } from '@automattic/format-currency'
import { isNil } from 'lodash-es'
import nzh from 'nzh'

// 金额格式化
export function formatCurrencyUtil(amount: number, options: CurrencyObjectOptions = {}) {
  if (isNil(amount) || (amount as any) === '') {
    return amount
  }

  const defaultOptions: CurrencyObjectOptions = { precision: 2 }
  return formatCurrency(amount, 'CNY', { ...defaultOptions, ...options }).replace('¥', '')
}

// 金额转中文大写
export function toCnMoney(amount: number | string) {
  if (isNil(amount) || (amount as any) === '') {
    return amount
  }

  return nzh.cn.toMoney(amount, { outSymbol: false })
}
