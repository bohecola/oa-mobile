<template>
  <van-field v-model="form.qq_personnelCategory" v-show-field="['qq_personnelCategory', includeFields]" label="人员类别" name="qq_personnelCategory" input-align="right" />

  <van-field v-show-field="['qq_insuranceExpirationDate', includeFields]" label="建议保险开始截止日期" name="qq_insuranceExpirationDate" input-align="right">
    <template #input>
      {{ parseTime(form.qq_insuranceExpirationDate, '{y}-{m}-{d}') }}
    </template>
  </van-field>

  <van-field v-show-field="['qq_latestPurchaseDate', includeFields]" label="保险最晚购买日期" name="qq_latestPurchaseDate" input-align="right">
    <template #input>
      {{ parseTime(form.qq_latestPurchaseDate, '{y}-{m}-{d}') }}
    </template>
  </van-field>

  <van-field v-model="form.qq_purchaseInsuranceReason" v-show-field="['qq_purchaseInsuranceReason', includeFields]" label="购买保险原因" name="qq_purchaseInsuranceReason" input-align="right" />

  <van-field v-model="form.qq_purchaseInsuranceNumber" v-show-field="['qq_purchaseInsuranceNumber', includeFields]" label="购买保险人数" name="qq_purchaseInsuranceNumber" input-align="right" />

  <van-field v-model="form.qq_purchaseInsuranceCategory" v-show-field="['qq_purchaseInsuranceCategory', includeFields]" label="购买保险类别" name="qq_purchaseInsuranceCategory" input-align="right" />

  <van-field v-model="form.qq_isHighVoltageOperation" v-show-field="['qq_isHighVoltageOperation', includeFields]" label="是否涉及高压电作业" name="qq_isHighVoltageOperation" input-align="right">
    <template #input>
      <YesNoSwitch v-model.trim="form.qq_isHighVoltageOperation" readonly />
    </template>
  </van-field>

  <van-field v-model="form.qq_isClimbingHomework" v-show-field="['qq_isClimbingHomework', includeFields]" label="是否涉及登高作业" name="qq_isClimbingHomework" input-align="right">
    <template #input>
      <YesNoSwitch v-model.trim="form.qq_isClimbingHomework" readonly />
    </template>
  </van-field>

  <van-field v-model="form.qq_insurancePeriod" v-show-field="['qq_insurancePeriod', includeFields]" label="保险期限" name="qq_insurancePeriod" input-align="right" />

  <van-field v-model="form.qq_purchaseInsuranceSpecialExplain" v-show-field="['qq_purchaseInsuranceSpecialExplain', includeFields]" label="保险购买特殊说明" name="qq_purchaseInsuranceSpecialExplain" input-align="right" />

  <BaseDetail :include-fields="includeFields" />
</template>

<script setup lang="ts">
import BaseDetail from '../../../../components/BaseDetail.vue'
import type { DailyWorkForm } from '@/api/oa/daily/work/types'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'

withDefaults(
  defineProps<{
    includeFields?: KeysOfArray<DailyWorkForm>
  }>(),
  {
    includeFields: () => [
      'qq_personnelCategory',
      'qq_insuranceExpirationDate',
      'qq_latestPurchaseDate',
      'qq_purchaseInsuranceReason',
      'qq_purchaseInsuranceNumber',
      'qq_purchaseInsuranceCategory',
      'qq_isHighVoltageOperation',
      'qq_isClimbingHomework',
      'qq_insurancePeriod',
      'qq_purchaseInsuranceSpecialExplain',
      'reason',
      'ossIdList',
    ],
  },
)

const form = inject<Ref<DailyWorkForm>>('form')
// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>(form)
</script>
