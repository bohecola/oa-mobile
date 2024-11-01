<template>
  <van-skeleton v-if="!popupOnly" :loading="isLoading" animated class="h-6 flex items-center">
    <template #template>
      <van-skeleton-paragraph class="!h-[60%]" />
    </template>
    <template #default>
      <span>{{ presentText }}</span>
      <!-- 弹窗 -->
      <van-popup
        v-model:show="show"
        position="bottom"
        teleport="body"
        :lazy-render="false"
        round
      >
        <van-cascader
          v-model="id"
          :title="placeholder"
          :options="options"
          :field-names="{
            value: 'id',
            text: 'name',
          }"
          @close="close"
          @finish="onFinish"
        />
      </van-popup>
    </template>
  </van-skeleton>
</template>

<script setup lang="ts">
import type { CascaderOption } from 'vant'
import type { DailyWorkTypeVO } from '@/api/oa/daily/category/types'
import { queryByParentDaily } from '@/api/oa/daily/category'
import { findPathNode } from '@/utils'

interface Params { value: string | number, selectedOptions: CascaderOption[], tabIndex: number }

const props = withDefaults(
  defineProps<{
    modelValue?: string | number
    dailyWorkNo?: string
    wfRemark?: string
    placeholder?: string
    popupOnly?: boolean
    type?: string
  }>(),
  {
    modelValue: undefined,
    placeholder: '请选择事务类别',
    popupOnly: false,
    type: '0',
  },
)

const emit = defineEmits(['update:modelValue', 'update:dailyWorkNo', 'update:wfRemark', 'before-finish', 'finish'])

const { proxy } = getCurrentInstance() as ComponentInternalInstance

const show = ref(false)
const isLoading = ref(false)

const id = ref<number | string>(props.modelValue)
const list = ref<DailyWorkTypeVO[]>([])

const options = computed(() => {
  return proxy?.handleTree<DailyWorkTypeVO>(list.value)
})

const presentText = computed(() => {
  const nodes = findPathNode<DailyWorkTypeVO>(options.value, props.modelValue)
  const text = nodes.map(e => e.name).join(' / ')
  return text
})

async function getData() {
  isLoading.value = true
  const res = await queryByParentDaily(props.type).finally(() => (isLoading.value = false))
  list.value = res.data
}

function onFinish({ value }: Params) {
  show.value = false
  emit('before-finish')

  emit('update:modelValue', value)
  emit('finish', value)

  const node = list.value.find(e => e.id === value)
  emit('update:dailyWorkNo', node?.no)

  emit('update:wfRemark', node?.remark)
}

watch(
  () => props.modelValue,
  (val) => {
    id.value = val
  },
)

onMounted(async () => {
  await getData()
})

function open() {
  show.value = true
}

function close() {
  show.value = false
}

defineExpose({
  open,
})
</script>
