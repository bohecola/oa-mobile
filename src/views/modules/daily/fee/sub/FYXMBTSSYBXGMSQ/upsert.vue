<template>
  <FeeBaseUpsert :include-fields="includeFields1" />

  <DictSelect
    v-model="form.e_dailyWorkId"
    v-show-field="['e_dailyWorkId', includeFields]"
    label="购买申请"
    name="e_dailyWorkId"
    :options="dailyWorkData"
    :rules="computedRules.e_dailyWorkId"
    @change="onDailyWorkChange"
  />

  <div v-if="!isNil(form.e_dailyWorkId)">
    <DeptSelect
      v-model="form.e_deptId"
      v-show-field="['e_deptId', includeFields]"
      name="e_deptId"
      label="部门/项目部"
      readonly
    />

    <DictSelect
      v-model="form.e_personnelCategory"
      v-show-field="['e_personnelCategory', includeFields]"
      label="人员类别"
      name="e_personnelCategory"
      dict-type="oa_daily_work_personnel_category"
      readonly
    />

    <van-field
      v-if="!isEmpty(form.e_insuranceExpirationDate)"
      v-show-field="['e_insuranceExpirationDate', includeFields]"
      label="建议保险开始截止日期"
      name="e_insuranceExpirationDate"
    >
      <template #input>
        {{ parseTime(form.e_insuranceExpirationDate[0], '{y}-{m}-{d}') }} ~ {{ parseTime(form.e_insuranceExpirationDate[1], '{y}-{m}-{d}') }}
      </template>
    </van-field>

    <DateSelect
      v-model="form.e_insuranceExpirationStartDate"
      v-show-field="['e_insuranceExpirationStartDate', includeFields]"
      name="e_insuranceExpirationStartDate"
      label="建议保险开始日期"
      readonly
    />

    <DateSelect
      v-model="form.e_insuranceExpirationEndDate"
      v-show-field="['e_insuranceExpirationEndDate', includeFields]"
      name="e_insuranceExpirationEndDate"
      label="建议保险截止日期"
      readonly
    />

    <DateSelect
      v-model="form.e_latestPurchaseDate"
      v-show-field="['e_latestPurchaseDate', includeFields]"
      name="e_latestPurchaseDate"
      label="保险最晚购买日期"
      readonly
    />

    <van-field-number
      v-model.number="form.e_purchaseInsuranceNumber"
      v-show-field="['e_purchaseInsuranceNumber', includeFields]"
      label="购买保险人数"
      type="digit"
      name="e_purchaseInsuranceNumber"
      readonly
    />

    <DictSelect
      v-model="form.e_purchaseInsuranceCategory"
      v-show-field="['e_purchaseInsuranceCategory', includeFields]"
      label="购买保险类别"
      name="e_purchaseInsuranceCategory"
      dict-type="oa_daily_work_purchase_insurance_category"
      readonly
    />

    <van-field-number
      v-model.number="form.e_insuranceLimit"
      v-show-field="['e_insuranceLimit', includeFields]"
      label="购买保险额度(万元)"
      name="e_insuranceLimit"
      readonly
    />

    <van-field
      v-if="!isNil(form.e_isHighVoltageOperation)"
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
      v-if="!isNil(form.e_isClimbingHomework)"
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

    <van-field-number
      v-if="form.e_isClimbingHomework === 'Y'"
      v-model.number="form.e_distanceRange"
      v-show-field="['e_distanceRange', includeFields]"
      label="登高作业位置到地面的距离范围(米)"
      name="e_distanceRange"
      readonly
    />
    <!--
  <van-field
    v-show-field="['e_isContractPurchaseInsurance', includeFields]"
    label="合同中是否要求购买此类保险"
    name="e_isContractPurchaseInsurance"
    :rules="computedRules.e_isContractPurchaseInsurance"
  >
    <template #input>
      <YesNoSwitch v-model="form.e_isContractPurchaseInsurance" readonly />
    </template>
  </van-field> -->

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
      readonly
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
  </div>

  <FeeBaseUpsert :include-fields="includeFields2" />
</template>

<script setup lang="ts">
import { isEmpty, isNil } from 'lodash-es'
import FeeBaseUpsert from '../../../components/FeeBaseUpsert.vue'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'
import type { DailyFeeForm } from '@/api/oa/daily/fee/types'
import { getDailyWorkByRelateConditionsBo } from '@/api/oa/daily/fee'

const props = withDefaults(
  defineProps<{
    includeFields?: KeysOfArray<DailyFeeForm>
  }>(),
  {
    includeFields: () => ['subjectType', 'e_dailyWorkId', 'deptId', 'psId', 'contractNo', 'itemList', 'amount', 'e_deptId', 'e_personnelCategory', 'e_insuranceExpirationDate', 'e_insuranceExpirationStartDate', 'e_insuranceExpirationEndDate', 'e_latestPurchaseDate', 'e_purchaseInsuranceReason', 'e_purchaseInsuranceNumber', 'e_purchaseInsuranceCategory', 'e_insuranceLimit', 'e_isHighVoltageOperation', 'e_isClimbingHomework', 'e_distanceRange', 'e_insurancePeriod', 'e_purchaseInsuranceSpecialExplain', 'e_isNewHiredPurchaseInsurance', 'e_transferInDeptPurchaseInsurance', 'e_transferOutDeptNoPurchaseInsurance', 'e_isEarlyStagePurchaseInsurance', 'e_isBelong', 'e_notBelongDeptPurchaseInsuranceSpecialReason', 'e_isOldInsuranceTermination', 'e_isOldInsuranceTerminationReason', 'e_isContractPurchaseInsurance', 'reason', 'receiptInfo', 'ossIdList'],
  },
)

