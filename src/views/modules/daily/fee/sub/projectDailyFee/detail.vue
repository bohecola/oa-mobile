<template>
  <van-field v-if="form.no === 'PXFY'" v-show-field="['certificateType', includeFields]" label="证件类型" name="certificateType" input-align="right">
    <template #input>
      <DictSelect v-model="form.certificateType" dict-type="oa_project_daily_fee_certificate_type" multiple readonly />
    </template>
  </van-field>

  <van-field v-show-field="['c_startDate', includeFields]" label="开始时间" name="c_startDate" input-align="right">
    <template #input>
      {{ parseTime(form.c_startDate, '{y}-{m}-{d}') }}
    </template>
  </van-field>

  <van-field v-show-field="['c_endDate', includeFields]" label="结束时间" name="c_endDate" input-align="right">
    <template #input>
      {{ parseTime(form.c_endDate, '{y}-{m}-{d}') }}
    </template>
  </van-field>

  <!-- <van-field v-model="form.c_paymentMethod" v-show-field="['c_paymentMethod', includeFields]" label="付款方式" name="c_paymentMethod" input-align="right" />

  <van-field v-model="form.c_invoiceType" v-show-field="['c_invoiceType', includeFields]" label="发票类型" name="c_invoiceType" input-align="right" /> -->

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
    includeFields: () => ['subjectType', 'deptId', 'psId', 'contractNo', 'itemList', 'amount', 'certificateType', 'c_startDate', 'c_endDate', 'c_paymentMethod', 'c_invoiceType', 'reason', 'receiptInfo', 'ossIdList'],
  },
)

const form = inject<Ref<DailyFeeForm>>('form')

// 指令
const vShowField = createFieldVisibilityDirective<DailyFeeForm>(form)
</script>
