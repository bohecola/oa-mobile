<template>
  <van-skeleton :loading="isLoading" animated class="h-6 flex items-center">
    <template #template>
      <van-skeleton-paragraph class="!h-[60%]" />
    </template>
    <template #default>
      <div v-if="readonly">
        {{ detail?.sciName }}
      </div>
      <!-- <el-tree-select
        v-else
        v-model="psiId"
        :data="treeData"
        :render-after-expand="false"
        :props="{ value: 'id', label: 'sciName', children: 'children' }"
        node-key="uuid"
        value-key="id"
        clearable
        style="width: 185px"
        placeholder="选择预算类别"
        @change="onChange"
      /> -->
    </template>
  </van-skeleton>
</template>

<script setup lang="ts">
import type { ProjectSubjectItemTreeVO } from '@/api/oa/finance/projectSubject/types'
import { getItemTreeByProjectIdAndDeptId } from '@/api/oa/business/purchase'

const props = withDefaults(
  defineProps<{
    modelValue?: string | number
    readonly?: boolean
    projectId?: string | number
    deptId?: string | number
  }>(),
  {
    modelValue: undefined,
    readonly: false,
  },
)

const emit = defineEmits(['update:modelValue', 'change'])

// 实例
const { proxy } = getCurrentInstance() as ComponentInternalInstance

const psiId = ref(props.modelValue)
const isLoading = ref(false)
const treeData = ref([])

// 只读回显
const detail = asyncComputed(async () => {
  isLoading.value = true
  const obj = {} as ProjectSubjectItemTreeVO
  if (props.readonly) {
    if (props.modelValue && props.projectId && props.deptId) {
      const { data } = await getItemTreeByProjectIdAndDeptId(props.projectId, props.deptId).finally(() => (isLoading.value = false))
      const detail = data.find(e => e.id === props.modelValue) ?? []

      Object.assign(obj, detail)
    }
  }
  return obj
})

function onChange(val?: string | number) {
  emit('update:modelValue', val)
  emit('change', val)
}

watch(
  () => props.modelValue,
  (val) => {
    psiId.value = val
  },
)

// 项目预算类别获取
watch(
  () => props.projectId,
  (val) => {
    if (val && !props.readonly) {
      getTree()
    }
  },
  {
    immediate: true,
  },
)

async function getTree() {
  if (props.projectId && props.deptId) {
    isLoading.value = true
    const { data } = (await getItemTreeByProjectIdAndDeptId(props.projectId, props.deptId).finally(() => (isLoading.value = false))) ?? {}
    treeData.value = proxy!.handleTree(data ?? [], 'uuid')
  }
}
</script>
