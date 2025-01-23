<template>
  <van-field v-show-field="['isAdministration', includeFields]" label="行政部协助" name="isAdministration" input-align="right">
    <template #input>
      <YesNoSwitch v-model="form.isAdministration" readonly />
    </template>
  </van-field>

  <FeeBaseDetail :include-fields="includeFields" />
</template>

<script setup lang="ts">
import FeeBaseDetail from '../../../components/FeeBaseDetail.vue'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'
import type { DailyFeeForm } from '@/api/oa/daily/fee/types'

withDefaults(
  defineProps<{
    includeFields?: KeysOfArray<DailyFeeForm>
  }>(),
  {
    includeFields: () => ['subjectType', 'deptId', 'psId', 'contractId', 'itemList', 'amount', 'isAdministration', 'reason', 'receiptInfo', 'ossIdList'],
  },
)

const form = inject<Ref<DailyFeeForm>>('form')

// 指令
const vShowField = createFieldVisibilityDirective<DailyFeeForm>()
</script>
