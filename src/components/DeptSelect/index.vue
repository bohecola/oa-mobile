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
import { isArray, isEmpty, isNil, isNumber } from 'lodash-es'
import { listDept } from '@/api/system/dept'
import type { DeptQuery, DeptVO } from '@/api/system/dept/types'

type DeptTreeSelectValue = string | number | (string | number)[]
type _DeptVO = DeptVO & { id: DeptVO['deptId'], label: DeptVO['deptName'], disabled?: boolean }

interface DataConfig {
  disabledKey: string
  disabledValue: string
  enabled: boolean
}

const props = withDefaults(
  defineProps<{
    modelValue?: string | number
    placeholder?: string
    readonly?: boolean
    clearable?: boolean
    multiple?: boolean
    withDefaultRootNode?: boolean
    defaultExpandedKeys?: Array<string | number>
    dataConfig?: DataConfig
    params?: Partial<DeptQuery>
  }>(),
  {
    placeholder: '请选择',
    withDefaultRootNode: false,
    defaultExpandedKeys: () => [0],
  },
)

const emit = defineEmits(['update:modelValue', 'update:value', 'change', 'nodeClick'])

// 实例
const { proxy } = getCurrentInstance() as ComponentInternalInstance

// 节点数据加载状态
const isLoading = ref(false)

const ids = ref<DeptTreeSelectValue>(deserialize(props.modelValue))

// 原始数据
const rawData = ref<_DeptVO[]>([])

// 参数
const queryParams: DeptQuery = reactive({
  pageNum: 1,
  pageSize: 10,
  deptName: undefined,
  deptCategory: undefined,
  status: '0',
  type: undefined,
})

const treeData = computed(() => {
  const dataConfig = props.dataConfig
  const raw = rawData.value

  const data = dataConfig
    ? raw.map(e => ({
      ...e,
      disabled: e[dataConfig.disabledKey] === dataConfig.disabledValue ? dataConfig.enabled : e.disabled,
    }))
    : raw

  const options = proxy?.handleTree<_DeptVO>(data)
  if (props.withDefaultRootNode) {
    return [{ label: '根节点', id: 0, children: options }]
  }
  return options
})

// 选中文字
const selectedLabel = computed(() => {
  if (props.modelValue) {
    const nodes = rawData.value.filter(e => (isArray(ids.value) ? ids.value.includes(e.id) : e.id === ids.value))

    return nodes.map(e => e.label).join('、')
  }
  return ''
})

// 筛选函数
const filterNodeMethod = (value: string, data: _DeptVO) => data.label.includes(value)

// 获取部门数据
async function getData() {
  isLoading.value = true

  if (props.readonly) {
    queryParams.status = undefined // 回显时示全部状态的部门
  }

  if (!isNil(props.params)) {
    Object.assign(queryParams, props.params)
  }

  const { data } = await listDept(queryParams).finally(() => (isLoading.value = false))
  rawData.value = data.map((e) => {
    return {
      ...e,
      id: !isNil(e.deptId) ? String(e.deptId) : e.deptId,
      label: e.deptName,
    }
  })
}

// change 事件
function onChange(value: string | string[]) {
  const payload = serialize(value)

  emit('update:modelValue', payload)
  emit('change', payload)

  emit('update:value', payload)
}

// node-click 事件
function nodeClick(deptVO: _DeptVO) {
  emit('nodeClick', deptVO)
}

function serialize(value: DeptTreeSelectValue) {
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

function deserialize(value: string | number) {
  if (!isNil(value)) {
    value = isNumber(value) ? String(value) : value
    if (props.multiple) {
      return (value as string).split(',').map(e => e)
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
  getData()
})

defineExpose({
  isLoading,
  data: treeData,
  selectedLabel,
})
</script>
