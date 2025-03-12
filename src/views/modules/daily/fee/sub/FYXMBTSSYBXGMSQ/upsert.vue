<template>
  <FeeBaseDetail :include-fields="includeFields1" />
  <van-field v-show-field="['e_deptId', includeFields]" label="部门/项目部" name="e_deptId" input-align="left">
    <template #input>
      <DeptSelect v-model="form.e_deptId" />
    </template>
  </van-field>

  <van-field v-show-field="['e_personnelCategory', includeFields]" label="人员类别" name="e_personnelCategory" input-align="left">
    <template #input>
      <DictSelect v-model="form.e_personnelCategory" dict-type="oa_daily_work_personnel_category" />
    </template>
  </van-field>

  <van-field v-if="!isEmpty(form.e_insuranceExpirationDate)" v-show-field="['e_insuranceExpirationDate', includeFields]" label="建议保险开始截止日期" name="e_insuranceExpirationDate" input-align="left">
    <template #input>
      {{ parseTime(form.e_insuranceExpirationDate[0], '{y}-{m}-{d}') }} ~ {{ parseTime(form.e_insuranceExpirationDate[1], '{y}-{m}-{d}') }}
    </template>
  </van-field>

  <van-field v-if="form.e_insuranceExpirationStartDate" v-show-field="['e_insuranceExpirationStartDate', includeFields]" label="建议保险开始日期" name="e_insuranceExpirationStartDate" input-align="left">
    <template #input>
      {{ parseTime(form.e_insuranceExpirationStartDate, '{y}-{m}-{d}') }}
    </template>
  </van-field>

  <van-field v-if="form.e_insuranceExpirationEndDate" v-show-field="['e_insuranceExpirationEndDate', includeFields]" label="建议保险截止日期" name="e_insuranceExpirationEndDate" input-align="left">
    <template #input>
      {{ parseTime(form.e_insuranceExpirationEndDate, '{y}-{m}-{d}') }}
    </template>
  </van-field>

  <van-field v-show-field="['e_latestPurchaseDate', includeFields]" label="保险最晚购买日期" name="e_latestPurchaseDate" input-align="left">
    <template #input>
      {{ parseTime(form.e_latestPurchaseDate, '{y}-{m}-{d}') }}
    </template>
  </van-field>

  <van-field v-model="form.e_purchaseInsuranceNumber" v-show-field="['e_purchaseInsuranceNumber', includeFields]" label="购买保险人数" placeholder="请输入" name="e_purchaseInsuranceNumber" input-align="left" />

  <van-field v-model="form.e_purchaseInsuranceCategory" v-show-field="['e_purchaseInsuranceCategory', includeFields]" label="购买保险类别" name="e_purchaseInsuranceCategory" input-align="left">
    <template #input>
      <DictSelect v-model="form.e_purchaseInsuranceCategory" dict-type="oa_daily_work_purchase_insurance_category" />
    </template>
  </van-field>

  <van-field v-model="form.e_insuranceLimit" v-show-field="['e_insuranceLimit', includeFields]" label="购买保险额度(万元)" placeholder="请输入" name="e_insuranceLimit" input-align="left" />

  <van-field v-show-field="['e_isHighVoltageOperation', includeFields]" label="是否涉及高压电作业" name="e_isHighVoltageOperation" input-align="left">
    <template #input>
      <YesNoSwitch v-model="form.e_isHighVoltageOperation" />
    </template>
  </van-field>

  <van-field v-show-field="['e_isClimbingHomework', includeFields]" label="是否涉及登高作业" name="e_isClimbingHomework" input-align="left">
    <template #input>
      <YesNoSwitch v-model="form.e_isClimbingHomework" />
    </template>
  </van-field>

  <van-field v-if="form.e_isClimbingHomework === 'Y'" v-model="form.e_distanceRange" v-show-field="['e_distanceRange', includeFields]" label="登高作业位置到地面的距离范围(米)" placeholder="请输入" name="e_distanceRange" input-align="left" />

  <van-field v-show-field="['e_isNewHiredPurchaseInsurance', includeFields]" label="该项目部新入职人员是否购买此类保险" name="e_isNewHiredPurchaseInsurance" input-align="left">
    <template #input>
      <YesNoSwitch v-model="form.e_isNewHiredPurchaseInsurance" />
    </template>
  </van-field>
  <van-field v-show-field="['e_transferInDeptPurchaseInsurance', includeFields]" label="调入该项目部是否购买此类保险" name="e_transferInDeptPurchaseInsurance" input-align="left">
    <template #input>
      <YesNoSwitch v-model="form.e_transferInDeptPurchaseInsurance" />
    </template>
  </van-field>
  <van-field v-show-field="['e_transferOutDeptNoPurchaseInsurance', includeFields]" label="调出该项目部是否取消购买此类保险" name="e_transferOutDeptNoPurchaseInsurance" input-align="left">
    <template #input>
      <YesNoSwitch v-model="form.e_transferOutDeptNoPurchaseInsurance" />
    </template>
  </van-field>

  <van-field v-show-field="['e_isEarlyStagePurchaseInsurance', includeFields]" label="该项目部前期是否已购买其他商业类保险" name="e_isEarlyStagePurchaseInsurance" input-align="left">
    <template #input>
      <YesNoSwitch v-model="form.e_isEarlyStagePurchaseInsurance" />
    </template>
  </van-field>

  <van-field v-if="form.e_isEarlyStagePurchaseInsurance === 'Y'" v-show-field="['e_isOldInsuranceTermination', includeFields]" label="原特殊商业保险是否终止" name="e_isOldInsuranceTermination" input-align="left">
    <template #input>
      <YesNoSwitch v-model="form.e_isOldInsuranceTermination" />
    </template>
  </van-field>

  <van-field v-if="form.e_isOldInsuranceTermination === 'Y'" v-model="form.e_isOldInsuranceTerminationReason" v-show-field="['e_isOldInsuranceTerminationReason', includeFields]" type="textarea" rows="2" label="原特殊商业保险终止原因说明" name="e_isOldInsuranceTerminationReason" input-align="left" />

  <van-field v-show-field="['e_isBelong', includeFields]" label="人员是否属于该项目部" name="e_isBelong" input-align="left">
    <template #input>
      <YesNoSwitch v-model="form.e_isBelong" />
    </template>
  </van-field>

  <van-field v-if="form.e_isBelong === 'N'" v-model="form.e_notBelongDeptPurchaseInsuranceSpecialReason" v-show-field="['e_notBelongDeptPurchaseInsuranceSpecialReason', includeFields]" type="textarea" rows="2" label="不属于该项目部人员购买保险原因" name="e_notBelongDeptPurchaseInsuranceSpecialReason" input-align="left" />

  <van-field v-model="form.e_insurancePeriod" v-show-field="['e_insurancePeriod', includeFields]" label="保险期限" placeholder="请输入" name="e_insurancePeriod" input-align="left" />

  <van-field v-show-field="['e_purchaseInsuranceReason', includeFields]" type="textarea" rows="2" label="购买保险原因" name="e_purchaseInsuranceReason" input-align="left" />

  <van-field v-model="form.e_purchaseInsuranceSpecialExplain" v-show-field="['e_purchaseInsuranceSpecialExplain', includeFields]" type="textarea" rows="2" label="保险购买特殊说明" name="e_purchaseInsuranceSpecialExplain" input-align="left" />

  <FeeBaseDetail :include-fields="includeFields2" />
