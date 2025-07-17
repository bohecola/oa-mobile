<template>
  <FeeBaseDetail :include-fields="includeFields1" />

  <DictSelect
    v-if="form.no === 'PXFY'"
    v-model="form.certificateType"
    v-show-field="['certificateType', includeFields]"
    label="证件类型"
    name="certificateType"
    dict-type="oa_project_daily_fee_certificate_type"
    multiple
  />

  <DateSelect
    v-model="form.c_startDate"
    v-show-field="['c_startDate', includeFields]"
    name="c_startDate"
    label="开始时间"
  />

  <DateSelect
    v-model="form.c_endDate"
    v-show-field="['c_endDate', includeFields]"
    name="c_endDate"
    label="结束时间"
  />

  <van-field
    v-show-field="['isSGZFF', includeFields]"
    name="isSGZFF"
    label="随工资发放"
  >
    <template #input>
      <YesNoSwitch v-model="form.isSGZFF" readonly />
    </template>
  </van-field>

  <FeeBaseDetail :include-fields="includeFields2" />
</template>

<script setup lang="ts">
import FeeBaseDetail from '../../../components/FeeBaseDetail.vue'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'
import type { DailyFeeForm } from '@/api/oa/daily/fee/types'

const props = withDefaults(
  defineProps<{
    includeFields?: KeysOfArray<DailyFeeForm>
  }>(),
  {
    includeFields: () => ['subjectType', 'deptId', 'psId', 'contractNo', 'itemList', 'amount', 'certificateType', 'c_startDate', 'c_endDate', 'c_paymentMethod', 'c_invoiceType', 'reason', 'receiptInfo', 'ossIdList'],
  },
)

const form = inject<Ref<DailyFeeForm>>('form')

// 指令
const vShowField = createFieldVisibilityDirective<DailyFeeForm>(form)

const includeFields1 = computed(() => props.includeFields.filter(e => !['reason', 'receiptInfo', 'ossIdList'].includes(e)))
const includeFields2 = computed(() => props.includeFields.filter(e => ['reason', 'receiptInfo', 'ossIdList'].includes(e)))
</script>
