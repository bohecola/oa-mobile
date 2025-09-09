<template>
  <detail v-if="isView" />
  <template v-else>
    <!-- 项目考核奖励确认单 -->
    <div v-if="taskDefinitionKey === 'Activity_1laam19'">
      <upsert :include-fields="baseFields" />
    </div>

    <div v-else-if="taskDefinitionKey === 'Activity_1p4ss2n'">
      <detail
        :include-fields="[
          'a_contractId',
          'a_businessType',
          'a_deptId',
          'a_contractNo',
          'a_partyA',
          'a_assessmentAmount',
          'a_rewardAmount',
          'customizeApprover',
          'isSeal',
        ]"
      />
      <upsert :include-fields="['a_isAssessment', 'a_businessKey']" />
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
import type { DailyWorkForm } from '@/api/oa/daily/work/types'
import { useWorkflowHelper } from '@/hooks'

type DailyWorkFormFields = KeysOfArray<DailyWorkForm>

const baseFields: DailyWorkFormFields = [
  'a_contractId',
  'a_businessType',
  'a_deptId',
  'a_contractNo',
  'a_partyA',
  'a_assessmentAmount',
  'a_rewardAmount',
  'customizeApprover',
  'isSeal',
  'reason',
  'ossIdList',
]

const { taskDefinitionKey, isView } = useWorkflowHelper()
</script>