const { proxy } = getCurrentInstance() as ComponentInternalInstance
const { oa_daily_work_purchase_insurance_category, oa_daily_work_personnel_category } = toRefs<any>(proxy?.useDict(
  'oa_daily_work_purchase_insurance_category',
  'oa_daily_work_personnel_category',
))

const form = inject<Ref<DailyFeeForm>>('form')
// 指令
const vShowField = createFieldVisibilityDirective<DailyFeeForm>()

const computedRules = inject<Ref<FormRules<DailyFeeForm>>>('computedRules')

// 依赖收集
const trackFields = inject<TrackFieldsFn<DailyFeeForm>>('trackFields')
trackFields(props.includeFields)

const includeFields1 = computed(() => props.includeFields.filter(e => !['reason', 'receiptInfo', 'ossIdList'].includes(e)))
const includeFields2 = computed(() => props.includeFields.filter(e => ['reason', 'receiptInfo', 'ossIdList'].includes(e)))

const showPicker = ref(false)
const dailyWorkData = ref([])

async function getList() {
  const params = {
    no: 'RSXMBTSSYBXGMSQ',
    status: '2',
  }
  const res = await getDailyWorkByRelateConditionsBo(params)
  dailyWorkData.value = res.data.map((e) => {
    const content = JSON.parse(e.contentJson)

    const deptName = content.qq_deptName ? content.qq_deptName : ''

    const personnelCategory = oa_daily_work_personnel_category.value.find(e => e.value === content.qq_personnelCategory)?.label || ''

    const purchaseInsuranceCategory
      = oa_daily_work_purchase_insurance_category.value.find(e => e.value === content.qq_purchaseInsuranceCategory)?.label || ''

    return {
      ...e,
      content,
      value: e.id,
      label: `${e.createByName}-${deptName}-${personnelCategory}-${purchaseInsuranceCategory}-${e.createTime}`,
      text: `${e.createByName}-${deptName}-${personnelCategory}-${purchaseInsuranceCategory}-${e.createTime}`,
    }
  })
}

// TODO 优化
function onDailyWorkChange(id: string) {
  const obj = dailyWorkData.value.find(e => e.id === id)
  if (obj) {
    form.value.e_dailyWorkId = obj.id
    form.value.e_deptId = obj.content?.qq_deptId
    form.value.e_personnelCategory = obj.content?.qq_personnelCategory
    form.value.e_insuranceExpirationDate = obj.content?.qq_insuranceExpirationDate
    form.value.e_insuranceExpirationStartDate = obj.content?.qq_insuranceExpirationStartDate
    form.value.e_insuranceExpirationEndDate = obj.content?.qq_insuranceExpirationEndDate
    form.value.e_latestPurchaseDate = obj.content?.qq_latestPurchaseDate
    form.value.e_purchaseInsuranceReason = obj.content?.qq_purchaseInsuranceReason
    form.value.e_purchaseInsuranceNumber = obj.content?.qq_purchaseInsuranceNumber
    form.value.e_purchaseInsuranceCategory = obj.content?.qq_purchaseInsuranceCategory
    form.value.e_insuranceLimit = obj.content?.qq_insuranceLimit
    form.value.e_isHighVoltageOperation = obj.content?.qq_isHighVoltageOperation
    form.value.e_isClimbingHomework = obj.content?.qq_isClimbingHomework
    form.value.e_distanceRange = obj.content?.qq_distanceRange
    // form.value.e_isContractPurchaseInsurance = obj.content?.qq_isContractPurchaseInsurance
    form.value.e_insurancePeriod = obj.content?.qq_insurancePeriod
    form.value.e_purchaseInsuranceSpecialExplain = obj.content?.qq_purchaseInsuranceSpecialExplain
    form.value.e_isNewHiredPurchaseInsurance = obj.content?.qq_isNewHiredPurchaseInsurance
    form.value.e_transferInDeptPurchaseInsurance = obj.content?.qq_transferInDeptPurchaseInsurance
    form.value.e_transferOutDeptNoPurchaseInsurance = obj.content?.qq_transferOutDeptNoPurchaseInsurance
    form.value.e_isEarlyStagePurchaseInsurance = obj.content?.qq_isEarlyStagePurchaseInsurance
    form.value.e_isBelong = obj.content?.qq_isBelong
    form.value.e_notBelongDeptPurchaseInsuranceSpecialReason = obj.content?.qq_notBelongDeptPurchaseInsuranceSpecialReason
    form.value.e_isOldInsuranceTermination = obj.content?.qq_isOldInsuranceTermination
    form.value.e_isOldInsuranceTerminationReason = obj.content?.qq_isOldInsuranceTerminationReason
  }
  showPicker.value = false
}

onMounted(async () => {
  await getList()
})
</script>

<style lang="scss" scoped>
:deep(.van-picker-column__item) .van-ellipsis {
  white-space: wrap !important;
  word-break: break-word !important;
  padding: 10px 10px !important;
  line-height: 1.5 !important;
  text-align: center !important;
}
</style>
