<template>
  <van-field v-show-field="['customizeApprover', includeFields]" label="审核人" name="customizeApprover" input-align="left">
    <template #input>
      <UserSelect v-model="form.customizeApprover" multiple />
    </template>
  </van-field>

  <!-- <van-field
    v-model="form.dd_month"
    v-show-field="['dd_month', includeFields]"
    is-link
    readonly
    name="datePicker"
    label="发薪月"
    placeholder="选择时间"
    @click="showPicker = true"
  />
  <van-popup v-model:show="showPicker" position="bottom">
    <van-date-picker @confirm="onConfirm" @cancel="showPicker = false" />
  </van-popup> -->

  <DatePicker v-model="form.dd_month" v-show-field="['dd_month', includeFields]" name="dd_month" label="发薪月" :columns-type="['year', 'month']" />

  <van-field-number
    v-model.number="form.dd_totalAmount"
    v-show-field="['dd_totalAmount', includeFields]"
    label="总金额（元）"
    name="dd_totalAmount"
    :rules="[{ required: true, message: '不能为空', trigger: 'onBlur' }]"
    clearable
  />

  <BaseDetail :include-fields="includeFields" />
</template>

<script setup lang="ts">
import { isNil } from 'lodash-es'
import BaseDetail from '../../../../components/BaseDetail.vue'
import type { DailyWorkForm } from '@/api/oa/daily/work/types'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'

const props = withDefaults(
  defineProps<{
    includeFields?: KeysOfArray<DailyWorkForm>
  }>(),
  {
    includeFields: () => ['dd_month', 'dd_totalAmount', 'customizeApprover', 'reason', 'ossIdList'],
  },
)

const form = inject<Ref<DailyWorkForm>>('form')
// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>()

// 依赖收集
const trackFields = inject<TrackFieldsFn<DailyWorkForm>>('trackFields')
trackFields(props.includeFields)
</script>
