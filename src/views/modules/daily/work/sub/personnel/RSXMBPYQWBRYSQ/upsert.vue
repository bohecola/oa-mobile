<template>
  <DeptSelect
    v-model="form.k_deptId"
    v-model:value="form.needDepts"
    v-show-field="['k_deptId', includeFields]"
    name="k_deptId"
    label="项目部"
    :rules="computedRules.k_deptId"
  />

  <!-- TODO 用组件不行的原因没找到 -->
  <van-field
    v-model="form.k_userType"
    v-show-field="['k_userType', includeFields]"
    label="人员类别"
    is-link
    placeholder="请选择"
    name="k_userType"
    :rules="computedRules.k_userType"
    :readonly="false"
    class="reset-label__default"
    @click="showPicker = true"
  />
  <van-popup
    v-model:show="showPicker"
    position="bottom"
  >
    <van-picker
      v-model="pickerValue"
      :columns="[{ text: '外包', value: '外包' }, { text: '全外包', value: '全外包' }]"
      @confirm="onConfirm"
      @cancel="showPicker = false"
    />
  </van-popup>

  <!-- <DictSelect
    v-model="form.k_userType"
    v-show-field="['k_userType', includeFields]"
    label="人员类别"
    placeholder="请选择"
    name="k_userType"
    :options="[{ label: '外包', value: '外包' }, { label: '全外包', value: '全外包' }]"
    :rules="computedRules.k_userType"
    :readonly="false"
    class="reset-label__default"
  /> -->

  <DictSelect
    v-model="form.k_nature"
    v-show-field="['k_nature', includeFields]"
    label="聘用人员性质"
    placeholder="请选择临聘人员(指项目部非生产辅助人员，如：厨师、保洁、司机等）、劳务人员(指短时间内从事生产工作的人员)"
    name="k_nature"
    dict-type="oa_daily_work_employ_personnel_type"
    :rules="computedRules.k_nature"
    clearable
  />

  <DictSelect
    v-model="form.k_category"
    v-show-field="['k_category', includeFields]"
    label="聘用类别"
    name="k_category"
    dict-type="oa_daily_work_rsxmbpywbrysq_employ_category"
    :rules="computedRules.k_category"
    clearable
  />

  <van-field
    v-model.trim="form.k_postId"
    v-show-field="['k_postId', includeFields]"
    label="人员岗位"
    placeholder="请输入"
    name="k_postId"
    :rules="computedRules.k_postId"
  />

  <van-field-number
    v-model.number="form.k_number"
    v-show-field="['k_number', includeFields]"
    label="人员数量"
    type="digit"
    placeholder="请输入"
    name="k_number"
    :rules="computedRules.k_number"
    clearable
  />

  <van-field
    v-show-field="['k_isUniform', includeFields]"
    name="k_isUniform"
    label="是否配备公司工作服"
    :rules="computedRules.k_isUniform"
  >
    <template #input>
      <YesNoSwitch v-model="form.k_isUniform" @change="onIsUniformChange" />
    </template>
  </van-field>

  <div v-if="form.k_isUniform === 'Y'">
    <DictSelect
      v-model="form.k_workwearType"
      v-show-field="['k_workwearType', includeFields]"
      label="工服类型"
      name="k_workwearType"
      dict-type="oa_daily_work_rsxmbpywbrysq_workwear_type"
      multiple
      :rules="computedRules.k_workwearType"
      @change="onCategoryChange"
    />

    <van-field
      v-model="form.k_quantityAndSize"
      v-show-field="['k_quantityAndSize', includeFields]"
      type="textarea"
      rows="1"
      autosize
      name="k_quantityAndSize"
      label="数量与尺寸"
      placeholder="工服尺码为：160、165、170、175、180、185、190、195，鞋码为：39、40、41、42、43、44、45、46，请描述清楚需几套什么尺码的工服与鞋，如人员较多请上传附件。"
      :rules="computedRules.k_quantityAndSize"
    />
  </div>

  <DateSelect
    v-model="form.k_effectiveDate"
    v-show-field="['k_effectiveDate', includeFields]"
    name="k_effectiveDate"
    label="生效日期"
    :rules="computedRules.k_effectiveDate"
    clearable
  />

  <van-field
    v-model.trim="form.k_monthlyWorkingMode"
    v-show-field="['k_monthlyWorkingMode', includeFields]"
    label="月度上班及休假模式"
    placeholder="例如 上五休二或上六休一"
    name="k_monthlyWorkingMode"
    :rules="computedRules.k_monthlyWorkingMode"
    clearable
  />

  <div v-if="['3', '5'].includes(form.k_category)">
    <van-field
      v-show-field="['k_isUseOriginalSalaryStandard', includeFields]"
      name="k_isUseOriginalSalaryStandard"
      label="是否延用原工资标准"
      :rules="computedRules.k_isUseOriginalSalaryStandard"
    >
      <template #input>
        <YesNoSwitch v-model="form.k_isUseOriginalSalaryStandard" @change="onIsUseOriginalChange" />
      </template>
    </van-field>

    <div v-if="form.k_isUseOriginalSalaryStandard === 'N'">
      <van-field-number
        v-model.number="form.k_originalSalaryStandard"
        v-show-field="['k_originalSalaryStandard', includeFields]"
        label="原工资标准（人/元/月）"
        placeholder="请输入"
        name="k_originalSalaryStandard"
        :rules="computedRules.k_originalSalaryStandard"
        clearable
      />

      <van-field-number
        v-model.number="form.k_newSalaryStandard"
        v-show-field="['k_newSalaryStandard', includeFields]"
        label="新工资标准（人/元/月）"
        placeholder="请输入"
        name="k_newSalaryStandard"
        :rules="computedRules.k_newSalaryStandard"
        clearable
      />
    </div>
  </div>

  <van-field-number
    v-if="['0', '1', '2'].includes(form.k_category)"
    v-model.number="form.k_salaryStandards"
    v-show-field="['k_salaryStandards', includeFields]"
    label="工资标准（人/元/月）"
    placeholder="请输入"
    name="k_salaryStandards"
    :rules="computedRules.k_salaryStandards"
    clearable
  />

  <div v-if="['6'].includes(form.k_category)">
    <van-field
      v-model="form.k_originalDistribution"
      v-show-field="['k_originalDistribution', includeFields]"
      type="textarea"
      rows="1"
      autosize
      label="原补助、发放标准及发放形式"
      placeholder="请输入"
      name="k_originalDistribution"
      :rules="computedRules.k_originalDistribution"
    />

    <van-field
      v-model="form.k_changeAfterDistribution"
      v-show-field="['k_changeAfterDistribution', includeFields]"
      type="textarea"
      rows="1"
      autosize
      label="变更后补助、发放标准及发放形式"
      placeholder="请输入"
      name="k_changeAfterDistribution"
      :rules="computedRules.k_changeAfterDistribution"
    />
  </div>

  <van-field
    v-if="['0', '1', '2', '5'].includes(form.k_category)"
    v-model="form.k_specialInstructions"
    v-show-field="['k_specialInstructions', includeFields]"
    type="textarea"
    rows="1"
    autosize
    label="工资发放特殊说明"
    placeholder="请输入"
    name="k_specialInstructions"
    :rules="computedRules.k_specialInstructions"
  />

  <div v-if="['0', '1', '2', '3', '5'].includes(form.k_category)">
    <van-field
      v-model="form.k_otherDistribution"
      v-show-field="['k_otherDistribution', includeFields]"
      type="textarea"
      rows="1"
      autosize
      label="其他补助、发放标准及发放形式"
      placeholder="请输入"
      name="k_otherDistribution"
      :rules="computedRules.k_otherDistribution"
    />

    <DateSelect
      v-model="form.k_startDate"
      v-show-field="['k_startDate', includeFields]"
      name="k_startDate"
      label="聘用开始日期"
      :rules="computedRules.k_startDate"
      clearable
    />

    <DateSelect
      v-model="form.k_endDate"
      v-show-field="['k_endDate', includeFields]"
      name="k_endDate"
      label="聘用结束日期"
      :rules="computedRules.k_endDate"
      clearable
    />

    <DictSelect
      v-model="form.k_signeContractType"
      v-show-field="['k_signeContractType', includeFields]"
      label="聘用人员签订合同类型"
      name="k_signeContractType"
      dict-type="oa_daily_work_rsxmbpywbrysq_signe_contract_type"
      :rules="computedRules.k_signeContractType"
      clearable
      @change="onSigneContractTypeChange"
    />

    <div v-if="['0', '1'].includes(form.k_signeContractType)">
      <DateSelect
        v-model="form.k_signeContractStartDate"
        v-show-field="['k_signeContractStartDate', includeFields]"
        name="k_signeContractStartDate"
        label="合同签订开始时间"
        :rules="computedRules.k_signeContractStartDate"
        clearable
      />

      <DateSelect
        v-model="form.k_signeContractEndDate"
        v-show-field="['k_signeContractEndDate', includeFields]"
        name="k_signeContractEndDate"
        label="合同签订结束时间"
        :rules="computedRules.k_signeContractEndDate"
        clearable
      />

      <van-field
        v-model="form.k_signeContractSpecialInstructions"
        v-show-field="['k_signeContractSpecialInstructions', includeFields]"
        type="textarea"
        rows="1"
        autosize
        label="合同签订特殊说明"
        placeholder="请输入"
        name="k_signeContractSpecialInstructions"
        :rules="computedRules.k_signeContractSpecialInstructions"
      />
    </div>

    <DictSelect
      v-model="form.k_purchaseInsuranceType"
      v-show-field="['k_purchaseInsuranceType', includeFields]"
      label="聘用人员购买保险类型"
      name="k_purchaseInsuranceType"
      dict-type="oa_daily_work_rsxmbpywbrysq_insurance_type"
      :rules="computedRules.k_purchaseInsuranceType"
      clearable
      @change="onPurchaseInsuranceTypeChange"
    />

    <div v-if="['0', '1', '2'].includes(form.k_purchaseInsuranceType)">
      <DateSelect
        v-model="form.k_insuranceStartDate"
        v-show-field="['k_insuranceStartDate', includeFields]"
        name="k_insuranceStartDate"
        label="保险开始时间"
        :rules="computedRules.k_insuranceStartDate"
        clearable
      />

      <DateSelect
        v-model="form.k_insuranceEndDate"
        v-show-field="['k_insuranceEndDate', includeFields]"
        name="k_insuranceEndDate"
        label="保险结束时间"
        :rules="computedRules.k_insuranceEndDate"
        clearable
      />

      <van-field
        v-model="form.k_insuranceSpecialInstructions"
        v-show-field="['k_insuranceSpecialInstructions', includeFields]"
        type="textarea"
        rows="1"
        autosize
        label="保险购买特殊情况说明"
        placeholder="请输入"
        name="k_insuranceSpecialInstructions"
        :rules="computedRules.k_insuranceSpecialInstructions"
      />
    </div>
  </div>

  <van-field
    v-if="['0', '1', '3', '4', '5', '6'].includes(form.k_category)"
    v-model="form.k_employInformation"
    v-show-field="['k_employInformation', includeFields]"
    type="textarea"
    rows="1"
    autosize
    label="聘用人员信息"
    placeholder="请输入账户姓名、聘用人员身份证号、聘用人员联系电话、聘用人员银行账号、开户行名称（银行名称+具体支行）"
    name="k_employInformation"
    :rules="computedRules.k_employInformation"
  />

  <van-field
    v-if="['1', '2', '3', '4'].includes(form.k_category)"
    v-model="form.k_changeReason"
    v-show-field="['k_changeReason', includeFields]"
    type="textarea"
    rows="1"
    autosize
    label="变更原因"
    placeholder="请输入"
    name="k_changeReason"
    :rules="computedRules.k_changeReason"
  />

  <van-field
    v-show-field="['k_isBudget', includeFields]"
    name="k_isBudget"
    label="是否有预算"
    :rules="computedRules.k_isBudget"
    :readonly="false"
    class="reset-label__default"
  >
    <template #input>
      <YesNoSwitch v-model="form.k_isBudget" @change="onIsBudgetChange" />
    </template>
  </van-field>

  <van-field
    v-if="form.k_isBudget === 'Y'"
    v-show-field="['k_isBudgetStandards', includeFields]"
    name="k_isBudgetStandards"
    label="是否符合预算标准"
    :rules="computedRules.k_isBudgetStandards"
    :readonly="false"
    class="reset-label__default"
  >
    <template #input>
      <YesNoSwitch v-model="form.k_isBudgetStandards" @change="onIsBudgetStandardsChange" />
    </template>
  </van-field>

  <van-field
    v-if="form.k_isBudgetStandards === 'N' && form.k_isBudget === 'Y'"
    v-model="form.k_supplementaryExplanation"
    v-show-field="['k_supplementaryExplanation', includeFields]"
    label="补充说明"
    placeholder="请输入"
    type="textarea"
    rows="1"
    autosize
    name="k_supplementaryExplanation"
    :rules="computedRules.k_supplementaryExplanation"
    :readonly="false"
    class="reset-label__default"
  />

  <BaseUpsert :include-fields="includeFields" />
