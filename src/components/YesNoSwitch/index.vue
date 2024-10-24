<template>
  <dict-tag v-if="readonly" :options="sys_yes_no" :value="switchValue" />
  <van-switch v-else v-model="switchValue" active-value="Y" inactive-value="N" @change="onChange" />
</template>

<script setup lang="ts">
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

const emit = defineEmits(['update:modelValue'])

const { proxy } = getCurrentInstance() as ComponentInternalInstance

const { sys_yes_no } = toRefs(proxy.useDict('sys_yes_no'))

const switchValue = ref<string>(props.modelValue)

function onChange(value: string) {
  emit('update:modelValue', value)
}

watch(
  () => props.modelValue,
  (val) => {
    switchValue.value = val
  },
)
</script>
