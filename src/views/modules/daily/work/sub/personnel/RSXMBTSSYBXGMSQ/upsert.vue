<template>
  <DeptSelect
    v-model="form.qq_deptId"
    v-show-field="['qq_deptId', includeFields]"
    name="qq_deptId"
    label="部门/项目部"
    :rules="computedRules.qq_deptId"
  />

  <DictSelect
    v-model="form.qq_personnelCategory"
    v-show-field="['qq_personnelCategory', includeFields]"
    label="人员类别"
    name="qq_personnelCategory"
    dict-type="oa_daily_work_personnel_category"
    :rules="computedRules.qq_personnelCategory"
    clearable
  />

  <DateSelect
    v-model="form.qq_insuranceExpirationStartDate"
    v-show-field="['qq_insuranceExpirationStartDate', includeFields]"
    name="qq_insuranceExpirationStartDate"
    label="建议保险开始日期"
    :rules="computedRules.qq_insuranceExpirationStartDate"
    clearable
  />

  <DateSelect
    v-model="form.qq_insuranceExpirationEndDate"
    v-show-field="['qq_insuranceExpirationEndDate', includeFields]"
    name="qq_insuranceExpirationEndDate"
    label="建议保险截止日期"
    :rules="computedRules.qq_insuranceExpirationEndDate"
    clearable
  />

  <DateSelect
    v-model="form.qq_latestPurchaseDate"
    v-show-field="['qq_latestPurchaseDate', includeFields]"
    name="qq_latestPurchaseDate"
    label="保险最晚购买日期"
    :rules="computedRules.qq_latestPurchaseDate"
    clearable
  />

  <van-field-number
    v-model.number="form.qq_purchaseInsuranceNumber"
    v-show-field="['qq_purchaseInsuranceNumber', includeFields]"
    label="购买保险人数"
    type="digit"
    placeholder="请输入"
    name="qq_purchaseInsuranceNumber"
    :rules="computedRules.qq_purchaseInsuranceNumber"
    clearable
  />

  <DictSelect
    v-model="form.qq_purchaseInsuranceCategory"
    v-show-field="['qq_purchaseInsuranceCategory', includeFields]"
    label="购买保险类别"
    name="qq_purchaseInsuranceCategory"
    dict-type="oa_daily_work_purchase_insurance_category"
    :rules="computedRules.qq_purchaseInsuranceCategory"
    clearable
  />

  <van-field-number
    v-model.number="form.qq_insuranceLimit"
    v-show-field="['qq_insuranceLimit', includeFields]"
    label="购买保险额度(万元)"
    placeholder="请输入"
    name="qq_insuranceLimit"
    :rules="computedRules.qq_insuranceLimit"
    clearable
  />

  <van-field
    v-show-field="['qq_isHighVoltageOperation', includeFields]"
    label="是否涉及高压电作业"
    name="qq_isHighVoltageOperation"
    :rules="computedRules.qq_isHighVoltageOperation"
  >
    <template #input>
      <YesNoSwitch v-model="form.qq_isHighVoltageOperation" />
    </template>
  </van-field>

  <van-field
    v-show-field="['qq_isClimbingHomework', includeFields]"
    label="是否涉及登高作业"
    name="qq_isClimbingHomework"
    :rules="computedRules.qq_isClimbingHomework"
    @change="onIsClimbingHomeworkChange"
  >
    <template #input>
      <YesNoSwitch v-model="form.qq_isClimbingHomework" />
    </template>
  </van-field>

  <van-field-number
    v-if="form.qq_isClimbingHomework === 'Y'"
    v-model.number="form.qq_distanceRange"
    v-show-field="['qq_distanceRange', includeFields]"
    label="登高作业位置到地面的距离范围(米)"
    placeholder="请输入"
    name="qq_distanceRange"
    :rules="computedRules.qq_distanceRange"
    clearable
  />

  <!-- <van-field
    v-show-field="['qq_isContractPurchaseInsurance', includeFields]"
    label="合同中是否要求购买此类保险"
    name="qq_isContractPurchaseInsurance"
    :rules="computedRules.qq_isContractPurchaseInsurance"
  >
    <template #input>
      <YesNoSwitch v-model="form.qq_isClimbingHomework" readonly />
    </template>
  </van-field> -->

  <van-field
    v-show-field="['qq_isNewHiredPurchaseInsurance', includeFields]"
    label="该项目部新入职人员是否购买此类保险"
    name="qq_isNewHiredPurchaseInsurance"
    :rules="computedRules.qq_isNewHiredPurchaseInsurance"
  >
    <template #input>
      <YesNoSwitch v-model="form.qq_isNewHiredPurchaseInsurance" />
    </template>
  </van-field>

  <van-field
    v-show-field="['qq_transferInDeptPurchaseInsurance', includeFields]"
    label="调入该项目部是否购买此类保险"
    name="qq_transferInDeptPurchaseInsurance"
    :rules="computedRules.qq_transferInDeptPurchaseInsurance"
  >
    <template #input>
      <YesNoSwitch v-model="form.qq_transferInDeptPurchaseInsurance" />
    </template>
  </van-field>

  <van-field
    v-show-field="['qq_transferOutDeptNoPurchaseInsurance', includeFields]"
    label="调出该项目部是否取消购买此类保险"
    name="qq_transferOutDeptNoPurchaseInsurance"
    :rules="computedRules.qq_transferOutDeptNoPurchaseInsurance"
  >
    <template #input>
      <YesNoSwitch v-model="form.qq_transferOutDeptNoPurchaseInsurance" />
    </template>
  </van-field>

  <van-field
    v-show-field="['qq_isEarlyStagePurchaseInsurance', includeFields]"
    label="该项目部前期是否已购买其他商业类保险"
    name="qq_isEarlyStagePurchaseInsurance"
    :rules="computedRules.qq_isEarlyStagePurchaseInsurance"
  >
    <template #input>
      <YesNoSwitch v-model="form.qq_isEarlyStagePurchaseInsurance" />
    </template>
  </van-field>

  <van-field
    v-if="form.qq_isEarlyStagePurchaseInsurance === 'Y'"
    v-show-field="['qq_isOldInsuranceTermination', includeFields]"
    label="原特殊商业保险是否终止"
    name="qq_isOldInsuranceTermination"
    :rules="computedRules.qq_isOldInsuranceTermination"
  >
    <template #input>
      <YesNoSwitch v-model="form.qq_isOldInsuranceTermination" />
    </template>
  </van-field>

  <van-field
    v-if="form.qq_isOldInsuranceTermination === 'Y'"
    v-model="form.qq_isOldInsuranceTerminationReason"
    v-show-field="['qq_isOldInsuranceTerminationReason', includeFields]"
    type="textarea"
    rows="1"
    autosize
    label="原特殊商业保险终止原因说明"
    name="qq_isOldInsuranceTerminationReason"
    :rules="computedRules.qq_isOldInsuranceTerminationReason"
  />

  <van-field
    v-show-field="['qq_isBelong', includeFields]"
    label="人员是否属于该项目部"
    name="qq_isBelong"
    :rules="computedRules.qq_isBelong"
  >
    <template #input>
      <YesNoSwitch v-model="form.qq_isBelong" />
    </template>
  </van-field>

  <van-field
    v-if="form.qq_isBelong === 'N'"
    v-model="form.qq_notBelongDeptPurchaseInsuranceSpecialReason"
    v-show-field="['qq_notBelongDeptPurchaseInsuranceSpecialReason', includeFields]"
    label="不属于该项目部人员购买保险原因"
    type="textarea"
    rows="1"
    autosize
    name="qq_notBelongDeptPurchaseInsuranceSpecialReason"
    :rules="computedRules.qq_notBelongDeptPurchaseInsuranceSpecialReason"
  />

  <van-field
    v-model="form.qq_insurancePeriod"
    v-show-field="['qq_insurancePeriod', includeFields]"
    label="保险期限"
    placeholder="请输入"
    name="qq_insurancePeriod"
    :rules="computedRules.qq_insurancePeriod"
  />

  <van-field
    v-model="form.qq_purchaseInsuranceReason"
    v-show-field="['qq_purchaseInsuranceReason', includeFields]"
    label="购买保险原因"
    type="textarea"
    rows="1"
    autosize
    name="qq_purchaseInsuranceReason"
    :rules="computedRules.qq_purchaseInsuranceReason"
  />

  <van-field
    v-model="form.qq_purchaseInsuranceSpecialExplain"
    v-show-field="['qq_purchaseInsuranceSpecialExplain', includeFields]"
    type="textarea"
    rows="1"
    autosize
    label="保险购买特殊说明"
    name="qq_purchaseInsuranceSpecialExplain"
    :rules="computedRules.qq_purchaseInsuranceSpecialExplain"
  />

  <BaseUpsert :include-fields="includeFields" />
</template>

<script setup lang="ts">
import type { FormInstance } from 'vant'
import BaseUpsert from '../../../../components/BaseUpsert.vue'
import type { DailyWorkForm } from '@/api/oa/daily/work/types'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'
import { getDept } from '@/api/system/dept'

const props = withDefaults(
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
      // 'qq_isContractPurchaseInsurance',
      'reason',
      'ossIdList',
    ],
  },
)

const form = inject<Ref<DailyWorkForm>>('form')
// form.value.qq_isContractPurchaseInsurance = 'Y'
const Form = inject<Ref<FormInstance>>('Form')
// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>()

const computedRules = inject<Ref<FormRules<DailyWorkForm>>>('computedRules')

// 依赖收集
const trackFields = inject<TrackFieldsFn<DailyWorkForm>>('trackFields')
trackFields(props.includeFields)

function onIsClimbingHomeworkChange() {
  // 清空距离范围
  Form.value.resetValidation(['qq_distanceRange'])
}

async function onDeptChange(value: string | number) {
  const res = await getDept(value)
  form.value.qq_deptName = res.data.deptName
}
</script>
