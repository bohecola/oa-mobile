<template>
  <van-field v-show-field="['k_deptId', includeFields]" name="k_deptId" label="项目部" input-align="left">
    <template #input>
      <DeptSelect v-model="form.k_deptId" readonly />
    </template>
  </van-field>

  <van-field v-show-field="['k_userType', includeFields]" name="k_userType" label="人员类别" input-align="left">
    <template #input>
      {{ form.k_userType }}
    </template>
  </van-field>

  <van-field v-model="form.k_nature" v-show-field="['k_nature', includeFields]" label="聘用人员性质" name="k_nature" input-align="left">
    <template #input>
      <DictSelect v-model="form.k_nature" dict-type="oa_daily_work_employ_personnel_type" readonly />
    </template>
  </van-field>

  <van-field v-model="form.k_category" v-show-field="['k_category', includeFields]" label="聘用类别" name="k_category" input-align="left">
    <template #input>
      <DictSelect v-model="form.k_category" dict-type="oa_daily_work_rsxmbpywbrysq_employ_category" readonly />
    </template>
  </van-field>

  <van-field v-model="form.k_postId" v-show-field="['k_postId', includeFields]" label="人员岗位" name="k_postId" input-align="left" />

  <van-field v-model="form.k_number" v-show-field="['k_number', includeFields]" label="人员数量" name="k_number" input-align="left" />

  <van-field v-show-field="['k_isUniform', includeFields]" name="k_isUniform" label="是否配备公司工作服" input-align="left">
    <template #input>
      <YesNoSwitch v-model="form.k_isUniform" readonly />
    </template>
  </van-field>

  <div v-if="form.k_isUniform === 'Y'">
    <van-field v-show-field="['k_workwearType', includeFields]" name="k_workwearType" label="工服类型" input-align="left">
      <template #input>
        <DictSelect v-model="form.k_workwearType" dict-type="oa_daily_work_rsxmbpywbrysq_workwear_type" multiple readonly />
      </template>
    </van-field>

    <van-field v-show-field="['k_quantityAndSize', includeFields]" name="k_quantityAndSize" label="数量与尺寸" input-align="left">
      <template #input>
        <TextareaView :value="form.k_quantityAndSize" />
      </template>
    </van-field>
  </div>

  <van-field v-show-field="['k_effectiveDate', includeFields]" label="生效日期" name="k_effectiveDate" input-align="left">
    <template #input>
      {{ parseTime(form.k_effectiveDate, '{y}-{m}-{d}') }}
    </template>
  </van-field>

  <van-field v-model="form.k_monthlyWorkingMode" v-show-field="['k_monthlyWorkingMode', includeFields]" label="月度上班及休假模式" name="k_monthlyWorkingMode" input-align="left" />

  <div v-if="['3', '5'].includes(form.k_category)">
    <van-field v-show-field="['k_isUseOriginalSalaryStandard', includeFields]" name="k_isUseOriginalSalaryStandard" label="是否延用原工资标准" input-align="left">
      <template #input>
        <YesNoSwitch v-model="form.k_isUseOriginalSalaryStandard" readonly />
      </template>
    </van-field>

    <div v-if="form.k_isUseOriginalSalaryStandard === 'N'">
      <van-field v-show-field="['k_originalSalaryStandard', includeFields]" label="原工资标准（人/元/月）" name="k_originalSalaryStandard" input-align="left">
        <template #input>
          {{ form.k_originalSalaryStandard }}
          <span v-if="!isNil(form.k_originalSalaryStandard)" class="ml-3 text-red-400">{{ toCnMoney(form.k_originalSalaryStandard) }}</span>
        </template>
      </van-field>

      <van-field v-show-field="['k_newSalaryStandard', includeFields]" label="新工资标准（人/元/月）" name="k_newSalaryStandard" input-align="left">
        <template #input>
          {{ form.k_newSalaryStandard }}
          <span v-if="!isNil(form.k_newSalaryStandard)" class="ml-3 text-red-400">{{ toCnMoney(form.k_newSalaryStandard) }}</span>
        </template>
      </van-field>
    </div>
  </div>

  <van-field v-if="['0', '1', '2'].includes(form.k_category)" v-model="form.k_salaryStandards" v-show-field="['k_salaryStandards', includeFields]" label="工资标准（人/元/月）" name="k_salaryStandards" input-align="left" />

  <div v-if="['6'].includes(form.k_category)">
    <van-field v-show-field="['k_originalDistribution', includeFields]" label="原补助、发放标准及发放形式" name="k_originalDistribution" input-align="left">
      <template #input>
        <TextareaView :value="form.k_originalDistribution" />
      </template>
    </van-field>

    <van-field v-show-field="['k_changeAfterDistribution', includeFields]" label="变更后补助、发放标准及发放形式" name="k_changeAfterDistribution" input-align="left">
      <template #input>
        <TextareaView :value="form.k_changeAfterDistribution" />
      </template>
    </van-field>
  </div>

  <van-field v-if="['0', '1', '2', '5'].includes(form.k_category)" v-show-field="['k_specialInstructions', includeFields]" label="工资发放特殊说明" name="k_specialInstructions" input-align="left">
    <template #input>
      <TextareaView :value="form.k_specialInstructions" />
    </template>
  </van-field>

  <div v-if="['0', '1', '2', '3', '5'].includes(form.k_category)">
    <van-field v-show-field="['k_otherDistribution', includeFields]" label="其他补助、发放标准及发放形式" name="k_otherDistribution" input-align="left">
      <template #input>
        <TextareaView :value="form.k_otherDistribution" />
      </template>
    </van-field>
    <van-field v-show-field="['k_startDate', includeFields]" label="聘用开始日期" name="k_startDate" input-align="left">
      <template #input>
        {{ parseTime(form.k_startDate, '{y}-{m}') }}
      </template>
    </van-field>

    <van-field v-show-field="['k_endDate', includeFields]" label="聘用结束日期" name="k_endDate" input-align="left">
      <template #input>
        {{ parseTime(form.k_endDate, '{y}-{m}') }}
      </template>
    </van-field>

    <van-field v-model="form.k_signeContractType" v-show-field="['k_signeContractType', includeFields]" label="聘用人员签订合同类型" name="k_signeContractType" input-align="left">
      <template #input>
        <DictSelect v-model="form.k_signeContractType" dict-type="oa_daily_work_rsxmbpywbrysq_signe_contract_type" readonly />
      </template>
    </van-field>

    <div v-if="['0', '1'].includes(form.k_signeContractType)">
      <van-field v-show-field="['k_signeContractStartDate', includeFields]" label="合同签订开始时间" name="k_signeContractStartDate" input-align="left">
        <template #input>
          {{ parseTime(form.k_signeContractStartDate, '{y}-{m}') }}
        </template>
      </van-field>
      <van-field v-show-field="['k_signeContractEndDate', includeFields]" label="合同签订结束时间" name="k_signeContractEndDate" input-align="left">
        <template #input>
          {{ parseTime(form.k_signeContractEndDate, '{y}-{m}') }}
        </template>
      </van-field>
      <van-field v-show-field="['k_signeContractSpecialInstructions', includeFields]" label="合同签订特殊说明" name="k_signeContractSpecialInstructions" input-align="left">
        <template #input>
          <TextareaView :value="form.k_signeContractSpecialInstructions" />
        </template>
      </van-field>
    </div>

    <van-field v-model="form.k_purchaseInsuranceType" v-show-field="['k_purchaseInsuranceType', includeFields]" label="聘用人员购买保险类型" name="k_purchaseInsuranceType" input-align="left">
      <template #input>
        <DictSelect v-model="form.k_purchaseInsuranceType" dict-type="oa_daily_work_rsxmbpywbrysq_insurance_type" readonly />
      </template>
    </van-field>

    <div v-if="['0', '1', '2'].includes(form.k_purchaseInsuranceType)">
      <van-field v-show-field="['k_insuranceStartDate', includeFields]" label="保险开始时间" name="k_insuranceStartDate" input-align="left">
        <template #input>
          {{ parseTime(form.k_insuranceStartDate, '{y}-{m}') }}
        </template>
      </van-field>
      <van-field v-show-field="['k_insuranceEndDate', includeFields]" label="保险结束时间" name="k_insuranceEndDate" input-align="left">
        <template #input>
          {{ parseTime(form.k_insuranceEndDate, '{y}-{m}') }}
        </template>
      </van-field>
      <van-field v-show-field="['k_insuranceSpecialInstructions', includeFields]" label="保险购买特殊情况说明" name="k_insuranceSpecialInstructions" input-align="left">
        <template #input>
          <TextareaView :value="form.k_insuranceSpecialInstructions" />
        </template>
      </van-field>
    </div>
  </div>

  <van-field v-if="['0', '1', '3', '4', '5', '6'].includes(form.k_category)" v-show-field="['k_employInformation', includeFields]" label="聘用人员信息" name="k_employInformation" input-align="left">
    <template #input>
      <TextareaView :value="form.k_employInformation" />
    </template>
  </van-field>

  <van-field v-if="['1', '2', '3', '4'].includes(form.k_category)" v-show-field="['k_changeReason', includeFields]" label="变更原因" name="k_changeReason" input-align="left">
    <template #input>
      <TextareaView :value="form.k_changeReason" />
    </template>
  </van-field>

  <van-field v-show-field="['k_isBudget', includeFields]" name="k_isBudget" label="是否有预算" input-align="left">
    <template #input>
      <YesNoSwitch v-model="form.k_isBudget" readonly />
    </template>
  </van-field>

  <van-field v-if="form.k_isBudget === 'Y'" v-show-field="['k_isBudgetStandards', includeFields]" name="k_isBudgetStandards" label="是否符合预算标准" input-align="left">
    <template #input>
      <YesNoSwitch v-model="form.k_isBudgetStandards" readonly />
    </template>
  </van-field>

  <van-field v-if="form.k_isBudgetStandards === 'N' && form.k_isBudget === 'Y'" v-show-field="['k_supplementaryExplanation', includeFields]" label="补充说明" name="k_supplementaryExplanation" input-align="left">
    <template #input>
      <TextareaView :value="form.k_supplementaryExplanation" />
    </template>
  </van-field>

  <BaseDetail :include-fields="includeFields" />
