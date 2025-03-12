<template>
  <van-skeleton v-if="!popupOnly" :loading="isLoading" animated class="h-6 flex items-center">
    <template #template>
      <van-skeleton-paragraph class="!h-[60%]" />
    </template>
    <template #default>
      <span v-if="!isNil(modelValue)">{{ presentText }}</span>
      <span v-else class="text-[var(--van-field-placeholder-text-color)]">请选择</span>
      <!-- 弹窗 -->
      <van-popup
        v-model:show="show"
        position="bottom"
        teleport="body"
        :lazy-render="false"
        round
        safe-area-inset-bottom
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
import { isEmpty, isNil } from 'lodash-es'
import type { CascaderOption } from 'vant'
import { useCustomFieldValue } from '@vant/use'
import type { DailyWorkTypeVO } from '@/api/oa/daily/category/types'
import { queryByParentDaily } from '@/api/oa/daily/category'
import { findPathNodes } from '@/utils'

type DailyWorkTypeTreeVO = DailyWorkTypeVO & { children?: DailyWorkTypeVO[] }

const props = withDefaults(
  defineProps<{
    modelValue?: string | number
    no?: string
    wfRemark?: string
    placeholder?: string
    popupOnly?: boolean
    type?: string
  }>(),
  {
    placeholder: '请选择事务类别',
    popupOnly: false,
    // 0 事务、1 费用
    type: '0',
  },
)

const emit = defineEmits([
  'update:modelValue',
  'update:no',
  'update:rootNo',
  'update:wfRemark',
  'update:presentText',
  'update:isDefaultPage',
  'before-finish',
  'finish',
])

const { proxy } = getCurrentInstance() as ComponentInternalInstance

const show = ref(false)
const isLoading = ref(false)

const id = ref<string | number>(props.modelValue)

const data = ref<DailyWorkTypeVO[]>([])

useCustomFieldValue(() => id.value)

const options = computed(() => proxy?.handleTree<DailyWorkTypeTreeVO>(data.value))

const presentText = computed(() => {
  const nodes = findPathNodes<DailyWorkTypeTreeVO>(options.value, props.modelValue)
  const text = nodes.map(e => e.name).join(' / ')
  return text
})

async function getData() {
  isLoading.value = true
  const res = await queryByParentDaily(props.type).finally(() => (isLoading.value = false))
  data.value = res.data
}

interface Params { value: string | number, selectedOptions: CascaderOption[], tabIndex: number }

function onFinish({ value }: Params) {
  show.value = false
  emit('before-finish')

  emit('update:modelValue', value)
  emit('finish', value)

  emit('update:presentText', presentText.value)

  updateVars(value)
}

function updateVars(value: string | number) {
  const node = data.value.find(e => e.id === value)
  emit('update:no', node?.no)
  emit('update:wfRemark', node?.remark)
  emit('update:isDefaultPage', node?.isDefaultPage)

  const nodes = findPathNodes<DailyWorkTypeTreeVO>(options.value, value)
  const [rootNode] = nodes
  emit('update:rootNo', rootNode?.no)
}

watch(
  () => props.modelValue,
  async (val) => {
    id.value = val
    if (isEmpty(data.value)) {
      await getData()
    }

    nextTick(() => updateVars(val))
  },
)

function open() {
  show.value = true
}

function close() {
  show.value = false
}

onMounted(async () => {
  await getData()
})

defineExpose({
  open,
})
</script>
