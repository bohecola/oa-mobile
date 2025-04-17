<template>
  <div class="w-full">
    <van-field v-if="isReadonly" v-bind="attrs">
      <template #input>
        <dict-tag :options="options" :value="id" />
      </template>
    </van-field>

    <van-field
      v-else
      :model-value="presentText"
      type="textarea"
      rows="1"
      placeholder="请选择"
      readonly
      autosize
      is-link
      v-bind="attrs"
      @click="onFieldClick"
    >
      <template v-for="(_, name) in slots" #[name]="scope">
        <slot :name="name" v-bind="scope" />
      </template>

      <template v-if="clearable && !isReadonly && !isNil(modelValue)" #right-icon>
        <van-icon name="clear" @click.stop="onClear" />
      </template>
    </van-field>

    <van-field class="!hidden" readonly />

    <!-- 弹出层 -->
    <van-popup
      v-model:show="visible"
      position="bottom"
      round
      destroy-on-close
      safe-area-inset-bottom
      @click-overlay="onCancel"
    >
      <van-picker
        :title="`${attrs.label}`"
        :columns="options"
        @confirm="onConfirm"
        @cancel="onCancel"
      />
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import { isNil } from 'lodash-es'
import { useParentForm, usePopup } from '@/hooks'
import { getCompany } from '@/api/oa/personnel/userContract'

const props = defineProps<{
  modelValue?: string
  multiple?: boolean
  readonly?: boolean
  clearable?: boolean
}>()

const emit = defineEmits(['update:modelValue', 'change'])

const attrs = useAttrs()
const slots = useSlots()
const parentForm = useParentForm()
const { visible, openPopup, closePopup } = usePopup()

const id = ref<string>(props.modelValue) // 选中的值
const options = ref<{ text: string, label: string, value: string }[]>([])

// 计算是否只读
const isReadonly = computed(() => props.readonly || parentForm.props.readonly)

// 获取选项数据
async function getOptions() {
  if (options.value.length)
    return // 防止重复请求
  const res = await getCompany('0')
  options.value = res.data
    .filter(e => e.status === '0')
    .map(e => ({
      text: e.deptName,
      label: e.deptName,
      value: String(e.deptId),
    }))
}

// 计算当前文本
const presentText = computed(() => {
  return options.value.find(e => e.value === id.value)?.text || ''
})

// 清空选择
function onClear() {
  emit('update:modelValue', undefined)
  emit('change', undefined)
}

// 取消选择
function onCancel() {
  closePopup()
}

// 确认选择
function onConfirm({ selectedValues }) {
  const [value] = selectedValues
  emit('update:modelValue', value)
  emit('change', value)
  closePopup()
}

// 选择框点击
function onFieldClick() {
  openPopup()
}

onMounted(getOptions)

// 监听 modelValue 变化
watch(
  () => props.modelValue,
  (val) => {
    id.value = val
  },
  { immediate: true },
)
</script>
