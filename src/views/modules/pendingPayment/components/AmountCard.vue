<template>
  <div
    class="
      py-2 px-3
      rounded border
      shadow-sm
      bg-[--bg-card]
    "
  >
    <div class="text-sm pb-2 border-b">
      {{ label }}
    </div>

    <div :class="cn('mt-2', valueClass)">
      <span v-if="!isNil(value)" class="font-bold mr-1">{{ formatCurrency(Number(value)) }}</span>
      <span class="text-xs">万</span>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { isNil } from 'lodash-es'
import { cn } from '@/utils'

defineProps<{
  label: string
  value?: string | number
  valueClass?: string
}>()
</script>
