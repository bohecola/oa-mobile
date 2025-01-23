<template>
  <FeeBaseDetail :include-fields="includeFields" />
</template>

<script setup lang="ts">
import FeeBaseDetail from '../../../components/FeeBaseDetail.vue'
import type { DailyFeeForm } from '@/api/oa/daily/fee/types'

withDefaults(
  defineProps<{
    includeFields?: KeysOfArray<DailyFeeForm>
  }>(),
  {
    includeFields: () => ['subjectType', 'deptId', 'psId', 'contractId', 'itemList', 'amount', 'reason', 'receiptInfo', 'ossIdList'],
  },
)
</script>
