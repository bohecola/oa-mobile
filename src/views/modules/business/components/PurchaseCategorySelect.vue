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
        v-if="component === 'tree-select'"
        v-show="!readonly"
        v-model="ids"
        style="min-width: 185px"
        node-key="uuid"
        value-key="id"
        placeholder="选择预算类别"
        :data="treeData"
        :render-after-expand="false"
        :props="{
          value: 'id',
          label: 'sciName',
          children: 'children',
        }"
        :multiple="multiple"
        :disabled="disabled"
        clearable
        @change="onChange"
      >
        <template #default="{ data: { sciName, treeType, availableAmount } }">
          <span>{{ sciName }}</span>
          <span v-if="treeType === 'item'" style="color: gray">（{{ availableAmount }}）</span>
        </template>
      </el-tree-select>

      <div v-if="component === 'cascader'" v-show="!readonly" class="w-full">
        <el-cascader
          ref="CascaderRef"
          v-model="ids"
          class="w-full"
          placeholder="请选择预算类别"
          :options="treeData"
          :props="{
            emitPath: false,
            value: 'id',
            label: 'sciName',
            children: 'children',
            multiple,
          }"
          :disabled="disabled"
          clearable
          @change="onChange"
        >
          <template #default="{ data: { sciName, treeType, availableAmount } }">
            <span>{{ sciName }}</span>
            <span v-if="treeType === 'item'" style="color: gray">（{{ availableAmount }}）</span>
          </template>
        </el-cascader>
      </div> -->
    </template>
  </van-skeleton>
</template>

<script setup lang="ts">
import { isArray, isEmpty, isNil, isNumber } from 'lodash-es'
import { getItemByPsIdAndDeptId } from '@/api/oa/business/purchase'
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
      deptId: string | number
    }
  }>(),
  {
    multiple: false,
    component: 'tree-select',
  },
)

const emit = defineEmits(['update:modelValue', 'update:nodes', 'change'])

// 实例
const { proxy } = getCurrentInstance() as ComponentInternalInstance

// const CascaderRef = ref<ElCascaderInstance>()

const ids = ref<PurchaseCategorySelectValue>(deserialize(props.modelValue))

const isLoading = ref(false)
const rawData = ref<ProjectSubjectItemTreeVO[]>([])

const treeData = computed(() => proxy?.handleTree<ProjectSubjectItemTreeVO>(rawData.value, 'uuid'))
const selectedLabel = computed(() => {
  if (props.modelValue && !isEmpty(rawData.value)) {
    const idsArr = isArray(ids.value) ? ids.value : [ids.value]
    const itemsPathNodes = idsArr.reduce((prev, curr) => {
      const nodes = findPathNodes<ProjectSubjectItemTreeVO>(treeData.value, curr)
      prev.push(nodes)

      return prev
    }, [])

    return itemsPathNodes.map(e => e.map((item: any) => item.sciName).join(' / ')).join('，')
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

  let updateNodePayload: ProjectSubjectItemTreeVO[]

  if (!isEmpty(value)) {
    const idsArr = isArray(ids.value) ? ids.value : [ids.value]
    updateNodePayload = rawData.value.filter(item => idsArr.includes(item.id as string))
  }
  else {
    updateNodePayload = []
  }

  emit('update:nodes', updateNodePayload)
}

async function getTree() {
  if (props.params) {
    if (isEmpty(props.params.psId)) {
      rawData.value = []
      return
    }

    isLoading.value = true
    const { data } = (await getItemByPsIdAndDeptId(props.params).finally(() => (isLoading.value = false))) ?? {}
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
  () => {
    getTree()
  },
  {
    immediate: true,
  },
)
</script>
