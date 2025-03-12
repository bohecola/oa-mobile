<template>
  <dict-tag v-if="readonly" :options="sys_yes_no" :value="switchValue" />
  <van-switch v-else v-model="switchValue" active-value="Y" inactive-value="N" @change="onChange" />
</template>

<script setup lang="ts">
import { isNil } from 'lodash-es'
import { useCustomFieldValue } from '@vant/use'

const props = withDefaults(
  defineProps<{
    modelValue?: string
    readonly?: boolean
  }>(),
  {
    modelValue: undefined,
    readonly: false,
  },
)

const emit = defineEmits(['update:modelValue', 'change'])

const { proxy } = getCurrentInstance() as ComponentInternalInstance

const { sys_yes_no } = toRefs(props.readonly ? proxy.useDict('sys_yes_no') : {})

const switchValue = ref<string>(props.modelValue ?? 'N')

useCustomFieldValue(() => switchValue.value)

function onChange(value: string) {
  emit('update:modelValue', value)
  emit('change', value)
}

watch(
  () => props.modelValue,
  (val) => {
    if (isNil(val)) {
      switchValue.value = 'N'
      emit('update:modelValue', 'N')
    }
    else {
      switchValue.value = val
    }
  },
  {
    immediate: true,
  },
)
</script>
