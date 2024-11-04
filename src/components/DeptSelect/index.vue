<template>
  <van-skeleton :loading="isLoading" animated class="h-6 flex items-center">
    <template #template>
      <van-skeleton-paragraph class="!h-[60%]" />
    </template>
    <template #default>
      <div v-if="readonly">
        {{ selectedLabel }}
      </div>
      <!-- <el-tree-select
        v-show="!readonly"
        ref="TreeSelectRef"
        v-model="ids"
        :data="data"
        :render-after-expand="false"
        :check-strictly="multiple ? false : true"
        :filter-node-method="filterNodeMethod"
        :placeholder="placeholder"
        :clearable="clearable"
        :multiple="multiple"
        node-key="id"
        value-key="id"
        filterable
        @change="onChange"
      /> -->
    </template>
  </van-skeleton>
</template>

<script setup lang="ts">
import { isArray, isEmpty } from 'lodash-es'
import type { DeptTreeOption } from '@/api/system/role/types'
import { deptTreeSelect } from '@/api/system/user'
import { treeToArray } from '@/utils'

type DeptTreeSelectValue = string | number | (string | number)[]

const props = withDefaults(
  defineProps<{
    modelValue?: string | number
    placeholder?: string
    readonly?: boolean
    clearable?: boolean
    multiple?: boolean
  }>(),
  {
    placeholder: '请选择部门',
  },
)

const emit = defineEmits(['update:modelValue', 'change'])

// 节点数据加载状态
const isLoading = ref(false)

const ids = ref<DeptTreeSelectValue>(deserialize(props.modelValue))

// 节点数据
const data = ref([])

// 选中文字
const selectedLabel = computed(() => {
  if (props.modelValue) {
    const dataArr = treeToArray<DeptTreeOption>(data.value)
    const nodes = dataArr.filter(e => (isArray(ids.value) ? ids.value.includes(e.id) : e.id === ids.value))

    return nodes.map(e => e.label).join('、')
  }
  return ''
})

// 筛选函数
const filterNodeMethod = (value: string, data: DeptTreeOption) => data.label.includes(value)

// 获取部门数据
async function getData() {
  isLoading.value = true
  const res = await deptTreeSelect().finally(() => (isLoading.value = false))
  data.value = res.data
}

// change 事件
function onChange(value: (string | number) | (string | number)[]) {
  const payload = serialize(value)

  emit('update:modelValue', payload)
  emit('change', payload)
}

function serialize(value: DeptTreeSelectValue) {
  if (!isEmpty(value)) {
    if (props.multiple) {
      return (value as (string | number)[]).join(',')
    }
    else {
      return value as string | number
    }
  }
  else {
    return undefined
  }
}

function deserialize(value: string | number) {
  if (value) {
    if (props.multiple) {
      // 兼容 id 为 100、101 这种 number 类型的情况
      return (value as string).split(',').map(e => (e.length < 19 ? Number(e) : e))
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

onMounted(() => {
  if (!props.readonly) {
    getData()
  }
})

defineExpose({
  isLoading,
  data,
  selectedLabel,
})
</script>
