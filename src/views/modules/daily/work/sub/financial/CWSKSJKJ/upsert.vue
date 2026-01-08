<template>
  <van-field
    v-model.trim="form.vv_customerName"
    v-show-field="['vv_customerName', includeFields]"
    label="客户名称"
    placeholder="请输入"
    name="vv_customerName"
    :rules="computedRules.vv_customerName"
  />

  <DateSelect
    v-model="form.vv_issueDate"
    v-show-field="['vv_issueDate', includeFields]"
    name="vv_issueDate"
    label="开具日期"
    :rules="computedRules.vv_issueDate"
  />

  <van-field-number
    v-model.number="form.vv_issueAmount"
    v-show-field="['vv_issueAmount', includeFields]"
    label="开具金额"
    name="vv_issueAmount"
    :rules="computedRules.vv_issueAmount"
  />

  <BaseUpsert :include-fields="includeFields" />
</template>

<script setup lang="ts">
import BaseUpsert from '../../../../components/BaseUpsert.vue'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'
import type { DailyWorkForm } from '@/api/oa/daily/work/types'

const props = withDefaults(
  defineProps<{
    includeFields?: KeysOfArray<DailyWorkForm>
  }>(),
  {
    includeFields: () => ['vv_customerName', 'vv_issueDate', 'vv_issueAmount', 'reason', 'ossIdList'],
  },
)

// 依赖收集
const trackFields = inject<TrackFieldsFn<DailyWorkForm>>('trackFields')
trackFields(props.includeFields)

const form = inject<Ref<DailyWorkForm>>('form')
// 校验
const computedRules = inject<Ref<FormRules<DailyWorkForm>>>('computedRules')
// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>()
</script>
