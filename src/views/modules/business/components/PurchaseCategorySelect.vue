<template>
  <van-skeleton :loading="isLoading" animated class="w-full h-8 flex items-center">
    <template #template>
      <van-skeleton-paragraph variant="rect" class="!h-[60%] min-w-[180px]" />
    </template>
    <template #default>
      <div v-if="readonly" class="flex gap-2 flex-wrap">
        <div v-for="(label, index) in selectedLabels" :key="index" class="mr-1">
          <span>{{ label }}</span>
          <span v-if="index !== selectedLabels.length - 1">{{ '，' }}</span>
        </div>
      </div>
      <!-- <el-tree-select
        v-if="component === 'tree-select'"
        v-show="!readonly"
        v-model="ids"
        node-key="uuid"
        value-key="id"
        placeholder="选择预算科目"
        :data="treeData"
        :render-after-expand="false"
        :props="{
          value: 'id',
          label: 'sciName',
          children: 'children'
        }"
        :multiple="multiple"
        :disabled="disabled"
        clearable
        @change="onChange"
      >
        <template #default="{ data: { sciName, treeType, availableAmount } }">
          <span>{{ sciName }}</span>
          <span v-if="treeType === 'item'" style="color: gray">（{{ formatCurrency(availableAmount) }}）</span>
        </template>
      </el-tree-select>

      <div v-if="component === 'cascader'" v-show="!readonly" class="w-full">
        <el-cascader
          ref="CascaderRef"
          v-model="ids"
          class="w-full"
          placeholder="请选择预算科目"
          :options="treeData"
          :props="{
            emitPath: false,
            value: 'id',
            label: 'sciName',
            children: 'children',
            multiple
          }"
          :disabled="disabled"
          clearable
          @change="onChange"
        >
          <template #default="{ data: { sciName, treeType, availableAmount } }">
            <span>{{ sciName }}</span>
            <span v-if="treeType === 'item'" style="color: gray">（{{ formatCurrency(availableAmount) }}）</span>
          </template>
        </el-cascader>
      </div> -->
    </template>
  </van-skeleton>
</template>

<script setup lang="ts">
import Big from 'big.js'
import { isArray, isEmpty, isNil, isNumber } from 'lodash-es'
import { getItemTreeByPsIdAndApplyDeptId } from '@/api/oa/finance/projectSubject'
import type { ProjectSubjectItemTreeVO } from '@/api/oa/finance/projectSubject/types'
import { findPathNodes } from '@/utils'

type PurchaseCategorySelectValue = string | number | (string | number)[]

const props = withDefaults(
  defineProps<{
    modelValue?: string | number
    multiple?: boolean
    readonly?: boolean
    disabled?: boolean
    component?: 'tree-select' | 'cascader'
    params: {
      psId: string
      applyDeptId: string | number
    }
  }>(),
  {
    multiple: false,
    component: 'tree-select',
  },
)

const emit = defineEmits([
  'update:modelValue',
  'update:deptId',
  'update:amount',
  'update:applyingAmount',
  'update:finishAmount',
  'update:availableAmount',
  'change',
])

// 实例
const { proxy } = getCurrentInstance() as ComponentInternalInstance

// const CascaderRef = ref<ElCascaderInstance>()

const ids = ref<PurchaseCategorySelectValue>(deserialize(props.modelValue))

const isLoading = ref(false)
const rawData = ref<ProjectSubjectItemTreeVO[]>([])
const treeData = computed(() => proxy?.handleTree<ProjectSubjectItemTreeVO>(rawData.value, 'uuid'))

// 选中项的 labels 集合
const selectedLabels = computed(() => {
  if (props.modelValue && !isEmpty(rawData.value)) {
    // 选中的预算科目项 id 集合
    const idsArr = isArray(ids.value) ? ids.value : !isNil(ids.value) ? [ids.value] : []
    // 选中的预算科目项的 pathNodes
    const pathNodesArr = idsArr.reduce<ProjectSubjectItemTreeVO[][]>((prev, curr) => {
      const nodes = findPathNodes(treeData.value, curr)
      prev.push(nodes)
      return prev
    }, [])

    return pathNodesArr.map(e => e.map(item => item.sciName).join(' / '))
  }
  return ''
})

function serialize(value: PurchaseCategorySelectValue) {
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
  if (!isNil(value)) {
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

function onChange(value?: PurchaseCategorySelectValue) {
  const payload = serialize(value)

  emit('update:modelValue', payload)
  emit('change', payload)

  if (!props.multiple) {
    const item = rawData.value.find(e => e.id === value)
    emit('update:deptId', item?.deptId)
  }

  updateVars(value)
}

function updateVars(value: PurchaseCategorySelectValue) {
  // 选中的预算科目项 id 集合
  const idsArr = isArray(value) ? value : !isNil(value) ? [value] : []
  // 选中的预算科目项
  const items = !isEmpty(value) ? rawData.value.filter(item => idsArr.includes(item.id as string)) : []

  // 预算金额总和
  const amount = items.reduce((prev, curr) => {
    if (!isNil(curr.amount) && (curr.amount as any) !== '') {
      return prev.add(Big(curr.amount))
    }

    return prev.add(0)
  }, new Big(0))

  // 申请中金额总和
  const applyingAmount = items.reduce((prev, curr) => {
    if (!isNil(curr.applyingAmount) && (curr.applyingAmount as any) !== '') {
      return prev.add(Big(curr.applyingAmount))
    }

    return prev.add(0)
  }, new Big(0))

  // 已申请金额总和
  const finishAmount = items.reduce((prev, curr) => {
    if (!isNil(curr.finishAmount) && (curr.finishAmount as any) !== '') {
      return prev.add(Big(curr.finishAmount))
    }

    return prev.add(0)
  }, new Big(0))

  // 剩余金额总和
  const availableAmount = items.reduce((prev, curr) => {
    if (!isNil(curr.availableAmount) && (curr.availableAmount as any) !== '') {
      return prev.add(Big(curr.availableAmount))
    }

    return prev.add(0)
  }, new Big(0))

  // 预算金额
  emit('update:amount', amount.toNumber())
  // 申请中金额
  emit('update:applyingAmount', applyingAmount.toNumber())
  // 已申请金额
  emit('update:finishAmount', finishAmount.toNumber())
  // 剩余金额
  emit('update:availableAmount', availableAmount.toNumber())
}

async function getTree() {
  if (props.params) {
    if (isEmpty(props.params.psId)) {
      rawData.value = []
      return
    }

    isLoading.value = true
    const { data } = (await getItemTreeByPsIdAndApplyDeptId(props.params).finally(() => (isLoading.value = false))) ?? {}
    rawData.value = data ?? []
  }
}

watch(
  () => props.modelValue,
  (val) => {
    ids.value = deserialize(val)
  },
)

// 查询参数变化
watch(
  () => props.params,
  async () => {
    await getTree()
    if (!isNil(props.modelValue)) {
      updateVars(ids.value)
    }
  },
  {
    immediate: true,
  },
)
</script>
