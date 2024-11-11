<template>
  <dict-tag v-if="readonly" :options="options" :value="ids" />
  <!-- <el-select v-else v-model="ids" :multiple="multiple" clearable @change="onChange">
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
  </el-select> -->
</template>

<script setup lang="ts">
import { isEmpty, isNumber } from 'lodash-es'

const props = withDefaults(
  defineProps<{
    modelValue?: string
    readonly?: boolean
    multiple?: boolean
    dictType: string
  }>(),
  {
    modelValue: undefined,
    readonly: false,
    multiple: false,
  },
)

const emit = defineEmits(['update:modelValue', 'change'])

const { proxy } = getCurrentInstance() as ComponentInternalInstance

const dictRefs = toRefs(proxy.useDict(props.dictType))
const options = dictRefs[props.dictType]

const ids = ref<string | string[]>(deserialize(props.modelValue)!)

function onChange(val: string | string[]) {
  const payload = serialize(val)

  emit('update:modelValue', payload)
  emit('change', payload)
}

function serialize(value?: string | string[]) {
  // isEmpty(value) 如果value是数字返回的是true,数字的可迭代长度为0
  if (!isEmpty(value) || isNumber(value)) {
    if (props.multiple) {
      return (value as string[]).join(',')
    }
    else {
      return value as string
    }
  }
  else {
    return undefined
  }
}

function deserialize(value?: string) {
  if (value) {
    if (props.multiple) {
      return value.split(',')
    }
    else {
      return value
    }
  }
  else {
    return undefined
  }
}

watch(
  () => props.modelValue,
  (val) => {
    ids.value = deserialize(val)
  },
)
</script>
