<template>
  <span :class="[{ 'text-red-500': negativeHighlight && lt(value, 0) }]">
    {{ formatCurrency ? formatCurrency(value, currencyOptions) : value }}
    <span v-if="unit">{{ unit }}</span>
  </span>
</template>

<script setup lang="ts">
import type { CurrencyObjectOptions } from '@automattic/format-currency'
import { lt } from 'lodash-es'

defineProps<{
  value: number
  currencyFormat?: boolean
  negativeHighlight?: boolean
  currencyOptions?: CurrencyObjectOptions
  unit?: string
}>()
</script>
