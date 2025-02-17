<template>
  <van-field v-model="form.e_personnelCategory" v-show-field="['e_personnelCategory', includeFields]" label="人员类别" name="e_personnelCategory" input-align="right" />

  <van-field v-model="form.e_insuranceExpirationDate" v-show-field="['e_insuranceExpirationDate', includeFields]" label="建议保险开始截止日期" name="e_insuranceExpirationDate" input-align="right">
    <template #input>
      {{ parseTime(form.e_insuranceExpirationDate, '{y}-{m}-{d}') }}
    </template>
  </van-field>

  <van-field v-show-field="['e_latestPurchaseDate', includeFields]" label="保险最晚购买日期" name="e_latestPurchaseDate" input-align="right">
    <template #input>
      {{ parseTime(form.e_latestPurchaseDate, '{y}-{m}-{d}') }}
    </template>
  </van-field>

  <van-field v-model="form.e_purchaseInsuranceReason" v-show-field="['e_purchaseInsuranceReason', includeFields]" label="购买保险原因" name="e_purchaseInsuranceReason" input-align="right" />

  <van-field v-model="form.e_purchaseInsuranceNumber" v-show-field="['e_purchaseInsuranceNumber', includeFields]" label="购买保险人数" name="e_purchaseInsuranceNumber" input-align="right" />

  <van-field v-model="form.e_purchaseInsuranceCategory" v-show-field="['e_purchaseInsuranceCategory', includeFields]" label="购买保险类别" name="e_purchaseInsuranceCategory" input-align="right" />

  <van-field v-model="form.e_isHighVoltageOperation" v-show-field="['e_isHighVoltageOperation', includeFields]" label="是否涉及高压电作业" name="e_isHighVoltageOperation" input-align="right" />

  <van-field v-model="form.e_isClimbingHomework" v-show-field="['e_isClimbingHomework', includeFields]" label="是否涉及登高作业" name="e_isClimbingHomework" input-align="right" />

  <van-field v-model="form.e_insurancePeriod" v-show-field="['e_insurancePeriod', includeFields]" label="保险期限" name="e_insurancePeriod" input-align="right" />

  <van-field v-model="form.e_purchaseInsuranceSpecialExplain" v-show-field="['e_purchaseInsuranceSpecialExplain', includeFields]" label="保险购买特殊说明" name="e_purchaseInsuranceSpecialExplain" input-align="right" />

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
    includeFields: () => ['subjectType', 'deptId', 'psId', 'contractNo', 'itemList', 'amount', 'e_personnelCategory', 'e_insuranceExpirationDate', 'e_latestPurchaseDate', 'e_purchaseInsuranceReason', 'e_purchaseInsuranceNumber', 'e_purchaseInsuranceCategory', 'e_isHighVoltageOperation', 'e_isClimbingHomework', 'e_insurancePeriod', 'e_purchaseInsuranceSpecialExplain', 'reason', 'receiptInfo', 'ossIdList'],
  },
)
const form = inject<Ref<DailyFeeForm>>('form')
// 指令
const vShowField = createFieldVisibilityDirective<DailyFeeForm>()
</script>
