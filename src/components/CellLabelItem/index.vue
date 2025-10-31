<template>
  <div
    :class="[
      { flex: descriptor.type === 'dict' },
      { hidden: isNil(item[key]) },
    ]"
  >
    <!-- 文本 -->
    <template v-if="descriptor.type === 'plain'">
      {{ descriptor.text }}：{{ item[key] }}
    </template>

    <!-- 金额 -->
    <template v-else-if="descriptor.type === 'amount'">
      {{ descriptor.text }}：{{ formatCurrency(item[key]) }}
    </template>

    <!-- 字典 -->
    <template v-else-if="descriptor.type === 'dict'">
      {{ descriptor.text }}：<dict-tag
        :options="isFunction(descriptor.options)
          ? descriptor.options(item)
          : descriptor.options.value"
        :value="item[key]"
      />
    </template>

    <!-- 时间 -->
    <template v-else-if="descriptor.type === 'time'">
      {{ descriptor.text }}：{{ parseTime(item[key], '{y}-{m}-{d}') }}
    </template>
  </div>
</template>

<script setup lang='ts'>
import { isFunction, isNil } from 'lodash-es'

const props = defineProps<{
  descriptor: LabelDescriptor
  item: any
}>()

const key = computed(() => {
  const { descriptor, item } = props
  return isFunction(descriptor.key)
    ? descriptor.key(item)
    : descriptor.key
})
</script>
