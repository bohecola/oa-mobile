<template>
  <div class="clearfix">
    <van-field
      v-model="date"
      :required="required"
      is-link
      :name="name"
      :label="label"
      :placeholder="placeholder"

      @click="showPicker = true"
    />
    <van-popup v-model:show="showPicker" position="bottom">
      <van-date-picker :columns-type="columnsType" @confirm="onConfirm" @cancel="showPicker = false" />
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import type { DatePickerColumnType } from 'vant'

const props = defineProps(
  {
    modelValue: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '时间选择',
    },
    name: {
      type: String,
      default: '',
    },
    columnsType: {
      type: Array as () => DatePickerColumnType[],
      default: () => ['year', 'month', 'day'] as DatePickerColumnType[],
    },
    placeholder: {
      type: String,
      default: '请选择',
    },
    required: {
      type: Boolean,
      default: true,
    },
  },
)

const emit = defineEmits(['update:modelValue', 'changeData'])

const date = ref(props.modelValue)
const showPicker = ref(false)

function onConfirm({ selectedValues }) {
  date.value = selectedValues.join('-')
  emit('update:modelValue', date.value)
  emit('changeData', selectedValues)
  showPicker.value = false
}

watch(() => props.modelValue, (newVal) => {
  date.value = newVal
})
</script>
