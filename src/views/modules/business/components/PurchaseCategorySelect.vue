<template>
  <div>
    <van-field
      :model-value="selectedLabels.join(',')"
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

      <template v-if="clearable && !isReadonly && !isNil(modelValue)" #right-icon>
        <van-icon name="clear" class="text-[--van-field-clear-icon-color]" @click.stop="onClear" />
      </template>

      <!-- 回显项 -->
      <template v-if="!isNil(modelValue)" #input>
        <van-skeleton :loading="isLoading" :row="2" class="!px-0 w-full" round>
          <div>{{ selectedLabels.join(',') }}</div>
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
      :closeable="isNil(params.psId) || isEmpty(options)"
    >
      <div v-if="isNil(params.psId)">
        <van-empty description="请先选择预算" :image="customEmptyImage" image-size="80" />
      </div>

      <div v-else-if="isEmpty(options)">
        <van-empty description="暂无数据" :image="customEmptyImage" image-size="80" />
      </div>

      <van-cascader
        v-else
        v-model="cascaderValue"
        :title="`请选择${attrs.label}`"
        :options="options"
        :field-names="{
          text: 'sciName',
          value: 'id',
          children: 'children',
        }"
        @close="onClose"
        @finish="onFinish"
      >
        <template #option="{ option: { sciName, treeType, availableAmount } }">
          <div>
            <span> {{ sciName }} </span>
            <span v-if="treeType === 'item'">（{{ formatCurrency(availableAmount) }}）</span>
          </div>
        </template>
      </van-cascader>
    </van-popup>
  </div>
</template>

<script setup lang='ts'>
import Big from 'big.js'
import { isEmpty, isNil } from 'lodash-es'
import type { ProjectSubjectItemTreeVO } from '@/api/oa/finance/projectSubject/types'
import { getItemTreeByPsIdAndApplyDeptId } from '@/api/oa/finance/projectSubject'
import { findPathNodes, isNumeric } from '@/utils'
import { useParentForm, usePopup } from '@/hooks'
import customEmptyImage from '@/assets/images/custom-empty-image.png'

const props = withDefaults(
  defineProps<{
    modelValue?: string
    multiple?: boolean
    readonly?: boolean
    disabled?: boolean
    clearable?: boolean
    params: {
      psId: string
      applyDeptId: string | number
    }
  }>(),
  {},
)

const emit = defineEmits([
  'update:modelValue',
  'update:deptId',
  'update:amount',
  'update:applyingAmount',
  'update:finishAmount',
  'update:availableAmount',
  'confirm',
  'change',
])

const attrs = useAttrs()
const slots = useSlots()

const parentForm = useParentForm()

const { visible, openPopup, closePopup } = usePopup()

// 实例
const { proxy } = getCurrentInstance() as ComponentInternalInstance

// 值
const cascaderValue = ref<string>(undefined)

// 加载
const isLoading = ref(false)

// 原始数据
const rawData = ref<ProjectSubjectItemTreeVO[]>([])

// 是否只读
const isReadonly = computed(() => props.readonly || parentForm.props.readonly)

// 选项数据
const options = computed(() => proxy?.handleTree<ProjectSubjectItemTreeVO>(rawData.value, 'uuid'))

// 选中项的 labels 集合
const selectedLabels = computed(() => {
  const { modelValue } = props

  if (!isNil(modelValue) && !isEmpty(rawData.value)) {
    // 选中的预算科目项 id 集合
    const values = !isNil(cascaderValue.value) ? [cascaderValue.value] : []

    // 选中的预算科目项的 pathNodes
    const pathNodes = values.reduce<ProjectSubjectItemTreeVO[][]>((prev, curr) => {
      const nodes = findPathNodes(options.value, curr)
      prev.push(nodes)
      return prev
    }, [])

    return pathNodes.map(e => e.map(item => item.sciName).join(' / '))
  }

  return []
})

// 选项点击
function onFieldClick() {
  if (isReadonly.value) {
    return
  }

  if (attrs?.disabled) {
    return
  }

  openPopup()
}

// 关闭
function onClose() {
  closePopup()
}

// 清除
function onClear() {
  emit('update:modelValue', undefined)
  emit('change', undefined)

  updateVars(undefined)
}

// 完成
function onFinish({ value, selectedOptions, tabIndex }: CascaderParams<ProjectSubjectItemTreeVO>) {
  emit('update:modelValue', value)
  emit('change', value)

  emit('update:deptId', selectedOptions[tabIndex].deptId)

  updateVars(value)

  closePopup()
}

// 获取数据
async function getData() {
  const { params } = props

  if (isNil(params.psId)) {
    rawData.value = []
    return
  }

  isLoading.value = true

  const { data } = await getItemTreeByPsIdAndApplyDeptId(props.params)
    .finally(() => {
      isLoading.value = false
    })

  rawData.value = data
}

// 更新变量
function updateVars(value: string) {
  // 选中的预算科目项
  const items = !isNil(value) ? rawData.value.filter(item => item.id === value) : []

  // 预算金额总和
  const amount = items.reduce((prev, curr) => {
    if (isNumeric(curr.amount)) {
      return prev.add(Big(curr.amount))
    }

    return prev.add(0)
  }, Big(0))

  // 申请中金额总和
  const applyingAmount = items.reduce((prev, curr) => {
    if (isNumeric(curr.applyingAmount)) {
      return prev.add(Big(curr.applyingAmount))
    }

    return prev.add(0)
  }, Big(0))

  // 已申请金额总和
  const finishAmount = items.reduce((prev, curr) => {
    if (isNumeric(curr.finishAmount)) {
      return prev.add(Big(curr.finishAmount))
    }

    return prev.add(0)
  }, Big(0))

  // 剩余金额总和
  const availableAmount = items.reduce((prev, curr) => {
    if (isNumeric(curr.availableAmount)) {
      return prev.add(Big(curr.availableAmount))
    }

    return prev.add(0)
  }, Big(0))

  // 预算金额
  emit('update:amount', amount.toNumber())
  // 申请中金额
  emit('update:applyingAmount', applyingAmount.toNumber())
  // 已申请金额
  emit('update:finishAmount', finishAmount.toNumber())
  // 剩余金额
  emit('update:availableAmount', availableAmount.toNumber())
}

// 回显
watch(
  () => props.modelValue,
  (value) => {
    cascaderValue.value = value
  },
  {
    immediate: true,
  },
)

// 参数变化 => 重新获取数据
watch(
  () => props.params,
  async () => {
    await getData()

    const { modelValue } = props

    if (!isNil(modelValue)) {
      updateVars(modelValue)
    }
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
