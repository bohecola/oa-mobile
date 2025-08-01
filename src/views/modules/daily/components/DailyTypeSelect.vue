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
        v-model:show="visible"
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
          @close="closePopup"
          @finish="onFinish"
        />
      </van-popup>
    </template>
  </van-skeleton>
</template>

<script setup lang="ts">
import { isEmpty, isNil } from 'lodash-es'
import { useCustomFieldValue } from '@vant/use'
import type { DailyWorkTypeVO } from '@/api/oa/daily/category/types'
import { queryByParentDaily } from '@/api/oa/daily/category'
import { findPathNodes } from '@/utils'
import { usePopup } from '@/hooks'

type DailyWorkTypeTreeVO = DailyWorkTypeVO & { children?: DailyWorkTypeVO[] }

const props = withDefaults(
  defineProps<{
    modelValue?: string
    no?: string
    wfRemark?: string
    placeholder?: string
    popupOnly?: boolean
    type?: string
    readonly?: boolean
  }>(),
  {
    placeholder: '请选择事务类别',
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

const { visible, openPopup, closePopup } = usePopup()

const isLoading = ref(false)

const id = ref<string>(props.modelValue)

const data = ref<DailyWorkTypeVO[]>([])

const options = computed(() => proxy?.handleTree<DailyWorkTypeTreeVO>(data.value))

const presentText = computed(() => {
  const nodes = findPathNodes<DailyWorkTypeTreeVO>(options.value, props.modelValue)
  const text = nodes.map(e => e.name).join(' / ')
  return text
})

async function getData() {
  isLoading.value = true
  const res = await queryByParentDaily(props.type, props.readonly ? 'N' : 'Y')
  data.value = res.data
  isLoading.value = false
}

function onFinish({ value }: CascaderParams<DailyWorkTypeTreeVO>) {
  emit('before-finish')

  emit('update:modelValue', value)
  emit('finish', value)

  updateVars(value)

  closePopup()
}

function updateVars(value: string) {
  const node = data.value.find(e => e.id === value)

  emit('update:no', node?.no)
  emit('update:wfRemark', node?.remark)
  emit('update:isDefaultPage', node?.isDefaultPage)

  const nodes = findPathNodes<DailyWorkTypeTreeVO>(options.value, value)
  const [rootNode] = nodes
  emit('update:rootNo', rootNode?.no)

  emit('update:presentText', nodes.map(e => e.name).join(' / '))
}

useCustomFieldValue(() => id.value)

watch(
  [() => props.modelValue, () => data.value],
  async ([val, dataVal]) => {
    id.value = val
    if (isEmpty(dataVal)) {
      await getData()
    }

    if (!isEmpty(dataVal)) {
      nextTick(() => updateVars(val))
    }
  },
)

onMounted(async () => {
  await getData()
})

defineExpose({
  open: openPopup,
  isLoading,
})
</script>
