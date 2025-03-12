<template>
  <detail v-if="isView" />
  <template v-else>
    <!-- 招聘需求变更申请 -->
    <div v-if="taskDefinitionKey === 'Activity_1laam19'">
      <upsert :include-fields="applyFields" />
    </div>

    <!-- 专员确认节点 -->
    <div v-else-if="taskDefinitionKey === 'Activity_171tryh'">
      <detail :include-fields="commissionerConfirmFields" />
      <detail :include-fields="['gg_recruitmentNo', 'gg_additionalBudgetExpenses']" />
      <detail :include-fields="['reason', 'ossIdList']" />
    </div>

    <!-- 其他审批通用节点 -->
    <div v-else>
      <detail />
    </div>
  </template>
</template>

<script setup lang="ts">
import upsert from '../upsert.vue'
import detail from '../detail.vue'
import { filterTruthyKeys } from '@/utils'
import type { DailyWorkForm } from '@/api/oa/daily/work/types'

const isView = inject<boolean>('isView')
const taskDefinitionKey = inject<string>('taskDefinitionKey')

// 申请字段
const applyFields = filterTruthyKeys<DailyWorkForm>({
  gg_deptId: true,
  gg_changeType: true,
  gg_changeDetails: true,
  gg_formType: true,
  gg_contractNo: true,
  gg_changeBeforeRecruitNumber: true,
  gg_changeAfterRecruitNumber: true,
  gg_changeBeforeSalaryRange: true,
  gg_changeAfterSalaryRange: true,
  gg_fixedNumber: true,
  gg_changeAfterFixedNumber: true,
  gg_changeAfterNumberPost: true,
  gg_changeReason: true,
  gg_effectiveDate: true,
  gg_content: true,
  ossIdList: true,
})

const commissionerConfirmFields = filterTruthyKeys<DailyWorkForm>({
  gg_deptId: true,
  gg_changeType: true,
  gg_changeDetails: true,
  gg_formType: true,
  gg_contractNo: true,
  gg_changeBeforeRecruitNumber: true,
  gg_changeAfterRecruitNumber: true,
  gg_changeBeforeSalaryRange: true,
  gg_changeAfterSalaryRange: true,
  gg_fixedNumber: true,
  gg_changeAfterFixedNumber: true,
  gg_changeAfterNumberPost: true,
  gg_changeReason: true,
  gg_effectiveDate: true,
  gg_content: true,
})
</script>
