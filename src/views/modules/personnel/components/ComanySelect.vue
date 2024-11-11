<template>
  <van-skeleton :loading="isLoading" animated class="h-8 flex items-center">
    <template #template>
      <van-skeleton-paragraph variant="rect" class="!h-[60%]" />
    </template>
    <template #default>
      <div v-if="readonly">
        {{ selectedLabel }}
      </div>
      <!-- <el-select v-else v-model="id" :placeholder="placeholder" :multiple="multiple" clearable @change="onChange">
        <el-option v-for="item in data" :key="item.deptId" :label="item.deptName" :value="item.deptId" />
      </el-select> -->
    </template>
  </van-skeleton>
</template>

<script setup lang="ts">
// import { isArray, isEmpty } from 'lodash-es'
import { isEmpty, isNumber } from 'lodash-es'
import { getCompany } from '@/api/oa/personnel/userContract'
import type { DeptVO } from '@/api/system/dept/types'

const props = withDefaults(
  defineProps<{
    modelValue?: string | number
    placeholder?: string
    readonly?: boolean
    multiple?: boolean
  }>(),
  {
    modelValue: undefined,
    placeholder: '请选择劳动归属公司',
    readonly: false,
    multiple: false,
  },
)

const emit = defineEmits(['update:modelValue', 'change'])

type CompanySelectValue = string | number | (string | number)[]

const id = ref<CompanySelectValue>(deserialize(props.modelValue))

// 节点数据加载状态
const isLoading = ref(false)

// 获取数据
const data = ref<DeptVO[]>([])

async function getData() {
  isLoading.value = true
  const res = await getCompany('0')
  data.value = res.data
  isLoading.value = false
}

const selectedLabel = computed(() => {
  if (props.modelValue) {
    const companyNames = data.value.filter(item => item.deptId === id.value)
    return companyNames.map(e => e.deptName).join('、')
  }
  return ''
})

function onChange(value: (string | number) | (string | number)[]) {
  const payload = serialize(value)
  emit('update:modelValue', value)
  emit('change', value)
}

function serialize(value: CompanySelectValue) {
  // isEmpty(value) 如果value是数字返回的是true,数字的可迭代长度为0
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
    // 返回的id是100,101
    return (value as string).length < 19 ? Number(value) : value
  }
  else {
    return undefined
  }
}

watch(
  () => props.modelValue,
  (val) => {
    id.value = deserialize(val)
  },
)

onMounted(() => {
  getData()
})

defineExpose({
  isLoading,
  data,
})
</script>
