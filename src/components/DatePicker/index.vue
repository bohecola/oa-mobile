<template>
  <div class="clearfix">
    <van-field
      v-model="date"
      input-align="left"
      is-link
      :name="name"
      :label="label"
      :readonly="readonly"
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
    readonly: {
      type: Boolean,
      default: false,
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
  },
)

const emit = defineEmits(['update:modelValue', 'changeData'])

const date = ref(props.modelValue)
const showPicker = ref(false)

function onConfirm({ selectedValues }) {
  date.value = selectedValues.join('-')
  emit('update:modelValue', date.value)
  showPicker.value = false
}

watch(() => props.modelValue, (newVal) => {
  date.value = newVal
})
</script>

<style scoped>

</style>
