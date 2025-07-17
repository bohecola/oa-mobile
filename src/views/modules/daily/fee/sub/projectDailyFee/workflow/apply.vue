<template>
  <detail v-if="isView" :include-fields="includeFieldsNo" />
  <template v-else>
    <!-- 项目日常费用 -->
    <div v-if="taskDefinitionKey === 'Activity_0wh1ixm'">
      <upsert :include-fields="includeFieldsNo" />
    </div>

    <!-- 其他审批通用节点 -->
    <div v-else>
      <detail :include-fields="includeFieldsNo" />
    </div>
  </template>
</template>

<script setup lang="ts">
import detail from '../detail.vue'
import upsert from '../upsert.vue'
import type { DailyFeeForm } from '@/api/oa/daily/fee/types'

const isView = inject<boolean>('isView')
const taskDefinitionKey = inject<string>('taskDefinitionKey')
// 公共字段
const commonFields: KeysOfArray<DailyFeeForm> = [
  'subjectType',
  'deptId',
  'psId',
  'contractNo',
  'itemList',
  'amount',
  'reason',
  'receiptInfo',
  'ossIdList',
]

// 生活费用字段
const SHFYFields: KeysOfArray<DailyFeeForm> = ['c_startDate', 'c_endDate', 'c_paymentMethod', 'c_invoiceType']

// 其他费用字段
const QTFYFields: KeysOfArray<DailyFeeForm> = ['isSGZFF']

const form = inject<Ref<DailyFeeForm>>('form')

const includeFieldsNo = computed(() => {
  if (['WYF', 'SDF', 'RQF', 'WF', 'YXDS', 'QNF', 'HFCQLF', 'SHWSCL', 'LJQL'].includes(form.value.no)) {
    return [...commonFields, ...SHFYFields]
  }

  if (['QTFY'].includes(form.value.no)) {
    return [...commonFields, ...QTFYFields]
  }

  return [...commonFields]
})
</script>
