<template>
  <div class="w-full">
    <van-field
      :model-value="modelValue"
      :is-link="!isReadonly"
      placeholder="请选择"
      readonly
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

    <!-- http://github.com/youzan/vant/issues/2310 -->
    <van-field class="!hidden" readonly />

    <van-calendar
      v-if="component === 'calendar'"
      ref="CalenderRef"
      v-model:show="visible"
      :title="`${attrs.label}`"
      :switch-mode="switchMode"
      :type="type"
      :min-date="minDate"
      :max-date="maxDate"
      safe-area-inset-bottom
      @open="onCalendarOpen"
      @confirm="onCalendarConfirm"
    />

    <van-popup
      v-if="component === 'date-picker'"
      v-model:show="visible"
      position="bottom"
      round
      destroy-on-close
      safe-area-inset-bottom
    >
      <van-date-picker
        :model-value="currentDate"
        :title="`${attrs.label}`"
        :columns-type="columnsType"
        :formatter="datePickerFormatter"
        @confirm="onDatePickerConfirm"
        @cancel="onDatePickerCancel"
      />
    </van-popup>
  </div>
</template>

<script setup lang='ts'>
import dayjs from 'dayjs'
import type { CalendarInstance, DatePickerColumnType, PickerOption } from 'vant'
import { isArray, isNil } from 'lodash-es'
import { useParentForm, usePopup } from '@/hooks'

const props = withDefaults(
  defineProps<{
    modelValue?: string
    component?: 'calendar' | 'date-picker'
    valueFormat?: string
    rangeSeparator?: string
    readonly?: boolean
    clearable?: boolean
    minDate?: Date
    maxDate?: Date
    // calendar
    switchMode?: 'none' | 'month' | 'year-month'
    type?: 'single' | 'multiple' | 'range'
    showConfirm?: boolean
    // date-picker
    columnsType?: DatePickerColumnType[]
  }>(),
  {
    component: 'calendar',
    valueFormat: 'YYYY-MM-DD',
    rangeSeparator: ' ~ ',
    // calendar
    switchMode: 'year-month',
    type: 'single',
    showConfirm: true,
    // date-picker
    columnsType: () => ['year', 'month', 'day'],
  },
)

const emit = defineEmits(['update:modelValue', 'confirm', 'clear', 'change'])

const attrs = useAttrs()
const slots = useSlots()

const parentForm = useParentForm()

const { visible, openPopup, closePopup } = usePopup()

const CalenderRef = ref<CalendarInstance>()

// 是否只读
const isReadonly = computed(() => props.readonly || parentForm.props.readonly)

// Picker 回显值
const currentDate = computed(() => props.modelValue?.split('-'))

// 清空点击
function onClear() {
  emit('update:modelValue', undefined)
  emit('change', undefined)
  emit('clear')
}

// 选项点击
function onFieldClick() {
  openPopup()
}

// 日历打开
function onCalendarOpen() {
  const { modelValue, type, rangeSeparator } = props

  // 回显选择
  if (!isNil(modelValue)) {
    const resetValue: Date | Date[]
      = (['range', 'multiple'].includes(type))
        ? modelValue
            .split(rangeSeparator)
            .map(e => new Date(e))
        : new Date(modelValue)

    CalenderRef.value?.reset(resetValue)
  }
}

// 日历确认
function onCalendarConfirm(value: Date | Date[]) {
  const { valueFormat, rangeSeparator } = props

  let payload: string

  // 单个日期
  if (!isArray(value)) {
    payload = dayjs(value).format(valueFormat)
  }
  // 多个日期
  else {
    payload = value
      .map(e => dayjs(e).format(valueFormat))
      .join(rangeSeparator)
  }

  emit('update:modelValue', payload)
  emit('confirm', payload)

  closePopup()
}

// 日期选择格式化
function datePickerFormatter(type: string, option: PickerOption) {
  switch (type) {
    case 'year':
      option.text = `${option.text}年`
      break
    case 'month':
      option.text = `${option.text}月`
      break
    case 'day':
      option.text = `${option.text}日`
      break
  }

  return option
}

// 日期选择取消
function onDatePickerCancel() {
  closePopup()
}

// 日期选择确认
function onDatePickerConfirm({ selectedValues }) {
  const payload = selectedValues.join('-')

  emit('update:modelValue', payload)
  emit('confirm', payload)

  closePopup()
}
</script>
