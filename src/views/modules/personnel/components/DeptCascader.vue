<template>
  <van-skeleton :loading="isLoading" animated class="h-8 flex items-center">
    <template #template>
      <van-skeleton-paragraph variant="rect" class="!h-[60%]" />
    </template>
    <template #default>
      <div v-if="readonly">
        {{ selectedLabel }}
      </div>
      <!-- <van-cascader
        v-else
        v-model="ids"
        :options="deptTree"
        :show-all-levels="false"
        :placeholder="placeholder"
        :props="{ value: 'deptId', label: 'deptName', emitPath, checkStrictly }"
        @change="onChange"
      /> -->
    </template>
  </van-skeleton>
</template>

<script setup lang="ts">
import { isArray, isEmpty, isNumber } from 'lodash-es'
import { getCompanyDept } from '@/api/oa/personnel/userTransfer'
import type { DeptVO, TreeVO } from '@/api/system/dept/types'

type DeptTreeCascaderValue = string | number | (string | number)[]

const props = withDefaults(
  defineProps<{
    modelValue?: string | number
    placeholder?: string
    readonly?: boolean
    clearable?: boolean
    multiple?: boolean
    companyId?: string | number
    emitPath?: boolean
    checkStrictly?: boolean
  }>(),
  {
    placeholder: '请选择部门',
  },
)

const emit = defineEmits(['update:modelValue', 'change'])

// 实例
const { proxy } = getCurrentInstance() as ComponentInternalInstance

// 节点数据加载状态
const isLoading = ref(false)

const ids = ref<DeptTreeCascaderValue>(deserialize(props.modelValue))

// 节点数据
const deptTree = ref([])
const data = ref<DeptVO[]>([])

// 获取部门数据
async function getData(companyId: string | number) {
  isLoading.value = true
  if (props.companyId) {
    const res = await getCompanyDept(companyId)
    data.value = res.data
    deptTree.value = proxy?.handleTree<TreeVO>(res.data, 'deptId', 'parentId')
  }
  else {
    deptTree.value = []
  }
  isLoading.value = false
}

// 选中文字
const selectedLabel = computed(() => {
  if (props.modelValue) {
    const nodes = data.value.filter(e => (isArray(ids.value) ? ids.value.includes(e.deptId) : e.deptId === ids.value))

    return nodes.map(e => e.deptName).join('、')
  }
  return ''
})

// change 事件
function onChange(value: (string | number) | (string | number)[]) {
  const payload = serialize(value)

  emit('update:modelValue', payload)
  emit('change', payload)
}

function serialize(value: DeptTreeCascaderValue) {
  if (!isEmpty(value) || isNumber(value)) {
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
watch(
  () => props.companyId,
  (val) => {
    getData(val)
  },
  {
    immediate: true,
  },
)

// onMounted(() => {
//   getData();
// });

defineExpose({
  isLoading,
  deptTree,
  selectedLabel,
})
</script>
