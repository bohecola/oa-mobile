<template>
  <van-field v-show-field="['qq_deptId', includeFields]" label="部门/项目部" name="qq_deptId" input-align="left">
    <template #input>
      <DeptSelect v-model="form.qq_deptId" readonly />
    </template>
  </van-field>

  <van-field v-show-field="['qq_personnelCategory', includeFields]" label="人员类别" name="qq_personnelCategory" input-align="left">
    <template #input>
      <DictSelect v-model="form.qq_personnelCategory" dict-type="oa_daily_work_personnel_category" readonly />
    </template>
  </van-field>

  <van-field v-if="!isEmpty(form.qq_insuranceExpirationDate)" v-show-field="['qq_insuranceExpirationDate', includeFields]" label="建议保险开始截止日期" name="qq_insuranceExpirationDate" input-align="left">
    <template #input>
      {{ parseTime(form.qq_insuranceExpirationDate[0], '{y}-{m}-{d}') }} ~ {{ parseTime(form.qq_insuranceExpirationDate[1], '{y}-{m}-{d}') }}
    </template>
  </van-field>

  <van-field v-if="form.qq_insuranceExpirationStartDate" v-show-field="['qq_insuranceExpirationStartDate', includeFields]" label="建议保险开始日期" name="qq_insuranceExpirationStartDate" input-align="left">
    <template #input>
      {{ parseTime(form.qq_insuranceExpirationStartDate, '{y}-{m}-{d}') }}
    </template>
  </van-field>

  <van-field v-if="form.qq_insuranceExpirationEndDate" v-show-field="['qq_insuranceExpirationEndDate', includeFields]" label="建议保险截止日期" name="qq_insuranceExpirationEndDate" input-align="left">
    <template #input>
      {{ parseTime(form.qq_insuranceExpirationEndDate, '{y}-{m}-{d}') }}
    </template>
  </van-field>

  <van-field v-show-field="['qq_latestPurchaseDate', includeFields]" label="保险最晚购买日期" name="qq_latestPurchaseDate" input-align="left">
    <template #input>
      {{ parseTime(form.qq_latestPurchaseDate, '{y}-{m}-{d}') }}
    </template>
  </van-field>

  <van-field v-model="form.qq_purchaseInsuranceNumber" v-show-field="['qq_purchaseInsuranceNumber', includeFields]" label="购买保险人数" name="qq_purchaseInsuranceNumber" input-align="left" />

  <van-field v-show-field="['qq_purchaseInsuranceCategory', includeFields]" label="购买保险类别" name="qq_purchaseInsuranceCategory" input-align="left">
    <template #input>
      <DictSelect v-model="form.qq_purchaseInsuranceCategory" dict-type="oa_daily_work_purchase_insurance_category" readonly />
    </template>
  </van-field>

  <van-field v-model="form.qq_insuranceLimit" v-show-field="['qq_insuranceLimit', includeFields]" label="购买保险额度(万元)" name="qq_insuranceLimit" input-align="left" />

  <van-field v-show-field="['qq_isHighVoltageOperation', includeFields]" label="是否涉及高压电作业" name="qq_isHighVoltageOperation" input-align="left">
    <template #input>
      <YesNoSwitch v-model="form.qq_isHighVoltageOperation" readonly />
    </template>
  </van-field>

  <van-field v-show-field="['qq_isClimbingHomework', includeFields]" label="是否涉及登高作业" name="qq_isClimbingHomework" input-align="left">
    <template #input>
      <YesNoSwitch v-model="form.qq_isClimbingHomework" readonly />
    </template>
  </van-field>

  <van-field v-if="form.qq_isClimbingHomework === 'Y'" v-model="form.qq_distanceRange" v-show-field="['qq_distanceRange', includeFields]" label="登高作业位置到地面的距离范围(米)" name="qq_distanceRange" input-align="left" />

  <van-field v-show-field="['qq_isNewHiredPurchaseInsurance', includeFields]" label="该项目部新入职人员是否购买此类保险" name="qq_isNewHiredPurchaseInsurance" input-align="left">
    <template #input>
      <YesNoSwitch v-model="form.qq_isNewHiredPurchaseInsurance" readonly />
    </template>
  </van-field>
  <van-field v-show-field="['qq_transferInDeptPurchaseInsurance', includeFields]" label="调入该项目部是否购买此类保险" name="qq_transferInDeptPurchaseInsurance" input-align="left">
    <template #input>
      <YesNoSwitch v-model="form.qq_transferInDeptPurchaseInsurance" readonly />
    </template>
  </van-field>
  <van-field v-show-field="['qq_transferOutDeptNoPurchaseInsurance', includeFields]" label="调出该项目部是否取消购买此类保险" name="qq_transferOutDeptNoPurchaseInsurance" input-align="left">
    <template #input>
      <YesNoSwitch v-model="form.qq_transferOutDeptNoPurchaseInsurance" readonly />
    </template>
  </van-field>

  <van-field v-show-field="['qq_isEarlyStagePurchaseInsurance', includeFields]" label="该项目部前期是否已购买其他商业类保险" name="qq_isEarlyStagePurchaseInsurance" input-align="left">
    <template #input>
      <YesNoSwitch v-model="form.qq_isEarlyStagePurchaseInsurance" readonly />
    </template>
  </van-field>

  <van-field v-if="form.qq_isEarlyStagePurchaseInsurance === 'Y'" v-show-field="['qq_isOldInsuranceTermination', includeFields]" label="原特殊商业保险是否终止" name="qq_isOldInsuranceTermination" input-align="left">
    <template #input>
      <YesNoSwitch v-model="form.qq_isOldInsuranceTermination" readonly />
    </template>
  </van-field>

  <van-field v-if="form.qq_isOldInsuranceTermination === 'Y'" v-model="form.qq_isOldInsuranceTerminationReason" v-show-field="['qq_isOldInsuranceTerminationReason', includeFields]" label="原特殊商业保险终止原因说明" name="qq_isOldInsuranceTerminationReason" input-align="left">
    <template #input>
      <TextareaView :value="form.qq_isOldInsuranceTerminationReason" />
    </template>
  </van-field>

  <van-field v-show-field="['qq_isBelong', includeFields]" label="人员是否属于该项目部" name="qq_isBelong" input-align="left">
    <template #input>
      <YesNoSwitch v-model="form.qq_isBelong" readonly />
    </template>
  </van-field>

  <van-field v-if="form.qq_isBelong === 'N'" v-model="form.qq_notBelongDeptPurchaseInsuranceSpecialReason" v-show-field="['qq_notBelongDeptPurchaseInsuranceSpecialReason', includeFields]" label="不属于该项目部人员购买保险原因" name="qq_notBelongDeptPurchaseInsuranceSpecialReason" input-align="left">
    <template #input>
      <TextareaView :value="form.qq_notBelongDeptPurchaseInsuranceSpecialReason" />
    </template>
  </van-field>

  <van-field v-model="form.qq_insurancePeriod" v-show-field="['qq_insurancePeriod', includeFields]" label="保险期限" name="qq_insurancePeriod" input-align="left" />

  <van-field v-model="form.qq_purchaseInsuranceReason" v-show-field="['qq_purchaseInsuranceReason', includeFields]" label="购买保险原因" name="qq_purchaseInsuranceReason" input-align="left">
    <template #input>
      <TextareaView :value="form.qq_purchaseInsuranceReason" />
    </template>
  </van-field>

  <van-field v-model="form.qq_purchaseInsuranceSpecialExplain" v-show-field="['qq_purchaseInsuranceSpecialExplain', includeFields]" label="保险购买特殊说明" name="qq_purchaseInsuranceSpecialExplain" input-align="left">
    <template #input>
      <TextareaView :value="form.qq_purchaseInsuranceSpecialExplain" />
    </template>
  </van-field>

  <BaseDetail :include-fields="includeFields" />
