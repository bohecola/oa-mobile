<template>
  <detail v-if="isView" />
  <template v-else>
    <!-- 项目部聘用外包人员申请 -->
    <div v-if="taskDefinitionKey === 'Activity_1laam19'">
      <!-- <upsert :include-fields="applyFields" /> -->
    </div>

    <div v-else-if="taskDefinitionKey === 'Activity_171tryh'">
      <detail :include-fields="detailFields" />
      <!-- <detail :include-fields="['k_userType']" /> -->
      <detail :include-fields="['reason', 'ossIdList']" />
    </div>

    <!-- 其他审批通用节点 -->
    <div v-else>
      <detail />
    </div>
  </template>
</template>

<script setup lang="ts">
// import upsert from '../upsert.vue'
import detail from '../detail.vue'
import type { DailyWorkForm } from '@/api/oa/daily/work/types'
import { filterTruthyKeys } from '@/utils'

const isView = inject<boolean>('isView')
const taskDefinitionKey = inject<string>('taskDefinitionKey')

const applyFields = ref(
  filterTruthyKeys<DailyWorkForm>({
    k_deptId: true,
    k_isUniform: true,
    k_isKeyAccountsVP: true,
    k_nature: true,
    k_category: true,
    k_postId: true,
    k_number: true,
    k_isUseOriginalSalaryStandard: true,
    k_originalSalaryStandard: true,
    k_newSalaryStandard: true,
    k_effectiveDate: true,
    k_monthlyWorkingMode: true,
    k_salaryStandards: true,
    k_specialInstructions: true,
    k_otherDistribution: true,
    k_originalDistribution: true,
    k_changeAfterDistribution: true,
    k_changeReason: true,
    k_startDate: true,
    k_endDate: true,
    k_signeContractType: true,
    k_purchaseInsuranceType: true,
    k_workwearType: true,
    k_quantityAndSize: true,
    k_employInformation: true,
    k_insuranceStartDate: true,
    k_insuranceEndDate: true,
    k_insuranceSpecialInstructions: true,
    k_signeContractStartDate: true,
    k_signeContractEndDate: true,
    k_signeContractSpecialInstructions: true,
    k_isBudget: true,
    k_isBudgetStandards: true,
    k_supplementaryExplanation: true,
    reason: true,
    ossIdList: true,
  }),
)
const detailFields = ref(
  filterTruthyKeys<DailyWorkForm>({
    k_deptId: true,
    k_isKeyAccountsVP: true,
    k_nature: true,
    k_category: true,
    k_postId: true,
    k_number: true,
    k_isUseOriginalSalaryStandard: true,
    k_isUniform: true,
    k_originalSalaryStandard: true,
    k_newSalaryStandard: true,
    k_effectiveDate: true,
    k_monthlyWorkingMode: true,
    k_salaryStandards: true,
    k_specialInstructions: true,
    k_otherDistribution: true,
    k_originalDistribution: true,
    k_changeAfterDistribution: true,
    k_changeReason: true,
    k_startDate: true,
    k_endDate: true,
    k_signeContractType: true,
    k_purchaseInsuranceType: true,
    k_workwearType: true,
    k_quantityAndSize: true,
    k_employInformation: true,
    k_insuranceStartDate: true,
    k_insuranceEndDate: true,
    k_insuranceSpecialInstructions: true,
    k_signeContractStartDate: true,
    k_signeContractEndDate: true,
    k_signeContractSpecialInstructions: true,
    k_userType: true,
    k_isBudget: true,
    k_isBudgetStandards: true,
    k_supplementaryExplanation: true,
  }),
)
</script>