</template>

<script setup lang="ts">
import { isEmpty } from 'lodash-es'
import FeeBaseDetail from '../../../components/FeeBaseDetail.vue'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'
import type { DailyFeeForm } from '@/api/oa/daily/fee/types'

const props = withDefaults(
  defineProps<{
    includeFields?: KeysOfArray<DailyFeeForm>
  }>(),
  {
    includeFields: () => ['subjectType', 'deptId', 'psId', 'contractNo', 'itemList', 'amount', 'e_deptId', 'e_personnelCategory', 'e_insuranceExpirationDate', 'e_insuranceExpirationStartDate', 'e_insuranceExpirationEndDate', 'e_latestPurchaseDate', 'e_purchaseInsuranceReason', 'e_purchaseInsuranceNumber', 'e_purchaseInsuranceCategory', 'e_insuranceLimit', 'e_isHighVoltageOperation', 'e_isClimbingHomework', 'e_distanceRange', 'e_insurancePeriod', 'e_purchaseInsuranceSpecialExplain', 'e_isNewHiredPurchaseInsurance', 'e_transferInDeptPurchaseInsurance', 'e_transferOutDeptNoPurchaseInsurance', 'e_isEarlyStagePurchaseInsurance', 'e_isBelong', 'e_notBelongDeptPurchaseInsuranceSpecialReason', 'e_isOldInsuranceTermination', 'e_isOldInsuranceTerminationReason', 'reason', 'receiptInfo', 'ossIdList'],
  },
)
const form = inject<Ref<DailyFeeForm>>('form')
// 指令
const vShowField = createFieldVisibilityDirective<DailyFeeForm>()

// 依赖收集
const trackFields = inject<TrackFieldsFn<DailyFeeForm>>('trackFields')
trackFields(props.includeFields)

const includeFields1 = computed(() => props.includeFields.filter(e => !['reason', 'receiptInfo', 'ossIdList'].includes(e)))
const includeFields2 = computed(() => props.includeFields.filter(e => ['reason', 'receiptInfo', 'ossIdList'].includes(e)))
</script>
