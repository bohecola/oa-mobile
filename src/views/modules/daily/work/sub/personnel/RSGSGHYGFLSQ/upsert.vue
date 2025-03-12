<template>
  <DictPicker
    v-model="form.m_welfareCategory"
    v-show-field="['m_welfareCategory', includeFields]"
    label="福利类别"
    name="m_welfareCategory"
    input-align="left"
    dict-type="oa_daily_work_rsgsghygflsq_welfare_category"
    :multiple="false"
  />

  <van-field-number
    v-model.number="form.m_amount"
    v-show-field="['m_amount', includeFields]"
    label="合计金额（元）"
    name="m_amount"
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
    includeFields: () => ['m_welfareCategory', 'm_amount', 'reason', 'ossIdList'],
  },
)

const form = inject<Ref<DailyWorkForm>>('form')
// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>()

// 依赖收集
const trackFields = inject<TrackFieldsFn<DailyWorkForm>>('trackFields')
trackFields(props.includeFields)
</script>
