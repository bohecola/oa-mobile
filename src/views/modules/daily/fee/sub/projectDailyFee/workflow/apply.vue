<template>
  <detail v-if="isView" :include-fields="includeFieldsNo" />
  <template v-else>
    <!-- 项目日常费用 -->
    <div v-if="taskDefinitionKey === 'Activity_0wh1ixm'">
      <!-- <upsert :include-fields="includeFieldsNo" /> -->
    </div>

    <!-- 其他审批通用节点 -->
    <div v-else>
      <detail :include-fields="includeFieldsNo" />
    </div>
  </template>
</template>

<script setup lang="ts">
import detail from '../detail.vue'
import type { DailyFeeForm } from '@/api/oa/daily/fee/types'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'

const props = withDefaults(
  defineProps<{
    includeFields?: KeysOfArray<DailyFeeForm>
  }>(),
  {
    includeFields: () => [
      'subjectType',
      'deptId',
      'psId',
      'contractNo',
      'itemList',
      'amount',
      'c_startDate',
      'c_endDate',
      'c_paymentMethod',
      'c_invoiceType',
      'reason',
      'receiptInfo',
      'ossIdList',
    ],
  },
)

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

const form = inject<Ref<DailyFeeForm>>('form')

const includeFieldsNo = computed(() => {
  if (['WYF', 'SDF', 'RQF', 'WF', 'YXDS', 'QNF', 'HFCQLF', 'SHWSCL', 'LJQL'].includes(form.value.no)) {
    return [...commonFields, ...SHFYFields]
  }
  return [...commonFields]
})

// 指令
const vShowField = createFieldVisibilityDirective<DailyFeeForm>()
</script>
