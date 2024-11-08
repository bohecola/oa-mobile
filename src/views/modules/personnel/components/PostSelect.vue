<template>
  <el-skeleton :loading="isLoading" animated class="h-8 flex items-center">
    <template #template>
      <el-skeleton-item variant="rect" class="!h-[60%]" />
    </template>
    <template #default>
      <div v-if="readonly">
        {{ selectedLabel }}
      </div>
      <!-- <el-select v-else v-model="ids" :placeholder="placeholder" clearable filterable :multiple="multiple" @change="onChange">
        <el-option v-for="item in data" :key="item.postId" :label="item.postName" :value="item.postId" />
      </el-select> -->
    </template>
  </el-skeleton>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { isArray, isEmpty } from 'lodash-es'
import { listSysDeptPost } from '@/api/system/deptPost'
import type { SysDeptPostVO } from '@/api/system/deptPost/types'

const props = withDefaults(
  defineProps<{
    modelValue?: string | number
    placeholder?: string
    readonly?: boolean
    multiple?: boolean
    deptId?: string | number
  }>(),
  {
    placeholder: '请选择岗位',
    readonly: false,
    multiple: false,
  },
)

const emit = defineEmits(['update:modelValue', 'change'])

type PostSelectValue = string | number | (string | number)[]

const ids = ref<PostSelectValue>(deserialize(props.modelValue))

const isLoading = ref(false)
const data = ref<SysDeptPostVO[]>([])

async function getData(deptId: string | number) {
  isLoading.value = true
  if (props.deptId) {
    const res = await listSysDeptPost({ deptId, pageNum: undefined, pageSize: undefined })
    data.value = res.rows
  }
  else {
    data.value = []
  }
  isLoading.value = false
}

// 选中文字
const selectedLabel = computed(() => {
  if (props.modelValue) {
    const postNames = data.value.filter(item => (isArray(ids.value) ? ids.value.includes(item.postId) : item.postId === ids.value))

    return postNames.map(e => e.postName).join('、')
  }
  return ''
})

// change 事件
function onChange(value: (string | number) | (string | number)[]) {
  const payload = serialize(value)

  emit('update:modelValue', payload)
  emit('change', payload)
}

function serialize(value: PostSelectValue) {
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
  async (val) => {
    ids.value = deserialize(val)
  },
)

watch(
  () => props.deptId,
  (val) => {
    getData(val)
  },
)

defineExpose({
  isLoading,
  data,
})
</script>
