<template>
  <el-skeleton :loading="isLoading" animated class="h-8 flex items-center">
    <template #template>
      <el-skeleton-item variant="rect" class="!h-[60%]" />
    </template>
    <template #default>
      <div v-if="readonly">
        {{ CascaderRef?.presentText }}
      </div>
      <div v-show="!readonly" class="w-full">
        <van-cascader
          ref="CascaderRef"
          v-model="id"
          :options="options"
          :props="{
            value: 'id',
            label: 'name',
            emitPath: false,
            expandTrigger: 'click',
          }"
          class="w-full"
          clearable
          @change="onChange"
        />
      </div>
    </template>
  </el-skeleton>
</template>

<script setup lang="ts">
import type { CascaderOption } from 'vant'
import { queryByParentDaily } from '@/api/oa/daily/category'
import type { DailyWorkTypeVO } from '@/api/oa/daily/category/types'

const props = withDefaults(
  defineProps<{
    modelValue?: string | number
    placeholder?: string
    readonly?: boolean
  }>(),
  {
    modelValue: undefined,
    placeholder: '请选择事务类别',
    readonly: false,
  },
)

const emit = defineEmits(['update:modelValue', 'before-change', 'change', 'update:dailyWorkNo', 'update:wfRemark'])

const { proxy } = getCurrentInstance() as ComponentInternalInstance

// 引用
const CascaderRef = ref<CascaderOption>()

// 节点数据加载状态
const isLoading = ref(false)

// 主键
const id = ref<number | string>(props.modelValue)

// 节点数据
const options = ref([])

// 获取日常事务类别数据
async function getData() {
  isLoading.value = true
  const res = await queryByParentDaily('0').finally(() => (isLoading.value = false))
  const treeData = proxy?.handleTree<DailyWorkTypeVO>(res.data)
  options.value = treeData
}

// change 事件
function onChange(value: string | number) {
  emit('before-change')

  emit('update:modelValue', value)
  emit('change', value)
  const [node] = CascaderRef.value?.getCheckedNodes(true)

  emit('update:dailyWorkNo', node?.data?.no)
  emit('update:wfRemark', node?.data?.remark)
}

watch(
  () => props.modelValue,
  (val) => {
    id.value = val
  },
)

onMounted(async () => {
  await getData()
  console.log(CascaderRef.value, '2222222')
})
</script>
