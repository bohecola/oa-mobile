<template>
  <FeeBaseDetail :include-fields="includeFields1" />

  <DeptSelect
    v-model="form.e_deptId"
    v-show-field="['e_deptId', includeFields]"
    name="e_deptId"
    label="部门/项目部"
  />

  <DictSelect
    v-model="form.e_personnelCategory"
    v-show-field="['e_personnelCategory', includeFields]"
    label="人员类别"
    name="e_personnelCategory"
    dict-type="oa_daily_work_personnel_category"
  />

  <van-field
    v-if="!isEmpty(form.e_insuranceExpirationDate)"
    v-show-field="['e_insuranceExpirationDate', includeFields]"
    label="建议保险开始截止日期"
    name="e_insuranceExpirationDate"
  >
    <template #input>
      {{ parseTime(form.e_insuranceExpirationDate[0], '{y}-{m}-{d}') }} ~
      {{ parseTime(form.e_insuranceExpirationDate[1], '{y}-{m}-{d}') }}
    </template>
  </van-field>

  <DateSelect
    v-model="form.e_insuranceExpirationStartDate"
    v-show-field="['e_insuranceExpirationStartDate', includeFields]"
    name="e_insuranceExpirationStartDate"
    label="建议保险开始日期"
  />

  <DateSelect
    v-model="form.e_insuranceExpirationEndDate"
    v-show-field="['e_insuranceExpirationEndDate', includeFields]"
    name="e_insuranceExpirationEndDate"
    label="建议保险截止日期"
  />

  <DateSelect
    v-model="form.e_latestPurchaseDate"
    v-show-field="['e_latestPurchaseDate', includeFields]"
    name="e_latestPurchaseDate"
    label="保险最晚购买日期"
  />

  <van-field
    v-model="form.e_purchaseInsuranceNumber"
    v-show-field="['e_purchaseInsuranceNumber', includeFields]"
    label="购买保险人数"
    name="e_purchaseInsuranceNumber"
  />

  <DictSelect
    v-model="form.e_purchaseInsuranceCategory"
    v-show-field="['e_purchaseInsuranceCategory', includeFields]"
    label="购买保险类别"
    name="e_purchaseInsuranceCategory"
    dict-type="oa_daily_work_purchase_insurance_category"
  />

  <van-field
    v-model="form.e_insuranceLimit"
    v-show-field="['e_insuranceLimit', includeFields]"
    label="购买保险额度(万元)"
    name="e_insuranceLimit"
  />

  <van-field
    v-show-field="['e_isHighVoltageOperation', includeFields]"
    label="是否涉及高压电作业"
    name="e_isHighVoltageOperation"
  >
    <template #input>
      <YesNoSwitch
        v-model="form.e_isHighVoltageOperation"
        readonly
      />
    </template>
  </van-field>

  <van-field
    v-show-field="['e_isClimbingHomework', includeFields]"
    label="是否涉及登高作业"
    name="e_isClimbingHomework"
  >
    <template #input>
      <YesNoSwitch
        v-model="form.e_isClimbingHomework"
        readonly
      />
    </template>
  </van-field>

  <van-field
    v-if="form.e_isClimbingHomework === 'Y'"
    v-model="form.e_distanceRange"
    v-show-field="['e_distanceRange', includeFields]"
    label="登高作业位置到地面的距离范围(米)"
    name="e_distanceRange"
  />

  <van-field v-show-field="['e_isContractPurchaseInsurance', includeFields]" label="合同中是否要求购买此类保险" name="e_isContractPurchaseInsurance" input-align="left">
    <template #input>
      <YesNoSwitch v-model="form.e_isContractPurchaseInsurance" readonly />
    </template>
  </van-field>

  <van-field
    v-show-field="['e_isNewHiredPurchaseInsurance', includeFields]"
    label="该项目部新入职人员是否购买此类保险"
    name="e_isNewHiredPurchaseInsurance"
  >
    <template #input>
      <YesNoSwitch
        v-model="form.e_isNewHiredPurchaseInsurance"
        readonly
      />
    </template>
  </van-field>

  <van-field
    v-show-field="['e_transferInDeptPurchaseInsurance', includeFields]"
    label="调入该项目部是否购买此类保险"
    name="e_transferInDeptPurchaseInsurance"
  >
    <template #input>
      <YesNoSwitch
        v-model="form.e_transferInDeptPurchaseInsurance"
        readonly
      />
    </template>
  </van-field>

  <van-field
    v-show-field="['e_transferOutDeptNoPurchaseInsurance', includeFields]"
    label="调出该项目部是否取消购买此类保险"
    name="e_transferOutDeptNoPurchaseInsurance"
  >
    <template #input>
      <YesNoSwitch
        v-model="form.e_transferOutDeptNoPurchaseInsurance"
        readonly
      />
    </template>
  </van-field>

  <van-field
    v-show-field="['e_isEarlyStagePurchaseInsurance', includeFields]"
    label="该项目部前期是否已购买其他商业类保险"
    name="e_isEarlyStagePurchaseInsurance"
  >
    <template #input>
      <YesNoSwitch
        v-model="form.e_isEarlyStagePurchaseInsurance"
        readonly
      />
    </template>
  </van-field>

  <van-field
    v-if="form.e_isEarlyStagePurchaseInsurance === 'Y'"
    v-show-field="['e_isOldInsuranceTermination', includeFields]"
    label="原特殊商业保险是否终止"
    name="e_isOldInsuranceTermination"
  >
    <template #input>
      <YesNoSwitch
        v-model="form.e_isOldInsuranceTermination"
        readonly
      />
    </template>
  </van-field>

  <van-field
    v-if="form.e_isOldInsuranceTermination === 'Y'"
    v-model="form.e_isOldInsuranceTerminationReason"
    v-show-field="['e_isOldInsuranceTerminationReason', includeFields]"
    label="原特殊商业保险终止原因说明"
    name="e_isOldInsuranceTerminationReason"
  >
    <template #input>
      <TextareaView :value="form.e_isOldInsuranceTerminationReason" />
    </template>
  </van-field>

  <van-field
    v-show-field="['e_isBelong', includeFields]"
    label="人员是否属于该项目部"
    name="e_isBelong"
  >
    <template #input>
      <YesNoSwitch
        v-model="form.e_isBelong"
        readonly
      />
    </template>
  </van-field>

  <van-field
    v-if="form.e_isBelong === 'N'"
    v-model="form.e_notBelongDeptPurchaseInsuranceSpecialReason"
    v-show-field="['e_notBelongDeptPurchaseInsuranceSpecialReason', includeFields]"
    label="不属于该项目部人员购买保险原因"
    name="e_notBelongDeptPurchaseInsuranceSpecialReason"
  >
    <template #input>
      <TextareaView :value="form.e_notBelongDeptPurchaseInsuranceSpecialReason" />
    </template>
  </van-field>

  <van-field
    v-model="form.e_insurancePeriod"
    v-show-field="['e_insurancePeriod', includeFields]"
    label="保险期限"
    name="e_insurancePeriod"
  />

  <van-field
    v-show-field="['e_purchaseInsuranceReason', includeFields]"
    label="购买保险原因"
    name="e_purchaseInsuranceReason"
  >
    <template #input>
      <TextareaView :value="form.e_purchaseInsuranceReason" />
    </template>
  </van-field>

  <van-field
    v-model="form.e_purchaseInsuranceSpecialExplain"
    v-show-field="['e_purchaseInsuranceSpecialExplain', includeFields]"
    label="保险购买特殊说明"
    name="e_purchaseInsuranceSpecialExplain"
  >
    <template #input>
      <TextareaView :value="form.e_purchaseInsuranceSpecialExplain" />
    </template>
  </van-field>

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
    includeFields: () => ['subjectType', 'deptId', 'psId', 'contractNo', 'itemList', 'amount', 'e_deptId', 'e_personnelCategory', 'e_insuranceExpirationDate', 'e_insuranceExpirationStartDate', 'e_insuranceExpirationEndDate', 'e_latestPurchaseDate', 'e_purchaseInsuranceReason', 'e_purchaseInsuranceNumber', 'e_purchaseInsuranceCategory', 'e_insuranceLimit', 'e_isHighVoltageOperation', 'e_isClimbingHomework', 'e_distanceRange', 'e_insurancePeriod', 'e_purchaseInsuranceSpecialExplain', 'e_isNewHiredPurchaseInsurance', 'e_transferInDeptPurchaseInsurance', 'e_transferOutDeptNoPurchaseInsurance', 'e_isEarlyStagePurchaseInsurance', 'e_isBelong', 'e_notBelongDeptPurchaseInsuranceSpecialReason', 'e_isOldInsuranceTermination', 'e_isOldInsuranceTerminationReason', 'e_isContractPurchaseInsurance', 'reason', 'receiptInfo', 'ossIdList'],
  },
)
const form = inject<Ref<DailyFeeForm>>('form')
// 指令
const vShowField = createFieldVisibilityDirective<DailyFeeForm>(form)

const includeFields1 = computed(() => props.includeFields.filter(e => !['reason', 'receiptInfo', 'ossIdList'].includes(e)))
const includeFields2 = computed(() => props.includeFields.filter(e => ['reason', 'receiptInfo', 'ossIdList'].includes(e)))
</script>
