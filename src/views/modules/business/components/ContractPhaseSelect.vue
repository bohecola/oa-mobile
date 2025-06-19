<template>
  <div>
    <van-field
      :model-value="id"
      :is-link="!isReadonly"
      placeholder="请选择"
      type="textarea"
      rows="1"
      autosize
      readonly
      v-bind="attrs"
      @click="onFieldClick"
    >
      <template v-for="(_, name) in slots" #[name]="scope">
        <slot :name="name" v-bind="scope" />
      </template>

      <template v-if="clearable && !isReadonly && !attrs?.disabled && !isNil(modelValue)" #right-icon>
        <van-icon name="clear" class="text-[--van-field-clear-icon-color]" @click.stop="onClear" />
      </template>

      <!-- 回显项 -->
      <template v-if="!isNil(modelValue)" #input>
        <van-skeleton :loading="isLoading" :row="2" class="!px-0 w-full" round>
          {{ selectedLabel }}
        </van-skeleton>
      </template>
    </van-field>

    <van-field class="!hidden" readonly />

    <van-popup
      v-model:show="visible"
      position="bottom"
      round
      destroy-on-close
      safe-area-inset-bottom
    >
      <van-picker
        :columns="options"
        :columns-field-names="{ text: 'phaseName', value: 'id' }"
        @confirm="onConfirm"
        @cancel="onCancel"
      >
        <template #empty>
          <van-empty
            :image="customEmptyImage"
            image-size="80"
            description="暂无数据"
          />
        </template>
      </van-picker>
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import { isEmpty, isNil } from 'lodash-es'
import type { ContractPhaseItemVO } from '@/api/oa/business/contractPhaseItem/types'
import { getPashItem } from '@/api/oa/business/contractPhase'
import { useParentForm, usePopup } from '@/hooks'
import customEmptyImage from '@/assets/images/custom-empty-image.png'

const props = withDefaults(
  defineProps<{
    modelValue?: string
    contractId?: string
    exclude?: string[]
    readonly?: boolean
    clearable?: boolean

    phaseName?: string
    receivableAmount?: number
    collectedAmount?: number
    startDate?: string
    endDate?: string
    planDate?: string
    settlementIdList?: string[]
  }>(),
  {
    exclude: () => [],
  },
)

const emit = defineEmits([
  'update:modelValue',
  'change',
  'update:phaseName',
  'update:receivableAmount',
  'update:collectedAmount',
  'update:startDate',
  'update:endDate',
  'update:planDate',
  'update:settlementIdList',
])

const attrs = useAttrs()
const slots = useSlots()

const parentForm = useParentForm()

const { visible, openPopup, closePopup } = usePopup()

// 是否只读
const isReadonly = computed(() => props.readonly || parentForm.props.readonly)

const isLoading = ref(false)

const id = ref<string>(undefined)
const rawData = ref<ContractPhaseItemVO[]>([])

const options = computed(() => {
  return rawData.value.map((e) => {
    return {
      ...e,
      disabled: props.exclude.includes(e.id),
    }
  })
})

const selectedLabel = computed(() => {
  if (!isNil(id.value) && !isEmpty(rawData.value)) {
    const phase = rawData.value.find(e => e.id === id.value)

    return phase?.phaseName
  }

  return undefined
})

async function getData(contractId: string) {
  if (isNil(contractId)) {
    rawData.value = []
    return
  }

  isLoading.value = true
  const { data } = await getPashItem(contractId).finally(() => (isLoading.value = false))
  rawData.value = data
}

function onFieldClick() {
  if (isReadonly.value) {
    return
  }

  if (attrs?.disabled) {
    return
  }

  openPopup()
}

// 取消
function onCancel() {
  closePopup()
}

// 清除
function onClear() {
  emit('update:modelValue', undefined)
  emit('change', undefined)

  updateVars(undefined)
}

// 单选确认
function onConfirm({ selectedValues }) {
  const [value] = selectedValues

  emit('update:modelValue', value)
  emit('change', value)

  updateVars(value)

  closePopup()
}

function updateVars(id: string) {
  const phase = !isNil(id) ? rawData.value.find(e => e.id === id) : undefined

  emit('update:phaseName', phase?.phaseName)

  emit('update:receivableAmount', phase?.receivableAmount)

  emit('update:collectedAmount', phase?.collectionTotalAmount)

  emit('update:startDate', phase?.startDate)
  emit('update:endDate', phase?.endDate)
  emit('update:planDate', phase?.planDate)

  emit('update:settlementIdList', phase?.settlementIdList)
}

watch(
  () => props.contractId,
  async (val) => {
    await getData(val)

    if (!isNil(props.modelValue)) {
      updateVars(props.modelValue)
    }
  },
  {
    immediate: true,
  },
)

watch(
  () => props.modelValue,
  (val) => {
    id.value = val
  },
  {
    immediate: true,
  },
)
</script>

<style lang="scss" scoped>
:deep(.van-field__body) {
  align-items: start;
}
</style>
