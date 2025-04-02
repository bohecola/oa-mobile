<template>
  <DeptSelect
    v-model="form.qq_deptId"
    v-show-field="['qq_deptId', includeFields]"
    name="qq_deptId"
    label="部门/项目部"
  />

  <DictSelect
    v-model="form.qq_personnelCategory"
    v-show-field="['qq_personnelCategory', includeFields]"
    label="人员类别"
    name="qq_personnelCategory"
    dict-type="oa_daily_work_personnel_category"
  />

  <van-field
    v-if="!isEmpty(form.qq_insuranceExpirationDate)"
    v-show-field="['qq_insuranceExpirationDate', includeFields]"
    label="建议保险开始截止日期"
    name="qq_insuranceExpirationDate"
  >
    <template #input>
      {{ parseTime(form.qq_insuranceExpirationDate[0], '{y}-{m}-{d}') }} ~
      {{ parseTime(form.qq_insuranceExpirationDate[1], '{y}-{m}-{d}') }}
    </template>
  </van-field>

  <DateSelect
    v-if="form.qq_insuranceExpirationStartDate"
    v-model="form.qq_insuranceExpirationStartDate"
    v-show-field="['qq_insuranceExpirationStartDate', includeFields]"
    name="qq_insuranceExpirationStartDate"
    label="建议保险开始日期"
  />

  <DateSelect
    v-if="form.qq_insuranceExpirationEndDate"
    v-model="form.qq_insuranceExpirationEndDate"
    v-show-field="['qq_insuranceExpirationEndDate', includeFields]"
    name="qq_insuranceExpirationEndDate"
    label="建议保险截止日期"
  />

  <DateSelect
    v-model="form.qq_latestPurchaseDate"
    v-show-field="['qq_latestPurchaseDate', includeFields]"
    name="qq_latestPurchaseDate"
    label="保险最晚购买日期"
  />

  <van-field
    v-model="form.qq_purchaseInsuranceNumber"
    v-show-field="['qq_purchaseInsuranceNumber', includeFields]"
    label="购买保险人数"
    name="qq_purchaseInsuranceNumber"
  />

  <DictSelect
    v-model="form.qq_purchaseInsuranceCategory"
    v-show-field="['qq_purchaseInsuranceCategory', includeFields]"
    label="购买保险类别"
    name="qq_purchaseInsuranceCategory"
    dict-type="oa_daily_work_purchase_insurance_category"
  />

  <van-field
    v-model="form.qq_insuranceLimit"
    v-show-field="['qq_insuranceLimit', includeFields]"
    label="购买保险额度(万元)"
    name="qq_insuranceLimit"
  />

  <van-field
    v-if="!isNil(form.qq_isHighVoltageOperation)"
    v-show-field="['qq_isHighVoltageOperation', includeFields]"
    label="是否涉及高压电作业"
    name="qq_isHighVoltageOperation"
  >
    <template #input>
      <YesNoSwitch
        v-model="form.qq_isHighVoltageOperation"
        readonly
      />
    </template>
  </van-field>

  <van-field
    v-if="!isNil(form.qq_isClimbingHomework)"
    v-show-field="['qq_isClimbingHomework', includeFields]"
    label="是否涉及登高作业"
    name="qq_isClimbingHomework"
  >
    <template #input>
      <YesNoSwitch
        v-model="form.qq_isClimbingHomework"
        readonly
      />
    </template>
  </van-field>

  <van-field
    v-if="form.qq_isClimbingHomework === 'Y'"
    v-model="form.qq_distanceRange"
    v-show-field="['qq_distanceRange', includeFields]"
    label="登高作业位置到地面的距离范围(米)"
    name="qq_distanceRange"
  />

  <van-field v-show-field="['qq_isContractPurchaseInsurance', includeFields]" label="合同中是否要求购买此类保险" name="qq_isContractPurchaseInsurance">
    <template #input>
      <YesNoSwitch v-model="form.qq_isContractPurchaseInsurance" readonly />
    </template>
  </van-field>

  <van-field
    v-show-field="['qq_isNewHiredPurchaseInsurance', includeFields]"
    label="该项目部新入职人员是否购买此类保险"
    name="qq_isNewHiredPurchaseInsurance"
  >
    <template #input>
      <YesNoSwitch
        v-model="form.qq_isNewHiredPurchaseInsurance"
        readonly
      />
    </template>
  </van-field>

  <van-field
    v-show-field="['qq_transferInDeptPurchaseInsurance', includeFields]"
    label="调入该项目部是否购买此类保险"
    name="qq_transferInDeptPurchaseInsurance"
  >
    <template #input>
      <YesNoSwitch
        v-model="form.qq_transferInDeptPurchaseInsurance"
        readonly
      />
    </template>
  </van-field>

  <van-field
    v-show-field="['qq_transferOutDeptNoPurchaseInsurance', includeFields]"
    label="调出该项目部是否取消购买此类保险"
    name="qq_transferOutDeptNoPurchaseInsurance"
  >
    <template #input>
      <YesNoSwitch
        v-model="form.qq_transferOutDeptNoPurchaseInsurance"
        readonly
      />
    </template>
  </van-field>

  <van-field
    v-show-field="['qq_isEarlyStagePurchaseInsurance', includeFields]"
    label="该项目部前期是否已购买其他商业类保险"
    name="qq_isEarlyStagePurchaseInsurance"
  >
    <template #input>
      <YesNoSwitch
        v-model="form.qq_isEarlyStagePurchaseInsurance"
        readonly
      />
    </template>
  </van-field>

  <van-field
    v-if="form.qq_isEarlyStagePurchaseInsurance === 'Y'"
    v-show-field="['qq_isOldInsuranceTermination', includeFields]"
    label="原特殊商业保险是否终止"
    name="qq_isOldInsuranceTermination"
  >
    <template #input>
      <YesNoSwitch
        v-model="form.qq_isOldInsuranceTermination"
        readonly
      />
    </template>
  </van-field>

  <van-field
    v-if="form.qq_isOldInsuranceTermination === 'Y'"
    v-model="form.qq_isOldInsuranceTerminationReason"
    v-show-field="['qq_isOldInsuranceTerminationReason', includeFields]"
    label="原特殊商业保险终止原因说明"
    name="qq_isOldInsuranceTerminationReason"
  >
    <template #input>
      <TextareaView :value="form.qq_isOldInsuranceTerminationReason" />
    </template>
  </van-field>

  <van-field
    v-show-field="['qq_isBelong', includeFields]"
    label="人员是否属于该项目部"
    name="qq_isBelong"
  >
    <template #input>
      <YesNoSwitch
        v-model="form.qq_isBelong"
        readonly
      />
    </template>
  </van-field>

  <van-field
    v-if="form.qq_isBelong === 'N'"
    v-model="form.qq_notBelongDeptPurchaseInsuranceSpecialReason"
    v-show-field="['qq_notBelongDeptPurchaseInsuranceSpecialReason', includeFields]"
    label="不属于该项目部人员购买保险原因"
    name="qq_notBelongDeptPurchaseInsuranceSpecialReason"
  >
    <template #input>
      <TextareaView :value="form.qq_notBelongDeptPurchaseInsuranceSpecialReason" />
    </template>
  </van-field>

  <van-field
    v-model="form.qq_insurancePeriod"
    v-show-field="['qq_insurancePeriod', includeFields]"
    label="保险期限"
    name="qq_insurancePeriod"
  />

  <van-field
    v-model="form.qq_purchaseInsuranceReason"
    v-show-field="['qq_purchaseInsuranceReason', includeFields]"
    label="购买保险原因"
    name="qq_purchaseInsuranceReason"
  >
    <template #input>
      <TextareaView :value="form.qq_purchaseInsuranceReason" />
    </template>
  </van-field>

  <van-field
    v-model="form.qq_purchaseInsuranceSpecialExplain"
    v-show-field="['qq_purchaseInsuranceSpecialExplain', includeFields]"
    label="保险购买特殊说明"
    name="qq_purchaseInsuranceSpecialExplain"
  >
    <template #input>
      <TextareaView :value="form.qq_purchaseInsuranceSpecialExplain" />
    </template>
  </van-field>

  <BaseDetail :include-fields="includeFields" />
</template>

<script setup lang="ts">
import { isEmpty, isNil } from 'lodash-es'
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
      'qq_isContractPurchaseInsurance',
      'reason',
      'ossIdList',
    ],
  },
)

const form = inject<Ref<DailyWorkForm>>('form')
// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>(form)
</script>