</template>

<script setup lang="ts">
import type { FormInstance } from 'vant'
import BaseUpsert from '../../../../components/BaseUpsert.vue'
import type { DailyWorkForm } from '@/api/oa/daily/work/types'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'

const props = withDefaults(
  defineProps<{
    includeFields?: KeysOfArray<DailyWorkForm>
  }>(),
  {
    includeFields: () => ['k_deptId', 'k_userType', 'k_isKeyAccountsVP', 'k_nature', 'k_category', 'k_postId', 'k_number', 'k_isUniform', 'k_workwearType', 'k_quantityAndSize', 'k_isUseOriginalSalaryStandard', 'k_originalSalaryStandard', 'k_newSalaryStandard', 'k_effectiveDate', 'k_monthlyWorkingMode', 'k_salaryStandards', 'k_specialInstructions', 'k_otherDistribution', 'k_originalDistribution', 'k_changeAfterDistribution', 'k_changeReason', 'k_startDate', 'k_endDate', 'k_signeContractType', 'k_purchaseInsuranceType', 'k_employInformation', 'k_insuranceStartDate', 'k_insuranceEndDate', 'k_insuranceSpecialInstructions', 'k_signeContractStartDate', 'k_signeContractEndDate', 'k_signeContractSpecialInstructions', 'k_isBudget', 'k_isBudgetStandards', 'k_supplementaryExplanation', 'reason', 'ossIdList', 'reason', 'ossIdList'],
  },
)

