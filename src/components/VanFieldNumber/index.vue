<script setup lang="ts">
import Big from 'big.js'
import { FinanceEnum } from '@/enums/FinanceEnum'

defineProps<{
  allowNegative?: boolean
}>()

const attrs = useAttrs()
const slots = useSlots()

function formatter(value: string) {
  // 1. 去除所有非数字、非小数点、非负号的字符
  value = value.replace(/[^\d.-]/g, '')

  // 2. 处理负号：只保留第一个负号且必须在首位
  const isNegative = value.startsWith('-')
  value = value.replace(/-/g, '')
  if (isNegative) {
    value = `-${value}`
  }

  // 3. 移除开头的小数点（不允许以 . 开头）
  if (value.startsWith('-.')) {
    value = `-0.${value.slice(2)}`
  }
  else if (value.startsWith('.')) {
    value = `0.${value.slice(1)}`
  }

  // 4. 保留第一个小数点，去除后续的小数点
  const firstDotIndex = value.indexOf('.')
  if (firstDotIndex !== -1) {
    value = value.slice(0, firstDotIndex + 1)
      + value.slice(firstDotIndex + 1).replace(/\./g, '')
  }

  // 5. 限制小数点后最多两位
  if (value.includes('.')) {
    const [integer, decimal] = value.split('.')
    value = `${integer}.${decimal.slice(0, 2)}`
  }

  return value
}
</script>

<template>
  <van-field
    type="number"
    placeholder="请输入"
    :min="Big(allowNegative ? FinanceEnum.MIN_AMOUNT_STRING : 0).toNumber()"
    :max="Big(FinanceEnum.MAX_AMOUNT_STRING).toNumber()"
    :formatter="formatter"
    v-bind="attrs"
  >
    <template v-for="(_, name) in slots" #[name]="scope" :key="name">
      <slot v-bind="scope" :key="name" :name="name" />
    </template>
  </van-field>
</template>
