<script setup lang="ts">
import Big from 'big.js'
import { FinanceEnum } from '@/enums/FinanceEnum'

const attrs = useAttrs()
const slots = useSlots()

function formatter(value: string) {
  // 1. 去除所有非数字和小数点的字符
  value = value.replace(/[^\d.]/g, '')

  // 2. 如果首位为小数点，则去除首位的小数点
  if (value.startsWith('.')) {
    value = value.slice(1)
  }

  // 3. 保留第一个小数点，去除后续的小数点
  const firstDotIndex = value.indexOf('.')
  if (firstDotIndex !== -1) {
    value = value.slice(0, firstDotIndex + 1)
      + value.slice(firstDotIndex + 1).replace(/\./g, '')
  }

  // 4. 如果存在小数点，限制小数点后最多两位
  if (value.includes('.')) {
    const parts = value.split('.')
    parts[1] = parts[1].slice(0, 2)
    value = `${parts[0]}.${parts[1]}`
  }

  return value
}
</script>

<template>
  <van-field
    type="number"
    inputmode="decimal"
    placeholder="请输入"
    :min="0"
    :max="Big(FinanceEnum.MAX_AMOUNT_STRING).toNumber()"
    :formatter="formatter"
    v-bind="attrs"
  >
    <template v-for="(_, name) in slots" #[name]="scope" :key="name">
      <slot v-bind="scope" :key="name" :name="name" />
    </template>
  </van-field>
</template>