</template>

<script setup lang="ts">
import { isEmpty } from 'lodash-es'
import BaseDetail from '../../../../components/BaseDetail.vue'
import type { DailyWorkForm } from '@/api/oa/daily/work/types'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'

withDefaults(
  defineProps<{
    includeFields?: KeysOfArray<DailyWorkForm>
  }>(),
  {
    includeFields: () => [
      'qq_deptId',
      'qq_personnelCategory',
      'qq_insuranceExpirationDate',
      'qq_insuranceExpirationStartDate',
      'qq_insuranceExpirationEndDate',
      'qq_latestPurchaseDate',
      'qq_purchaseInsuranceReason',
      'qq_purchaseInsuranceNumber',
      'qq_purchaseInsuranceCategory',
      'qq_insuranceLimit',
      'qq_isHighVoltageOperation',
      'qq_isClimbingHomework',
      'qq_distanceRange',
      'qq_insurancePeriod',
      'qq_purchaseInsuranceSpecialExplain',
      'qq_isNewHiredPurchaseInsurance',
      'qq_transferInDeptPurchaseInsurance',
      'qq_transferOutDeptNoPurchaseInsurance',
      'qq_isEarlyStagePurchaseInsurance',
      'qq_isBelong',
      'qq_notBelongDeptPurchaseInsuranceSpecialReason',
      'qq_isOldInsuranceTermination',
      'qq_isOldInsuranceTerminationReason',
      'reason',
      'ossIdList',
    ],
  },
)

const form = inject<Ref<DailyWorkForm>>('form')
// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>(form)
</script>
