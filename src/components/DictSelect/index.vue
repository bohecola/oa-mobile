<template>
  <dict-tag v-if="readonly" :options="options" :value="ids" />
  <!-- <el-select v-else v-model="ids" :multiple="multiple" clearable @change="onChange">
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
  </el-select> -->
</template>

<script setup lang="ts">
import { isEmpty, isNil, isNumber } from 'lodash-es'

const props = withDefaults(
  defineProps<{
    modelValue?: string
    readonly?: boolean
    multiple?: boolean
    dictType: string
    options?: DictDataOption[]
    isFilterUseSeal?: boolean
    filterFn?: (value: DictDataOption, index: number, array: DictDataOption[]) => unknown
  }>(),
  {
    modelValue: undefined,
    readonly: false,
    multiple: false,
    isFilterUseSeal: true,
  },
)

const emit = defineEmits(['update:modelValue', 'change'])

const { proxy } = getCurrentInstance() as ComponentInternalInstance

const dictRefs = toRefs(proxy.useDict(props.dictType))

const options = computed(() => {
  if (!isNil(props.options)) {
    return props.options
  }
  // oa_seal_use_type 特殊处理
  if (props.isFilterUseSeal && props.dictType === 'oa_seal_use_type') {
    return dictRefs[props.dictType].value.filter(e => e.value !== '5')
  }

  if (!isNil(props.filterFn)) {
    return dictRefs[props.dictType].value.filter(props.filterFn)
  }
  return dictRefs[props.dictType].value
})
const ids = ref<string | string[]>(deserialize(props.modelValue)!)

function onChange(val: string | string[]) {
  const payload = serialize(val)

  emit('update:modelValue', payload)
  emit('change', payload)
}

function serialize(value?: string | string[]) {
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
