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
        v-model="psiId"
        :data="treeData"
        :render-after-expand="false"
        :props="{ value: 'id', label: 'sciName', children: 'children' }"
        :disabled="disabled"
        node-key="uuid"
        value-key="id"
        clearable
        style="min-width: 185px"
        placeholder="选择预算类别"
        @change="onChange"
      >
        <template #default="{ data: { sciName, treeType, availableAmount } }">
          <span>{{ sciName }}</span>
          <span v-if="treeType === 'item'" style="color: gray">（{{ availableAmount }}）</span>
        </template>
      </el-tree-select> -->
    </template>
  </van-skeleton>
</template>

<script setup lang="ts">
import { isEmpty } from 'lodash-es'
import { findNodeById } from '@/utils'
import { getItemTreeByProjectOrDept } from '@/api/oa/business/purchase'

const props = defineProps<{
  modelValue?: string | number
  readonly?: boolean
  disabled?: boolean
  params: {
    type: string
    projectId?: string | number
    deptId: string | number
  }
}>()

const emit = defineEmits(['update:modelValue', 'change'])

// 实例
const { proxy } = getCurrentInstance() as ComponentInternalInstance

const psiId = ref(props.modelValue)
const isLoading = ref(false)
const treeData = ref([])

function onChange(val?: string | number) {
  emit('update:modelValue', val)
  emit('change', val)
}

const selectedLabel = computed(() => {
  if (props.modelValue && !isEmpty(treeData.value)) {
    return findNodeById(treeData.value, props.modelValue)?.sciName
  }
  return ''
})

watch(
  () => props.modelValue,
  (val) => {
    psiId.value = val
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

async function getTree() {
  if (props.params) {
    if (props.params.type === 'project' && isEmpty(props.params.projectId)) {
      treeData.value = []
      return false
    }

    isLoading.value = true
    const { data } = (await getItemTreeByProjectOrDept(props.params).finally(() => (isLoading.value = false))) ?? {}
    treeData.value = proxy.handleTree(data ?? [], 'uuid')
  }
}
</script>