// 依赖收集
const trackFields = inject<TrackFieldsFn<DailyWorkForm>>('trackFields')
trackFields(props.includeFields)

const form = inject<Ref<DailyWorkForm>>('form')
const Form = inject<Ref<FormInstance>>('Form')
const showPicker = ref(false)
const pickerValue = ref()
const computedRules = inject<Ref<FormRules<DailyWorkForm>>>('computedRules')

// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>()

// 附件必选
const updateRuleRequired = inject<UpdateRuleRequiredFn>('updateRuleRequired')
updateRuleRequired('ossIdList', true)

const resetFields = inject<(names: KeysOfArray<DailyWorkForm>) => void>('resetFields')

// 是否延用原工资标准
function onIsUseOriginalChange() {
  // 原工资标准和新工资标准
  resetFields(['k_originalSalaryStandard', 'k_newSalaryStandard'])
}

function onCategoryChange() {
  // 清空
  resetFields([
    'k_isUseOriginalSalaryStandard',
    'k_originalSalaryStandard',
    'k_newSalaryStandard',
    'k_salaryStandards',
    'k_specialInstructions',
    'k_otherDistribution',
    'k_originalDistribution',
    'k_changeAfterDistribution',
    'k_changeReason',
    'k_startDate',
    'k_endDate',
    'k_signeContractType',
    'k_purchaseInsuranceType',
    'k_employInformation',

  ])
}

// 是否配备工服
function onIsUniformChange() {
  // 清空工服类型和数量尺寸
  resetFields(['k_workwearType', 'k_quantityAndSize'])
}

// 保险类型
function onPurchaseInsuranceTypeChange() {
  // 清空保险开始时间-结束时间、说明
  resetFields(['k_insuranceStartDate', 'k_insuranceEndDate', 'k_insuranceSpecialInstructions'])
}

// 签订合同类型
function onSigneContractTypeChange() {
  // 清空合同开始时间-结束时间、说明
  resetFields(['k_signeContractStartDate', 'k_signeContractEndDate', 'k_signeContractSpecialInstructions'])
}

// 是否有预算
function onIsBudgetChange() {
  // 清空
  resetFields(['k_isBudgetStandards', 'k_supplementaryExplanation'])
  form.value.k_supplementaryExplanation = undefined
}

// 预算标准
function onIsBudgetStandardsChange() {
  // 清空
  resetFields(['k_supplementaryExplanation'])
  form.value.k_supplementaryExplanation = undefined
}

function onConfirm({ selectedValues, selectedOptions }) {
  form.value.k_userType = selectedOptions[0]?.text
  pickerValue.value = selectedValues
  showPicker.value = false
}
</script>
