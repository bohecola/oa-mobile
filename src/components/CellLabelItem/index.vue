<template>
  <div
    :class="[
      { flex: descriptor.type === 'dict' },
      { hidden: isNil(item[descriptor.key]) },
    ]"
  >
    <!-- 文本 -->
    <template v-if="descriptor.type === 'plain'">
      {{ descriptor.text }}：{{ item[descriptor.key] }}
    </template>

    <!-- 金额 -->
    <template v-if="descriptor.type === 'amount'">
      {{ descriptor.text }}：{{ formatCurrency(item[descriptor.key]) }}
    </template>

    <!-- 字典 -->
    <template v-else-if="descriptor.type === 'dict'">
      {{ descriptor.text }}：<dict-tag
        :options="isFunction(descriptor.options)
          ? descriptor.options(item)
          : descriptor.options.value"
        :value="item[descriptor.key]"
      />
    </template>

    <!-- 时间 -->
    <template v-else-if="descriptor.type === 'time'">
      {{ descriptor.text }}：{{ parseTime(item[descriptor.key], '{y}-{m}-{d}') }}
    </template>
  </div>
</template>

<script setup lang='ts'>
import { isFunction, isNil } from 'lodash-es'

defineProps<{
  descriptor: LabelDescriptor
  item: any
}>()
</script>
