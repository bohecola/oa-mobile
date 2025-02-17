<template>
  <van-field v-model="form.f_applyNumber" v-show-field="['f_applyNumber', includeFields]" label="申请人数" name="f_applyNumber" input-align="right" />

  <FeeBaseDetail :include-fields="includeFields" />
</template>

<script setup lang="ts">
import FeeBaseDetail from '../../../components/FeeBaseDetail.vue'
import type { DailyFeeForm } from '@/api/oa/daily/fee/types'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'

withDefaults(
  defineProps<{
    includeFields?: KeysOfArray<DailyFeeForm>
  }>(),
  {
    includeFields: () => ['subjectType', 'deptId', 'psId', 'contractNo', 'itemList', 'amount', 'f_applyNumber', 'reason', 'receiptInfo', 'ossIdList'],
  },
)
const form = inject<Ref<DailyFeeForm>>('form')
// 指令
const vShowField = createFieldVisibilityDirective<DailyFeeForm>(form)
</script>
