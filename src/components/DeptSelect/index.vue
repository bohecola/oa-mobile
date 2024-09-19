<template>
  <van-skeleton :loading="isLoading" animated class="h-6 flex items-center">
    <template #template>
      <van-skeleton-paragraph class="!h-[60%]" />
    </template>
    <template #default>
      <div v-if="readonly">
        {{ detail?.deptName }}
      </div>
      <!-- <el-tree-select
        v-else
        v-model="id"
        :data="data"
        :render-after-expand="false"
        :check-strictly="true"
        :filter-node-method="filterNodeMethod"
        :placeholder="placeholder"
        node-key="id"
        value-key="id"
        filterable
        clearable
        @change="onChange"
      /> -->
    </template>
  </van-skeleton>
</template>

<script setup lang="ts">
import { getDept } from '@/api/system/dept'
import type { DeptVO } from '@/api/system/dept/types'
import type { DeptTreeOption } from '@/api/system/role/types'
import { deptTreeSelect } from '@/api/system/user'

const props = withDefaults(
  defineProps<{
    modelValue?: string | number
    placeholder?: string
    readonly?: boolean
  }>(),
  {
    modelValue: undefined,
    placeholder: '请选择部门',
    readonly: false,
  },
)

const emit = defineEmits(['update:modelValue', 'change'])

// 节点数据加载状态
const isLoading = ref(false)

// 部门 id
const id = ref(props.modelValue)

// 只读回显
const detail = asyncComputed(async () => {
  const obj = {} as DeptVO
  if (props.readonly) {
    if (props.modelValue) {
      const { data } = await getDept(props.modelValue)
      Object.assign(obj, data)
    }
  }
  return obj
})

// 节点数据
const data = ref<DeptVO[]>([])

// 筛选函数
const filterNodeMethod = (value: string, data: DeptTreeOption) => data.label.includes(value)

// 获取部门数据
async function getData() {
  isLoading.value = true
  const res = await deptTreeSelect().finally(() => (isLoading.value = false))
  data.value = res.data
}

// change 事件
function onChange(value: string | number) {
  emit('update:modelValue', value)
  emit('change', value)
}

watch(
  () => props.modelValue,
  (val) => {
    id.value = val
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
})
</script>