</template>

<script setup lang="ts">
import { isNil } from 'lodash-es'
import BaseDetail from '../../../../components/BaseDetail.vue'
import type { DailyWorkForm } from '@/api/oa/daily/work/types'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'

const props = withDefaults(
  defineProps<{
    includeFields?: KeysOfArray<DailyWorkForm>
  }>(),
  {
    includeFields: () => ['k_deptId', 'k_userType', 'k_isKeyAccountsVP', 'k_nature', 'k_category', 'k_postId', 'k_number', 'k_isUniform', 'k_workwearType', 'k_quantityAndSize', 'k_isUseOriginalSalaryStandard', 'k_originalSalaryStandard', 'k_newSalaryStandard', 'k_effectiveDate', 'k_monthlyWorkingMode', 'k_salaryStandards', 'k_specialInstructions', 'k_otherDistribution', 'k_originalDistribution', 'k_changeAfterDistribution', 'k_changeReason', 'k_startDate', 'k_endDate', 'k_signeContractType', 'k_purchaseInsuranceType', 'k_employInformation', 'k_insuranceStartDate', 'k_insuranceEndDate', 'k_insuranceSpecialInstructions', 'k_signeContractStartDate', 'k_signeContractEndDate', 'k_signeContractSpecialInstructions', 'k_isBudget', 'k_isBudgetStandards', 'k_supplementaryExplanation', 'reason', 'ossIdList'],
  },
)

// 依赖收集
const trackFields = inject<TrackFieldsFn<DailyWorkForm>>('trackFields')
trackFields(props.includeFields)

const form = inject<Ref<DailyWorkForm>>('form')
// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>(form)
</script>
